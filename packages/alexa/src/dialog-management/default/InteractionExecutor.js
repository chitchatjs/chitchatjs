"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultInteractionExecutor {
    execute(handlerInput, interaction) {
        var action = interaction.system.actions[0];
        if (this.isTellSpeechAction(action)) {
            return handlerInput.responseBuilder
                .speak(action.text)
                .getResponse();
        }
        else if (this.isAskSpeechAction(action)) {
            return handlerInput.responseBuilder
                .speak(action.question)
                .reprompt(action.reprompt)
                .getResponse();
        }
        throw new Error(`Only supported actions are TellSpeechAction or AskSpeechAction but found ${JSON.stringify(action, null, 2)}`);
    }
    isTellSpeechAction(arg) {
        return arg && arg.text;
    }
    isAskSpeechAction(arg) {
        return arg && arg.question && arg.reprompt;
    }
}
exports.DefaultInteractionExecutor = DefaultInteractionExecutor;
//# sourceMappingURL=InteractionExecutor.js.map