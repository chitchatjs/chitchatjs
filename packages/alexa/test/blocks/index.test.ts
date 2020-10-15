import { ui } from "ask-sdk-model";
import { expect } from "chai";
import "mocha";
import { alexa as ax, AlexaDialogContext, AlexaEvent } from "../../src";
import { intentRequest as helloIntentRequestNoSlots } from "../data/intentRequest";
import { intentRequestOneMissingSlot as weatherIntentRequestWithOneSlot } from "../data/intentRequestOneMissingSlot";

describe("alexa", () => {
  describe(".whenIntentName() with no slots", () => {
    it("should render then block and should not update state when intent name matches", async () => {
      let context: AlexaDialogContext = {
        platformState: { currentStateName: "", globalState: {} },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: helloIntentRequestNoSlots,
      };
      let thenTextOut = "Hello!";
      let otherwiseTextOut = "Bye!";
      let b = ax.whenIntentName("HelloIntent").then(ax.say(thenTextOut)).otherwise(ax.say(otherwiseTextOut)).build();
      b.execute(context, event);

      expect(JSON.stringify(context.platformState.globalState)).equals("{}");
      expect(context.currentResponse.response.outputSpeech).is.not.undefined;
      let ssml = <ui.SsmlOutputSpeech>context.currentResponse.response.outputSpeech;
      if (ssml) {
        expect(ssml.ssml).equals(`<speak>${thenTextOut}</speak>`);
      }
    });

    it("should render otherwise block and should not update state when intent name doesn't match", async () => {
      let context: AlexaDialogContext = {
        platformState: { currentStateName: "", globalState: {} },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: helloIntentRequestNoSlots,
      };
      let thenTextOut = "Hello!";
      let otherwiseTextOut = "Bye!";
      let b = ax.whenIntentName("FooHelloIntent").then(ax.say(thenTextOut)).otherwise(ax.say(otherwiseTextOut)).build();
      b.execute(context, event);

      expect(JSON.stringify(context.platformState.globalState)).equals(JSON.stringify({}));
      expect(context.currentResponse.response.outputSpeech).is.not.undefined;
      let ssml = <ui.SsmlOutputSpeech>context.currentResponse.response.outputSpeech;
      if (ssml) {
        expect(ssml.ssml).equals(`<speak>${otherwiseTextOut}</speak>`);
      }
    });
  });

  describe(".whenIntentName() with slots", () => {
    it("should render then block and update state when intent name matches", async () => {
      let context: AlexaDialogContext = {
        platformState: { currentStateName: "", globalState: {} },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: weatherIntentRequestWithOneSlot,
      };
      let thenTextOut = "Hello!";
      let otherwiseTextOut = "Bye!";
      let b = ax.whenIntentName("WeatherIntent").then(ax.say(thenTextOut)).otherwise(ax.say(otherwiseTextOut)).build();
      b.execute(context, event);

      expect(JSON.stringify(context.platformState.globalState)).equals(JSON.stringify({ city: "seattle" }));
      expect(context.currentResponse.response.outputSpeech).is.not.undefined;
      let ssml = <ui.SsmlOutputSpeech>context.currentResponse.response.outputSpeech;
      if (ssml) {
        expect(ssml.ssml).equals(`<speak>${thenTextOut}</speak>`);
      }
    });

    it("should render otherwise block and should not update state when intent name doesn't match", async () => {
      let context: AlexaDialogContext = {
        platformState: { currentStateName: "", globalState: {} },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: weatherIntentRequestWithOneSlot,
      };
      let thenTextOut = "Hello!";
      let otherwiseTextOut = "Bye!";
      let b = ax
        .whenIntentName("FooWeatherIntent")
        .then(ax.say(thenTextOut))
        .otherwise(ax.say(otherwiseTextOut))
        .build();
      b.execute(context, event);

      expect(JSON.stringify(context.platformState.globalState)).equals(JSON.stringify({}));
      expect(context.currentResponse.response.outputSpeech).is.not.undefined;
      let ssml = <ui.SsmlOutputSpeech>context.currentResponse.response.outputSpeech;
      if (ssml) {
        expect(ssml.ssml).equals(`<speak>${otherwiseTextOut}</speak>`);
      }
    });
  });
});
