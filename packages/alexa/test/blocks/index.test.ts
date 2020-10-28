import { Directive, ui } from "ask-sdk-model";
import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { alexa, alexa as ax, AlexaDialogContext, AlexaEvent, SlotType } from "../../src";
import { intentRequest as helloIntentRequestNoSlots } from "../data/intentRequest";
import { intentRequestOneMissingSlot as weatherIntentRequestWithOneSlot } from "../data/intentRequestOneMissingSlot";
import { launchRequest } from "../data/launchRequest";
import { sessionEndedRequest } from "../data/sessionEndedRequest";

describe("alexa", () => {
  describe(".dialogManager()", () => {
    it("should return a valid dialog manager", () => {
      let skill = ax
        .skill()
        .addState(ax.start().block(ax.say("hello")).build())
        .build();

      let dm = ax.dialogManager(skill);

      expect(dm.dialogEngine).is.not.undefined;
      expect(JSON.stringify(dm.skill)).equals(JSON.stringify(skill));
      // expect(JSON.stringify(b.blocks[0])).equals(JSON.stringify(ax.say("hello")));
      // expect(JSON.stringify(b.blocks[1])).equals(JSON.stringify(ax.say("bye")));
    });
  });

  describe(".whenIntentName()", () => {
    describe("with no slots", () => {
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
        let b = ax
          .whenIntentName("HelloIntent")
          .then(ax.say(thenTextOut))
          .otherwise(ax.say(otherwiseTextOut))
          .build();
        await b.execute(context, event);

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
        let b = ax
          .whenIntentName("FooHelloIntent")
          .then(ax.say(thenTextOut))
          .otherwise(ax.say(otherwiseTextOut))
          .build();
        await b.execute(context, event);

        expect(JSON.stringify(context.platformState.globalState)).equals(JSON.stringify({}));
        expect(context.currentResponse.response.outputSpeech).is.not.undefined;
        let ssml = <ui.SsmlOutputSpeech>context.currentResponse.response.outputSpeech;
        if (ssml) {
          expect(ssml.ssml).equals(`<speak>${otherwiseTextOut}</speak>`);
        }
      });
    });

    describe("with slots", () => {
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
        let b = ax
          .whenIntentName("WeatherIntent")
          .then(ax.say(thenTextOut))
          .otherwise(ax.say(otherwiseTextOut))
          .build();
        await b.execute(context, event);

        expect(JSON.stringify(context.platformState.globalState)).equals(
          JSON.stringify({ city: "seattle" })
        );
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
        await b.execute(context, event);

        expect(JSON.stringify(context.platformState.globalState)).equals(JSON.stringify({}));
        expect(context.currentResponse.response.outputSpeech).is.not.undefined;
        let ssml = <ui.SsmlOutputSpeech>context.currentResponse.response.outputSpeech;
        if (ssml) {
          expect(ssml.ssml).equals(`<speak>${otherwiseTextOut}</speak>`);
        }
      });
    });
  });

  describe(".goto()", () => {
    it("should return correct block", () => {
      let b = ax.goto("state2");
      expect(b.type).to.equal("GotoStateBlock");
      expect(_.isEqual(b.name, "state2")).to.be.true;
    });
  });

  describe(".end()", () => {
    it("should return correct block", () => {
      let b = ax.end();
      let context: AlexaDialogContext = {
        platformState: { currentStateName: "", globalState: {} },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: sessionEndedRequest,
      };

      b.execute(context, event);
      expect(b.type).to.equal("WhenBlock");
      expect(b.condition(context, event)).to.be.true;
    });
  });

  describe(".compound()", () => {
    it("should return correct block", () => {
      let b = ax.compound().add(ax.say("hello")).add(ax.say("bye")).build();

      expect(b.type).to.equal("CompoundBlock");
      expect(JSON.stringify(b.blocks[0])).equals(JSON.stringify(ax.say("hello")));
      expect(JSON.stringify(b.blocks[1])).equals(JSON.stringify(ax.say("bye")));
    });
  });

  describe(".whenOnLaunch()", () => {
    it("should execute on launch", async () => {
      let b = ax.whenLaunch().then(ax.say("hello")).build();

      expect(b.type).to.equal("WhenBlock");
      expect(JSON.stringify(b.then)).equals(JSON.stringify(ax.say("hello")));

      let context: AlexaDialogContext = {
        platformState: { currentStateName: "", globalState: {} },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: launchRequest,
      };

      await b.execute(context, event);

      expect(context.currentResponse.response.outputSpeech).is.not.undefined;
      let ssml = <ui.SsmlOutputSpeech>context.currentResponse.response.outputSpeech;
      if (ssml) {
        expect(ssml.ssml).equals(`<speak>hello</speak>`);
      }
    });
  });

  describe(".whenUserSays()", () => {
    it("should return correct block", () => {
      let b = ax.whenUserSays(["hello"]).then(ax.say("bye")).build();

      expect(b.type).to.equal("WhenUserSaysBlock");
      expect(_.isEqual(b.sampleUtterances, ["hello"])).to.be.true;
      expect(JSON.stringify(b.then)).equals(JSON.stringify(ax.say("bye")));
    });
  });

  describe(".setStateVar()", () => {
    it("should set single var", () => {
      let b = ax.setStateVar("foo", "bar");
      let context: AlexaDialogContext = {
        platformState: {
          currentStateName: "",
          globalState: {},
        },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: sessionEndedRequest,
      };

      expect(b.type).to.equal("SetGlobalStateBlock");
      let s = b.evaluate(context, event);
      expect(_.isEqual(s, { foo: "bar" })).to.be.true;
    });

    it("should remove multiple vars", () => {
      let b = ax.setStateVar((ctx: AlexaDialogContext, event: AlexaEvent): {
        [name: string]: any;
      } => {
        return {
          foo: 1,
          foo2: 2,
        };
      });
      let context: AlexaDialogContext = {
        platformState: {
          currentStateName: "",
          globalState: {},
        },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: sessionEndedRequest,
      };

      expect(b.type).to.equal("SetGlobalStateBlock");
      let s = b.evaluate(context, event);
      expect(
        _.isEqual(s, {
          foo: 1,
          foo2: 2,
        })
      ).to.be.true;
    });
  });

  describe(".removeStateVar()", () => {
    it("should remove single var", () => {
      let b = ax.removeStateVar("foo");
      let context: AlexaDialogContext = {
        platformState: {
          currentStateName: "",
          globalState: {},
        },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: sessionEndedRequest,
      };

      expect(b.type).to.equal("RemoveGlobalStateBlock");
      let s = b.evaluate(context, event);
      expect(_.isEqual(s, ["foo"])).to.be.true;
    });

    it("should remove multiple vars", () => {
      let b = ax.removeStateVar(["foo", "foo2"]);
      let context: AlexaDialogContext = {
        platformState: {
          currentStateName: "",
          globalState: {},
        },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: sessionEndedRequest,
      };

      expect(b.type).to.equal("RemoveGlobalStateBlock");
      let s = b.evaluate(context, event);
      expect(_.isEqual(s, ["foo", "foo2"])).to.be.true;
    });

    it("should remove using supplied method", () => {
      let b = ax.removeStateVar((ctx: AlexaDialogContext, event: AlexaEvent): string[] => {
        return ["foo", "foo2"];
      });
      let context: AlexaDialogContext = {
        platformState: {
          currentStateName: "",
          globalState: {},
        },
        currentResponse: {
          version: "1.0",
          response: JSON.parse("{}"),
        },
      };
      let event: AlexaEvent = {
        currentRequest: sessionEndedRequest,
      };

      expect(b.type).to.equal("RemoveGlobalStateBlock");
      let s = b.evaluate(context, event);
      expect(_.isEqual(s, ["foo", "foo2"])).to.be.true;
    });
  });

  describe(".info()", () => {
    it("should return correct block", () => {
      let b = ax.info().name("foo").invocationName("bar").build();

      expect(b.type).to.equal("SkillInfoBlock");
      expect(_.isEqual(b.skillName, "foo")).to.be.true;
      expect(_.isEqual(b.invocationName, "bar")).to.be.true;
    });
  });

  describe(".run()", () => {
    it("should return correct block", async () => {
      let b = ax.run().build();

      expect(b.type).to.equal("DoBlock");
      expect(b.doBuild).is.undefined;
      expect(b.doExecute).is.undefined;
    });
  });

  describe(".slotType()", () => {
    it("should return correct block", () => {
      let b = ax.slotType("TestSlotType").values(["foo"]).build();

      expect(b.type).to.equal("SlotTypeBlock");
      expect(
        _.isEqual(b.slotType, <SlotType>{
          name: "TestSlotType",
          values: [{ name: { value: "foo" } }],
        })
      ).to.be.true;
    });
  });

  describe(".intent()", () => {
    it("should return correct block", () => {
      let b = ax.intent("TestIntent", ["test sample"]).build();

      expect(b.type).to.equal("IntentBlock");
      expect(_.isEqual(b.name, "TestIntent")).to.be.true;
      expect(_.isEqual(b.samples, ["test sample"])).to.be.true;
    });
  });

  describe(".whenMissingSlot()", () => {
    it("should return correct block", () => {
      let thenBlock = ax.say("hello");
      let b = ax.whenMissingSlot("testSlot").then(thenBlock).build();

      expect(b.type).to.equal("WhenSlotNotFilledBlock");
      expect(_.isEqual(b.then, thenBlock)).to.be.true;
      expect(_.isEqual(b.name, "testSlot")).to.be.true;
    });
  });

  describe(".ssml()", () => {
    it("should add the ssml", () => {
      let ssmlText = "ssml text";
      let b = ax.ssml(ssmlText).build();

      expect(b.type).to.equal("SSMLSpeechBlock");
      expect(_.isEqual(b.speech, ssmlText)).to.be.true;
    });
  });

  describe(".directive()", () => {
    it("should add a directive", () => {
      let d: Directive = {
        type: "AudioPlayer.Stop",
      };
      let b = ax.directive(d);

      expect(b.type).to.equal("DirectiveBlock");
      expect(_.isEqual(b.directive, d)).to.be.true;
    });
  });
});
