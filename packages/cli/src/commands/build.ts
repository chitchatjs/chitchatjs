import { BaseCommand } from "./base";
import * as yargs from "yargs";
import { AlexaProjectBuilder } from "../builder/AlexaProjectBuilder";
import { BuildConfig } from "../builder/ProjectBuilder";
import { logger, BUILD_CONFIG_FILE_NAME } from "../util/util";
import { BuildConfigReader } from "../components/BuildConfigReader";

/**
 * Builds the project into the artifacts required for the target platform such as alexa or dialogflow.
 */
export class BuildCommand implements BaseCommand {
    buildConfigReader: BuildConfigReader;

    constructor() {
        this.buildConfigReader = new BuildConfigReader();
    }

    initializer(): any {
        return (yargs: yargs.Argv) => {
            // not supporting any options for now.
        };
    }

    executor(): any {
        return (argv: any) => {
            const buildConfig = this.buildConfigReader.read();

            if (buildConfig?.target === "Alexa") {
                let builder = new AlexaProjectBuilder();
                builder.build(buildConfig);
            } else {
                logger.error("Dialogflow is not yet supported");
            }
            process.exit(0);
        };
    }
}
