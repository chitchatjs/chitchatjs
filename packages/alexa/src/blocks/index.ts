import { AskSpeechBlockBuilder } from "./builders/AskSpeechBlockBuilder";
import { SkillInfoBlockBuilder } from "./builders/SkillInfoBlockBuilder";
import { TellSpeechBlockBuilder } from "./builders/TellSpeechBlockBuilder";
import { WhenUserSaysBlockBuilder } from "./builders/WhenUserSaysBuilder";
import {
    AgentDefinitionBuilder,
    StateBuilder,
    CompoundBlockBuilder,
    WhenBlockBuilder,
    SetGlobalStateBlockBuilder,
    RemoveGlobalStateBlockBuilder,
    GotoStateBlockBuilder,
    RawResourceBlockBuilder,
} from "@chitchatjs/core";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, SkillDefinition } from "../models";
import { Locale } from "../models";
import { AlexaDialogManager } from "..";
import { AlexaSkill } from "../AlexaSkill";
import { RuleBasedDialogEngine } from "../engine";
import { EmptyBlockBuilder } from "./builders/EndBlockBuilder";

export namespace alexa {
    export function dialogManager(skillDefinition: SkillDefinition) {
        return new AlexaDialogManager(new AlexaSkill(skillDefinition), new RuleBasedDialogEngine());
    }

    export function definition() {
        return new AgentDefinitionBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>();
    }

    export function state(name: string) {
        return new StateBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>(name);
    }

    export function compound() {
        return new CompoundBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>();
    }

    export function when() {
        return new WhenBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>();
    }

    export function whenUserSays(sampleUtterances: string[]) {
        return new WhenUserSaysBlockBuilder().userSays(sampleUtterances);
    }

    export function setStateVar(
        f: string | { (ctx: AlexaDialogContext, event: AlexaEvent): { [name: string]: any } },
        value?: any
    ) {
        let func: (ctx: AlexaDialogContext, event: AlexaEvent) => { [name: string]: any };

        if (typeof f === "string") {
            func = (ctx: AlexaDialogContext, event: AlexaEvent): { [name: string]: any } => {
                return { [f]: value };
            };
        } else {
            func = <typeof func>f;
        }

        return new SetGlobalStateBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>().set(func).build();
    }

    export function removeStateVar(f: string | string[] | { (ctx: AlexaDialogContext, event: AlexaEvent): string[] }) {
        let func: (ctx: AlexaDialogContext, event: AlexaEvent) => string[];

        if (typeof f === "string") {
            let varName = f;
            func = (ctx: AlexaDialogContext, event: AlexaEvent): string[] => {
                return [varName];
            };
        } else if (Array.isArray(f)) {
            let varNames = f;
            func = (ctx: AlexaDialogContext, event: AlexaEvent): string[] => {
                return varNames;
            };
        } else {
            func = <typeof func>f;
        }

        return new RemoveGlobalStateBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>()
            .remove(func)
            .build();
    }

    export function goto(stateName: string) {
        return new GotoStateBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>()
            .stateName(stateName)
            .build();
    }

    export function ask() {
        return new AskSpeechBlockBuilder();
    }

    export function say(msg: string) {
        return new TellSpeechBlockBuilder(msg);
    }

    export function empty() {
        return new EmptyBlockBuilder().build();
    }

    export function end() {
        return alexa
            .when()
            .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
                return false;
            })
            .then(empty())
            .build();
    }

    export function info(locale: Locale) {
        return new SkillInfoBlockBuilder(locale);
    }

    export function rawResource(key: string, content: string) {
        return new RawResourceBlockBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>(key, content).build();
    }
}
