import { HandlerInput } from "ask-sdk-core";
import * as Alexa from 'ask-sdk-core'
import { Context } from '../Context'
import { IntentRequest, Slot } from "ask-sdk-model";
import gallanOptions from "../cjs.json"
import { Talk } from "../Talk";
import { Action, IntentAction, InvokeAction, TextSpeechAction } from "../Actions";

export const IntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
        // && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    async handle(handlerInput: HandlerInput) {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

        /** Bootstrap session attributes if not present */
        if (!sessionAttributes.context) sessionAttributes.context = {
            slots: {} as Map<string, Slot>,
            stateVariables: {} as Map<string, any>,
            currentStateId: "",
            stateHistory: []
        } as Context;

        let context: Context = sessionAttributes.context

        const chatbot = await import(gallanOptions.src)
        const talk: Talk = chatbot.talk

        let speech: string = execute(talk, handlerInput, context)
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speech)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

function execute(talk: Talk, handlerInput: HandlerInput, context: Context) {
    // let actions: Action[] = talk.turns || []
    // actions.forEach((action: Action) => {

    // })

    let intentName = Alexa.getIntentName(handlerInput.requestEnvelope);

    // TODO hard coded handling for now
    let intentAction: IntentAction = talk.turns[0] as IntentAction
    if (intentAction.name == intentName) {

        let intentRequest = handlerInput.requestEnvelope.request as IntentRequest
        // let slots = intentRequest.intent.slots || {}
        // if(Object.keys(slots).length != 0) {}

        let invokeAction = talk.turns[1] as InvokeAction
        let output = invokeAction.call(context) as Map<string, any>
        context.stateVariables.set("name", "kevindra")


        let textSpeechAction = talk.turns[2] as TextSpeechAction
        let speech: string = textSpeechAction.text.replace('{name}', context.stateVariables.get('name'))
        return speech
    }
    return ""
}