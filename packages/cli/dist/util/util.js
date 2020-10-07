"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.logger = exports.buildBanner = exports.startSpinner = exports.DEV_WORKING_DIRECTORY = void 0;
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
        ui.log.write(chalk.red(text));
        if (error)
            ui.log.write(chalk.red(error === null || error === void 0 ? void 0 : error.stack));
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