import {} from '@chitchatjs/core'

import * as Alexa from 'ask-sdk-core'
import { HandlerInput } from 'ask-sdk-core'



// import { IntentHandler } from './handlers/IntentHandler';

// const LaunchRequestHandler = {
//     canHandle(handlerInput: HandlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
//     },
//     handle(handlerInput: HandlerInput) {
//         const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt(speakOutput)
//             .getResponse();
//     }
// };
// const SessionEndedRequestHandler = {
//     canHandle(handlerInput: HandlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
//     },
//     handle(handlerInput: HandlerInput) {
//         // Any cleanup logic goes here.
//         return handlerInput.responseBuilder.getResponse();
//     }
// };

// // defined are included below. The order matters - they're processed top to bottom.
// export const handler = Alexa.SkillBuilders.custom()
//     .addRequestHandlers(
//         LaunchRequestHandler,
//         IntentHandler,
//         // HelloWorldIntentHandler,
//         // HelpIntentHandler,
//         // CancelAndStopIntentHandler,
//         SessionEndedRequestHandler,
//         // IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
//     )
//     .addErrorHandlers(
//         // ErrorHandler,
//     )
//     .lambda();