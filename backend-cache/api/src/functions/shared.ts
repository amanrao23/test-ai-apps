import { InvocationContext } from "@azure/functions";
import axios from 'axios';
import { BlobServiceClient, BlockBlobUploadHeaders } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

async function getAuthToken(context: InvocationContext): Promise<string> {
    // Create a SecretClient instance
    let authToken = ""
    const keyVaultUrl = process.env.KEY_VAULT;
    if (keyVaultUrl) {
        try {
            const secretClient = new SecretClient(keyVaultUrl, new DefaultAzureCredential());
            // Get the secret value
            const secret = await secretClient.getSecret("GH-TOKEN");
            authToken = secret.value;
        } catch (error) {
            context.log(`Error fetching secret: ${error}. Skip using key vault`);
        }
    }
    if (authToken === "") {
        // this can be used when running locally
        authToken = process.env.GH_TOKEN;
    }
    return authToken;
}

async function getTemplateList(context: InvocationContext, sourceRepo: string, authToken: String): Promise<any> {
    const fileUrl = sourceRepo;
    context.log(`Getting list of repos from: ${fileUrl}`);
    const response = await axios.get(fileUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.data;
}

type RepoSlug = {
    owner: string;
    repo: string;
}

function getRepoSlug(context: InvocationContext, repoUrl: string): RepoSlug | null {
    if (!repoUrl.includes('https://github.com/')) {
        context.log(`skip non github repo: ${repoUrl}`);
        return undefined;
    }

    const repoSlug = repoUrl.replace('https://github.com/', '');
    const slugParts = repoSlug.split('/');
    const owner = slugParts[0];
    const repo = slugParts[1];
    return { owner, repo };
}

async function blobFromRepo(context: InvocationContext, repoSlug: RepoSlug | null, authToken: String): Promise<string> {
    if (!repoSlug) {
        return "";
    }

    let repoResponse;
    try {
        const repoApiUrl = `https://api.github.com/repos/${repoSlug.owner}/${repoSlug.repo}`;
        context.log(`read info from repo: ${repoApiUrl}`);
        repoResponse = await axios.get(repoApiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch (error) {
        context.error(`Error fetching data: ${error}. Skipping...`);
        return "";
    }
    const repoData = repoResponse.data;
    const defaultBranch = repoData.default_branch;
    let branchResponse;
    try {
        const repoApiUrl = `https://api.github.com/repos/${repoSlug.owner}/${repoSlug.repo}/branches/${defaultBranch}`;
        context.log(`read info from repo: ${repoApiUrl}`);
        branchResponse = await axios.get(repoApiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch (error) {
        context.error(`Error fetching data: ${error}. Skipping...`);
    }

    const repoStars = repoData.stargazers_count;
    const repoForks = repoData.forks_count;
    const repoWatchers = repoData.watchers_count;
    const repoIssues = repoData.open_issues_count;
    const repoBranch = branchResponse.data;
    let data = {
        stars: repoStars,
        forks: repoForks,
        watchers: repoWatchers,
        issues: repoIssues,
    }
    if (branchResponse) {
        data['updatedOn'] = repoBranch.commit.commit.author.date;
    }

    return JSON.stringify(data);
}

async function uploadBlob(context: InvocationContext, repoSlug: RepoSlug | null, jsonContent: string): Promise<void> {

    const validContainerName = repoSlug.owner.toLowerCase();
    const validBLobName = repoSlug.repo.toLowerCase();
    const blobServiceClient = new BlobServiceClient(process.env.AZURE_STORAGE_CACHE, new DefaultAzureCredential());
    const containerClient = blobServiceClient.getContainerClient(validContainerName);

    // Check if the container exists, create it if it doesn't
    if (!(await containerClient.exists())) {
        await containerClient.create({
            access: 'blob'
        });
    }

    const blockBlobClient = containerClient.getBlockBlobClient(validBLobName);
    const result: BlockBlobUploadHeaders = await blockBlobClient.upload(
        jsonContent, jsonContent.length, { blobHTTPHeaders: { blobContentType: 'application/json' } });
    if (result.errorCode) throw Error(result.errorCode);
};

export async function syncFromRepo(context: InvocationContext, repo: string, manualRepos): Promise<void> {
    // Create a SecretClient instance
    const authToken = await getAuthToken(context);
    if (!authToken) {
        context.error(`No GitHub token found. Required to fetch templates.`);
        return;
    }

    let templateList;
    try {
        templateList = await getTemplateList(
            context, repo, authToken);
    } catch (error) {
        context.error(`Fetching templates.json: ${error}`);
        return;
    }

    templateList = templateList.push(...manualRepos);

    for (const template of templateList) {
        const repoSlug = getRepoSlug(context, template.source);
        if (!repoSlug) {
            continue;
        }
        const jsonContent = await blobFromRepo(context, repoSlug, authToken);

        try {
            await uploadBlob(context, repoSlug, jsonContent);
        } catch (error) {
            context.error(`Error uploading to Azure Blob Storage: ${error}`);
            return;
        }
    }
    context.log(`All done`);
    return;
}

export async function exportTemplates(context: InvocationContext, repo: string, containerName: string, blobName: string): Promise<void> {
    // Create a SecretClient instance
    const authToken = await getAuthToken(context);
    if (!authToken) {
        context.error(`No GitHub token found. Required to fetch templates.`);
        return;
    }

    let templateList;
    try {
        templateList = await getTemplateList(
            context, repo, authToken);
    } catch (error) {
        context.error(`Fetching templates.json: ${error}`);
        return;
    }

    try {
        await uploadBlob(context, {owner: containerName, repo: blobName}, JSON.stringify(templateList));
    } catch (error) {
        context.error(`Error uploading to Azure Blob Storage: ${error}`);
        return;
    }

    context.log(`All done`);
    return;
}