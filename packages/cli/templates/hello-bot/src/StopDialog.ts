import * as cjs from "@chitchatjs/core";

/**
 * User opens the bot
 * System asks a question
 */
let interaction1: cjs.Interaction = {
    user: {
        trigger: <cjs.IntentTrigger>{
            name: "AMAZON.StopIntent",
        },
    },
    system: {
        actions: [
            <cjs.TellSpeechAction>{
                text: "Good bye!",
            },
        ],
    },
};
export let dialog: cjs.Dialog = { interactions: [interaction1] };
