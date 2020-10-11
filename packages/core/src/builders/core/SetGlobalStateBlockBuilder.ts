import { BuilderContext, DialogContext, Event, SetGlobalStateBlock } from "../../models";

export class SetGlobalStateBlockBuilder {
    private _evaluate: (context: DialogContext, event: Event) => { [name: string]: any };

    constructor() {
        // default evalutation - no states set
        this._evaluate = (context: DialogContext, event: Event) => {
            return {};
        };
    }

    set(f: (context: DialogContext, event: Event) => { [name: string]: any }) {
        this._evaluate = f;
        return this;
    }

    build(): SetGlobalStateBlock {
        return {
            type: "SetGlobalStateBlock",
            evaluate: this._evaluate,
            execute: this._executor,
            build: (context: BuilderContext) => {},
        };
    }

    private _executor = (context: DialogContext, event: Event) => {
        let vars: { [name: string]: any } = this._evaluate(context, event);
        Object.assign(context.platformState.globalState, vars);
    };
}
