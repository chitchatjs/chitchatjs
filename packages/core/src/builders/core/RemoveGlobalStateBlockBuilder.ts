import { BuilderContext, DialogContext, Event, RemoveGlobalStateBlock } from "../../models";

export class RemoveGlobalStateBlockBuilder {
    private _evaluate: (context: DialogContext, event: Event) => string[];

    constructor() {
        // default impl
        this._evaluate = (context: DialogContext, event: Event) => {
            return [];
        };
    }

    remove(f: (context: DialogContext, event: Event) => string[]) {
        this._evaluate = f;
        return this;
    }

    build(): RemoveGlobalStateBlock {
        return {
            type: "RemoveGlobalStateBlock",
            evaluate: this._evaluate,
            execute: this._executor,
            build: (context: BuilderContext) => {},
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
    private _executor = (context: DialogContext, event: Event) => {
        let varNames = this._evaluate(context, event);
        varNames.forEach((varName: string) => {
            delete context.platformState.globalState[varName];
        });
    };
}
