/**
 * DialogSet is simply a list of all the dialogs.
 */
export interface DialogSet {
    /**
     * @items.minimum 1
     */
    dialogs: Dialog[];
}

/**
 * A dialog is a series of user and system interactions.
 */
export interface Dialog {
    interactions: Interaction[];
}

/**
 * An interaction is a combination of what user did and what actions system performed.
 */
export interface Interaction {
    user: UserTurn;
    system: SystemTurn;
}

/**
 * Interfaces that define the trigger in a dialogue
 */
export interface Turn {
    id?: string;
}

/**
 * User Primitives
 */
export interface UserTurn extends Turn {
    trigger: Trigger;
    act?: UserAct;
}

/**
 * Triggers
 */
export interface Trigger {}
export interface LaunchTrigger extends Trigger {}
export interface UtteranceTrigger extends Trigger {
    texts: string[];
}
export interface IntentTrigger extends Trigger {
    name: string;
    samples: string[];
}

/**
 * System Primitives
 */
export interface SystemTurn extends Turn {
    actions: Action[];
    act?: SystemAct;
}

/**
 * Interfaces that define the actions taken after a trigger is triggered
 */
export interface Action {}

export interface SpeechAction extends Action {}

export interface TellSpeechAction extends SpeechAction {
    text: string;
}
export interface AskSpeechAction extends SpeechAction {
    question: string;
    reprompt: string;
}
export interface MultiModalAction extends Action {}
export interface InvokeAction extends Action {}

/**
 * Dialog Acts - both system and user side
 */
export interface SystemAct {}
export interface UserAct {}
