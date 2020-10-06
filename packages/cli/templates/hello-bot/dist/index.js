"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alexa_1 = require("@chitchatjs/alexa");
const SimpleDialog_1 = require("./SimpleDialog");
const StopDialog_1 = require("./StopDialog");
const FallbackDialog_1 = require("./FallbackDialog");
let dialogSet = {
    dialogs: [SimpleDialog_1.dialog, StopDialog_1.dialog, FallbackDialog_1.dialog],
};
let skill = new alexa_1.AlexaSkill(new alexa_1.DefaultAlexaDialogManager(dialogSet), dialogSet);
exports.default = skill;
exports.handler = skill.handler;
//# sourceMappingURL=index.js.map