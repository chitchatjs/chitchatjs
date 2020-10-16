import { listEquals } from "../../src/util/StringUtils";
import { expect } from "chai";
import "mocha";

describe("StringUtils", () => {
  describe("listEquals", () => {
    it("should return true if lists equal", async () => {
      expect(listEquals([], [])).to.be.true;
      expect(listEquals(["a"], ["a"])).to.be.true;
      expect(listEquals(["a", "b"], ["a", "b"])).to.be.true;
      expect(listEquals(["a", "c {e}"], ["a", "c {e}"])).to.be.true;
    });

    it("should return true if lists equal by reference", async () => {
      let a: string[] = [];
      let b: string[] = [];
      expect(listEquals(a, b)).to.be.true;
      (a = ["a"]), (b = ["a"]);
      expect(listEquals(a, b)).to.be.true;
    });

    it("should return false if lists not equal", async () => {
      expect(listEquals(["a"], ["b"])).to.be.false;
      expect(listEquals(["a", "x"], ["x", "b"])).to.be.false;
      expect(listEquals(["a", "c {p}"], ["a", "c {e}"])).to.be.false;
    });

    it("should return false if lists not equal by reference", async () => {
      let a: string[] = [];
      let b: string[] = ["a"];
      expect(listEquals(a, b)).to.be.false;
    });
  });
});
