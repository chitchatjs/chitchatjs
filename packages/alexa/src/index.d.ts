import * as Alexa from 'ask-sdk-core';
import { AlexaDialogManager } from './dialog-management/AlexaDialogManager';
declare class AlexaSkill {
    dialogManager: AlexaDialogManager;
    constructor(dialogManager: AlexaDialogManager);
    handler(): Alexa.LambdaHandler;
}
export { AlexaSkill };
export * from "./dialog-management/AlexaDialogManager";
export * from "./dialog-management/default/DefaultAlexaDialogManager";
export * from "./dialog-management/default/InteractionExecutor";
export * from "./dialog-management/default/InteractionMatcher";
