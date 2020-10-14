import { BuilderContext, Agent, DialogContext, State, Event } from "../models";
import * as yup from "yup";

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

    build(): Agent<B, D, E> {
        return this._validate({
            type: "Agent",
            states: this._states,
        });
    }

    private _validate(agent: Agent<B, D, E>) {
        this._agentSchema.validateSync(agent);
        if (Object.keys(agent.states).length === 0) {
            throw new Error("states is a required field");
        }
        return agent;
    }
}
