import "mocha";

import { expect } from "chai";

import { buildBanner } from "../../src/util/util";

describe("util", () => {
  describe("buildBanner()", () => {
    it("should build banner", () => {
      let s = buildBanner();
      expect(s).is.not.undefined;
    });
  });
});
