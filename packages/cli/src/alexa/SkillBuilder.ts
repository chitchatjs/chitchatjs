import { AlexaBuilderContext, Skill } from "@chitchatjs/alexa";
import { BuilderContext } from "@chitchatjs/core";
import { logger } from "../util/util";
import { BuildConfig } from "../builder/ProjectBuilder";
import { FileWriter } from "./FileWriter";
import * as path from "path";
import * as shell from "shelljs";
import fse from "fs-extra";
import {} from "@chitchatjs/alexa";
import { InteractionModel, SkillManifestEnvelope } from "@chitchatjs/alexa";
import { ProjectBootstrapper } from "./ProjectBootstrapper";

/**
 * Builds the skill using root block's build method.
 */
export class SkillBuilder {
  /**
   * Builds the skill into its original artifacts
   * @param skill AlexaSkill
   * @param buildConfig BuildConfig
   */
  build(skill: Skill, buildConfig: BuildConfig) {
    let states = skill.states;
    new ProjectBootstrapper().bootstrapProject(buildConfig);

    let builderContext: AlexaBuilderContext = this.initBuilderContext();

    Object.keys(states).forEach((stateName: string) => {
      states[stateName].block.build(builderContext);
    });

    this.writeContentOnDisk(builderContext, buildConfig);
  }

  writeContentOnDisk(builderContext: BuilderContext, buildConfig: BuildConfig) {
    console.log("Updated Builder Context after builders: " + JSON.stringify(builderContext, null, 2));
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
    /**
     * Interaction Model stuff
     */
    let im: InteractionModel = {
      version: "1.0",
      interactionModel: {
        languageModel: {
          invocationName: "chitchat bot",
          intents: [
            {
              name: "AMAZON.StopIntent",
              samples: [],
            },
            {
              name: "AMAZON.FallbackIntent",
              samples: [],
            },
            {
              name: "AMAZON.CancelIntent",
              samples: [],
            },
            {
              name: "AMAZON.HelpIntent",
              samples: [],
            },
          ],
          types: [],
          modelConfiguration: {
            fallbackIntentSensitivity: {
              level: "LOW",
            },
          },
        },
      },
    };

    let interactionModels: { [name: string]: InteractionModel } = {
      "en-US": im,
    };

    /**
     * Skill manifest stuff
     */
    let skillManifest: SkillManifestEnvelope = {
      manifest: {
        manifestVersion: "1.0",
        apis: {
          custom: {},
        },
        publishingInformation: {
          locales: {
            "en-US": {
              summary: "Sample Short Description",
              examplePhrases: ["Alexa open hello world", "hello", "help"],
              name: "Chitchat Bot",
              description: "Sample Full Description",
            },
          },
          isAvailableWorldwide: true,
          testingInstructions: "Sample Testing Instructions.",
          category: "KNOWLEDGE_AND_TRIVIA",
          distributionCountries: [],
        },
      },
    };

    let builderContext: AlexaBuilderContext = {
      resources: {
        resourceMap: {
          "/skill.json": JSON.stringify(skillManifest),
          "/interactionModels/custom/en-US.json": JSON.stringify(interactionModels["en-US"]),
        },
      },
    };

    console.log("BuilderContext ready: " + JSON.stringify(builderContext, null, 2));
    return builderContext;
  }
}
