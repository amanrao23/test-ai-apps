import { app, Timer, InvocationContext } from "@azure/functions";
import { syncFromRepo } from "./shared";

export async function dailyUpdate(myTimer: Timer, context: InvocationContext): Promise<void> {
    return syncFromRepo(
        context,
        'https://raw.githubusercontent.com/Azure/awesome-azd/main/website/static/templates.json',
        // Manual repos - This repos are not added in awesome-azd, but are used for ai-apps website, so we need to manually ask to sync them
        [
            { "source": "https://github.com/Azure-Samples/assistant-data-openai-python-promptflow" },
            { "source": "https://github.com/Azure-Samples/summarization-openai-csharp-prompty" },
            { "source": "https://github.com/Azure-Samples/azure-openai-chat-frontend" },
            { "source": "https://github.com/azure-samples/openai-plugin-fastapi" },
            { "source": "https://github.com/azure-samples/contoso-chat-csharp-prompty" },
            { "source": "https://github.com/azure-samples/llama-index-python" },
            { "source": "https://github.com/azure-samples/llama-index-javascript" },
            { "source": "https://github.com/cwaddingham/canopy/tree/create-azd-template" },
            { "source": "https://github.com/azure-samples/azure-openai-assistant-javascript" }
        ]
    )
};

app.timer('dailyUpdate', {
    schedule: '0 33 3 * * *',
    handler: dailyUpdate
});
