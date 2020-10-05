"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const fsExtra = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const shell = __importStar(require("shelljs"));
let sampleIm = {
    "languageModel": {
        "invocationName": "dummy",
        "modelConfiguration": {
            "fallbackIntentSensitivity": {
                "level": "LOW"
            }
        },
        "intents": [
            {
                "name": "AMAZON.CancelIntent",
                "samples": []
            },
            {
                "name": "AMAZON.HelpIntent",
                "samples": []
            },
            {
                "name": "AMAZON.StopIntent",
                "samples": []
            },
            {
                "name": "AMAZON.FallbackIntent",
                "samples": ["dummy"]
            }
        ],
        "types": []
    }
};
let skillManifest = {
    "manifest": {
        "publishingInformation": {
            "locales": {
                "en-US": {
                    "summary": "Sample Short Description",
                    "examplePhrases": [
                        "Alexa open hello world",
                        "hello",
                        "help"
                    ],
                    "name": "test-skill",
                    "description": "Sample Full Description"
                }
            },
            "isAvailableWorldwide": true,
            "testingInstructions": "Sample Testing Instructions.",
            "category": "KNOWLEDGE_AND_TRIVIA",
            "distributionCountries": []
        },
        "apis": {
            "custom": {}
        },
        "manifestVersion": "1.0"
    }
};
let askResources = {
    "askcliResourcesVersion": "2020-03-31",
    "profiles": {
        "default": {
            "skillMetadata": {
                "src": "./skill-package"
            },
            "code": {
                "default": {
                    "src": "./lambda"
                }
            },
            "skillInfrastructure": {
                "userConfig": {
                    "runtime": "nodejs10.x",
                    "handler": "index.handler",
                    "awsRegion": "us-east-1"
                },
                "type": "@ask-cli/lambda-deployer"
            }
        }
    }
};
let askStates = {
    "askcliStatesVersion": "2020-03-31",
    "profiles": {
        "default": {
            "skillInfrastructure": {
                "@ask-cli/lambda-deployer": {
                    "deployState": {}
                }
            }
        }
    }
};
let packageJson = {
    "name": "play-ground",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {}
};
class GallanBuilder {
    build(talk, options) {
        console.log(JSON.stringify(talk));
        let im = this._buildInteractionModel(talk);
        console.log(JSON.stringify(im, null, 2));
        let saveDir = options.outDir;
        if (fs.existsSync(saveDir)) {
            fsExtra.emptyDirSync(saveDir);
        }
        else {
            fs.mkdirSync(saveDir);
        }
        let skillPackage = path.join(saveDir, 'skill-package/');
        let imPath = path.join(skillPackage, 'interactionModels/custom/');
        fs.mkdirSync(imPath, { recursive: true });
        fs.writeFileSync(path.join(imPath, 'en-US.json'), JSON.stringify({ interactionModel: im }, null, 2));
        fs.writeFileSync(path.join(skillPackage, '/skill.json'), JSON.stringify(skillManifest, null, 2));
        fs.writeFileSync(path.join(saveDir, '/ask-resources.json'), JSON.stringify(askResources, null, 2));
        let lambdaPath = path.join(saveDir, '/lambda');
        fs.mkdirSync(lambdaPath);
        fs.writeFileSync(path.join(lambdaPath, 'package.json'), JSON.stringify(packageJson, null, 2));
        fs.mkdirSync(path.join(saveDir, "infrastructure/lambda-deployer"), { recursive: true });
        fs.mkdirSync(path.join(saveDir, ".ask"));
        let oldAskStatesPath = './ask-states.json';
        if (fs.existsSync(oldAskStatesPath)) {
            fs.writeFileSync(path.join(saveDir, ".ask/ask-states.json"), fs.readFileSync(oldAskStatesPath));
        }
        else {
            fs.writeFileSync(path.join(saveDir, ".ask/ask-states.json"), JSON.stringify(askStates, null, 2));
        }
        console.log('Copying lambda code to the lambda directory');
        shell.cp('-R', ['*.json', './out', './node_modules'], lambdaPath);
        console.log('Done copying.');
        if (!shell.which('ask')) {
            shell.echo('Sorry, this Gallan requires ask-cli');
            shell.exit(1);
        }
        shell.cd(saveDir);
        shell.ls('./').forEach(function (file) {
            console.log(file);
        });
        shell.exec('ask deploy');
        shell.cd('-');
        const updatedAskStates = fs.readFileSync(path.join(saveDir, ".ask/ask-states.json"));
        console.log(updatedAskStates);
        fs.writeFileSync(oldAskStatesPath, updatedAskStates);
        console.log('Saved ./ask-states.json, don\'t forget to commit it in your git repo.');
    }
    _buildInteractionModel(talk) {
        let im = sampleIm;
        im.languageModel.invocationName = talk.name;
        talk.turns.forEach((action) => {
            if ("IntentAction" in action) {
                im.languageModel.intents.push({
                    name: action.name,
                    samples: action.samples
                });
            }
        });
        return im;
    }
    _setupProject() {
    }
}
exports.GallanBuilder = GallanBuilder;
//# sourceMappingURL=GallanBuilder.js.map