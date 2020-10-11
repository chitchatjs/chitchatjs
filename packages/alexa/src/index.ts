import { Conversation } from "@chitchatjs/core";

/**
 * An AlexaSkill Runtime component responsible for handling user requests.
 */
class AlexaSkill {
    conversation: Conversation;

    constructor(conversation: Conversation) {
        this.conversation = conversation;
    }
}

export { AlexaSkill };
export * from "./AlexaDialogManager";
export * from "./engine/RuleBasedDialogEngine";
export * from "./blocks";
