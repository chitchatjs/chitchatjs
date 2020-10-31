import { LocalizedBlockBuilder } from "../../../src/blocks/builders/LocalizedBlockBuilder";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import {
  AlexaBlock,
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  Locale,
} from "../../../src/models";

let mockBlock: AlexaBlock = {
  build: () => {},
  execute: () => {},
};

describe("LocalizedBlockBuilder", () => {
  it("should throw validation error if block is missing", async () => {
    let err: Error = new Error();
    try {
      let ab = new LocalizedBlockBuilder([Locale.en_US]);
      await ab.build();
    } catch (e) {
      err = e;
    }
    expect(err.message).to.be.equal(
      "LocalizedBlock must not have an undefined block in it."
    );
  });

  it("should successfully build localized block with one block", async () => {
    let l = await new LocalizedBlockBuilder([Locale.en_US]).block(mockBlock).build();

    expect(l).to.not.be.undefined;
    expect(l.block).to.not.be.undefined;
    expect(l.locales).to.not.be.undefined;
    expect(l.locales.length).to.be.equal(1);
    expect(l.locales[0]).equals(Locale.en_US);
  });

  describe("builder context", () => {
    it("should update the builder context and invoke the block.build() when build() is invoked", async () => {
      let builderContext: AlexaBuilderContext = { resources: { resourceMap: {} } };
      let contextInsideBlock: AlexaBuilderContext = { resources: { resourceMap: {} } };
      let blockBuilderInvoked = false;
      let block: AlexaBlock = {
        build: (context: AlexaBuilderContext) => {
          contextInsideBlock = _.cloneDeep(context);
          blockBuilderInvoked = true;
        },
        execute: () => {},
      };

      let lb = new LocalizedBlockBuilder([Locale.en_US]);
      let l = lb.block(block).build();

      await l.build(builderContext);

      expect(builderContext).to.not.be.undefined;
      expect(builderContext.currentLocales).to.not.be.undefined;
      if (builderContext.currentLocales) {
        expect(builderContext.currentLocales.length).to.be.equal(0);
      }

      expect(blockBuilderInvoked).to.be.true;
      expect(contextInsideBlock).to.not.be.undefined;
      if (contextInsideBlock !== undefined) {
        expect(contextInsideBlock.currentLocales).to.not.be.undefined;
        if (contextInsideBlock.currentLocales) {
          expect(contextInsideBlock.currentLocales.length).to.be.equal(1);
          expect(contextInsideBlock.currentLocales[0]).to.be.equal(Locale.en_US);
        }
      }
    });
  });

  describe("dialog cotnext", () => {
    it("should update the dialog context and invoke the block.execute() when execute() is invoked", async () => {
      let dialogContext: AlexaDialogContext = {
        platformState: { globalState: {}, currentStateName: "" },
        currentResponse: JSON.parse("{}"),
      };
      let event: AlexaEvent = JSON.parse("{}");

      let blockExecuteInvoked = false;
      let contextInsideBlock: AlexaDialogContext = {
        platformState: { globalState: {}, currentStateName: "" },
        currentResponse: JSON.parse("{}"),
      };
      let block: AlexaBlock = {
        build: (context: AlexaBuilderContext) => {},
        execute: (context: AlexaDialogContext) => {
          blockExecuteInvoked = true;
          contextInsideBlock = _.cloneDeep(context);
        },
      };

      let lb = new LocalizedBlockBuilder([Locale.en_US]);
      let l = lb.block(block).build();

      await l.execute(dialogContext, event);

      expect(dialogContext).to.not.be.undefined;
      expect(dialogContext.currentLocales).to.not.be.undefined;
      if (dialogContext.currentLocales) {
        expect(dialogContext.currentLocales.length).to.be.equal(0);
      }

      expect(blockExecuteInvoked).to.be.true;
      expect(contextInsideBlock).to.not.be.undefined;
      if (contextInsideBlock !== undefined) {
        expect(contextInsideBlock.currentLocales).to.not.be.undefined;
        if (contextInsideBlock.currentLocales) {
          expect(contextInsideBlock.currentLocales.length).to.be.equal(1);
          expect(contextInsideBlock.currentLocales[0]).to.be.equal(Locale.en_US);
        }
      }
    });
  });
});
