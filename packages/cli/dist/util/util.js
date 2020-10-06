"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ora = require("ora");
const cliSpinners = require("cli-spinners");
exports.startSpinner = (text) => {
    return ora({ text: text, spinner: cliSpinners.random }).start();
};
//# sourceMappingURL=util.js.map