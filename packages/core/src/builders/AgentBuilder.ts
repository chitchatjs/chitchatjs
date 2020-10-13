import { BuilderContext, Agent, DialogContext, State, Event } from "../models";

export class AgentBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _states: { [name: string]: State<B, D, E> };

    constructor() {
        this._states = {};
    }

    addState(state: State<B, D, E>) {
        this._states[state.name] = state;
        return this;
    }

    build(): Agent<B, D, E> {
        return {
            type: "Agent",
            states: this._states,
        };
    }
}
