import "mocha";

import { expect } from "chai";
import fs from "fs";
import fse from "fs-extra";
import * as _ from "lodash";
import path from "path";
import shell from "shelljs";
import * as sinon from "sinon";

import { BuilderContext } from "@chitchatjs/core";

import { ProjectWriter } from "../../src/components/ProjectWriter";
import { ProjectConfig } from "../../src/types";
import { INITIAL_SKILL_MANIFEST, prettyJson } from "../../src/util/util";

const projectConfig: ProjectConfig = {
  outDir: "/fake",
  target: "Alexa",
};

describe("ProjectWriter", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("writeProject()", () => {
    it("should write project when manifest doesn't exist on disk", () => {
      let f = new ProjectWriter();
      let fseEnsureFileSync = sinon.stub(fse, "ensureFileSync").callsFake(() => {});
      let fseEnsureDirSync = sinon.stub(fse, "ensureDirSync").callsFake(() => {});
      let fsExistsSync = sinon.stub(fs, "existsSync").callsFake(() => {
        return false;
      });
      let fsWriteFileSync = sinon.stub(fs, "writeFileSync").callsFake(() => {});
      let shellStub = sinon.stub(shell, "cp").callsFake(() => {
        return JSON.parse("{}");
      });
      let readDirSync = sinon.stub(fs, "readdirSync").callsFake(() => {
        return [];
      });

      f.writeProject(builderContext(), projectConfig);

      let outRoot = path.join(process.cwd(), projectConfig.outDir);
      let manifestPath = path.join(outRoot, "/skill-package", "/skill.json");
      let randomResourcePath = path.join(outRoot, "/skill-package", "/random.json");
      expect(fseEnsureFileSync.callCount).equals(2);
      expect(fseEnsureFileSync.args[0][0]).equals(manifestPath);
      expect(fseEnsureFileSync.args[1][0]).equals(randomResourcePath);

      expect(fsExistsSync.callCount).equals(1);
      expect(fsWriteFileSync.callCount).equals(2);
      expect(fsWriteFileSync.args[0][0]).equals(manifestPath);
      expect(fsWriteFileSync.args[1][0]).equals(randomResourcePath);
      expect(fsWriteFileSync.args[0][1]).equals(
        builderContext().resources.resourceMap["/skill.json"]
      );

      let lambdaRoot = path.join(outRoot, "/lambda");
      expect(fseEnsureDirSync.callCount).equals(1);
      expect(fseEnsureDirSync.args[0][0]).equals(lambdaRoot);

      expect(shellStub.callCount).equals(1);
      expect(JSON.stringify(shellStub.args[0])).equals(
        JSON.stringify(["-R", ["*.json", "./dist", "./node_modules"], lambdaRoot])
      );
      expect(readDirSync.callCount).equals(2);
    });

    it("should write project when manifest doesn't exist on disk but input manifest doesn't have endpoint", () => {
      let f = new ProjectWriter();
      let fseEnsureFileSync = sinon.stub(fse, "ensureFileSync").callsFake(() => {});
      let fseEnsureDirSync = sinon.stub(fse, "ensureDirSync").callsFake(() => {});
      let fsExistsSync = sinon.stub(fs, "existsSync").callsFake(() => {
        return true;
      });
      let fsWriteFileSync = sinon.stub(fs, "writeFileSync").callsFake(() => {});
      let shellStub = sinon.stub(shell, "cp").callsFake(() => {
        return JSON.parse("{}");
      });
      let readDirSync = sinon.stub(fs, "readdirSync").callsFake(() => {
        return [];
      });

      let existingManifest = _.cloneDeep(INITIAL_SKILL_MANIFEST);

      if (
        existingManifest.manifest &&
        existingManifest.manifest.apis &&
        existingManifest.manifest.apis.custom
      ) {
        existingManifest.manifest.apis.custom.endpoint = {};
        existingManifest.manifest.apis.custom.endpoint.uri = "custom-endpoint";
      }

      let fsReadFileSync = sinon.stub(fs, "readFileSync").callsFake(() => {
        return JSON.stringify(existingManifest);
      });

      f.writeProject(builderContext(), projectConfig);

      let outRoot = path.join(process.cwd(), projectConfig.outDir);
      let manifestPath = path.join(outRoot, "/skill-package", "/skill.json");
      let randomResourcePath = path.join(outRoot, "/skill-package", "/random.json");
      // doesn't create the blank manifest file on disk
      expect(fseEnsureFileSync.callCount).equals(1);
      expect(fseEnsureFileSync.args[0][0]).equals(randomResourcePath);

      expect(fsReadFileSync.callCount).equals(1);

      expect(fsExistsSync.callCount).equals(1);
      expect(fsWriteFileSync.callCount).equals(2);
      expect(fsWriteFileSync.args[0][0]).equals(manifestPath);
      expect(fsWriteFileSync.args[1][0]).equals(randomResourcePath);
      expect(fsWriteFileSync.args[0][1]).equals(
        prettyJson(
          '{"manifest":{"manifestVersion":"1.0","apis":{"custom":{"endpoint":{"uri":"custom-endpoint"}}}}}'
        )
      ); // input manifest doesn't have endpoint

      let lambdaRoot = path.join(outRoot, "/lambda");
      expect(fseEnsureDirSync.callCount).equals(1);
      expect(fseEnsureDirSync.args[0][0]).equals(lambdaRoot);

      expect(shellStub.callCount).equals(1);
      expect(JSON.stringify(shellStub.args[0])).equals(
        JSON.stringify(["-R", ["*.json", "./dist", "./node_modules"], lambdaRoot])
      );
      expect(readDirSync.callCount).equals(2);
    });

    it("should write project when manifest doesn't exist on disk but input manifest does have endpoint", () => {
      let f = new ProjectWriter();
      let fseEnsureFileSync = sinon.stub(fse, "ensureFileSync").callsFake(() => {});
      let fseEnsureDirSync = sinon.stub(fse, "ensureDirSync").callsFake(() => {});
      let fsExistsSync = sinon.stub(fs, "existsSync").callsFake(() => {
        return true;
      });
      let fsWriteFileSync = sinon.stub(fs, "writeFileSync").callsFake(() => {});
      let shellStub = sinon.stub(shell, "cp").callsFake(() => {
        return JSON.parse("{}");
      });
      let readDirSync = sinon.stub(fs, "readdirSync").callsFake(() => {
        return [];
      });

      let existingManifest = _.cloneDeep(INITIAL_SKILL_MANIFEST);
      if (
        existingManifest.manifest &&
        existingManifest.manifest.apis &&
        existingManifest.manifest.apis.custom &&
        existingManifest.manifest.apis.custom.endpoint
      ) {
        existingManifest.manifest.apis.custom.endpoint = {};
        existingManifest.manifest.apis.custom.endpoint.uri = "custom-endpoint";
      }

      let fsReadFileSync = sinon.stub(fs, "readFileSync").callsFake(() => {
        return JSON.stringify(existingManifest);
      });

      f.writeProject(builderContextWithManifestEndpoint(), projectConfig);

      let outRoot = path.join(process.cwd(), projectConfig.outDir);
      let manifestPath = path.join(outRoot, "/skill-package", "/skill.json");
      // doesn't create the blank manifest file on disk
      expect(fseEnsureFileSync.callCount).equals(0);

      expect(fsExistsSync.callCount).equals(1);
      expect(fsWriteFileSync.callCount).equals(1);
      expect(fsWriteFileSync.args[0][0]).equals(manifestPath);
      expect(fsWriteFileSync.args[0][1]).equals(
        builderContextWithManifestEndpoint().resources.resourceMap["/skill.json"]
      ); // input manifest doesn't have endpoint

      let lambdaRoot = path.join(outRoot, "/lambda");
      expect(fseEnsureDirSync.callCount).equals(1);
      expect(fseEnsureDirSync.args[0][0]).equals(lambdaRoot);

      expect(shellStub.callCount).equals(1);
      expect(JSON.stringify(shellStub.args[0])).equals(
        JSON.stringify(["-R", ["*.json", "./dist", "./node_modules"], lambdaRoot])
      );
      expect(readDirSync.callCount).equals(2);
    });
  });
});

function builderContext() {
  let manifestEnv = _.cloneDeep(INITIAL_SKILL_MANIFEST);

  if (manifestEnv.manifest && manifestEnv.manifest.publishingInformation) {
    manifestEnv.manifest.publishingInformation.description = "Description";
  }

  return <BuilderContext>{
    resources: {
      resourceMap: {
        "/skill.json": JSON.stringify(manifestEnv, null, 2),
        "/random.json": "{}",
      },
    },
  };
}

function builderContextWithManifestEndpoint() {
  let manifestEnv = _.cloneDeep(INITIAL_SKILL_MANIFEST);

  if (
    manifestEnv.manifest &&
    manifestEnv.manifest.apis &&
    manifestEnv.manifest.apis.custom &&
    manifestEnv.manifest.apis.custom.endpoint
  ) {
    manifestEnv.manifest.apis.custom.endpoint = {};
    manifestEnv.manifest.apis.custom.endpoint.uri = "my-uri";
  }

  return <BuilderContext>{
    resources: {
      resourceMap: {
        "/skill.json": JSON.stringify(manifestEnv, null, 2),
      },
    },
  };
}
