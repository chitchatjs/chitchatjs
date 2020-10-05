import * as Alexa from 'ask-sdk-core';
export interface AlexaDialogManager {
    handler(): Alexa.LambdaHandler;
}
