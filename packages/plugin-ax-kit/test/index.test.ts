import { expect } from "chai";
import "mocha";
import { axkit } from "../src";

describe("axkit", () => {
  describe("greet", () => {
    describe("about()", () => {
      it("should build about block", async () => {
        let b = axkit.greet.about();
        expect(b.type).equals("LocalizedBlock");
        expect(b.block).not.undefined;
      });
    });

    describe("bye()", () => {
      it("should build bye block", async () => {
        let b = axkit.greet.bye();
        expect(b.type).equals("LocalizedBlock");
        expect(b.block).not.undefined;
      });
    });

    describe("hello()", () => {
      it("should build hello block", async () => {
        let b = axkit.greet.hello();
        expect(b.type).equals("LocalizedBlock");
        expect(b.block).not.undefined;
      });
    });
  });

  describe("builtin", () => {
    describe("help()", () => {
      it("should build help block", async () => {
        let b = axkit.builtin.help("I'm here to help.");
        expect(b).not.undefined;
      });
    });

    describe("stop()", () => {
      it("should build stop block", async () => {
        let b = axkit.builtin.stop();
        expect(b).not.undefined;
      });
    });

    describe("fallback()", () => {
      it("should build fallback block", async () => {
        let b = axkit.builtin.fallback();
        expect(b).not.undefined;
      });
    });

    describe("all()", () => {
      it("should build all block", async () => {
        let b = axkit.builtin.all("I'm here to help.");
        expect(b).not.undefined;
      });
    });
  });
});
