import { DialogSet } from "@chitchatjs/core"
import { HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import * as Alexa from 'ask-sdk-core'

/**
 * An Alexa Dialog Manager, that takes an input request and the dialogSet
 * and returns the 
 */
export interface AlexaDialogManager {
    handler(): Alexa.LambdaHandler
}