import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  DEFAULT_LOCALE,
  InteractionModel,
  SkillInfoBlock,
} from "../../models";
import { Locale, SkillManifestEnvelope } from "../../models";
import { resource_utils, paths } from "../../util/ResourceUtil";

/**
 * Generates localized Skill Info in the Skill Manifest file.
 */
export class SkillInfoBlockBuilder {
  private _name: string;
  private _invocationName: string;

  constructor() {
    this._name = "";
    this._invocationName = "";
  }

  name(name: string) {
    this._name = name;
    return this;
  }

  invocationName(name: string) {
    this._invocationName = name;
    return this;
  }

  build(): SkillInfoBlock {
    return {
      type: "SkillInfoBlock",
      skillName: this._name,
      invocationName: this._invocationName,
      execute: (context: AlexaDialogContext, event: AlexaEvent) => {},
      build: this._builder,
    };
  }

  private _builder = (context: AlexaBuilderContext): void => {
    const locales = context.currentLocales;
    if (!locales || locales.length === 0) {
      this._updateArtifacts(context, DEFAULT_LOCALE);
    } else {
      locales.forEach((locale) => this._updateArtifacts(context, locale));
    }
  };

  private _updateArtifacts = (context: AlexaBuilderContext, locale: Locale) => {
    if (this._name) {
      this._updateNameInManifest(context, locale);
    }

    if (this._invocationName) {
      this._updateInvocationNameInIM(context, locale);
    }
  };

  private _updateNameInManifest = (context: AlexaBuilderContext, locale: Locale) => {
    const skillManifestPath = paths.getSkillManifestPath();

    let skillManifestEnvelope: SkillManifestEnvelope | undefined;

    if (!context.resources.resourceMap[skillManifestPath]) {
      skillManifestEnvelope = resource_utils.getDefaultSkillManifest();
    } else {
      skillManifestEnvelope = JSON.parse(
        context.resources.resourceMap[paths.getSkillManifestPath()]
      );
    }

    if (skillManifestEnvelope && skillManifestEnvelope.manifest) {
      const publishingInfo = skillManifestEnvelope.manifest.publishingInformation;

      if (publishingInfo && publishingInfo.locales) {
        if (!publishingInfo.locales[locale]) {
          publishingInfo.locales[locale] = {
            name: this._name,
          };
        } else {
          publishingInfo.locales[locale].name = this._name;
        }

        context.resources.resourceMap[paths.getSkillManifestPath()] = JSON.stringify(
          skillManifestEnvelope
        );
      }
    }
  };

  private _updateInvocationNameInIM = (context: AlexaBuilderContext, locale: Locale) => {
    const imPath = paths.getInteractionModelPath(locale);

    let im: InteractionModel | undefined;
    if (!context.resources.resourceMap[imPath]) {
      im = resource_utils.getDefaultInteractionModel();
    } else {
      im = JSON.parse(context.resources.resourceMap[paths.getInteractionModelPath(locale)]);
    }

    if (im && im.interactionModel && im.interactionModel.languageModel) {
      im.interactionModel.languageModel.invocationName = this._invocationName;
    }

    context.resources.resourceMap[paths.getInteractionModelPath(locale)] = JSON.stringify(im);
  };
}
