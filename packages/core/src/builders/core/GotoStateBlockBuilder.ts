import { BuilderContext, DialogContext, Event, GotoStateBlock, State } from "../../models";

export class GotoStateBlockBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _name: string;
    constructor() {
        this._name = "";
    }

    stateName(name: string) {
        this._name = name;
        return this;
    }

    build(): GotoStateBlock<B, D, E> {
        return {
            type: "GotoStateBlock",
            name: this._name,
            execute: this._executor,
            build: (context: BuilderContext) => {},
        };
    }

    private _executor = (context: D, event: E) => {
        console.log("Setting next state = " + this._name);
        context.platformState.currentStateName = this._name;
    };
}
