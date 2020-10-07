import * as Alexa from "ask-sdk-core";

import * as cjs from "@chitchatjs/core";

import { AlexaDialogManager } from "../AlexaDialogManager";
import { DefaultInteractionExecutor } from "./InteractionExecutor";
import { DefaultInteractionMatcher } from "./InteractionMatcher";

/**
 * An Alexa Dialog Manager, that takes an input request and the dialogSet
 * and returns the
 */
export class DefaultAlexaDialogManager implements AlexaDialogManager {
    dialogSet: cjs.DialogSet;

    constructor(dialogSet: cjs.DialogSet) {
        this.dialogSet = dialogSet;
    }

    /**
     * Returns an Alexa Handler
     */
    handler(): Alexa.LambdaHandler {
        return Alexa.SkillBuilders.custom()
            .addRequestHandlers(this.executor)
            .addErrorHandlers().lambda;
    }

    /**
     * Executor to handler the requests
     */
    executor: Alexa.RequestHandler = {
        canHandle: (handlerInput: Alexa.HandlerInput) => {
            return true;
        },
        handle: async (handlerInput: Alexa.HandlerInput) => {
            console.log(this.dialogSet);

            let interaction: cjs.Interaction = new DefaultInteractionMatcher().match(
                handlerInput,
                this.dialogSet
            );
            return new DefaultInteractionExecutor().execute(
                handlerInput,
                interaction
            );
        },
    };
}
