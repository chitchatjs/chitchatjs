"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alexa_1 = require("@chitchatjs/alexa");
let interaction1 = {
    user: {
        trigger: {}
    },
    system: {
        actions: [
            {
                question: "Welcome to your first bot, you can ask how I am.",
                reprompt: "You can ask how I am by saying - Hello, how are you?"
            }
        ]
    }
};
let interaction2 = {
    user: {
        trigger: {
            texts: ["Hello, how are you"]
        }
    },
    system: {
        actions: [
            {
                text: "I'm good, thank you!"
            }
        ]
    }
};
let dialogSet = {
    dialogs: [{
            interactions: [interaction1, interaction2]
        }],
};
exports.default = new alexa_1.AlexaSkill(dialogSet, new alexa_1.DefaultAlexaDialogManager(dialogSet)).handler();
//# sourceMappingURL=bot.js.map