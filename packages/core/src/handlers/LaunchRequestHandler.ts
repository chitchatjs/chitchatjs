import { HandlerInput } from "ask-sdk-core";
import * as Alexa from 'ask-sdk-core'

const LaunchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

export { LaunchRequestHandler }

[
    "Intent",
    "Invoke",
    "Speech"
]