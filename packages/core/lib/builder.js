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
Object.defineProperty(exports, "__esModule", { value: true });
const GallanBuilder_1 = require("./GallanBuilder");
const gallanconfig_json_1 = require("../gallanconfig.json");
console.log(`Building chatbot package using options: ${JSON.stringify(gallanconfig_json_1.default, null, 2)}`);
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(__dirname);
    const chatbot = yield Promise.resolve().then(() => require(gallanconfig_json_1.default.src));
    let gallanBuilder = new GallanBuilder_1.GallanBuilder();
    gallanBuilder.build(chatbot.talk, gallanconfig_json_1.default);
});
run();
//# sourceMappingURL=builder.js.map