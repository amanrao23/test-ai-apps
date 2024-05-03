@description('The location used for all deployed resources')
param location string = resourceGroup().location

@description('Tags that will be applied to all resources')
param tags object = {}

@description('azd-api-service-name')
param apiName string

var resourceToken = uniqueString(resourceGroup().id)

@description('provide a token for the GitHub API. The token is used to read from public repositories.')
@secure()
param gh_token string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'cache${resourceToken}'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    
  }
  tags: tags

  resource blobs 'blobServices' = {
    name: 'default'
    properties: {
      cors: {
        corsRules: [
          {
            allowedOrigins: ['*']
            allowedMethods: ['GET']
            allowedHeaders: ['*']
            exposedHeaders: ['*']
            maxAgeInSeconds: 3600
          }
        ]
      }
    }
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'asp${resourceToken}'
  location: location
  tags: tags
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  properties: {
    reserved: true
  }
}

resource functionsStorageAccount 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  name: 'functions${resourceToken}'
  location: location
  sku: {
      name: 'Standard_LRS'
  }
  kind: 'Storage'
  properties: {
      supportsHttpsTrafficOnly: true
      defaultToOAuthAuthentication: true
  }
}

resource logAnalyticsWs 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' = {
  name: 'loganalytics${resourceToken}'
  location: location
  tags: tags
  properties: any({
    retentionInDays: 30
    features: {
      searchVersion: 1
    }
    sku: {
      name: 'PerGB2018'
    }
  })
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appinsights-${resourceToken}'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWs.id
  }
}

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: 'functions-${resourceToken}'
  location: location
  tags: union(tags, { 'azd-service-name': apiName })
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: appServicePlan.id
    clientAffinityEnabled: false
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'node|20'
      alwaysOn: false
      ftpsState: 'FtpsOnly'
      minTlsVersion: '1.2'
      use32BitWorkerProcess: false
      cors: {
        allowedOrigins: ['*', 'https://portal.azure.com', 'https://ms.portal.azure.com']
      }
    }
  }

  identity: { type: 'SystemAssigned'}

  resource basicPublishingCredentialsPoliciesFtp 'basicPublishingCredentialsPolicies' = {
    name: 'ftp'
    properties: {
      allow: false
    }
  }

  resource basicPublishingCredentialsPoliciesScm 'basicPublishingCredentialsPolicies' = {
    name: 'scm'
    properties: {
      allow: false
    }
  }
}

resource storageRoleAssigment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(storageAccount.id, appService.id, subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'))
  scope: storageAccount
  properties: {
    principalId: appService.identity.principalId
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'ba92f5b4-2d11-453d-a403-e96b0029c9fe')
  }
  dependsOn:[configLogs]
}

resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: 'keyvault${resourceToken}'
  location: location
  properties: {
    sku: {
      name: 'standard'
      family: 'A'
    }
    tenantId: subscription().tenantId
    enableRbacAuthorization: true
  }
  tags: tags
}

resource ghtokensecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'GH-TOKEN'
  parent: keyVault
  properties: {
    value: gh_token
  }
}

resource kvRoleAssigment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(keyVault.id, appService.id, subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6'))
  scope: keyVault
  properties: {
    principalId: appService.identity.principalId
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6')
  }
  dependsOn:[ghtokensecret]
}



resource configAppSettings 'Microsoft.Web/sites/config@2023-01-01' = {
  name: 'appsettings'
  parent: appService
  properties:{
      AzureWebJobsStorage: 'DefaultEndpointsProtocol=https;AccountName=${functionsStorageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${functionsStorageAccount.listKeys().keys[0].value}'
      FUNCTIONS_EXTENSION_VERSION: '~4'
      FUNCTIONS_WORKER_RUNTIME: 'node'
      APPINSIGHTS_INSTRUMENTATIONKEY: applicationInsights.properties.InstrumentationKey
      APPLICATIONINSIGHTS_CONNECTION_STRING: applicationInsights.properties.ConnectionString
      AZURE_STORAGE_CACHE: storageAccount.properties.primaryEndpoints.blob
      SCM_DO_BUILD_DURING_DEPLOYMENT: string(true)
      ENABLE_ORYX_BUILD: string(true)
      KEY_VAULT: keyVault.properties.vaultUri
  }
}  

resource configLogs 'Microsoft.Web/sites/config@2023-01-01' = {
  name: 'logs'
  parent: appService
  properties: {
    applicationLogs: { fileSystem: { level: 'Verbose' } }
    detailedErrorMessages: { enabled: true }
    failedRequestsTracing: { enabled: true }
    httpLogs: { fileSystem: { enabled: true, retentionInDays: 1, retentionInMb: 35 } }
  }
  dependsOn: [configAppSettings]
}
