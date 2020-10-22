import "mocha";

import { expect } from "chai";
import fs from "fs";
import * as path from "path";
import * as sinon from "sinon";

import { logger } from "../../src/components/Logger";
import { ProjectConfigReader } from "../../src/components/ProjectConfigReader";
import { PROJECT_CONFIG_FILE_NAME } from "../../src/util/constants";

describe("ProjectConfigReader", () => {
  describe("read()", () => {
    it("should read if file is present", () => {
      sinon.restore();
      let fsStub = sinon.stub(fs, "readFileSync").callsFake(() => {
        return "{}";
      });

      let p = new ProjectConfigReader();
      let cfg = p.read();

      expect(fsStub.args[0][0]).equals(path.join(process.cwd(), PROJECT_CONFIG_FILE_NAME));
      expect(fsStub.args[0][1]).equals("utf8");
      expect(JSON.stringify(cfg)).equals("{}");
    });

    it("should log error and exit if file is not present", () => {
      sinon.restore();
      let fsStub = sinon.stub(fs, "readFileSync").callsFake(() => {
        throw new Error("File doesn't exist.");
      });
      let loggerStub = sinon.stub(logger, "error");
      let processStub = sinon.stub(process, "exit");

      let p = new ProjectConfigReader();
      let cfg = p.read();

      expect(fsStub.args[0][0]).equals(path.join(process.cwd(), PROJECT_CONFIG_FILE_NAME));
      expect(fsStub.args[0][1]).equals("utf8");
      expect(loggerStub.args[0][0]).equals(
        "Can't find cjs.json. Are you in the root of the project?"
      );
      expect(processStub.args[0][0]).equals(1);
      expect(cfg).is.undefined;
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
