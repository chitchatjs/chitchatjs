import "mocha";

import { expect } from "chai";

import { common } from "../src";

describe("common", () => {
  describe("defaultHandlers", () => {
    it("should build all block", async () => {
      let b = common.defaultHandlers();
      expect(b.type).equals("CompoundBlock");
      expect(b.blocks).not.undefined;
    });
  });
});
