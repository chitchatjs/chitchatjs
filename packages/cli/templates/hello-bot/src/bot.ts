import { SpeechAction, SystemTurn, Turn, UserTurn, UtteranceTrigger } from "@chitchatjs/core"

/**
 * Dialog Script is a collection of triggers followed by their actions.
 */

// What user might say
let userSaysHello: UserTurn = {
    trigger: {
        texts: ["Hello, how are you"]
    } as UtteranceTrigger
}

// What system answers
let systemsGreetsBack: SystemTurn = {
    actions: [
        {
            text: "I'm good, thank you!"
        } as SpeechAction
    ]
}

// Plug turns into a dialog script
let dialogScript: Turn[] = [
    userSaysHello,
    systemsGreetsBack
]

// export, that's it!
export { dialogScript }