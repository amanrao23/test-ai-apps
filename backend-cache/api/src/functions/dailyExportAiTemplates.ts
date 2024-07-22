import { app, Timer, InvocationContext } from "@azure/functions";
import { exportTemplates } from "./shared";

export async function dailyExportAiTemplates(myTimer: Timer, context: InvocationContext): Promise<void> {
    return exportTemplates(
        context,
        'https://raw.githubusercontent.com/Azure/ai-apps/main/website/static/templates.json',
        "ai-templates",
        "templates.json"
    )
};

// app.timer('dailyExportAiTemplates', {
//     schedule: '0 44 4 * * *',
//     handler: dailyExportAiTemplates
// });
