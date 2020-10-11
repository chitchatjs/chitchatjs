import { BuilderContext, DialogContext, Event, SetGlobalStateBlock } from "../../models";

export class SetGlobalStateBlockBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _evaluate: (context: D, event: E) => { [name: string]: any };

    constructor() {
        // default evalutation - no states set
        this._evaluate = (context: D, event: E) => {
            return {};
        };
    }

    set(f: (context: D, event: E) => { [name: string]: any }) {
        this._evaluate = f;
        return this;
    }

    build(): SetGlobalStateBlock<B, D, E> {
        return {
            type: "SetGlobalStateBlock",
            evaluate: this._evaluate,
            execute: this._executor,
            build: (context: B) => {},
        };
    }

    private _executor = (context: D, event: E) => {
        let vars: { [name: string]: any } = this._evaluate(context, event);
        Object.assign(context.platformState.globalState, vars);
    };
}
