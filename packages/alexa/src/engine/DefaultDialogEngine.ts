import { Context, Conversation, Event, DialogEngine, PlatformState } from "@chitchatjs/core";
import { AttributesManagerFactory } from "ask-sdk-core";
import { RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";

const INITIAL_STATE_NAME: string = "INIT";

export class DefaultDialogEngine implements DialogEngine {
    constructor() {}

    execute(conv: Conversation, request: RequestEnvelope): ResponseEnvelope {
        let context: Context = this.initContext(request);

        let event: Event = {
            currentRequest: request,
        };

        let currentStateName = context.platformState.currentStateName;
        conv.states[currentStateName].block.execute(context, event);

        context = this.updateContext(context);

        return context.currentResponse;
    }

    private initContext(request: RequestEnvelope): Context {
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

    private updateContext(context: Context): Context {
        if (context.currentResponse.sessionAttributes === undefined) {
            context.currentResponse.sessionAttributes = {};
        }
        context.currentResponse.sessionAttributes["platformState"] = context.platformState;

        return context;
    }

    private getPlatformState(request: RequestEnvelope): PlatformState {
        return AttributesManagerFactory.init({ requestEnvelope: request }).getSessionAttributes()["platformState"];
    }
}
