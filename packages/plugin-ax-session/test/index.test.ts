import "mocha";

import { expect } from "chai";

import { session } from "../src";

describe("session", () => {
  describe("set", () => {
    it("should set session key value", async () => {
      let b = session.set("hello", "there");

      expect(b.type).equals("CustomBlock");
    });
  });

  describe("end", () => {
    it("should set session end", async () => {
      let b = session.end(true);

      expect(b.type).equals("CompoundBlock");
      expect(b.blocks).not.undefined;
      expect(b.blocks.length).equals(1);
    });
  });
});
