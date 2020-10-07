"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlexaProjectBuilder = void 0;
const util_1 = require("../util/util");
const util_2 = require("../util/util");
const SkillBuilder_1 = require("../alexa/SkillBuilder");
class AlexaProjectBuilder {
    build(buildConfig) {
        let spinner = util_1.startSpinner("🔨 Building project..");
        let skill = loadProject(buildConfig);
        let im = new SkillBuilder_1.SkillBuilder().build(skill, buildConfig);
        spinner.stop();
    }
}
exports.AlexaProjectBuilder = AlexaProjectBuilder;
function loadProject(buildConfig) {
    util_1.logger.info("Loading your project from: " + util_2.DEV_WORKING_DIRECTORY);
    return require(util_2.DEV_WORKING_DIRECTORY).default;
}
//# sourceMappingURL=AlexaProjectBuilder.js.map