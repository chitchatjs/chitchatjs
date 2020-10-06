import { BaseCommand } from "./base";
import * as yargs from "yargs";
import { AlexaProjectBuilder } from "../builder/AlexaProjectBuilder";
import { BuildConfig } from "../builder/ProjectBuilder";
import { logger } from "../util/util";

/**
 * Builds the project into the artifacts required for the target platform such as alexa or dialogflow.
 */
export class BuildCommand implements BaseCommand {
    setOptions(yargs: yargs.Argv): void {
        // not supporting any options for now.
    }

    execute(argv: any): void {
        const buildConfig: BuildConfig = {
            src: "./dist/index.js",
            outDir: "./pkg",
            target: "AlexaSkill",
        };

        if (buildConfig.target === "AlexaSkill") {
            let builder = new AlexaProjectBuilder();
            builder.build(buildConfig);
        } else {
            logger.error("Dialogflow is not yet supported");
        }
        process.exit(0);
    }
}
