import { BaseCommand } from "./base";
import * as yargs from "yargs";
import { AlexaProjectBuilder } from "../builder/AlexaProjectBuilder";
import { BuildConfig } from "../builder/ProjectBuilder";
import { logger } from "../util/util";
import * as shell from "shelljs";
import { BuildConfigReader } from "../components/BuildConfigReader";

/**
 * Deploys the project to Alexa/Dialogflow.
 */
export class DeployCommand implements BaseCommand {
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
            let buildConfig = this.buildConfigReader.read();

            shell.cd(buildConfig?.outDir);
            shell.exec("ask deploy");
            shell.cd("..");
            process.exit(0);
        };
    }
}
