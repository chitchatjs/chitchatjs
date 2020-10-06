import { AlexaSkill, DefaultAlexaDialogManager } from "@chitchatjs/alexa";
import {} from "ask-sdk-core";
import * as cjs from "@chitchatjs/core";

import { dialog as HelloDialog } from "./SimpleDialog";
import { dialog as StopDialog } from "./StopDialog";
import { dialog as FallbackDialog } from "./FallbackDialog";

let dialogSet: cjs.DialogSet = {
    dialogs: [HelloDialog, StopDialog, FallbackDialog],
};

let skill = new AlexaSkill(new DefaultAlexaDialogManager(dialogSet), dialogSet);

export default skill;
export const handler = skill.handler;
