import { AlexaSkill } from '@chitchatjs/alexa'
import { v1 } from 'ask-smapi-model'
import { Trigger, UtteranceTrigger } from '@chitchatjs/core'
import { Interaction } from '@chitchatjs/core'
import { Dialog } from '@chitchatjs/core'
import { DialogSet } from '@chitchatjs/core'
import { isUtteranceTrigger } from '@chitchatjs/core'
import { ErrorMessage, logger } from '../util/util'
import randomstring = require('randomstring')

export interface SkillPackage {

}

// TODO - look into validations 
// https://www.npmjs.com/package/typescript-json-validator

/**
 * This assumes that data provided to it is valid.
 * No validations available right now.
 */
export class SkillBuilder {
    build(skill: AlexaSkill): SkillPackage | void {

    }

    buildInteractionModel(skill: AlexaSkill): v1.skill.interactionModel.InteractionModelSchema | void {
        let dialogSet: DialogSet = skill.dialogSet;

        if (!(dialogSet && dialogSet.dialogs && Array.isArray(dialogSet.dialogs) && dialogSet.dialogs.length)) {
            logger.errorAndExit(ErrorMessage.EMPTY_DIALOG_SET)
        }

        let im: v1.skill.interactionModel.InteractionModelSchema = {
            languageModel: {
                invocationName: "dummy skill",
                intents: [],
                types: [],
                modelConfiguration: {
                    fallbackIntentSensitivity: {
                        level: "LOW"
                    }
                }
            }
        }

        let dialogs = dialogSet.dialogs
        dialogs.forEach((dialog: Dialog, id: number) => {
            dialog.interactions.forEach((intr: Interaction, it: number) => {
                if (isUtteranceTrigger(intr.user.trigger)) {
                    let uTrigger = intr.user.trigger

                    im.languageModel?.intents?.push(this.buildIntentFromUtteranceTrigger(uTrigger))
                }
            })
        })

        logger.logObject(im)
        return im
    }

    buildIntentFromUtteranceTrigger(trigger: UtteranceTrigger): v1.skill.interactionModel.Intent {
        let randomIntentName: string = randomstring.generate({
            length: 5,
            charset: 'alphabetic'
        }) + "Intent"

        let intent: v1.skill.interactionModel.Intent = {
            name: randomIntentName,
            slots: [],
            samples: trigger.texts
        }

        return intent
    }
}