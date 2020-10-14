import { AlexaBuilderContext, AlexaDialogContext, InteractionModel, Locale, SkillManifestEnvelope } from "../models";
import { paths } from "./ResourceUtil";

export namespace context_util {
    export let getIM = (context: AlexaBuilderContext, locale: Locale): InteractionModel => {
        return JSON.parse(getIMString(context, locale));
    };

    export let getIMString = (context: AlexaBuilderContext, locale: Locale): string => {
        let im = context.resources.resourceMap[paths.getInteractionModelPath(locale)];

        if (!im) {
            throw new Error(
                `Interaction Model does not exist in the AlexaBuilderContext resourceMap for locale ${locale}`
            );
        }
        return im;
    };

    export let getSkillManifest = (context: AlexaBuilderContext): SkillManifestEnvelope => {
        return JSON.parse(getSkillManifestString(context));
    };

    export let getSkillManifestString = (context: AlexaBuilderContext): string => {
        let m = context.resources.resourceMap[paths.getSkillManifestPath()];

        if (!m) {
            throw new Error(`Skill Manifest does not exist in the AlexaBuilderContext resourceMap`);
        }
        return m;
    };
}
