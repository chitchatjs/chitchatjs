import { Block, Event, DialogContext, WhenBlock, BuilderContext } from "../../models";
// import { WhenUserSaysBlockBuilder } from "./WhenUserSaysBuilder";

export class WhenBlockBuilder<B extends BuilderContext, D extends DialogContext, E extends Event> {
    private _condition: (context: D, event: E) => boolean;
    private _thenBlock?: Block<B, D, E>;
    private _otherwiseBlock?: Block<B, D, E>;

    constructor() {
        // default condition just to keep typescript happy
        this._condition = (context: D, event: E): boolean => {
            return true;
        };
    }

    true(f: (context: D, event: E) => boolean) {
        this._condition = f;
        return this;
    }

    then(block: Block<B, D, E>) {
        this._thenBlock = block;
        return this;
    }

    otherwise(block: Block<B, D, E>) {
        this._otherwiseBlock = block;
        return this;
    }

    build(): WhenBlock<B, D, E> {
        if (this._condition === undefined) {
            throw new Error("When block is missing the condition.");
        }

        if (this._thenBlock === undefined) {
            throw new Error("Then block is missing in the when().then(..).");
        }

        return {
            type: "WhenBlock",
            condition: this._condition,
            then: this._thenBlock,
            otherwise: this._otherwiseBlock,
            execute: this._executor,
            build: (context: B) => {},
        };
    }

    private _executor = (context: D, event: E) => {
        if (this._condition(context, event) === true) {
            this._thenBlock?.execute && this._thenBlock?.execute(context, event);
        } else {
            this._otherwiseBlock?.execute && this._otherwiseBlock?.execute(context, event);
        }
    };
}