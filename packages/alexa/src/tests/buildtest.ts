import { alexa as ax } from "../blocks";
import { AlexaBuilderContext, InteractionModel, Locale, SkillManifestEnvelope } from "../models";
import { context_util } from "../util/ContextUtil";
import { extractVariables } from "../util/StringUtils";

let b = ax
  .compound()
  .add(
    ax
      .whenUserSays([
        "hello how are you {num|AMAZON.NUMBER}",
        "what's {name} {name} up {name}",
        "what are you doing {boo}",
      ])
      .withSlotType("name", "AMAZON.FIRST_NAME")
      .withSlotType("boo", "AMAZON.US_CITY")
      .withSlotType("xxx", "AMAZON.FIRST_NAME")
      .then(ax.say("hello, {name}"))
      .build()
  )
  .add(
    ax
      .localize([Locale.en_US, Locale.en_IN, Locale.es_MX])
      .block(
        ax
          .compound()
          .add(ax.info().invocationName("super skill").name("Super skill").build())
          .add(ax.intent("HelloIntent", ["hello how are you"]).build())
          .add(
            ax
              .whenUserSays([
                "hello how are you {num|AMAZON.NUMBER}",
                "what's {name} {name} up {name}",
                "what are you doing {boo}",
              ])
              .withSlotType("name", "AMAZON.FIRST_NAME")
              .withSlotType("boo", "AMAZON.US_CITY")
              .withSlotType("xxx", "AMAZON.FIRST_NAME")
              .then(ax.say("hello, {name}"))
              .build()
          )
          .build()
      )
      .build()
  )
  // .add(
  //     ax
  //         .localize([Locale.en_CA])
  //         .block(
  //             ax
  //                 .slotType("AMAZON.US_CITY")
  //                 .values(["hapur", "ghaziabad"])
  //                 .build()
  //         )
  //         .build()
  // )
  .build();

let imKey = "/interactionModels/custom/en-US.json";
let ctx: AlexaBuilderContext = {
  resources: {
    resourceMap: {
      [imKey]: JSON.stringify(<InteractionModel>{
        interactionModel: {
          languageModel: {
            intents: [],
            invocationName: "foo",
            types: [],
          },
        },
      }),
    },
  },
};

let skillManifest = "/skill.json";
ctx.resources.resourceMap[skillManifest] = JSON.stringify(<SkillManifestEnvelope>{
  manifest: {
    manifestVersion: "1.0",
    apis: {
      custom: {},
    },
    publishingInformation: {
      locales: {
        "en-US": {
          summary: "Sample Short Description",
          examplePhrases: ["Alexa open hello world", "hello", "help"],
          name: "Chitchat Bot",
          description: "Sample Full Description",
        },
      },
      isAvailableWorldwide: true,
      testingInstructions: "Sample Testing Instructions.",
      category: "KNOWLEDGE_AND_TRIVIA",
      distributionCountries: [],
    },
  },
});

b.build(ctx);

// console.log(JSON.stringify(ctx.resources.resourceMap, null, 2));
// console.log(JSON.stringify(JSON.parse(ctx.resources.resourceMap[imKey]), null, 2));
// console.log(JSON.stringify(JSON.parse(ctx.resources.resourceMap[skillManifest]), null, 2));
// console.log(JSON.stringify(ctx.resources.resourceMap, null, 2));
// console.log(extractVariables("{Hello} how are you {name} asdads {bla|AMAZON.US_CITY}"));

console.log("enus: " + JSON.stringify(context_util.getIM(ctx, Locale.en_US)));
console.log("enin: " + JSON.stringify(context_util.getIM(ctx, Locale.en_IN)));
console.log("esmx: " + JSON.stringify(context_util.getIM(ctx, Locale.es_MX)));
