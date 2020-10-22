import "mocha";

import { expect } from "chai";
import * as sinon from "sinon";

import { GitClient } from "../../src/components/GitClient";

describe("GitClient", () => {
  describe("clone()", () => {
    it("should clone successfully", () => {
      let g = new GitClient();
      let fake = sinon.stub(g, "_exec").callsFake(() => {});

      g.clone("test-url", "test-dir");
      expect(fake.args[0][0]).equals(`git clone test-url test-dir`);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
