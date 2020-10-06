import ora = require("ora");
import cliSpinners = require("cli-spinners");
import figlet = require("figlet");
import chalk = require("chalk");
import * as inquirer from "inquirer";

import BottomBar = require("inquirer/lib/ui/bottom-bar");

let ui: BottomBar = new inquirer.ui.BottomBar();

/**
 * Constants
 */
export let DEV_WORKING_DIRECTORY: string = process.cwd();

/**
 * Utility methods
 */

/**
 * Shows a spinner with the text beside it.
 * Currently set to randomize the spinner choice every time user runs it.
 *
 * @param text Text
 */
export let startSpinner = (text: string) => {
    return ora({ text: text, spinner: cliSpinners.random }).start();
};

/**
 * Builds a Figlet banner using ASCII letters.
 *
 * @param text Banner Text
 */
export let buildBanner = (text: string) => {
    return chalk.yellowBright(figlet.textSync(text));
};

/**
 * Logger Utility
 */
export interface Logger {
    info(text: string): void;
    warn(text: string): void;
    error(text: string, error?: Error): void;
    logObject(obj: any): void;
    errorAndExit(text: string): void;
    success(text: string): void;
}

export let logger: Logger = {
    info: (text: string) => {
        ui.log.write(chalk.green("info") + " " + text);
    },
    warn: (text: string) => {
        ui.log.write(chalk.yellow("warn") + " " + text);
    },
    error: (text: string, error?: Error) => {
        ui.log.write(chalk.red(text));
        if (error) ui.log.write(chalk.red(error?.stack));
    },
    logObject: (obj: any) => {
        ui.log.write(JSON.stringify(obj, null, 2));
    },
    errorAndExit: (text: string) => {
        ui.log.write(chalk.red(text));
        process.exit(1);
    },
    success: (text: string) => {
        ui.log.write(chalk.bgGreen(chalk.white(text)));
    },
};

export enum ErrorMessage {
    EMPTY_DIALOG_SET = "DialogSet seems to be empty.",
}
