import { SpeechAction, SystemTurn, Turn, UserTurn, UtteranceTrigger } from '@chitchatjs/core'

/**
 * Dialog Script is a collection of triggers followed by their actions.
 */
let dialogScript: Turn[] = [
    {
        trigger: {
            text: 'Hello, how are you'
        } as UtteranceTrigger
    } as UserTurn,
    {
        actions: [
            {
                text: 'I\'m good, thank you!'
            } as SpeechAction
        ]
    } as SystemTurn
]

export { dialogScript }