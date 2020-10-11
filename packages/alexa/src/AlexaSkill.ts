import { SkillDefinition } from "./models";

/**
 * An AlexaSkill Runtime component responsible for handling user requests.
 */
export class AlexaSkill {
    skillDefinition: SkillDefinition;

    constructor(skillDefinition: SkillDefinition) {
        this.skillDefinition = skillDefinition;
    }
}
