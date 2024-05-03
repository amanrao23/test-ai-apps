import { app, Timer, InvocationContext } from "@azure/functions";
import { syncFromRepo } from "./shared";

export async function dailyUpdate(myTimer: Timer, context: InvocationContext): Promise<void> {
    return syncFromRepo(context, 'https://raw.githubusercontent.com/Azure/awesome-azd/main/website/static/templates.json')
};

app.timer('dailyUpdate', {
    schedule: '0 33 3 * * *',
    handler: dailyUpdate
});
