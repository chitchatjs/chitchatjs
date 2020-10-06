"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util/util");
const util_2 = require("../util/util");
class AlexaProjectBuilder {
    build(buildConfig) {
        let spinner = util_1.startSpinner("🔨 Building project..");
        this.loadProject(buildConfig);
        spinner.stop();
    }
    loadProject(buildConfig) {
        util_1.logger.info("Loading your project from: " + util_2.DEV_WORKING_DIRECTORY);
        try {
            let p = require(util_2.DEV_WORKING_DIRECTORY).default;
        }
        catch (e) {
            util_1.logger.error("error: ", e);
        }
    }
}
exports.AlexaProjectBuilder = AlexaProjectBuilder;
//# sourceMappingURL=AlexaProjectBuilder.js.map