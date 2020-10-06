import * as cjs from "@chitchatjs/core";

/**
 * User opens the bot
 * System asks a question
 */
let interaction1: cjs.Interaction = {
    user: {
        trigger: <cjs.LaunchTrigger>{},
    },
    system: {
        actions: [
            <cjs.AskSpeechAction>{
                question: "Welcome to your first bot, you can ask how I am.",
                reprompt:
                    "You can ask how I am by saying - Hello, how are you?",
            },
        ],
    },
};

/**
 * User says "how are you"
 * System replies
 */
let interaction2: cjs.Interaction = {
    user: {
        trigger: <cjs.UtteranceTrigger>{
            texts: ["Hello how are you"],
        },
    },
    system: {
        actions: [
            <cjs.TellSpeechAction>{
                text: "I'm good, thank you!",
            },
        ],
    },
};

export let dialog: cjs.Dialog = { interactions: [interaction1, interaction2] };
