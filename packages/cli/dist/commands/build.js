"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AlexaProjectBuilder_1 = require("../builder/AlexaProjectBuilder");
class BuildCommand {
    setOptions(yargs) {
    }
    execute(argv) {
        const buildConfig = {
            src: './dist/index.js',
            outDir: './alexa'
        };
        let builder = new AlexaProjectBuilder_1.AlexaProjectBuilder();
        builder.build(buildConfig);
        process.exit(0);
    }
}
exports.BuildCommand = BuildCommand;
//# sourceMappingURL=build.js.map