import * as Alexa from 'ask-sdk-core'
import { AlexaDialogManager } from './dialog-management/AlexaDialogManager'

/**
 * An AlexaSkill Runtime component responsible for handling user requests.
 */
class AlexaSkill {
    dialogManager: AlexaDialogManager

    constructor(dialogManager: AlexaDialogManager) {
        this.dialogManager = dialogManager
    }

    handler(): Alexa.LambdaHandler {
        return this.dialogManager.handler()
    }
}

export { AlexaSkill }
export * from "./dialog-management/AlexaDialogManager"
export * from "./dialog-management/default/DefaultAlexaDialogManager"
export * from "./dialog-management/default/InteractionExecutor"
export * from "./dialog-management/default/InteractionMatcher"