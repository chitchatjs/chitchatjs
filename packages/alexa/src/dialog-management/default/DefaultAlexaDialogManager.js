"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Alexa = __importStar(require("ask-sdk-core"));
const InteractionExecutor_1 = require("./InteractionExecutor");
const InteractionMatcher_1 = require("./InteractionMatcher");
class DefaultAlexaDialogManager {
    constructor(dialogSet) {
        this.executor = {
            canHandle: (handlerInput) => {
                return true;
            },
            handle: (handlerInput) => __awaiter(this, void 0, void 0, function* () {
                console.log(this.dialogSet);
                let interaction = new InteractionMatcher_1.DefaultInteractionMatcher().match(handlerInput, this.dialogSet);
                return new InteractionExecutor_1.DefaultInteractionExecutor().execute(handlerInput, interaction);
            })
        };
        this.dialogSet = dialogSet;
    }
    handler() {
        return Alexa.SkillBuilders.custom().addRequestHandlers(this.executor).addErrorHandlers().lambda();
    }
}
exports.DefaultAlexaDialogManager = DefaultAlexaDialogManager;
//# sourceMappingURL=DefaultAlexaDialogManager.js.map