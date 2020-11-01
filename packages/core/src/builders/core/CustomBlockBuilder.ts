import { Block, BuilderContext, CustomBlock, DialogContext, Event } from "../../models";

export class CustomBlockBuilder<
  B extends BuilderContext,
  D extends DialogContext,
  E extends Event
> {
  private _doBuild?: (
    context: B
  ) => Promise<Block<B, D, E>> | Block<B, D, E> | Promise<void> | void;
  private _doExecute?: (
    context: D,
    event: E
  ) => Promise<Block<B, D, E>> | Block<B, D, E> | Promise<void> | void;

  executor(
    func: (c: D, e: E) => Promise<Block<B, D, E>> | Block<B, D, E> | Promise<void> | void
  ) {
    this._doExecute = func;
    return this;
  }

  builder(
    func: (c: B) => Promise<Block<B, D, E>> | Block<B, D, E> | Promise<void> | void
  ) {
    this._doBuild = func;
    return this;
  }

  build(): CustomBlock<B, D, E> {
    return {
      type: "CustomBlock",
      doBuild: this._doBuild,
      doExecute: this._doExecute,
      execute: this._executor,
      build: this._builder,
    };
  }

  private _executor = async (context: D, event: E) => {
    if (this._doExecute) {
      let b = await this._doExecute(context, event);

      if (b) {
        await b.execute(context, event);
      }
    }
  };

  private _builder = async (context: B) => {
    if (this._doBuild) {
      let b = await this._doBuild(context);

      if (b) {
        await b.build(context);
      }
    }
  };
}
