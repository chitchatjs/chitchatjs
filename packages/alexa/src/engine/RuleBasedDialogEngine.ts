import { PlatformState } from "@chitchatjs/core";
import { AttributesManagerFactory } from "ask-sdk-core";
import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";
import { AlexaDialogContext, AlexaDialogEngine, AlexaEvent, SkillDefinition } from "../models";

const INITIAL_STATE_NAME: string = "INIT";
const PLATFORM_STATE_NAME: string = "platformState";

/**
 * A rule based dialog engine that executes the conversation states based on the
 * specified conditions and transitions.
 */
export class RuleBasedDialogEngine implements AlexaDialogEngine {
    constructor() {}

    execute(skillDefinition: SkillDefinition, event: AlexaEvent): ResponseEnvelope {
        let context: AlexaDialogContext = this.initContext(event.currentRequest);

        let currentStateName = context.platformState.currentStateName;
        let currentStateBlock = skillDefinition.states[currentStateName].block;
        currentStateBlock.execute && currentStateBlock.execute(context, event);

        context = this.updateContext(context);

        return context.currentResponse;
    }

    private initContext(request: RequestEnvelope): AlexaDialogContext {
        let platformState = this.getPlatformState(request);
        if (!platformState || typeof platformState !== "object") {
            platformState = <PlatformState>{
                currentStateName: INITIAL_STATE_NAME,
                globalState: {},
            };
        } else {
            let s = <PlatformState>{
                currentStateName: (<PlatformState>platformState).currentStateName || INITIAL_STATE_NAME,
                globalState: (<PlatformState>platformState).globalState || {},
            };
            platformState = s;
        }

        return {
            currentResponse: {
                response: {},
                version: "1.0",
            },
            platformState: platformState,
        };
    }

    private updateContext(context: AlexaDialogContext): AlexaDialogContext {
        if (context.currentResponse.sessionAttributes === undefined) {
            context.currentResponse.sessionAttributes = {};
        }
        context.currentResponse.sessionAttributes[PLATFORM_STATE_NAME] = context.platformState;

        return context;
    }

    private getPlatformState(request: RequestEnvelope): PlatformState {
        return AttributesManagerFactory.init({ requestEnvelope: request }).getSessionAttributes()[PLATFORM_STATE_NAME];
    }
}
