import { AlexaSkill } from "@chitchatjs/alexa";
import { v1 } from "ask-smapi-model";
import {
    IntentTrigger,
    isIntentTrigger,
    Trigger,
    UtteranceTrigger,
} from "@chitchatjs/core";
import { Interaction } from "@chitchatjs/core";
import { Dialog } from "@chitchatjs/core";
import { DialogSet } from "@chitchatjs/core";
import { isUtteranceTrigger } from "@chitchatjs/core";
import { ErrorMessage, logger } from "../util/util";
import randomstring = require("randomstring");
import { ProjectBootstrapper } from "./ProjectBootstrapper";
import { BuildCommand } from "../commands/build";
import { BuildConfig } from "../builder/ProjectBuilder";
import { Intent } from "ask-sdk-model";

export class ResourceBuilder {
    /**
     * builds to an Interaction Model
     *
     * @param skill AlexaSkill
     */
    buildInteractionModel(
        skill: AlexaSkill
    ): v1.skill.interactionModel.InteractionModelData {
        let dialogSet: DialogSet = skill.dialogSet;

        if (
            !(
                dialogSet &&
                dialogSet.dialogs &&
                Array.isArray(dialogSet.dialogs) &&
                dialogSet.dialogs.length
            )
        ) {
            logger.errorAndExit(ErrorMessage.EMPTY_DIALOG_SET);
        }

        let im: v1.skill.interactionModel.InteractionModelData = {
            interactionModel: {
                languageModel: {
                    invocationName: "dummy skill",
                    intents: [],
                    types: [],
                    modelConfiguration: {
                        fallbackIntentSensitivity: {
                            level: "LOW",
                        },
                    },
                },
            },
        };

        let dialogs = dialogSet.dialogs;
        dialogs.forEach((dialog: Dialog, id: number) => {
            dialog.interactions.forEach((intr: Interaction, it: number) => {
                if (isUtteranceTrigger(intr.user.trigger)) {
                    let uTrigger = intr.user.trigger;

                    im.interactionModel?.languageModel?.intents?.push(
                        this.buildIntentFromUtteranceTrigger(uTrigger)
                    );
                } else if (isIntentTrigger(intr.user.trigger)) {
                    let uTrigger = intr.user.trigger;

                    im.interactionModel?.languageModel?.intents?.push(
                        this.buildIntentFromIntentTrigger(uTrigger)
                    );
                }
            });
        });

        // logger.logObject(im)
        return im;
    }

    /**
     * Build the skill manifest
     * TODO - have only duffy skill manifest for now
     *
     * @param skill AlexaSkill
     */
    buildSkillManifest(
        skill: AlexaSkill
    ): v1.skill.Manifest.SkillManifestEnvelope {
        return <v1.skill.Manifest.SkillManifestEnvelope>{
            manifest: {
                manifestVersion: "1.0",
                apis: {
                    custom: {},
                },
                publishingInformation: {
                    locales: {
                        "en-US": {
                            summary: "Sample Short Description",
                            examplePhrases: [
                                "Alexa open hello world",
                                "hello",
                                "help",
                            ],
                            name: "cjs demo",
                            description: "Sample Full Description",
                        },
                    },
                    isAvailableWorldwide: true,
                    testingInstructions: "Sample Testing Instructions.",
                    category: "KNOWLEDGE_AND_TRIVIA",
                    distributionCountries: [],
                },
            },
        };
    }

    private buildIntentFromUtteranceTrigger(
        trigger: UtteranceTrigger
    ): v1.skill.interactionModel.Intent {
        let randomIntentName: string =
            randomstring.generate({
                length: 5,
                charset: "alphabetic",
            }) + "Intent";

        let intent: v1.skill.interactionModel.Intent = {
            name: randomIntentName,
            slots: [],
            samples: trigger.texts,
        };

        return intent;
    }

    private buildIntentFromIntentTrigger(
        trigger: IntentTrigger
    ): v1.skill.interactionModel.Intent {
        let intent: v1.skill.interactionModel.Intent = {
            name: trigger.name,
            slots: [],
            samples: trigger.samples || [],
        };

        return intent;
    }
}
