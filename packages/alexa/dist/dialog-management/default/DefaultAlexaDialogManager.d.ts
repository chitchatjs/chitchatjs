import * as Alexa from "ask-sdk-core";
import * as cjs from "@chitchatjs/core";
import { AlexaDialogManager } from "../AlexaDialogManager";
export declare class DefaultAlexaDialogManager implements AlexaDialogManager {
    dialogSet: cjs.DialogSet;
    constructor(dialogSet: cjs.DialogSet);
    handler(): Alexa.LambdaHandler;
    executor: Alexa.RequestHandler;
}
