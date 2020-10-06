import * as cjs from "@chitchatjs/core";

/**
 * User opens the bot
 * System asks a question
 */
let interaction1: cjs.Interaction = {
    user: {
        trigger: <cjs.IntentTrigger>{
            name: "AMAZON.FallbackIntent",
        },
    },
    system: {
        actions: [
            <cjs.AskSpeechAction>{
                question: "Sorry I don't understand, please try again!",
                reprompt: "Please try again.",
            },
        ],
    },
};
export let dialog: cjs.Dialog = { interactions: [interaction1] };
