import { Block, BuilderContext, CompoundBlock, DialogContext, Event } from "../../models";

export class CompoundBlockBuilder<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  private _blocks: Block<B, D, E>[];

  constructor() {
    this._blocks = [];
  }

  add(block: Block<B, D, E>) {
    this._blocks.push(block);
    return this;
  }

  build(): CompoundBlock<B, D, E> {
    return {
      type: "CompoundBlock",
      blocks: this._blocks,
      execute: this._executor,
      build: this._builder,
    };
  }

  private _executor = async (context: D, event: E) => {
    for (const block of this._blocks) {
      await block.execute(context, event);
    }
  };

  private _builder = async (context: B) => {
    for (const block of this._blocks) {
      await block.build(context);
    }
  };
}
