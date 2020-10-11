import { SkillDefinition } from "./models";

/**
 * An AlexaSkill Runtime component responsible for handling user requests.
 */
export class AlexaSkill {
    definition: SkillDefinition;

    constructor(skillDefinition: SkillDefinition) {
        this.definition = skillDefinition;
    }
}
