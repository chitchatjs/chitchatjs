import { DialogSet } from '@chitchatjs/core';
import * as Alexa from 'ask-sdk-core';
declare class AlexaSkill {
    dialogSet: DialogSet;
    constructor(dialogSet: DialogSet);
    build(): Alexa.LambdaHandler;
}
export { AlexaSkill };
