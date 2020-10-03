"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const Alexa = require("ask-sdk-core");
const IntentHandler_1 = require("./handlers/IntentHandler");
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(LaunchRequestHandler, IntentHandler_1.IntentHandler, SessionEndedRequestHandler)
    .addErrorHandlers()
    .lambda();
//# sourceMappingURL=index.js.map