import { Block, State, BuilderContext, DialogContext, Event } from "../models";
import * as yup from "yup";

/**
 * Builds a state object
 */
export class StateBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _block?: Block<B, D, E>;
    private _name: string;
    private _stateSchema = yup.object().shape({
        name: yup.string().required(),
        block: yup
            .object()
            .required()
            .defined(),
    });

    constructor(name: string) {
        this._name = name;
    }

    block(block: Block<B, D, E>) {
        this._block = block;
        return this;
    }

    build(): State<B, D, E> {
        if (this._block === undefined) {
            throw new Error("block is a required field in the state");
        }

        return this._validate({
            type: "State",
            name: this._name,
            block: this._block,
        });
    }

    private _validate(state: State<B, D, E>): State<B, D, E> {
        this._stateSchema.validateSync(state);
        return state;
    }
}
