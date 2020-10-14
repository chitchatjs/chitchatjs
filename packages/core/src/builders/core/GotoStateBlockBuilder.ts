import { BuilderContext, DialogContext, Event, GotoStateBlock, State } from "../../models";
import * as yup from "yup";

export class GotoStateBlockBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _name: string;
    private _schema = yup.object().shape({
        name: yup.string().required(),
    });

    constructor() {
        this._name = "";
    }

    stateName(name: string) {
        this._name = name;
        return this;
    }

    build(): GotoStateBlock<B, D, E> {
        return this._validate({
            type: "GotoStateBlock",
            name: this._name,
            execute: this._executor,
            build: (context: BuilderContext) => {},
        });
    }

    private _executor = (context: D, event: E) => {
        console.log("Setting next state = " + this._name);
        context.platformState.currentStateName = this._name;
    };

    private _validate(block: GotoStateBlock<B, D, E>) {
        this._schema.validateSync(block);
        return block;
    }
}
