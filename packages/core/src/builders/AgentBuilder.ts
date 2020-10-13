import { BuilderContext, Agent, DialogContext, State, Event } from "../models";
import * as yup from "yup";
import * as lodash from "lodash";

export class AgentBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _states: { [name: string]: State<B, D, E> };
    private _agentSchema = yup.object().shape({
        states: yup.object().required(),
    });

    constructor() {
        this._states = {};
    }

    addState(state: State<B, D, E>) {
        this._states[state.name] = state;
        return this;
    }

    async build(): Promise<Agent<B, D, E>> {
        return await this._validate({
            type: "Agent",
            states: this._states,
        });
    }

    private async _validate(agent: Agent<B, D, E>) {
        await this._agentSchema.validate(agent);
        if (Object.keys(agent.states).length === 0) {
            throw new Error("states is a required field");
        }
        return agent;
    }
}
