import { BuilderContext, DialogContext, Event, RemoveGlobalStateBlock } from "../../models";

export class RemoveGlobalStateBlockBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _evaluate: (context: D, event: E) => string[];

    constructor() {
        // default impl
        this._evaluate = (context: D, event: E) => {
            return [];
        };
    }

    remove(f: (context: D, event: E) => string[]) {
        this._evaluate = f;
        return this;
    }

    build(): RemoveGlobalStateBlock<B, D, E> {
        return {
            type: "RemoveGlobalStateBlock",
            evaluate: this._evaluate,
            execute: this._executor,
            build: (context: B) => {},
        };
    }

    /**
     * Important!! this.xxx becomes undefined if following syntax is used to declare methods.
     * private _executor(..) {}
     * instead of:
     * private _executor(..) => {}
     *
     * @param context
     * @param event
     */
    private _executor = (context: D, event: E) => {
        let varNames = this._evaluate(context, event);
        varNames.forEach((varName: string) => {
            delete context.platformState.globalState[varName];
        });
    };
}
