import { AlexaSkill } from "@chitchatjs/alexa";
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
import { InteractionModel, Locale, SkillManifestEnvelope } from "@chitchatjs/core/dist/skill/Artifacts";

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
     */
    buildOld(skill: AlexaSkill, buildConfig: BuildConfig): void {
        // bootstrap the project first
        new ProjectBootstrapper().bootstrapProject(buildConfig);

        let resBuilder = new ResourceBuilder();
        // let im = resBuilder.buildInteractionModel(skill);
        // let manifest = resBuilder.buildSkillManifest(skill);
    }

    build(skill: AlexaSkill, buildConfig: BuildConfig) {
        let states = skill.conversation.states;
        let builderContext: BuilderContext = this.initBuilderContext();

        Object.keys(states).forEach((stateName: string) => {
            states[stateName].block.build(builderContext);
        });

        this.writeContentOnDisk(builderContext, buildConfig);
    }

    writeContentOnDisk(builderContext: BuilderContext, buildConfig: BuildConfig) {
        let fw = new FileWriter();

        let outDir = buildConfig.outDir;
        let currDir = process.cwd();

        // WRITE INTERACTION MODELS
        let imPath = path.join(currDir, outDir, "/skill-package/interactionModels/custom/en-US.json");
        logger.info(`Writing ${imPath}`);
        fse.ensureFileSync(imPath);
        fw.write(imPath, builderContext.package.interactionModels["en-US"]);

        // WRITE MANIFEST
        let manifestPath = path.join(currDir, outDir, "/skill-package/skill.json");
        // Only copy if it's not existing already,
        // because ask-cli puts the end point information in it
        // after the deployment.
        // Need to figure out a plan for it.
        // TODO - optimize merge such that devs can overwrite their endpoint if they want to?
        // Object.assign(manifestOnDisk, inMemoryManifest)
        if (!fw.existsSync(manifestPath)) {
            logger.info(`Writing ${manifestPath}`);
            fw.write(manifestPath, builderContext.package.manifest);
        } else {
            let manifestOnDisk: SkillManifestEnvelope = JSON.parse(fw.read(manifestPath));

            // Keep the endpoint when writing to an existing manifest file.
            let endpoint = manifestOnDisk.manifest?.apis?.custom?.endpoint;
            if (manifestOnDisk.manifest?.apis?.custom !== undefined)
                manifestOnDisk.manifest.apis.custom.endpoint = endpoint;

            fw.write(manifestPath, manifestOnDisk);
            logger.info(`Merged manifest as it already exist.`);
        }

        // WRITE LAMBDA FUNCTION
        let lambdaPath = path.join(currDir, outDir, "/lambda");
        logger.info(`Copying lambda code to the lambda directory: ${lambdaPath}`);
        // Only copy package(-lock).json, dist and node_modules dependencies
        shell.cp("-R", ["*.json", "./dist", "./node_modules"], lambdaPath);
        logger.success("Done building.");
    }

    initBuilderContext(): BuilderContext {
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
        // for (const l in Locale) {
        // const locale: Locale = Locale[l as keyof typeof Locale];
        // interactionModels[l] = im;
        // }

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

        let builderContext: BuilderContext = {
            package: {
                manifest: skillManifest,
                interactionModels: interactionModels,
            },
        };
        return builderContext;
    }
}
