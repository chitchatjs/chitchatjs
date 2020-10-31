import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  Locale,
  AlexaBlock,
  LocalizedBlock,
} from "../../models";

/**
 * Localization block. All artifacts within this block are created for the input locale.
 */
export class LocalizedBlockBuilder {
  private _locales: Locale[];
  private _block?: AlexaBlock;

  constructor(locales: Locale[]) {
    this._locales = locales;
  }

  block(block: AlexaBlock) {
    this._block = block;
    return this;
  }

  build(): LocalizedBlock {
    if (this._block === undefined) {
      throw new Error("LocalizedBlock must not have an undefined block in it.");
    }

    return {
      type: "LocalizedBlock",
      block: this._block,
      locales: this._locales,
      execute: this._executor,
      build: this._builder,
    };
  }

  private _executor = async (context: AlexaDialogContext, event: AlexaEvent) => {
    context.currentLocales = this._locales;
    await this._block?.execute(context, event);
    context.currentLocales = [];
  };

  private _builder = async (context: AlexaBuilderContext) => {
    context.currentLocales = this._locales;
    await this._block?.build(context);
    context.currentLocales = [];
  };
}
