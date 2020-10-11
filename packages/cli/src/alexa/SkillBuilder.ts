import { AlexaBuilderContext, AlexaSkill } from "@chitchatjs/alexa";
import { v1 } from "ask-smapi-model";
import { BuilderContext } from "@chitchatjs/core";
// import { Interaction } from "@chitchatjs/core";
// import { Dialog } from "@chitchatjs/core";
// import { DialogSet } from "@chitchatjs/core";
// import { isUtteranceTrigger } from "@chitchatjs/core";
import { ErrorMessage, logger } from "../util/util";
import randomstring = require("randomstring");
import { ProjectBootstrapper } from "./ProjectBootstrapper";
import { BuildConfig } from "../builder/ProjectBuilder";
import { ResourceBuilder } from "./ResourceBuilder";
import { FileWriter } from "./FileWriter";
import * as path from "path";
import * as shell from "shelljs";
import fse from "fs-extra";
import {} from "@chitchatjs/alexa";
import { InteractionModel, SkillManifestEnvelope } from "@chitchatjs/alexa";

// TODO - look into validations
// https://www.npmjs.com/package/typescript-json-validator

/**
 * This assumes that data provided to it is valid.
 * No validations available right now.
 */
export class SkillBuilder {
    /**
     * Builds the skill into its original artifacts
     * @param skill AlexaSkill
     * @param buildConfig BuildConfig
     */
    build(skill: AlexaSkill, buildConfig: BuildConfig) {
        let states = skill.definition.states;
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
                    fw.write(resourcePath, JSON.parse(resourceMap[p]));
                } else {
                    let manifestOnDisk: SkillManifestEnvelope = JSON.parse(fw.read(resourcePath));

                    // Keep the endpoint when writing to an existing manifest file.
                    let endpoint = manifestOnDisk.manifest?.apis?.custom?.endpoint;
                    if (manifestOnDisk.manifest?.apis?.custom !== undefined)
                        manifestOnDisk.manifest.apis.custom.endpoint = endpoint;

                    fw.write(resourcePath, manifestOnDisk);
                    logger.info(`Merged manifest as it already exists.`);
                }
            } else {
                // otherwise, simply copy the content.
                fse.ensureFileSync(resourcePath);
                fw.write(resourcePath, JSON.parse(resourceMap[p]));
            }
        });

        // WRITE LAMBDA FUNCTION
        let lambdaPath = path.join(currDir, outDir, "/lambda");
        logger.info(`Copying lambda code to the lambda directory: ${lambdaPath}`);
        // Only copy package(-lock).json, dist and node_modules dependencies
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
                    invocationName: "sample sample", // TODO FIX ME
                    intents: [
                        {
                            name: "AMAZON.StopIntent",
                            samples: [],
                        },
                        {
                            name: "AMAZON.FallbackIntent",
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
