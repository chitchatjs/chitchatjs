import { AlexaSkill, DefaultAlexaDialogManager } from '@chitchatjs/alexa';
import * as cjs from '@chitchatjs/core';

import { dialog } from './SimpleDialog';

let dialogSet: cjs.DialogSet = {
    dialogs: [dialog],
}

export default new AlexaSkill(new DefaultAlexaDialogManager(dialogSet)).handler()