import * as Alexa from "ask-sdk-core";
import { AlexaSkill } from ".";
import { DialogEngine } from "@chitchatjs/core";

/**
 * An Alexa Dialog Manager, that takes an input request and the dialogSet
 * and returns the
 */
export class AlexaDialogManager {
    alexaSkill: AlexaSkill;
    dialogEngine: DialogEngine;

    constructor(alexaSkill: AlexaSkill, dialogEngine: DialogEngine) {
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
            let resEnvelope = this.dialogEngine.execute(this.alexaSkill.conversation, handlerInput.requestEnvelope);
            handlerInput.attributesManager.setSessionAttributes(resEnvelope.sessionAttributes || {});
            return resEnvelope.response;
        },
    };
}
