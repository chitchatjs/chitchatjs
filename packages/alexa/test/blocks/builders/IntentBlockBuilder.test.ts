import { IntentBlockBuilder } from "../../../src/blocks/builders/IntentBlockBuilder";
import { context_util } from "../../../src/util/ContextUtil";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import { AlexaBuilderContext, Locale, Slot } from "../../../src/models";
import { paths, resource_utils } from "../../../src/util/ResourceUtil";

describe("IntentBlockBuilder", () => {
  describe("name, samples, slots validation tests", () => {
    it("should throw validation error if name is missing", async () => {
      let err: Error = new Error();
      try {
        new IntentBlockBuilder().build();
      } catch (e) {
        err = e;
      }
      expect(err.message).to.be.equal("name is missing in the intent block.");
    });

    it("should not throw validation error if samples are missing", async () => {
      let err: Error | undefined = undefined;

      try {
        new IntentBlockBuilder().name("HelloIntent").build();
      } catch (e) {
        err = e;
      }

      expect(err).to.be.undefined;
    });

    it("should not throw validation error if slots are missing", async () => {
      let err: Error | undefined;
      try {
        new IntentBlockBuilder().name("HelloIntent").samples(["hello world"]).build();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.undefined;
    });
  });

  describe("name and samples present tests", () => {
    it("should build intent correctly if name and samples are present. no locales, no interaction model set", async () => {
      let intentName = "HelloIntent";
      let samples = ["hello world"];

      let b = new IntentBlockBuilder(intentName).samples(samples).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = { resources: { resourceMap: {} } };
      b.build(ctx);

      assertIntentNameAndSamplesAndSlots(ctx, Locale.en_US, intentName, samples);
    });

    it("should build intent correctly if name and samples are present. yes locales, no interaction model set", async () => {
      let intentName = "HelloIntent";
      let samples = ["hello world"];

      let b = new IntentBlockBuilder(intentName).samples(samples).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: { resourceMap: {} },
        currentLocales: [Locale.en_CA, Locale.en_AU],
      };
      b.build(ctx);

      assertIntentNameAndSamplesAndSlots(ctx, Locale.en_CA, intentName, samples);
      assertIntentNameAndSamplesAndSlots(ctx, Locale.en_AU, intentName, samples);
    });

    it("should build intent correctly if name and samples are present. no locales, yes interaction model set", async () => {
      let intentName = "HelloIntent";
      let samples = ["hello world"];

      let b = new IntentBlockBuilder(intentName).samples(samples).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            [paths.getInteractionModelPath(Locale.en_US)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
          },
        },
      };
      b.build(ctx);

      assertIntentNameAndSamplesAndSlots(ctx, Locale.en_US, intentName, samples);
    });

    it("should build intent correctly if name and samples are present. yes locales, yes interaction model set", async () => {
      let intentName = "HelloIntent";
      let samples = ["hello world"];

      let b = new IntentBlockBuilder(intentName).samples(samples).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            [paths.getInteractionModelPath(Locale.en_US)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
          },
        },
        currentLocales: [Locale.en_US, Locale.en_IN],
      };
      b.build(ctx);

      assertIntentNameAndSamplesAndSlots(ctx, Locale.en_US, intentName, samples);
      assertIntentNameAndSamplesAndSlots(ctx, Locale.en_IN, intentName, samples);
    });
  });

  describe("all name and samples and slots present tests", () => {
    it("should build intent correctly if name and samples and slots are present. no locales, no interaction model set", async () => {
      let intentName = "HelloIntent";
      let samples = ["hello world {name}"];
      let slotName = "name";
      let slotTypeName = "AMAZON.FirstName";

      let b = new IntentBlockBuilder(intentName)
        .samples(samples)
        .slot(slotName, slotTypeName)
        .build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = { resources: { resourceMap: {} } };
      b.build(ctx);

      assertIntentNameAndSamplesAndSlots(ctx, Locale.en_US, intentName, samples, [
        <Slot>{
          type: slotTypeName,
          name: slotName,
        },
      ]);
    });
  });
});

function assertIntentNameAndSamplesAndSlots(
  ctx: AlexaBuilderContext,
  locale: Locale,
  expectedIntentName: string,
  expectedSamples: string[],
  expectedSlots?: Slot[]
) {
  let im = context_util.getIM(ctx, locale);

  expect(im).to.not.be.undefined;
  let intents = im?.interactionModel?.languageModel?.intents;
  expect(intents).to.not.be.undefined;
  if (intents) {
    expect(intents.length).equals(1); // because 5 already available builtins
    expect(intents[0].name).equals(expectedIntentName);
    expect(intents[0].samples).is.not.undefined;
    expect(JSON.stringify(intents[0].samples)).equals(JSON.stringify(expectedSamples));

    if (expectedSlots) {
      expect(intents[0].slots).to.not.be.undefined;

      if (intents[0].slots) {
        expect(intents[0].slots.length).equals(1);
      }
    }
  }
}
