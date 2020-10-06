"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildCommand = void 0;
const AlexaProjectBuilder_1 = require("../builder/AlexaProjectBuilder");
const util_1 = require("../util/util");
class BuildCommand {
    setOptions(yargs) {
    }
    execute(argv) {
        const buildConfig = {
            src: './dist/index.js',
            outDir: './alexa',
            target: "AlexaSkill"
        };
        if (buildConfig.target === "AlexaSkill") {
            let builder = new AlexaProjectBuilder_1.AlexaProjectBuilder();
            builder.build(buildConfig);
        }
        else {
            util_1.logger.error("Dialogflow is not yet supported");
        }
        process.exit(0);
    }
}
exports.BuildCommand = BuildCommand;
//# sourceMappingURL=build.js.map