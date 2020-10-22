// import {} from "mock-fs";
import mockfs = require("mock-fs");
import "mocha";

import { expect } from "chai";
import fs from "fs";
import * as path from "path";
import * as sinon from "sinon";

import { ConfigInitializer } from "../../src/components/ConfigInitializer";
import { CLI_CONFIG_FILE_NAME, DEFAULT_CLI_CONFIG } from "../../src/util/constants";

const CLI_CONFIG_DIR_TEST = "/mock-dir";
const CLI_CONFIG_FILE_PATH_TEST = path.join(CLI_CONFIG_DIR_TEST, CLI_CONFIG_FILE_NAME);

describe("ConfigInitializer", () => {
  beforeEach(() => {
    sinon.stub(fs, "existsSync").callsFake((p: fs.PathLike) => {
      return false;
    });
  });

  describe("exists()", () => {
    it("should return true when config is present", () => {
      sinon.restore();
      sinon.stub(fs, "existsSync").callsFake((p: fs.PathLike) => {
        return true;
      });

      let ci = new ConfigInitializer();
      expect(ci.exists(CLI_CONFIG_DIR_TEST)).is.true;
    });

    it("should return false when config is not present", () => {
      let ci = new ConfigInitializer();
      expect(ci.exists(CLI_CONFIG_DIR_TEST)).is.false;
    });
  });

  describe("create()", () => {
    it("should create config", () => {
      let mkdirStub = sinon.stub(fs, "mkdirSync");
      let writeFileSyncStub = sinon.stub(fs, "writeFileSync");

      let ci = new ConfigInitializer();
      ci.create(CLI_CONFIG_DIR_TEST);

      expect(mkdirStub.args[0][0]).equals(CLI_CONFIG_DIR_TEST);
      expect(writeFileSyncStub.args[0][0]).equals(CLI_CONFIG_FILE_PATH_TEST);
      expect(writeFileSyncStub.args[0][1]).equals(JSON.stringify(DEFAULT_CLI_CONFIG, null, 2));
      expect(writeFileSyncStub.args[0][2]).equals("utf8");
    });
  });

  describe("init()", () => {
    it("should create and initialize config if it doesn't exist", () => {
      let ci = new ConfigInitializer();
      sinon.restore();
      let existsStub = sinon.stub(ci, "exists").callsFake(() => {
        return false;
      });
      let createStub = sinon.stub(ci, "create").callsFake(() => {});
      let readFileStub = sinon.stub(fs, "readFileSync").callsFake(() => {
        return "{}";
      });

      let out = ci.init(CLI_CONFIG_DIR_TEST);

      expect(existsStub.args[0][0]).equals(CLI_CONFIG_DIR_TEST);
      expect(createStub.args[0][0]).equals(CLI_CONFIG_DIR_TEST);
      expect(readFileStub.args[0][0]).equals(CLI_CONFIG_FILE_PATH_TEST);
      expect(readFileStub.args[0][1]).equals("utf8");
      expect(JSON.stringify(out)).equals(JSON.stringify(DEFAULT_CLI_CONFIG));
    });

    it("should not create but initialize config if it exist", () => {
      let ci = new ConfigInitializer();
      sinon.restore();
      let existsStub = sinon.stub(ci, "exists").callsFake(() => {
        return true;
      });
      let createStub = sinon.stub(ci, "create").callsFake(() => {});
      let readFileStub = sinon.stub(fs, "readFileSync").callsFake(() => {
        return "{}";
      });

      let out = ci.init(CLI_CONFIG_DIR_TEST);

      expect(existsStub.args[0][0]).equals(CLI_CONFIG_DIR_TEST);
      expect(createStub.notCalled).is.true;
      expect(readFileStub.args[0][0]).equals(CLI_CONFIG_FILE_PATH_TEST);
      expect(readFileStub.args[0][1]).equals("utf8");
      expect(JSON.stringify(out)).equals(JSON.stringify(DEFAULT_CLI_CONFIG));
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
