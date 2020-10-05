export interface Turn {
    id?: String;
}
export interface UserTurn extends Turn {
    trigger: Trigger;
    act?: UserAct;
}
export interface Trigger {
}
export interface UtteranceTrigger extends Trigger {
    texts: String[];
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
    text: String;
}
export interface MultiModalAction extends Action {
}
export interface InvokeAction extends Action {
}
export interface SystemAct {
}
export interface UserAct {
}
