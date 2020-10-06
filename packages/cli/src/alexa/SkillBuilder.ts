import { AlexaSkill } from "@chitchatjs/alexa";
import { v1 } from "ask-smapi-model";
import { Trigger, UtteranceTrigger } from "@chitchatjs/core";
import { Interaction } from "@chitchatjs/core";
import { Dialog } from "@chitchatjs/core";
import { DialogSet } from "@chitchatjs/core";
import { isUtteranceTrigger } from "@chitchatjs/core";
import { ErrorMessage, logger } from "../util/util";
import randomstring = require("randomstring");
import { ProjectBootstrapper } from "./ProjectBootstrapper";
import { BuildCommand } from "../commands/build";
import { BuildConfig } from "../builder/ProjectBuilder";
import { ResourceBuilder } from "./ResourceBuilder";
import { FileWriter } from "./FileWriter";
import * as path from "path";
import * as shell from "shelljs";
import { showHelpOnFail } from "yargs";
import fse from "fs-extra";

// export interface SkillProject {
//     skillManifest: v1.skill.Manifest.SkillManifest;
//     interactionModels: {
//         [name: string]: v1.skill.interactionModel.InteractionModelSchema;
//     };
//     askStates: any;
//     askResources: any;
// }

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
    build(skill: AlexaSkill, buildConfig: BuildConfig): void {
        // bootstrap the project first
        new ProjectBootstrapper().bootstrapProject(buildConfig);

        let resBuilder = new ResourceBuilder();
        let im = resBuilder.buildInteractionModel(skill);
        let manifest = resBuilder.buildSkillManifest(skill);

        let fw = new FileWriter();

        let outDir = buildConfig.outDir;
        let currDir = process.cwd();

        let imPath = path.join(
            currDir,
            outDir,
            "/skill-package/interactionModels/custom/en-US.json"
        );
        logger.info(`Writing ${imPath}`);

        fse.ensureFileSync(imPath);
        fw.write(imPath, im);

        let manifestPath = path.join(
            currDir,
            outDir,
            "/skill-package/skill.json"
        );
        // Only copy if it's not existing already,
        // because ask-cli puts the end point information in it
        // after the deployment.
        // Need to figure out a plan for it.
        // TODO
        if (!fw.existsSync(manifestPath)) {
            logger.info(`Writing ${manifestPath}`);
            fw.write(manifestPath, manifest);
        } else {
            logger.info(`Skipped writing manifest as it already exists.`);
        }

        let lambdaPath = path.join(currDir, outDir, "/lambda");
        logger.info(
            `Copying lambda code to the lambda directory: ${lambdaPath}`
        );
        // Only copy package(-lock).json, dist and node_modules dependencies
        shell.cp("-R", ["*.json", "./dist", "./node_modules"], lambdaPath);
        logger.success("Done building.");
    }
}
