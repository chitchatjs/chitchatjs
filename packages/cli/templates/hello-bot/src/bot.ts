import * as cjs from "@chitchatjs/core"
import { AlexaSkill } from "@chitchatjs/alexa"

/**
 * User opens the bot
 * System asks a question
 */
let interaction1: cjs.Interaction = {
    user: {
        trigger: <cjs.LaunchTrigger>{}
    },
    system: {
        actions: [
            <cjs.AskSpeechAction>{
                question: "Welcome to your first bot, you can ask how I am.",
                reprompt: "You can ask how I am by saying - Hello, how are you?"
            }
        ]
    }
}

/**
 * User says "how are you"
 * System replies
 */
let interaction2: cjs.Interaction = {
    user: {
        trigger: <cjs.UtteranceTrigger>{
            texts: ["Hello, how are you"]
        }
    },
    system: {
        actions: [
            <cjs.SpeechAction>{
                text: "I'm good, thank you!"
            }
        ]
    }
}

let dialogSet: cjs.DialogSet = {
    dialogs: [{
        interactions: [interaction1, interaction2]
    }],
}

// export, that's it!
export default new AlexaSkill(dialogSet).build()