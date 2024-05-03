import { app, Timer, InvocationContext } from "@azure/functions";
import { syncFromRepo } from "./shared";

export async function dailyUpdateAiApps(myTimer: Timer, context: InvocationContext): Promise<void> {
    return syncFromRepo(context, 'https://raw.githubusercontent.com/Azure/ai-apps/main/website/static/templates.json')
};

app.timer('dailyUpdateAiApps', {
    schedule: '0 44 4 * * *',
    handler: dailyUpdateAiApps
});
