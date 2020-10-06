"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alexa_1 = require("@chitchatjs/alexa");
const SimpleDialog_1 = require("./SimpleDialog");
let dialogSet = {
    dialogs: [SimpleDialog_1.dialog],
};
exports.default = new alexa_1.AlexaSkill(new alexa_1.DefaultAlexaDialogManager(dialogSet), dialogSet);
//# sourceMappingURL=index.js.map