import { BuilderContext, AgentDefinition, DialogContext, State, Event } from "../models";

export class AgentDefinitionBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _states: { [name: string]: State<B, D, E> };

    constructor() {
        this._states = {};
    }

    addState(state: State<B, D, E>) {
        this._states[state.name] = state;
        return this;
    }

    build(): AgentDefinition<B, D, E> {
        return {
            type: "AgentDefinition",
            states: this._states,
        };
    }
}
