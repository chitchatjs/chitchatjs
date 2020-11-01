import { expect } from "chai";
import { ax } from "../../../../alexa/src";

import { CustomBlockBuilder } from "../../../src/builders/core/CustomBlockBuilder";
import { Block, BuilderContext, DialogContext, Event } from "../../../src/models";

const dialogContext: DialogContext = {
  platformState: {
    currentStateName: "",
    globalState: {},
  },
};

const event: Event = {};

const builderContext: BuilderContext = {
  resources: { resourceMap: {} },
};

describe("CustomBlockBuilder", () => {
  it("should return empty block", async () => {
    const db = new CustomBlockBuilder().build();
    db.execute(dialogContext, event);
    db.build(builderContext);

    expect(db).is.not.undefined;
    expect(db.doBuild).is.undefined;
    expect(db.doExecute).is.undefined;
  });

  it("should execute both executor and builder block (sync)", async () => {
    let buildCount = 0;
    let executeCount = 0;
    const mockBlock: Block<BuilderContext, DialogContext, Event> = {
      build: () => {
        buildCount += 1;
      },
      execute: () => {
        executeCount += 1;
      },
    };

    const db = new CustomBlockBuilder()
      .executor((c: DialogContext, e: Event) => {
        return mockBlock;
      })
      .builder((c: BuilderContext) => {
        return mockBlock;
      })
      .build();

    await db.execute(dialogContext, event);
    await db.build(builderContext);

    expect(db).is.not.undefined;
    expect(db.doBuild).is.not.undefined;
    expect(db.doExecute).is.not.undefined;
    expect(buildCount).equals(1);
    expect(executeCount).equals(1);
  });

  it("should execute both executor and builder block (sync) and return block", async () => {
    const db = new CustomBlockBuilder()
      .executor((c: DialogContext, e: Event) => {})
      .builder((c: BuilderContext) => {})
      .build();

    await db.execute(dialogContext, event);
    await db.build(builderContext);

    expect(db).is.not.undefined;
    expect(db.doBuild).is.not.undefined;
    expect(db.doExecute).is.not.undefined;
  });
});
