import { AlexaSkill, DefaultAlexaDialogManager } from "@chitchatjs/alexa";
import {} from "ask-sdk-core";
import * as cjs from "@chitchatjs/core";

import { dialog } from "./SimpleDialog";

let dialogSet: cjs.DialogSet = {
    dialogs: [dialog],
};

let skill = new AlexaSkill(new DefaultAlexaDialogManager(dialogSet), dialogSet);

export default skill;
export const handler = skill.handler;
