import {
  AlexaBuilderContext,
  InteractionModel,
  Skill,
  SkillManifestEnvelope,
} from "@chitchatjs/alexa";
import { BuilderContext } from "@chitchatjs/core";
import { BuildConfig } from "../builder/ProjectBuilder";
import { FileWriter } from "./FileWriter";
import { logger } from "../components/Logger";
import path from "path";
import * as shell from "shelljs";
import fse from "fs-extra";
import { ProjectInitializer } from "./ProjectInitializer";

/**
 * Builds the skill using root block's build method.
 */
export class SkillBuilder {
  projectInitializer: ProjectInitializer;

  constructor() {
    this.projectInitializer = new ProjectInitializer();
  }
  /**
   * Builds the skill into its original artifacts
   * @param skill AlexaSkill
   * @param buildConfig BuildConfig
   */
  build(skill: Skill, buildConfig: BuildConfig) {
    if (!this.projectInitializer.isInitialized(buildConfig)) {
      this.projectInitializer.initialize(buildConfig);
    }

    let builderContext: AlexaBuilderContext = this.initBuilderContext();
    logger.debug(`Initialized builder context: ${JSON.stringify(builderContext)}`);

    let states = skill.states;
    Object.keys(states).forEach((stateName: string) => {
      logger.debug(`Compiling state ${stateName}`);
      states[stateName].block.build(builderContext);
    });

    logger.debug(`Final builder context: ${JSON.stringify(builderContext)}`);
    logger.info(`Saving compiled project on disk..`);
    this.writeContentOnDisk(builderContext, buildConfig);
  }

  writeContentOnDisk(builderContext: BuilderContext, buildConfig: BuildConfig) {
    let fw = new FileWriter();

    let outDir = buildConfig.outDir;
    let currDir = process.cwd();

    let skillPackageRoot = path.join(currDir, outDir, "/skill-package");

    let resourceMap = builderContext.resources.resourceMap;

    Object.keys(resourceMap).forEach((p: string) => {
      let resourcePath = path.join(skillPackageRoot, p);

      if (p === "/skill.json") {
        // if manifest, perform selective merge
        if (!fw.existsSync(resourcePath)) {
          logger.info(`Writing ${resourcePath}`);
          fse.ensureFileSync(resourcePath);
          fw.write(resourcePath, JSON.parse(resourceMap[p]));
          logger.info(`Created ${resourcePath}`);
        } else {
          let manifestOnDisk: SkillManifestEnvelope = JSON.parse(fw.read(resourcePath));

          // Keep the endpoint when writing to an existing manifest file.
          let endpoint = manifestOnDisk.manifest?.apis?.custom?.endpoint;
          let resourceMapManifest: SkillManifestEnvelope = JSON.parse(resourceMap[p]) || {};
          // if endpoint on disk manifest is present
          if (endpoint !== undefined) {
            if (
              resourceMapManifest.manifest &&
              resourceMapManifest.manifest.apis &&
              resourceMapManifest.manifest.apis.custom
            ) {
              if (
                !resourceMapManifest.manifest.apis.custom.endpoint ||
                resourceMapManifest.manifest.apis.custom.endpoint === ""
              ) {
                // update end point in the resource manifest only if user didn't supply it themselves
                resourceMapManifest.manifest.apis.custom.endpoint = endpoint;
              }
            }
          }

          fw.write(resourcePath, resourceMapManifest);
          logger.info(`Merged manifest as it already exists.`);
        }
      } else {
        logger.info(`Copy ${resourcePath}`);
        // otherwise, simply copy the content.
        fse.ensureFileSync(resourcePath);
        fw.write(resourcePath, JSON.parse(resourceMap[p]));
      }
    });

    // WRITE LAMBDA FUNCTION
    let lambdaPath = path.join(currDir, outDir, "/lambda");
    logger.info(`Copying lambda code to the lambda directory: ${lambdaPath}`);

    // Only copy package(-lock).json, dist and node_modules dependencies
    fse.ensureDirSync(lambdaPath);
    shell.cp("-R", ["*.json", "./dist", "./node_modules"], lambdaPath);
    logger.success("Done building.");
  }

  initBuilderContext(): AlexaBuilderContext {
    let builderContext: AlexaBuilderContext = {
      resources: {
        resourceMap: {},
      },
    };

    return builderContext;
  }
}
