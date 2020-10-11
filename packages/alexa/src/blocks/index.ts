import { Locale } from "../models/Artifacts";
import { AskSpeechBlockBuilder } from "./builders/AskSpeechBlockBuilder";
import { SkillInfoBlockBuilder } from "./builders/SkillInfoBlockBuilder";
import { TellSpeechBlockBuilder } from "./builders/TellSpeechBlockBuilder";
import { WhenUserSaysBlockBuilder } from "./builders/WhenUserSaysBuilder";

export namespace alexa {
    export function when(sampleUtterances: string[]) {
        return new WhenUserSaysBlockBuilder().userSays(sampleUtterances);
    }

    export function ask() {
        return new AskSpeechBlockBuilder();
    }

    export function say(msg: string) {
        return new TellSpeechBlockBuilder(msg);
    }

    export function info(locale: Locale) {
        return new SkillInfoBlockBuilder(locale);
    }
}
