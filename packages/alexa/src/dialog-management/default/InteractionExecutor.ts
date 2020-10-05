import { Interaction } from "@chitchatjs/core"
import { HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import * as Alexa from 'ask-sdk-core'
import * as cjs from "@chitchatjs/core"

/**
 * Executes the macthed Interaction
 */
export interface InteractionExecutor {
    execute(handlerInput: HandlerInput, interaction: Interaction): Response | Promise<Response> | never
}

export class DefaultInteractionExecutor implements InteractionExecutor {
    execute(handlerInput: HandlerInput, interaction: Interaction) {
        var action: cjs.Action = interaction.system.actions[0]
        if (this.isTellSpeechAction(action)) {
            return handlerInput.responseBuilder
                .speak(action.text)
                .getResponse();
        } else if (this.isAskSpeechAction(action)) {
            return handlerInput.responseBuilder
                .speak(action.question)
                .reprompt(action.reprompt)
                .getResponse();
        }
        throw new Error(`Only supported actions are TellSpeechAction or AskSpeechAction but found ${JSON.stringify(action, null, 2)}`)
    }

    isTellSpeechAction(arg: any): arg is cjs.TellSpeechAction {
        return arg && arg.text
    }

    isAskSpeechAction(arg: any): arg is cjs.AskSpeechAction {
        return arg && arg.question && arg.reprompt
    }
}