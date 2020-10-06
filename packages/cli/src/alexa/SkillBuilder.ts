import { AlexaSkill } from '@chitchatjs/alexa'
import { v1 } from 'ask-smapi-model'

export interface SkillPackage {
    
}

// name tbd
export class SkillBuilder {
    build(skill: AlexaSkill): SkillPackage | void {}

    buildInteractionModel(skill: AlexaSkill): v1.skill.interactionModel.InteractionModelSchema | void {
        console.log(skill.dialogSet)
    }
}