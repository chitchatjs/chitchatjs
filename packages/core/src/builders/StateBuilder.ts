import { WhenBlock, Block, State, BuilderContext, DialogContext, Event } from "../models";

/**
 * Builds a state object
 */
export class StateBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _block?: Block<B, D, E>;
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    block(block: Block<B, D, E>) {
        this._block = block;
        return this;
    }

    build(): State<B, D, E> {
        if (this._block === undefined) {
            throw new Error("Block is required in a state.");
        }
        return {
            type: "State",
            name: this._name,
            block: this._block,
        };
    }
}
