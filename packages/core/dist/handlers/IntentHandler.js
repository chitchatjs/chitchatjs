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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentHandler = void 0;
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