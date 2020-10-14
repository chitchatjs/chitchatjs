import { getWeatherIntent, launchRequest, givemeweatIntent, sessionEndedRequest } from "./data/requests";
import { IntentRequest, RequestEnvelope } from "ask-sdk-model";
import { alexa, alexa as ax } from "../blocks";
import { AlexaBuilderContext, AlexaDialogContext, AlexaDialogEngine, AlexaEvent, Locale } from "../models";
import { RuleBasedDialogEngine } from "../engine";
import { AlexaDialogManager } from "..";
import { defaultMaxListeners } from "stream";
import { ResponseFactory } from "ask-sdk-core";

// console.log("----------------------------------------------");
// console.log("----------------Test 1------------------------");
// console.log("----------------------------------------------");
/**
 * An example of greeting a user by their name
 */
// let userName = ax.setStateVar("myName", "Kevindra");

// let launch = ax
//     .state("INIT")
//     .block(ax.compound().add(userName).add(ax.say("Welcome, {myName}!").build()).build())
//     .build();
// let skillDefinition = ax.definition().addState(launch).build();

// let dm = ax.dialogManager(skillDefinition);

function executeDM(dm: AlexaDialogManager, request: RequestEnvelope, cb: (msg: string) => void) {
  dm.handler()(request, {}, (err: Error, result?: any) => {
    if (err) {
      throw err;
    }
    cb(JSON.stringify(result));
  });
}

// console.log("----------------------------------------------");
// executeDM(launchRequest, (res) => {
//     console.log(res);
// });
// console.log("----------------------------------------------");

// console.log("----------------------------------------------");
// console.log("----------------Test 2------------------------");
// console.log("----------------------------------------------");

// let c3launch = ax
//     .state("INIT")
//     .block(
//         ax
//             .compound()
//             .add(ax.ask().say("hello, what do you want to do?").reprompt("what do you want to do").build())
//             .add(ax.goto("SecondTurn"))
//             .build()
//     )
//     .build();

// let c3secondTurn = ax
//     .state("SecondTurn")
//     .block(
//         ax
//             .compound()
//             .add(
//                 ax
//                     .when()
//                     .true((context: AlexaDialogContext, event: AlexaEvent) => {
//                         return (<IntentRequest>event.currentRequest.request).intent.name === "GetWeatherIntent";
//                     })
//                     .then(ax.say("Weather is nice today, enjoy your day!").build())
//                     .build()
//             )
//             .add(
//                 ax
//                     .when()
//                     .true((context: AlexaDialogContext, event: AlexaEvent) => {
//                         return (<IntentRequest>event.currentRequest.request).intent.name === "GetRainIntent";
//                     })
//                     .then(ax.say("Chance of rain is low today!").build())
//                     .build()
//             )
//             .build()
//     )
//     .build();
// skillDefinition = ax.definition().addState(c3launch).addState(c3secondTurn).build();

// dm = ax.dialogManager(skillDefinition);

// console.log("----------------------------------------------");
// executeDM(launchRequest, (res) => {
//     console.log(res);
// });
// console.log("----------------------------------------------");

// console.log("----------------------------------------------");
// executeDM(getWeatherIntent, (res) => {
//     console.log(res);
// });
// console.log("----------------------------------------------");

// console.log("----------------------------------------------");
// executeDM(getWeatherIntent, (res) => {
//     console.log(res);
// });
// console.log("----------------------------------------------");

// // let mySkill = new AlexaSkill(conv().build());

// // let dm = new DefaultAlexaDialogManager(mySkill);
// // export const handler = dm.handler();

console.log("----------------------------------------------");
console.log("----------------Test 3------------------------");
console.log("----------------------------------------------");
/**
 * An example of greeting a user by their name
 */

let initializeSkill = () => {
  return ax.info().name("Super Skill").build();
};

let launch = ax
  .state("INIT")
  .block(
    ax
      .compound()
      .add(initializeSkill())
      .add(ax.ask("Welcome, you can ask me for weather!").reprompt("ask me for weather").build())
      .add(ax.goto("weather"))
      .build()
  )
  .build();

let weatherState = ax
  .state("weather")
  .block(
    ax
      .compound()
      .add(ax.whenUserSays(["give me weather for {usCity}"]).then(ax.say("Weather is nice")).build())
      .add(
        ax
          .custom()
          .executor((c: AlexaDialogContext, e: AlexaEvent) => {
            let res = ResponseFactory.init();
            res.speak("I'm speaking this from a custom block.");
            return res.getResponse();
          })
          .build()
      )
      .add(ax.end())
      .build()
  )
  .build();

let skill = ax.skill().addState(launch).addState(weatherState).build();
console.log(JSON.stringify(skill, null, 2));
console.log("----------------------------------------------");

let dm = ax.dialogManager(skill);

executeDM(dm, launchRequest, (res) => {
  console.log(res);
  console.log("----------------------------------------------");
  executeDM(dm, givemeweatIntent, (res) => {
    console.log(res);
  });
  // executeDM(dm, sessionEndedRequest, (res) => {
  //     console.log(res);
  // });

  console.log("----------------------------------------------");
});
console.log("----------------------------------------------");
