import { AskSpeechBlockBuilder } from "./builders/AskSpeechBlockBuilder";
import { SkillInfoBlockBuilder } from "./builders/SkillInfoBlockBuilder";
import { TellSpeechBlockBuilder } from "./builders/TellSpeechBlockBuilder";
import { WhenUserSaysBlockBuilder } from "./builders/WhenUserSaysBuilder";
import {
    Agent,
    StateBuilder,
    CompoundBlockBuilder,
    WhenBlockBuilder,
    SetGlobalStateBlockBuilder,
    RemoveGlobalStateBlockBuilder,
    GotoStateBlockBuilder,
    RawResourceBlockBuilder,
    AgentBuilder,
} from "@chitchatjs/core";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, Skill } from "../models";
import { Locale } from "../models";
import { AlexaDialogManager } from "..";
import { RuleBasedDialogEngine } from "../engine";
import { EmptyBlockBuilder } from "./builders/EndBlockBuilder";
import { CustomBlockBuilder } from "./builders/CustomBlockBuilder";

export namespace alexa {
    export function dialogManager(skill: Skill) {
        return new AlexaDialogManager(skill, new RuleBasedDialogEngine());
    }

    export function skill() {
        return new AgentBuilder<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>();
    }

    export function start() {
        return alexa.state("INIT");
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

    export function whenIntentName(intentName: string) {
        return alexa.when().true((c: AlexaDialogContext, e: AlexaEvent) => {
            if (e.currentRequest.request.type === "IntentRequest") {
                return e.currentRequest.request.intent.name === intentName;
            }
            return false;
        });
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

    export function ask(msg: string) {
        return new AskSpeechBlockBuilder().say(msg);
    }

    export function say(msg: string) {
        return new TellSpeechBlockBuilder(msg).build();
    }

    export function empty() {
        return new EmptyBlockBuilder().build();
    }

    export function end() {
        return alexa
            .when()
            .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
                return event.currentRequest.request.type == "SessionEndedRequest";
            })
            .then(empty())
            .build();
    }

    export function info(locale: Locale) {
        return new SkillInfoBlockBuilder(locale);
    }

    export function custom() {
        return new CustomBlockBuilder();
    }
}
