import { expect } from "chai";
import "mocha";
import { axkit } from "../../src";

describe("axs", () => {
  describe("greet", () => {
    describe("about()", () => {
      it("should build about block", async () => {
        let b = axkit.greet.about();
        expect(b.type).equals("LocalizedBlock");
        expect(b.block).not.undefined;
      });
    });

    describe("bye()", () => {
      it("should build about block", async () => {
        let b = axkit.greet.bye();
        expect(b.type).equals("LocalizedBlock");
        expect(b.block).not.undefined;
      });
    });

    describe("hello()", () => {
      it("should build about block", async () => {
        let b = axkit.greet.hello();
        expect(b.type).equals("LocalizedBlock");
        expect(b.block).not.undefined;
      });
    });
  });
});
