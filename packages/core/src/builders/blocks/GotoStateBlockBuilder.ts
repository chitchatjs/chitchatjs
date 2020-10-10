import { BuilderContext, Context, Event, GotoStateBlock, State } from "../../models";

export class GotoStateBlockBuilder {
    private _name: string;
    constructor() {
        this._name = "";
    }

    stateName(name: string) {
        this._name = name;
        return this;
    }

    build(): GotoStateBlock {
        return {
            type: "GotoStateBlock",
            name: this._name,
            execute: this._executor,
            build: (context: BuilderContext) => {},
        };
    }

    private _executor = (context: Context, event: Event) => {
        console.log("Setting next state = " + this._name);
        context.platformState.currentStateName = this._name;
    };
}
