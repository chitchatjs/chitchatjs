"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let interaction1 = {
    user: {
        trigger: {},
    },
    system: {
        actions: [
            {
                question: "Welcome to your first bot, you can ask how I am.",
                reprompt: "You can ask how I am by saying - Hello, how are you?",
            },
        ],
    },
};
let interaction2 = {
    user: {
        trigger: {
            texts: ["Hello how are you"],
        },
    },
    system: {
        actions: [
            {
                text: "I'm good, thank you!",
            },
        ],
    },
};
exports.dialog = { interactions: [interaction1, interaction2] };
//# sourceMappingURL=SimpleDialog.js.map