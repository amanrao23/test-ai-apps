/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export type Tag = {
  label: string;
  description: string;
  icon?: string;
  darkIcon?: string;
  url?: string;
  type?: string;
  subType?: SubType;
};

export type User = {
  title: string;
  description: string;
  preview: string;
  website: string;
  author: string;
  source: string | null;
  tags: TagType[];
  video?: string;
  previewTags?: TagType[];
};

type SubType = {
  label: string;
  icon: string;
  darkIcon?: string;
};

export const openai: SubType = {
  label: "OpenAI",
  icon: "./img/openAI.svg",
  darkIcon: "./img/openAIDark.svg",
};

export const meta: SubType = {
  label: "Meta",
  icon: "./img/meta.svg",
}

// TODO add icon
export const microsoft: SubType = {
  label: "Microsoft",
  icon: "",
};

export const mistralai: SubType = {
  label: "Mistral AI",
  icon: "",
};

// NN: Updated TagType to suit Static Web Apps
export type TagType =
  | "featured"
  | "javascript"
  | "dotnetCsharp"
  | "java"
  | "python"
  | "typescript"
  | "dalle"
  | "gpt35turbo"
  | "gpt4turbo"
  | "gpt4"
  | "llama"
  | "llama2"
  | "agent"
  | "chat"
  | "search"
  | "llmops"
  | "summarization"
  | "azuredb-postgreSQL"
  | "mongodb"
  | "pinecone"
  | "azuresql"
  | "azurecosmosdb"
  | "phi2"
  | "orca2"
  | "mistral7b"
  | "mistral8*7b"
  | "embedding-ada"
  | "bicep"
  | "terraform"
  | "prometheus"
  | "appinsights"
  | "loganalytics"
  | "appservice"
  | "monitor"
  | "keyvault"
  | "aca"
  | "cosmosdb"
  | "functions"
  | "blobstorage"
  | "azuredb-mySQL"
  | "swa"
  | "servicebus"
  | "vnets"
  | "aisearch"
  | "openai"
  | "azureai"
  | "apim"
  | "aks"
  | "azurecdn"
  | "frontdoor"
  | "grafana"
  | "azurespringapps"
  | "rediscache"
  | "agw"
  | "azurebot"
  | "ade"
  | "eventhub"
  | "azurestorage"
  | "azureappconfig"
  | "aistudio"
  | "apicenter"
  | "eventgrid"
  | "diagnosticsettings"
  | "logicapps"
  | "managedidentity"
  | "serviceprincipal"
  | "azuredatafactory";

// LIST OF AVAILABLE TAGS
// Each tag in lit about must have a defined object here
// One or more tags can be associated per card
// Tag Metadata:
//   - label = short name seen in tag
//   - description = explainer for usage
//   - type = type of tag
//   - icon = svg path for icon
//   - url = url for azure service
export const Tags: { [type in TagType]: Tag } = {
  //============  FOR REGULAR USE

  // Special Tag
  featured: {
    label: "Featured Template",
    description: "This tag is used for featured templates.",
  },

  // Language Tags

  javascript: {
    label: "JavaScript",
    description: "Template contains JavaScript app code",
    type: "Language",
    icon: "./img/js.svg",
  },
  dotnetCsharp: {
    label: ".NET/C#",
    description: "Template contains .NET and/or C# app code",
    type: "Language",
    icon: "./img/csharp.svg",
  },
  java: {
    label: "Java",
    description: "Template contains Java app code",
    type: "Language",
    icon: "./img/java.svg",
  },
  python: {
    label: "Python",
    description: "Template contains Python app code",
    type: "Language",
    icon: "./img/python.svg",
  },
  typescript: {
    label: "TypeScript",
    description: "Template contains TypeScript app code",
    type: "Language",
    icon: "./img/typescript.svg",
  },

  // Model Tags
  dalle: {
    label: "Dalle",
    description: "Template use OpenAI Dalle model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/dall-e",
  },
  gpt35turbo: {
    label: "GPT 3.5 Turbo",
    description: "Template use OpenAI GPT 3.5 Turbo model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/gpt-3-5-turbo",
  },
  gpt4turbo: {
    label: "GPT 4 Turbo",
    description: "Template use OpenAI GPT 4 Turbo model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4",
  },
  gpt4: {
    label: "GPT 4",
    description: "Template use OpenAI GPT 4 model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4",
  },
  "embedding-ada": {
    label: "Embedding-ada",
    description: "Template use OpenAI Embedding-ada model",
    type: "Model",
    subType: openai,
  },
  llama: {
    label: "Code Llama",
    description: "Template use Meta Code Llama model",
    type: "Model",
    subType: meta,
    url: "https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-code-llama",
  },
  llama2: {
    label: "Llama 2",
    description: "Template use Meta Llama 2 model",
    type: "Model",
    subType: meta,
    url: "https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-llama-2",
  },
  phi2: {
    label: "Phi 2",
    description: "Template use Microsoft Phi 2 model",
    type: "Model",
    subType: microsoft,
  },
  orca2: {
    label: "Orca 2",
    description: "Template use Microsoft Orca 2 model",
    type: "Model",
    subType: microsoft,
  },
  mistral7b: {
    label: "Mistral 7b",
    description: "Template use Mistral AI Mistral 7b model",
    type: "Model",
    subType: mistralai,
  },
  "mistral8*7b": {
    label: "Mixtral 8x7B",
    description: "Template use Mistral AI Mixtral 8x7B model",
    type: "Model",
    subType: mistralai,
  },

  // Intelligent Solution Tags
  agent: {
    label: "Agent",
    description: "Template implements copilot that uses agent(s)",
    type: "Intelligent Solution",
  },
  chat: {
    label: "Interactive Chat",
    description: "Template implements interactive chat",
    type: "Intelligent Solution",
  },
  search: {
    label: "Guided Search",
    description: "Template implements guided search",
    type: "Intelligent Solution",
  },
  llmops: {
    label: "LLM Ops",
    description: "Template involves LLM Operations",
    type: "Intelligent Solution",
  },
  summarization: {
    label: "Summarization",
    description: "Template involves summarization and / or augmentation",
    type: "Intelligent Solution",
  },

  // Database Tags
  "azuredb-postgreSQL": {
    label: "Azure PostgreSQL",
    description: "Template architecture uses Azure PostgreSQL Database",
    icon: "./img/Azure-PostgreSQL.svg",
    url: "https://azure.microsoft.com/products/postgresql",
    type: "Database",
  },
  mongodb: {
    label: "MongoDB",
    description: "Template architecture uses MongoDB Database",
    type: "Database",
  },
  pinecone: {
    label: "Pinecone",
    description: "Template architecture uses Pinecone Database",
    type: "Database",
  },
  azuresql: {
    label: "Azure SQL",
    description: "Template architecture uses Azure SQL Database",
    icon: "./img/Azure-SQL.svg",
    url: "https://azure.microsoft.com/products/azure-sql/database",
    type: "Database",
  },
  azurecosmosdb: {
    label: "Azure CosmosDB",
    description: "Template architecture uses Azure CosmosDB",
    icon: "./img/Azure-Cosmos-DB.svg",
    url: "https://azure.microsoft.com/products/cosmos-db/",
    type: "Database",
  },
  prometheus: {
    label: "Prometheus",
    description: "Template architecture uses Prometheus",
    type: "Database",
  },
  "azuredb-mySQL": {
    label: "Azure MySQL",
    description: "Template architecture uses Azure Database for MySQL",
    icon: "./img/Azure-MySQL.svg",
    url: "https://azure.microsoft.com/products/mysql",
    type: "Database",
  },

  // ---- Infrastructure as Code
  bicep: {
    label: "Bicep",
    description: "Template uses Bicep for Infra as Code",
    type: "Infrastructure as Code",
  },
  terraform: {
    label: "Terraform",
    description: "Template uses Terraform for Infra as Code",
    type: "Infrastructure as Code",
  },

  // ---- Azure Services
  appinsights: {
    label: "Azure Application Insights",
    description: "Template architecture uses Azure Application Insights",
    icon: "./img/Azure-Application-Insights.svg",
    url: "https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview",
    type: "Service",
  },
  loganalytics: {
    label: "Azure Log Analytics",
    description: "Template architecture uses Azure Log Analytics",
    icon: "./img/Azure-Log-Analytics.svg",
    url: "https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview",
    type: "Service",
  },
  appservice: {
    label: "Azure App Service",
    description: "Template architecture uses Azure App Service",
    icon: "./img/Azure-App-Service.svg",
    url: "https://azure.microsoft.com/products/app-service",
    type: "Service",
  },
  monitor: {
    label: "Azure Monitor",
    description: "Template architecture uses Azure Monitor Service",
    icon: "./img/Azure-Monitor.svg",
    url: "https://azure.microsoft.com/products/monitor",
    type: "Service",
  },
  keyvault: {
    label: "Azure Key Vault",
    description: "Template architecture uses Azure Key Vault",
    icon: "./img/Azure-Key-Vault.svg",
    url: "https://azure.microsoft.com/products/key-vault",
    type: "Service",
  },
  aca: {
    label: "Azure Container Apps",
    description: "Template architecture uses Azure Container Apps",
    icon: "./img/Azure-Container-Apps.svg",
    url: "https://azure.microsoft.com/products/container-apps",
    type: "Service",
  },
  cosmosdb: {
    label: "Azure CosmosDB",
    description: "Template architecture uses Azure CosmosDB",
    icon: "./img/Azure-Cosmos-DB.svg",
    url: "https://azure.microsoft.com/products/cosmos-db/",
    type: "Service",
  },
  functions: {
    label: "Azure Functions",
    description: "Template architecture uses Azure Functions",
    icon: "./img/Azure-Function.svg",
    url: "https://azure.microsoft.com/products/functions",
    type: "Service",
  },
  blobstorage: {
    label: "Azure Blob Storage",
    description: "Template architecture uses Azure Blob Storage",
    icon: "./img/Azure-Storage.svg",
    url: "https://azure.microsoft.com/products/storage/blobs",
    type: "Service",
  },
  "azuredb-mySQL": {
    label: "Azure MySQL",
    description: "Template architecture uses Azure Database for MySQL",
    azureIcon: "./img/Azure-MySQL.svg",
    url: "https://azure.microsoft.com/products/mysql",
    type: "Database",
  },
  swa: {
    label: "Azure Static Web Apps",
    description: "Template architecture uses Azure Static Web Apps",
    icon: "./img/Azure-Static-Web-Apps.svg",
    url: "https://azure.microsoft.com/products/app-service/static",
    type: "Service",
  },
  servicebus: {
    label: "Azure Service Bus",
    description: "Template architecture uses Azure Service Bus",
    icon: "./img/Azure-Service-Bus.svg",
    url: "https://azure.microsoft.com/products/service-bus",
    type: "Service",
  },
  vnets: {
    label: "Azure Virtual Networks (VNET)",
    description: "Template architecture uses Azure Virtual Networks",
    icon: "./img/Azure-Virtual-Networks.svg",
    url: "https://azure.microsoft.com/products/virtual-network",
    type: "Service",
  },
  aisearch: {
    label: "Azure AI Search",
    description: "Template architecture uses Azure AI Search",
    icon: "./img/Azure-AI-Search.svg",
    url: "https://azure.microsoft.com/products/ai-services/ai-search",
    type: "Service",
  },
  openai: {
    label: "Azure OpenAI Service",
    description: "Template architecture uses Azure OpenAI Service",
    icon: "./img/Azure-OpenAI-Service.svg",
    darkIcon: "./img/Azure-OpenAI-Service-white.svg",
    url: "https://azure.microsoft.com/products/ai-services/openai-service",
    type: "Service",
  },
  azureai: {
    label: "Azure AI Service",
    description: "Template architecture uses Azure AI Service",
    icon: "./img/Azure-AI-Service.svg",
    url: "https://azure.microsoft.com/solutions/ai",
    type: "Service",
  },
  apim: {
    label: "Azure API Management",
    description: "Template architecture uses Azure API Management",
    icon: "./img/Azure-API-Management.svg",
    url: "https://azure.microsoft.com/products/api-management",
    type: "Service",
  },
  aks: {
    label: "Azure Kubernetes Service",
    description: "Template architecture uses Azure Kubernetes Service",
    icon: "./img/Azure-Kubernetes-Service.svg",
    url: "https://azure.microsoft.com/products/kubernetes-service",
    type: "Service",
  },
  azurecdn: {
    label: "Azure Content Delivery Network",
    description: "Template architecture uses Azure Content Delivery Network",
    icon: "./img/Azure-Front-Door-And-CDN.svg",
    url: "https://azure.microsoft.com/products/cdn",
    type: "Service",
  },
  frontdoor: {
    label: "Azure Front Door",
    description: "Template architecture uses Azure Front Door",
    icon: "./img/Azure-Front-Door-And-CDN.svg",
    url: "https://azure.microsoft.com/products/frontdoor",
    type: "Service",
  },
  grafana: {
    label: "Azure Managed Grafana",
    description: "Template architecture uses Azure Managed Grafana",
    icon: "./img/Azure-Managed-Grafana.svg",
    url: "https://azure.microsoft.com/products/managed-grafana",
    type: "Service",
  },
  azurespringapps: {
    label: "Azure Spring Apps",
    description: "Template architecture uses Azure Spring Apps",
    icon: "./img/Azure-Spring-Apps.svg",
    url: "https://azure.microsoft.com/products/spring-apps",
    type: "Service",
  },
  rediscache: {
    label: "Azure Cache for Redis",
    description: "Template architecture uses Azure Cache for Redis",
    icon: "./img/Azure-Cache-for-Redis.svg",
    url: "https://azure.microsoft.com/products/cache",
    type: "Service",
  },
  agw: {
    label: "Azure Application Gateway",
    description: "Template architecture uses Azure Application Gateway",
    icon: "./img/Azure-Application-Gateway.svg",
    url: "https://azure.microsoft.com/products/application-gateway",
    type: "Service",
  },
  azurebot: {
    label: "Azure AI Bot Service",
    description: "Template architecture uses Azure AI Bot Service",
    icon: "./img/Azure-AI-Bot-Services.svg",
    url: "https://azure.microsoft.com/products/ai-services/ai-bot-service",
    type: "Service",
  },
  ade: {
    label: "Azure Deployment Environments",
    description: "Template architecture uses Azure Deployment Environments",
    icon: "./img/Azure-Deployment-Environments.svg",
    url: "https://azure.microsoft.com/products/deployment-environments",
    type: "Service",
  },
  eventhub: {
    label: "Azure Event Hubs",
    description: "Template architecture uses Azure Event Hubs",
    icon: "./img/Azure-Event-Hubs.svg",
    url: "https://azure.microsoft.com/products/event-hubs",
    type: "Service",
  },
  azurestorage: {
    label: "Azure Storage",
    description: "Template architecture uses Azure Storage",
    icon: "./img/Azure-Storage.svg",
    url: "https://azure.microsoft.com/products/storage",
    type: "Service",
  },
  azureappconfig: {
    label: "Azure App Configuration",
    description: "Template architecture uses Azure App Configuration",
    icon: "./img/Azure-App-Configuration.svg",
    url: "https://azure.microsoft.com/products/app-configuration",
    type: "Service",
  },
  aistudio: {
    label: "Azure AI Studio",
    description: "Template architecture uses Azure AI Studio",
    icon: "./img/Azure-AI-Studio.svg",
    url: "https://azure.microsoft.com/products/ai-studio",
    type: "Service",
  },
  apicenter: {
    label: "Azure API Center",
    description: "Template architecture uses Azure API Center",
    icon: "./img/Azure-API-Center.svg",
    url: "https://learn.microsoft.com/azure/api-center/overview",
    type: "Service",
  },
  eventgrid: {
    label: "Azure Event Grid",
    description: "Template architecture uses Azure Event Grid",
    icon: "./img/Azure-Event-Grid.svg",
    url: "https://learn.microsoft.com/azure/event-grid/overview",
    type: "Service",
  },
  diagnosticsettings: {
    label: "Azure Diagnostic Settings",
    description: "Template architecture uses Azure Diagnostic Settings",
    icon: "./img/Azure-Diagnostic-Settings.svg",
    url: "https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings",
    type: "Service",
  },
  logicapps: {
    label: "Azure Logic Apps",
    description: "Template architecture uses Azure Logic Apps",
    icon: "./img/Azure-Logic-Apps.svg",
    url: "https://learn.microsoft.com/azure/logic-apps/logic-apps-overview",
    type: "Service",
  },
  managedidentity: {
    label: "Azure Managed Identities",
    description: "Template architecture uses Azure Managed Identities",
    icon: "./img/Azure-Managed-Identities.svg",
    url: "https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview",
    type: "Service",
  },
  serviceprincipal: {
    label: "Azure Service Principal",
    description: "Template architecture uses Azure Service Principal",
    icon: "./img/Azure-Service-Principal.svg",
    url: "https://learn.microsoft.com/entra/identity-platform/app-objects-and-service-principals",
    type: "Service",
  },
  azuredatafactory: {
    label: "Azure Data Factory",
    description: "Template architecture uses Azure Data Factory",
    icon: "./img/Azure-Data-Factory.svg",
    url: "https://learn.microsoft.com/azure/data-factory/introduction",
    type: "Service",
  }
};
