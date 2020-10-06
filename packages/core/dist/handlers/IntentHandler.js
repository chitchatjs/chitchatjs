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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Alexa = __importStar(require("ask-sdk-core"));
const cjs_json_1 = __importDefault(require("../cjs.json"));
exports.IntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            if (!sessionAttributes.context)
                sessionAttributes.context = {
                    slots: {},
                    stateVariables: {},
                    currentStateId: "",
                    stateHistory: []
                };
            let context = sessionAttributes.context;
            const chatbot = yield Promise.resolve().then(() => __importStar(require(cjs_json_1.default.src)));
            const talk = chatbot.talk;
            let speech = execute(talk, handlerInput, context);
            const speakOutput = 'Hello World!';
            return handlerInput.responseBuilder
                .speak(speech)
                .getResponse();
        });
    }
};
function execute(talk, handlerInput, context) {
    let intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    let intentAction = talk.turns[0];
    if (intentAction.name == intentName) {
        let intentRequest = handlerInput.requestEnvelope.request;
        let invokeAction = talk.turns[1];
        let output = invokeAction.call(context);
        context.stateVariables.set("name", "kevindra");
        let textSpeechAction = talk.turns[2];
        let speech = textSpeechAction.text.replace('{name}', context.stateVariables.get('name'));
        return speech;
    }
    return "";
}
//# sourceMappingURL=IntentHandler.js.map