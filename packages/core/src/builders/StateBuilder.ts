import { WhenBlock, Block, State } from "../models";

/**
 * Builds a state object
 */
export class StateBuilder {
    private _block?: Block;
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    block(block: Block) {
        this._block = block;
        return this;
    }

    build(): State {
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
