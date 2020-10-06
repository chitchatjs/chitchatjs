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
exports.DefaultInteractionMatcher = void 0;
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