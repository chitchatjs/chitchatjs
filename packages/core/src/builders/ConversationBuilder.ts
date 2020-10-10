import { Conversation, State } from "../models";

export class ConversationBuilder {
    private _states: { [name: string]: State };

    constructor() {
        this._states = {};
    }

    addState(state: State) {
        this._states[state.name] = state;
        return this;
    }

    build(): Conversation {
        return {
            type: "Conversation",
            states: this._states,
        };
    }
}
