import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  InteractionModel,
  Locale,
  SkillManifestEnvelope,
} from "../models";
import { paths } from "./ResourceUtil";

export namespace context_util {
  export let getIM = (context: AlexaBuilderContext, locale: Locale): InteractionModel => {
    return JSON.parse(getIMString(context, locale));
  };

  export let getIMString = (context: AlexaBuilderContext, locale: Locale): string => {
    const im = context.resources.resourceMap[paths.getInteractionModelPath(locale)];

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
    const m = context.resources.resourceMap[paths.getSkillManifestPath()];

    if (!m) {
      throw new Error(`Skill Manifest does not exist in the AlexaBuilderContext resourceMap`);
    }
    return m;
  };

  export let shouldRender = (context: AlexaDialogContext, event: AlexaEvent): boolean => {
    const eventLocaleStr = (event.currentRequest.request.locale || "en_US").replace("-", "_");

    // tslint:disable-next-line:no-angle-bracket-type-assertion
    const eventLocale: Locale = (<any>Locale)[eventLocaleStr];
    const configuredLocales = context.currentLocales;

    // if no locales are configured, we render
    if (!configuredLocales || configuredLocales.length === 0) {
      return true;
    }

    // otherwise, we check if event locale is in the configured locales.
    if (configuredLocales.includes(eventLocale)) {
      return true;
    }
    return false;
  };
}
