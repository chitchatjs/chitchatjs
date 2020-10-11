import { Block, Event, DialogContext, WhenBlock, BuilderContext } from "../../models";
// import { WhenUserSaysBlockBuilder } from "./WhenUserSaysBuilder";

export class WhenBlockBuilder {
    private _condition: (context: DialogContext, event: Event) => boolean;
    private _thenBlock?: Block;
    private _otherwiseBlock?: Block;

    constructor() {
        // default condition just to keep typescript happy
        this._condition = (context: DialogContext, event: Event): boolean => {
            return true;
        };
    }

    true(f: (context: DialogContext, event: Event) => boolean) {
        this._condition = f;
        return this;
    }

    then(block: Block) {
        this._thenBlock = block;
        return this;
    }

    otherwise(block: Block) {
        this._otherwiseBlock = block;
        return this;
    }

    build(): WhenBlock {
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
            build: (context: BuilderContext) => {},
        };
    }

    private _executor = (context: DialogContext, event: Event) => {
        if (this._condition(context, event) === true) {
            this._thenBlock?.execute && this._thenBlock?.execute(context, event);
        } else {
            this._otherwiseBlock?.execute && this._otherwiseBlock?.execute(context, event);
        }
    };
}
