import { InteractionModel, Locale, SkillManifestEnvelope } from "../models";

export let getDefaultInteractionModel = (): InteractionModel => {
    return <InteractionModel>{
        interactionModel: {
            languageModel: {
                invocationName: "chitchat bot",
                modelConfiguration: {
                    fallbackIntentSensitivity: {
                        level: "LOW",
                    },
                },
                intents: [
                    {
                        name: "AMAZON.FallbackIntent",
                        samples: [],
                    },
                    {
                        name: "AMAZON.CancelIntent",
                        samples: [],
                    },
                    {
                        name: "AMAZON.HelpIntent",
                        samples: [],
                    },
                    {
                        name: "AMAZON.StopIntent",
                        samples: [],
                    },
                    {
                        name: "AMAZON.NavigateHomeIntent",
                        samples: [],
                    },
                ],
                types: [],
            },
        },
    };
};

export let getDefaultSkillManifest = (): SkillManifestEnvelope => {
    return <SkillManifestEnvelope>{
        manifest: {
            manifestVersion: "1.0",
            apis: {
                custom: {},
            },
            publishingInformation: {
                locales: {
                    "en-US": {
                        summary: "Sample Short Description",
                        examplePhrases: ["Alexa open chitchat bot", "hello", "help"],
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
    };
};

/**
 * path utils
 */
export namespace paths {
    export let getInteractionModelPath = (locale: Locale): string => {
        return `/interactionModels/custom/${locale}.json`;
    };

    export let getSkillManifestPath = () => {
        return "/skill.json";
    };
}
