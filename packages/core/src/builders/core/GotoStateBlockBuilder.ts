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

    async build(): Promise<GotoStateBlock<B, D, E>> {
        return await this._validate({
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

    private async _validate(block: GotoStateBlock<B, D, E>) {
        await this._schema.validate(block);
        return block;
    }
}
