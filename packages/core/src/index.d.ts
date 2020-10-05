export interface DialogSet {
    dialogs: Dialog[];
}
export interface Dialog {
    interactions: Interaction[];
}
export interface Interaction {
    user: UserTurn;
    system: SystemTurn;
}
export interface Turn {
    id?: string;
}
export interface UserTurn extends Turn {
    trigger: Trigger;
    act?: UserAct;
}
export interface Trigger {
}
export interface LaunchTrigger extends Trigger {
}
export interface UtteranceTrigger extends Trigger {
    texts: string[];
}
export interface IntentTrigger extends Trigger {
}
export interface SystemTurn extends Turn {
    actions: Action[];
    act?: SystemAct;
}
export interface Action {
}
export interface SpeechAction extends Action {
}
export interface TellSpeechAction extends SpeechAction {
    text: string;
}
export interface AskSpeechAction extends SpeechAction {
    question: string;
    reprompt: string;
}
export interface MultiModalAction extends Action {
}
export interface InvokeAction extends Action {
}
export interface SystemAct {
}
export interface UserAct {
}
