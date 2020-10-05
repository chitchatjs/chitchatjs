import { DialogSet, Interaction } from "@chitchatjs/core"
import { HandlerInput } from 'ask-sdk-core'
import * as Alexa from 'ask-sdk-core'
import * as cjs from "@chitchatjs/core"

/**
 * Matches the current input request with an Interaction from the DialogSet
 */
export interface InteractionMatcher {
    match(handlerInput: HandlerInput, dialogSet: DialogSet): Interaction;
}

/**
 * Default Implementation
 */
export class DefaultInteractionMatcher implements InteractionMatcher {
    match(handlerInput: HandlerInput, dialogSet: DialogSet): Interaction | never {

        let requestType: string = Alexa.getRequestType(handlerInput.requestEnvelope)

        // Assuming we have only one dialog
        let interactions: Interaction[] = dialogSet.dialogs[0].interactions

        if (requestType === "LaunchRequest") {
            interactions.forEach((intr: Interaction) => {
                if (this.isLaunchTrigger(intr.user.trigger)) {
                    return intr
                }
            })
        } else {
            interactions.forEach((intr: Interaction) => {
                if (this.isUtteranceTrigger(intr.user.trigger)) {
                    return intr
                }
            })
        }

        throw new Error(`No matching interaction found. Input: ${requestType}, Available Interactions: ${JSON.stringify(interactions, null, 2)}`)
    }

    isLaunchTrigger(arg: any): arg is cjs.LaunchTrigger {
        return arg && !arg.texts // Hacky for now TODO
    }

    isUtteranceTrigger(arg: any): arg is cjs.UtteranceTrigger {
        return arg && arg.texts // Hacky for now TODO
    }
}