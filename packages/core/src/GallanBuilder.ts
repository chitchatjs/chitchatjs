import { Action } from "./Actions";
import { IntentAction } from "./Actions";
import { Talk } from "./Talk";
import * as fs from 'fs'
import * as fsExtra from 'fs-extra'
import * as path from 'path'
import * as shell from 'shelljs'

interface GallanOptions {
    version: string,
    src: string,
    outDir: string
}

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
}

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
}

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
}

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
}

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
    "dependencies": {
    }
}

interface Intent {
    name: string
    samples: string[]
}

class GallanBuilder {
    build(talk: Talk, options: GallanOptions) {
        console.log(JSON.stringify(talk))

        let im = this._buildInteractionModel(talk)
        console.log(JSON.stringify(im, null, 2));

        // SAVING STUFF
        let saveDir = options.outDir
        if (fs.existsSync(saveDir)) {
            fsExtra.emptyDirSync(saveDir)
        } else {
            fs.mkdirSync(saveDir)
        }

        let skillPackage = path.join(saveDir, 'skill-package/')

        /** Save Interaction Models */
        let imPath = path.join(skillPackage, 'interactionModels/custom/')
        fs.mkdirSync(imPath, { recursive: true })
        fs.writeFileSync(path.join(imPath, 'en-US.json'), JSON.stringify({ interactionModel: im }, null, 2))

        /** Save Skill Manifest */
        fs.writeFileSync(path.join(skillPackage, '/skill.json'), JSON.stringify(skillManifest, null, 2))

        /** Save ask-resources.json */
        fs.writeFileSync(path.join(saveDir, '/ask-resources.json'), JSON.stringify(askResources, null, 2))

        /** Backend code */
        let lambdaPath = path.join(saveDir, '/lambda')
        fs.mkdirSync(lambdaPath)
        fs.writeFileSync(path.join(lambdaPath, 'package.json'), JSON.stringify(packageJson, null, 2))

        /** infrastructure/lambda-deployer */
        fs.mkdirSync(path.join(saveDir, "infrastructure/lambda-deployer"), { recursive: true })

        /** ASK States: ask-states.json */
        fs.mkdirSync(path.join(saveDir, ".ask"))

        let oldAskStatesPath = './ask-states.json'
        // if deploy happened already, use the old ask-states.json file
        if (fs.existsSync(oldAskStatesPath)) {
            fs.writeFileSync(path.join(saveDir, ".ask/ask-states.json"), fs.readFileSync(oldAskStatesPath))
        } else {
            // create it's a new skill
            fs.writeFileSync(path.join(saveDir, ".ask/ask-states.json"), JSON.stringify(askStates, null, 2))
        }

        console.log('Copying lambda code to the lambda directory')
        shell.cp('-R', ['*.json', './out', './node_modules'], lambdaPath)
        console.log('Done copying.')

        if (!shell.which('ask')) {
            shell.echo('Sorry, this Gallan requires ask-cli');
            shell.exit(1);
        }

        shell.cd(saveDir)
        shell.ls('./').forEach(function (file) {
            console.log(file);
        })
        shell.exec('ask deploy')
        shell.cd('-')

        /** back up ask-states to avoid create new skills */
        const updatedAskStates = fs.readFileSync(path.join(saveDir, ".ask/ask-states.json"))
        console.log(updatedAskStates)
        fs.writeFileSync(oldAskStatesPath, updatedAskStates)
        console.log('Saved ./ask-states.json, don\'t forget to commit it in your git repo.')
    }

    _buildInteractionModel(talk: Talk) {
        let im = sampleIm

        im.languageModel.invocationName = talk.name
        talk.turns.forEach((action: Action) => {
            if ("IntentAction" in action) {
                im.languageModel.intents.push(
                    {
                        name: action.name,
                        samples: action.samples
                    } as Intent
                )
            }
        })
        return im
    }

    _setupProject() {

    }
}

export { GallanBuilder }