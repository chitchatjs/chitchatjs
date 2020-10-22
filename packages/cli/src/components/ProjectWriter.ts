import * as fs from "fs";
import fse from "fs-extra";
import path from "path";
import * as shell from "shelljs";

import { SkillManifestEnvelope } from "@chitchatjs/alexa";
import { BuilderContext } from "@chitchatjs/core";

import { ProjectConfig } from "../types";
import { prettyJson } from "../util/util";
import { logger } from "./Logger";

export class ProjectWriter {
  writeProject(builderContext: BuilderContext, projectConfig: ProjectConfig) {
    logger.info(`Saving compiled project on disk..`);
    let outDir = projectConfig.outDir;
    let currDir = process.cwd();

    let skillPackageRoot = path.join(currDir, outDir, "/skill-package");
    let resourceMap = builderContext.resources.resourceMap;

    Object.keys(resourceMap).forEach((p: string) => {
      let resourcePath = path.join(skillPackageRoot, p);

      if (p === "/skill.json") {
        this.writeManifest(resourcePath, prettyJson(resourceMap[p]));
      } else {
        logger.info(`Copy ${resourcePath}`);
        // otherwise, simply copy the content.
        fse.ensureFileSync(resourcePath);
        fs.writeFileSync(resourcePath, prettyJson(resourceMap[p]));
      }
    });

    let lambdaPath = path.join(currDir, outDir, "/lambda");
    this.writeLambda(lambdaPath);

    logger.success("Done building.");
  }

  writeManifest(manifestPath: string, manifestStr: string) {
    // if manifest exist, perform selective merge
    if (!fs.existsSync(manifestPath)) {
      logger.info(`Writing ${manifestPath}`);
      fse.ensureFileSync(manifestPath);
      fs.writeFileSync(manifestPath, prettyJson(manifestStr));
      logger.info(`Created ${manifestPath}`);
    } else {
      let manifestOnDisk: SkillManifestEnvelope = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

      let endpointOnDisk = manifestOnDisk.manifest?.apis?.custom?.endpoint;
      let resourceMapManifest: SkillManifestEnvelope = JSON.parse(manifestStr);

      let endpointOnGeneratedResource = resourceMapManifest.manifest!.apis!.custom!.endpoint;
      // if there is no endpoint in the generated resource
      // keep the endpoint from the disk manifest
      if (!endpointOnGeneratedResource) {
        resourceMapManifest.manifest!.apis!.custom!.endpoint = endpointOnDisk;
      }

      fs.writeFileSync(manifestPath, JSON.stringify(resourceMapManifest, null, 2));
      logger.info(`Merged manifest as it already exists.`);
    }
  }

  writeLambda(targetDir: string) {
    logger.info(`Copying lambda code to the lambda directory: ${targetDir}`);

    // Only copy package(-lock).json, dist and node_modules dependencies
    fse.ensureDirSync(targetDir);
    shell.cp("-R", ["*.json", "./dist", "./node_modules"], targetDir);
  }
}
