import {
    AlexaBuilderContext,
    AlexaDialogContext,
    DEFAULT_LOCALE,
    InteractionModel,
    Locale,
    SkillManifestEnvelope,
} from "../models";

export namespace resource_utils {
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

    export let getInteractionModelOrDefault = (context: AlexaBuilderContext, locale: Locale): InteractionModel => {
        let imPath = paths.getInteractionModelPath(locale);

        let im: InteractionModel | undefined = undefined;
        if (!context.resources.resourceMap[imPath]) {
            im = getDefaultInteractionModel();
        } else {
            im = JSON.parse(context.resources.resourceMap[paths.getInteractionModelPath(locale)]);
        }

        if (!im) throw new Error("Internal error, got undefined im.");
        return im;
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

    export let invokePerLocale = (
        context: AlexaBuilderContext,
        f: (context: AlexaBuilderContext, locale: Locale) => void
    ) => {
        let locales = context.currentLocales;
        if (!locales || locales.length === 0) {
            f(context, DEFAULT_LOCALE);
        } else {
            locales.forEach((locale) => f(context, locale));
        }
    };
}

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
