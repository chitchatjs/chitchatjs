import * as Alexa from 'ask-sdk-core';
import { AlexaDialogManager } from './dialog-management/AlexaDialogManager';
import { DialogSet } from '@chitchatjs/core';
declare class AlexaSkill {
    dialogManager: AlexaDialogManager;
    dialogSet: DialogSet;
    constructor(dialogManager: AlexaDialogManager, dialogSet: DialogSet);
    handler(): Alexa.LambdaHandler;
}
export { AlexaSkill };
export * from "./dialog-management/AlexaDialogManager";
export * from "./dialog-management/default/DefaultAlexaDialogManager";
export * from "./dialog-management/default/InteractionExecutor";
export * from "./dialog-management/default/InteractionMatcher";
