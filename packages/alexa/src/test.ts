import { getWeatherIntent, launchRequest, orderPizzaIntent, yesIntent } from "./data/requests";
import { DefaultDialogEngine } from "./engine/DefaultDialogEngine";
import { blocks, state, conv, Context, Event } from "@chitchatjs/core";
import { IntentRequest } from "ask-sdk-model";

console.log("----------------------------------------------");
console.log("----------------Test 1------------------------");
console.log("----------------------------------------------");
/**
 * An example of greeting a user by their name
 */
let userName = blocks
    .setStateVar()
    .set((req: Context, ctx: Event) => {
        return { userName: "Kevindra" };
    })
    .build();

let launch = state("INIT")
    .block(blocks.compound().add(userName).add(blocks.say("Welcome, {userName}!").build()).build())
    .build();
let conv1 = conv().addState(launch).build();

let um = new DefaultDialogEngine();

console.log("----------------------------------------------");
let response1 = um.execute(conv1, launchRequest);
console.log(JSON.stringify(response1));
console.log("----------------------------------------------");

console.log("----------------------------------------------");
console.log("----------------Test 2------------------------");
console.log("----------------------------------------------");

let c3launch = state("INIT")
    .block(
        blocks
            .compound()
            .add(blocks.ask().say("hello, what do you want to do?").reprompt("what do you want to do").build())
            .add(blocks.goto().stateName("SecondTurn").build())
            .build()
    )
    .build();
let c3secondTurn = state("SecondTurn")
    .block(
        blocks
            .compound()
            .add(
                blocks
                    .when()
                    .true((context: Context, event: Event) => {
                        return (<IntentRequest>event.currentRequest.request).intent.name === "GetWeatherIntent";
                    })
                    .then(blocks.say("Weather is nice today, enjoy your day!").build())
                    .build()
            )
            .add(
                blocks
                    .when()
                    .true((context: Context, event: Event) => {
                        return (<IntentRequest>event.currentRequest.request).intent.name === "GetRainIntent";
                    })
                    .then(blocks.say("Chance of rain is low today!").build())
                    .build()
            )
            .build()
    )
    .build();
let conv3 = conv().addState(c3launch).addState(c3secondTurn).build();

um = new DefaultDialogEngine();

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
