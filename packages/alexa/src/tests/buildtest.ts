import { alexa as ax } from "../blocks";
import { AlexaBuilderContext, InteractionModel } from "../models";
import { extractVariables } from "../util/StringUtils";

let b = ax
    .whenUserSays([
        "hello how are you {num|AMAZON.NUMBER}",
        "what's {name} {name} up {name}",
        "what are you doing {boo}",
    ])
    .withSlotType("name", "AMAZON.FIRST_NAME")
    .withSlotType("boo", "AMAZON.US_CITY")
    .withSlotType("xxx", "AMAZON.FIRST_NAME")
    .then(ax.say("hello, {name}"))
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

b.build(ctx);

// console.log(JSON.stringify(ctx.resources.resourceMap, null, 2));

console.log(JSON.stringify(JSON.parse(ctx.resources.resourceMap[imKey]), null, 2));

// console.log(extractVariables("{Hello} how are you {name} asdads {bla|AMAZON.US_CITY}"));
