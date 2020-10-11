import { getWeatherIntent, launchRequest, orderPizzaIntent, yesIntent, givemeweatIntent } from "./data/requests";
import { RuleBasedDialogEngine } from "./engine/RuleBasedDialogEngine";
import { core, state, conv, DialogContext, Event } from "@chitchatjs/core";
import { IntentRequest } from "ask-sdk-model";
import { Locale } from "@chitchatjs/core";
import { alexa as ax } from "./blocks";

console.log("----------------------------------------------");
console.log("----------------Test 1------------------------");
console.log("----------------------------------------------");
/**
 * An example of greeting a user by their name
 */
let userName = core
    .setStateVar()
    .set((req: DialogContext, ctx: Event) => {
        return { userName: "Kevindra" };
    })
    .build();

let launch = state("INIT")
    .block(core.compound().add(userName).add(ax.say("Welcome, {userName}!").build()).build())
    .build();
let conv1 = conv().addState(launch).build();

let um = new RuleBasedDialogEngine();

console.log("----------------------------------------------");
let response1 = um.execute(conv1, launchRequest);
console.log(JSON.stringify(response1));
console.log("----------------------------------------------");

console.log("----------------------------------------------");
console.log("----------------Test 2------------------------");
console.log("----------------------------------------------");

let c3launch = state("INIT")
    .block(
        core
            .compound()
            .add(ax.ask().say("hello, what do you want to do?").reprompt("what do you want to do").build())
            .add(core.goto().stateName("SecondTurn").build())
            .build()
    )
    .build();
let c3secondTurn = state("SecondTurn")
    .block(
        core
            .compound()
            .add(
                core
                    .when()
                    .true((context: DialogContext, event: Event) => {
                        return (<IntentRequest>event.currentRequest.request).intent.name === "GetWeatherIntent";
                    })
                    .then(ax.say("Weather is nice today, enjoy your day!").build())
                    .build()
            )
            .add(
                core
                    .when()
                    .true((context: DialogContext, event: Event) => {
                        return (<IntentRequest>event.currentRequest.request).intent.name === "GetRainIntent";
                    })
                    .then(ax.say("Chance of rain is low today!").build())
                    .build()
            )
            .build()
    )
    .build();
let conv3 = conv().addState(c3launch).addState(c3secondTurn).build();

um = new RuleBasedDialogEngine();

response1 = um.execute(conv3, launchRequest);
console.log("----------------------------------------------");
console.log(JSON.stringify(response1, null, 2));
console.log("----------------------------------------------");

console.log("----------------------------------------------");
let response2 = um.execute(conv3, getWeatherIntent);
console.log(JSON.stringify(response2, null, 2));
console.log("----------------------------------------------");

console.log("----------------------------------------------");
let response3 = um.execute(conv3, getWeatherIntent);
console.log(JSON.stringify(response3, null, 2));
console.log("----------------------------------------------");

// let mySkill = new AlexaSkill(conv().build());

// let dm = new DefaultAlexaDialogManager(mySkill);
// export const handler = dm.handler();

console.log("----------------------------------------------");
console.log("----------------Test 3------------------------");
console.log("----------------------------------------------");
/**
 * An example of greeting a user by their name
 */

let initializeSkill = () => {
    return ax.info(Locale.en_US).name("Super Skill").build();
};

launch = state("INIT")
    .block(
        core
            .compound()
            .add(initializeSkill())
            .add(ax.ask().say("Welcome, you can ask me for weather!").reprompt("ask me for weather").build())
            .add(core.goto().stateName("weather").build())
            .build()
    )
    .build();

let weatherState = state("weather")
    .block(ax.when(["give me weather for {usCity}"]).then(ax.say("Weather is nice").build()).build())
    .build();

let conv4 = conv().addState(launch).addState(weatherState).build();

um = new RuleBasedDialogEngine();

console.log("----------------------------------------------");
response1 = um.execute(conv4, launchRequest);
console.log(JSON.stringify(response1));
console.log("----------------------------------------------");

console.log("----------------------------------------------");
response1 = um.execute(conv4, givemeweatIntent);
console.log(JSON.stringify(response1));
console.log("----------------------------------------------");
