"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ora = require("ora");
const cliSpinners = require("cli-spinners");
const figlet = require("figlet");
const chalk = require("chalk");
exports.startSpinner = (text) => {
    return ora({ text: text, spinner: cliSpinners.random }).start();
};
exports.buildBanner = (text) => {
    return chalk.yellowBright(figlet.textSync(text));
};
//# sourceMappingURL=util.js.map