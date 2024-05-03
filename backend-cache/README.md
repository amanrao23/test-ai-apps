# Backend cache

The backend cache is a project for daily pulling information about GitHub repositories and exposing that information as Azure Storage json blobs.

## Set up

The project uses the Azure Developer CLI to create the infrastructure and to deploy the code.  Running `azd up` should be enough to bring the service running in Azure.

When running `azd up` for the first time, you have to provide Azure subscription, location and also an GitHub token that the services uses to read GitHub repositories.

## Design

The system uses an Azure Functions service to host two scheduled functions, one for reading repos for Awesome-azd templates and another for ai-templates. The functions are fixed to run daily at 3:33am and 4:44am. Then, the information for each repo is persisted into an Azure Storage account where a container with the name of the repo owner groups all the json blobs for each repository inside that owner.

## Production Service

The system is currently deployed in the `Azure Developer CLI Test Tenant` subscription using an azd environment name: `ai-apps-production`.
The GitHub token belongs to the `azuredevelopercli@microsoft.com` GitHub account, which has read access to the ai-templates private repo.
