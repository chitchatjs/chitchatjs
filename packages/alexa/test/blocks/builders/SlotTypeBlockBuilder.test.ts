import { SlotTypeBlockBuilder } from "../../../src/blocks/builders/SlotTypeBlockBuilder";
import { context_util } from "../../../src/util/ContextUtil";
import * as _ from "lodash";
import { expect } from "chai";
import "mocha";
import {
  AlexaBlock,
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  Locale,
  SlotType,
  SlotValue,
} from "../../../src/models";
import { paths, resource_utils } from "../../../src/util/ResourceUtil";
import { values } from "lodash";

let mockBlock: AlexaBlock = {
  build: () => {},
  execute: () => {},
};

describe("SlotTypeBlockBuilder", () => {
  describe("name, values, slotType validation tests", () => {
    it("should throw validation error if name, values and slotType all are missing", async () => {
      let err: Error = new Error();
      try {
        new SlotTypeBlockBuilder().build();
      } catch (e) {
        err = e;
      }
      expect(err.message).to.be.equal(
        "Either (name,values) or slotType is required in the SlotTypeBlock."
      );
    });

    it("should throw validation error if name is missing but values are present", async () => {
      let err: Error = new Error();
      try {
        new SlotTypeBlockBuilder().values(["value1", "value2"]).build();
      } catch (e) {
        err = e;
      }
      expect(err.message).to.be.equal("name is missing in the SlotTypeBlock.");
    });

    it("should throw validation error if values are missing but name is present", async () => {
      let err: Error = new Error();
      try {
        new SlotTypeBlockBuilder("SlotName").build();
      } catch (e) {
        err = e;
      }
      expect(err.message).to.be.equal("values are missing in the SlotTypeBlock.");
    });
  });

  describe("name and values present tests", () => {
    it("should build slottype correctly if name and values are present. no locales, no interaction model set", async () => {
      let slotName = "SlotName";
      let values = ["value1", "value2"];
      let b = new SlotTypeBlockBuilder(slotName).values(values).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = { resources: { resourceMap: {} } };
      b.build(ctx);

      assertSlotNameAndValues(ctx, Locale.en_US, slotName, values);
    });

    it("should build slottype correctly if name and values are present. locales present, no interaction model set", async () => {
      let slotName = "SlotName";
      let values = ["value1", "value2"];
      let b = new SlotTypeBlockBuilder(slotName).values(values).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: { resourceMap: {} },
        currentLocales: [Locale.en_US, Locale.en_CA],
      };
      b.build(ctx);

      assertSlotNameAndValues(ctx, Locale.en_US, slotName, values);
      assertSlotNameAndValues(ctx, Locale.en_CA, slotName, values);
    });

    it("should build slottype correctly if name and values are present. locales not present but interaction model set", async () => {
      let slotName = "SlotName";
      let values = ["value1", "value2"];
      let b = new SlotTypeBlockBuilder(slotName).values(values).build();

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

      assertSlotNameAndValues(ctx, Locale.en_US, slotName, values);
    });

    it("should build slottype correctly if name and values are present. both locales and interaction models set", async () => {
      let slotName = "SlotName";
      let values = ["value1", "value2"];
      let b = new SlotTypeBlockBuilder(slotName).values(values).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            [paths.getInteractionModelPath(Locale.en_US)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
            [paths.getInteractionModelPath(Locale.en_CA)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
          },
        },
        currentLocales: [Locale.en_US, Locale.en_CA],
      };

      b.build(ctx);

      assertSlotNameAndValues(ctx, Locale.en_US, slotName, values);
      assertSlotNameAndValues(ctx, Locale.en_CA, slotName, values);
    });
  });

  describe("name, values and synonyms present tests", () => {
    it("should build slottype correctly if name, values and synonyms are present.", async () => {
      let slotName = "SlotName";
      let values: SlotValue[] = [
        {
          id: "id1",
          value: "value1",
          synonyms: ["syn1", "syn2"],
        },
        {
          id: "id2",
          value: "value2",
          synonyms: ["syn3", "syn4"],
        },
      ];
      let b = new SlotTypeBlockBuilder(slotName).valuesWithSynonym(values).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = { resources: { resourceMap: {} } };
      b.build(ctx);

      assertSlotNameAndValuesWithSynonyms(ctx, Locale.en_US, slotName, values);
    });
  });

  describe("only slotType present tests", () => {
    it("should build slottype correctly if name and values are present. no locales, no interaction model set", async () => {
      let slotType: SlotType = {
        name: "SlotName",
        values: [
          {
            name: {
              value: "value1",
            },
          },
          {
            name: {
              value: "value2",
            },
          },
        ],
      };

      let b = new SlotTypeBlockBuilder().import(slotType).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = { resources: { resourceMap: {} } };
      b.build(ctx);

      assertSlotType(ctx, Locale.en_US, slotType);
    });

    it("should build slottype correctly if name and values are present. locales present, no interaction model set", async () => {
      let slotType: SlotType = {
        name: "SlotName",
        values: [
          {
            name: {
              value: "value1",
            },
          },
          {
            name: {
              value: "value2",
            },
          },
        ],
      };

      let b = new SlotTypeBlockBuilder().import(slotType).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: { resourceMap: {} },
        currentLocales: [Locale.en_US, Locale.en_CA],
      };
      b.build(ctx);

      assertSlotType(ctx, Locale.en_US, slotType);
      assertSlotType(ctx, Locale.en_CA, slotType);
    });

    it("should build slottype correctly if name and values are present. locales not present but interaction model set", async () => {
      let slotType: SlotType = {
        name: "SlotName",
        values: [
          {
            name: {
              value: "value1",
            },
          },
          {
            name: {
              value: "value2",
            },
          },
        ],
      };

      let b = new SlotTypeBlockBuilder().import(slotType).build();

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

      assertSlotType(ctx, Locale.en_US, slotType);
    });

    it("should build slottype correctly if name and values are present. both locales and interaction models set", async () => {
      let slotType: SlotType = {
        name: "SlotName",
        values: [
          {
            name: {
              value: "value1",
            },
          },
          {
            name: {
              value: "value2",
            },
          },
        ],
      };

      let b = new SlotTypeBlockBuilder().import(slotType).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            [paths.getInteractionModelPath(Locale.en_US)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
            [paths.getInteractionModelPath(Locale.en_CA)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
          },
        },
        currentLocales: [Locale.en_US, Locale.en_CA],
      };
      b.build(ctx);

      assertSlotType(ctx, Locale.en_US, slotType);
      assertSlotType(ctx, Locale.en_CA, slotType);
    });
  });

  describe("non en-us locale tests", () => {
    it("should build slottype correctly if name and values are present. only en_CA locale set and interaction models set", async () => {
      let slotName = "SlotName";
      let values = ["value1", "value2"];
      let b = new SlotTypeBlockBuilder(slotName).values(values).build();

      expect(b).is.not.be.undefined;

      let ctx: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            [paths.getInteractionModelPath(Locale.en_US)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
            [paths.getInteractionModelPath(Locale.en_CA)]: JSON.stringify(
              resource_utils.getDefaultInteractionModel()
            ),
          },
        },
        currentLocales: [Locale.en_CA],
      };

      b.build(ctx);

      assertSlotNameAndValues(ctx, Locale.en_CA, slotName, values);
    });
  });

  describe("duplicate slot types tests", () => {
    it("should overwrite slottype if slot type name is already present in the IM", async () => {
      let slotName = "SlotName";
      let values = ["value1", "value2"];
      let b = new SlotTypeBlockBuilder(slotName).values(values).build();

      expect(b).is.not.be.undefined;

      let existingIM = resource_utils.getDefaultInteractionModel();
      existingIM.interactionModel?.languageModel?.types?.push({
        name: "SlotName",
      });

      let ctx: AlexaBuilderContext = {
        resources: {
          resourceMap: {
            [paths.getInteractionModelPath(Locale.en_US)]: JSON.stringify(existingIM),
          },
        },
        currentLocales: [Locale.en_US],
      };

      b.build(ctx);

      assertSlotNameAndValues(ctx, Locale.en_US, slotName, values);
    });
  });
});

function assertSlotType(ctx: AlexaBuilderContext, locale: Locale, slotType: SlotType) {
  // i know bad :(
  // will fix
  if (
    slotType &&
    slotType.name &&
    slotType.values &&
    slotType.values[0] &&
    slotType.values[1] &&
    slotType.values[0].name &&
    slotType.values[1].name &&
    slotType.values[0].name.value &&
    slotType.values[1].name.value
  )
    assertSlotNameAndValues(ctx, locale, slotType.name, [
      slotType?.values[0].name.value,
      slotType?.values[1].name.value,
    ]);
}

function assertSlotNameAndValues(
  ctx: AlexaBuilderContext,
  locale: Locale,
  expectedSlotName: string,
  expectedValues: string[]
) {
  let im = context_util.getIM(ctx, locale);
  expect(im).to.not.be.undefined;
  let types = im?.interactionModel?.languageModel?.types;
  expect(types).is.not.undefined;
  expect(types?.length).equals(1);
  if (types) {
    expect(types[0].name).equals(expectedSlotName);
    expect(types[0].values).is.not.undefined;
    expect(JSON.stringify(types[0].values)).equals(
      JSON.stringify([
        { name: { value: expectedValues[0] } },
        { name: { value: expectedValues[1] } },
      ])
    );
  }
}

function assertSlotNameAndValuesWithSynonyms(
  ctx: AlexaBuilderContext,
  locale: Locale,
  expectedSlotName: string,
  expectedValues: SlotValue[]
) {
  let im = context_util.getIM(ctx, locale);
  expect(im).to.not.be.undefined;
  let types = im?.interactionModel?.languageModel?.types;
  expect(types).is.not.undefined;
  expect(types?.length).equals(1);
  if (types) {
    expect(types[0].name).equals(expectedSlotName);
    expect(types[0].values).is.not.undefined;
    expect(JSON.stringify(types[0].values)).equals(
      JSON.stringify([
        {
          id: expectedValues[0].id,
          name: { value: expectedValues[0].value, synonyms: expectedValues[0].synonyms },
        },
        {
          id: expectedValues[1].id,
          name: { value: expectedValues[1].value, synonyms: expectedValues[1].synonyms },
        },
      ])
    );
  }
}
