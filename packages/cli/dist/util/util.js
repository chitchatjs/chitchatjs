"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora = require("ora");
const cliSpinners = require("cli-spinners");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = __importStar(require("inquirer"));
let ui = new inquirer.ui.BottomBar();
exports.DEV_WORKING_DIRECTORY = process.cwd();
exports.startSpinner = (text) => {
    return ora({ text: text, spinner: cliSpinners.random }).start();
};
exports.buildBanner = (text) => {
    return chalk.yellowBright(figlet.textSync(text));
};
exports.logger = {
    info: (text) => {
        ui.log.write(chalk.green("info") + " " + text);
    },
    warn: (text) => {
        ui.log.write(chalk.yellow("warn") + " " + text);
    },
    error: (text, error) => {
        var _a;
        ui.log.write(chalk.red(text));
        if (error)
            ui.log.write(chalk.red((_a = error) === null || _a === void 0 ? void 0 : _a.stack));
    },
    logObject: (obj) => {
        ui.log.write(JSON.stringify(obj, null, 2));
    },
    errorAndExit: (text) => {
        ui.log.write(chalk.red(text));
        process.exit(1);
    },
    success: (text) => {
        ui.log.write(chalk.bgGreen(chalk.white(text)));
    },
};
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["EMPTY_DIALOG_SET"] = "DialogSet seems to be empty.";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
//# sourceMappingURL=util.js.map