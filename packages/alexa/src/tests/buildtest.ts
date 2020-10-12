import { alexa as ax } from "../blocks";
import { AlexaBuilderContext, InteractionModel, Locale, SkillManifestEnvelope } from "../models";
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
    .add(ax.info(Locale.en_US).invocationName("super skill").name("Super skill").build())
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

console.log(JSON.stringify(JSON.parse(ctx.resources.resourceMap[imKey]), null, 2));
console.log(JSON.stringify(JSON.parse(ctx.resources.resourceMap[skillManifest]), null, 2));

// console.log(extractVariables("{Hello} how are you {name} asdads {bla|AMAZON.US_CITY}"));
