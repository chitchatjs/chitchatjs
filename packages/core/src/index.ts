/**
 * Interfaces that define the trigger in a dialogue
 */
export interface Turn {
    id?: String
}

/**
 * User Primitives
 */
export interface UserTurn extends Turn {
    trigger: Trigger,
    act?: UserAct
}

/**
 * Triggers
 */
export interface Trigger { }
export interface UtteranceTrigger extends Trigger {
    text: String
}
export interface IntentTrigger extends Trigger { }

/**
 * System Primitives
 */
export interface SystemTurn extends Turn {
    actions: Action[]
    act?: SystemAct
}

/**
 * Interfaces that define the actions taken after a trigger is triggered
 */
export interface Action {
}

export interface SpeechAction extends Action {
    text: String
}
export interface MultiModalAction extends Action { }
export interface InvokeAction extends Action { }

/**
 * Dialog Acts - both system and user side
 */
export interface SystemAct { }
export interface UserAct { }