"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchRequestHandler = void 0;
const Alexa = require("ask-sdk-core");
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
exports.LaunchRequestHandler = LaunchRequestHandler;
[
    "Intent",
    "Invoke",
    "Speech"
];
//# sourceMappingURL=LaunchRequestHandler.js.map