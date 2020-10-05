"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Alexa = __importStar(require("ask-sdk-core"));
class DefaultInteractionMatcher {
    match(handlerInput, dialogSet) {
        let requestType = Alexa.getRequestType(handlerInput.requestEnvelope);
        let interactions = dialogSet.dialogs[0].interactions;
        if (requestType === "LaunchRequest") {
            interactions.forEach((intr) => {
                if (this.isLaunchTrigger(intr.user.trigger)) {
                    return intr;
                }
            });
        }
        else {
            interactions.forEach((intr) => {
                if (this.isUtteranceTrigger(intr.user.trigger)) {
                    return intr;
                }
            });
        }
        throw new Error(`No matching interaction found. Input: ${requestType}, Available Interactions: ${JSON.stringify(interactions, null, 2)}`);
    }
    isLaunchTrigger(arg) {
        return arg && !arg.texts;
    }
    isUtteranceTrigger(arg) {
        return arg && arg.texts;
    }
}
exports.DefaultInteractionMatcher = DefaultInteractionMatcher;
//# sourceMappingURL=InteractionMatcher.js.map