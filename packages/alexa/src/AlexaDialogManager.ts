import * as Alexa from "ask-sdk-core";
import { AlexaSkill } from ".";
import { AlexaDialogEngine, AlexaEvent } from "./models";

/**
 * An Alexa Dialog Manager, that takes an input request and the dialogSet
 * and returns the
 */
export class AlexaDialogManager {
    alexaSkill: AlexaSkill;
    dialogEngine: AlexaDialogEngine;

    constructor(alexaSkill: AlexaSkill, dialogEngine: AlexaDialogEngine) {
        this.alexaSkill = alexaSkill;
        this.dialogEngine = dialogEngine;
    }

    /**
     * Returns an Alexa Handler
     */
    handler(): Alexa.LambdaHandler {
        return Alexa.SkillBuilders.custom().addRequestHandlers(this.executor).addErrorHandlers().lambda();
    }

    /**
     * Executor to handler the requests
     */
    executor: Alexa.RequestHandler = {
        canHandle: (handlerInput: Alexa.HandlerInput) => {
            return true;
        },
        handle: async (handlerInput: Alexa.HandlerInput) => {
            console.log("Handling request: " + Alexa.getRequestType(handlerInput.requestEnvelope));

            let event: AlexaEvent = {
                currentRequest: handlerInput.requestEnvelope,
            };
            let resEnvelope = this.dialogEngine.execute(this.alexaSkill.skillDefinition, event);
            handlerInput.attributesManager.setSessionAttributes(resEnvelope.sessionAttributes || {});
            return resEnvelope.response;
        },
    };
}
