import "mocha";

import { expect } from "chai";
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import * as sinon from "sinon";

import { ProjectInitializer } from "../../src/alexa/ProjectInitializer";
import { ProjectConfig } from "../../src/types";

const projectConfig: ProjectConfig = {
  outDir: "/fake",
  target: "Alexa",
};

describe("ProjectInitializer", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("isInitialized()", () => {
    it("should return true", () => {
      let pi = new ProjectInitializer();
      sinon.stub(fs, "existsSync").callsFake(() => {
        return true;
      });

      expect(pi.isInitialized(projectConfig)).to.be.true;
    });
  });

  describe("initialize()", () => {
    it("should initialize project", () => {
      let pi = new ProjectInitializer();
      let mkdir = sinon.stub(fs, "mkdirSync").callsFake(() => {
        return "";
      });
      let ensureDir = sinon.stub(fse, "ensureDirSync").callsFake(() => {});
      let writeFile = sinon.stub(fs, "writeFileSync").callsFake(() => {});

      pi.initialize(projectConfig);

      expect(mkdir.args[0][0]).equals(path.join(process.cwd(), projectConfig.outDir));
      expect(ensureDir.callCount).equals(4);
      expect(writeFile.callCount).equals(2);
    });
  });
});
