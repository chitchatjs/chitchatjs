import { update } from "lodash";
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
  private _smallIconUri?: string;
  private _largeIconUri?: string;
  private _summary?: string;
  private _description?: string;
  private _updatesDescription?: string;
  private _examplePhrases?: string[];
  private _keywords?: string[];

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

  icons(smallIconUri: string, largeIconUri: string) {
    this._smallIconUri = smallIconUri;
    this._largeIconUri = largeIconUri;
    return this;
  }

  summary(summary: string) {
    this._summary = summary;
    return this;
  }

  description(description: string) {
    this._description = description;
    return this;
  }

  updatesDescription(updatesDesc: string) {
    this._updatesDescription = updatesDesc;
    return this;
  }

  examplePhrases(exPhrases: string[]) {
    this._examplePhrases = exPhrases;
    return this;
  }

  keywords(keywords: string[]) {
    this._keywords = keywords;
    return this;
  }

  build(): SkillInfoBlock {
    return {
      type: "SkillInfoBlock",
      skillName: this._name,
      invocationName: this._invocationName,
      smallIconUri: this._smallIconUri,
      largeIconUri: this._largeIconUri,
      summary: this._summary,
      description: this._description,
      updatesDescription: this._updatesDescription,
      examplePhrases: this._examplePhrases,
      keywords: this._keywords,
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
            smallIconUri: this._smallIconUri,
            largeIconUri: this._largeIconUri,
            summary: this._summary,
            description: this._description,
            updatesDescription: this._updatesDescription,
            examplePhrases: this._examplePhrases,
            keywords: this._keywords,
          };
        } else {
          publishingInfo.locales[locale].name = this._name;
          publishingInfo.locales[locale].smallIconUri = this._smallIconUri;
          publishingInfo.locales[locale].largeIconUri = this._largeIconUri;
          publishingInfo.locales[locale].summary = this._summary;
          publishingInfo.locales[locale].description = this._description;
          publishingInfo.locales[locale].updatesDescription = this._updatesDescription;
          publishingInfo.locales[locale].examplePhrases = this._examplePhrases;
          publishingInfo.locales[locale].keywords = this._keywords;
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
      im = JSON.parse(
        context.resources.resourceMap[paths.getInteractionModelPath(locale)]
      );
    }

    if (im && im.interactionModel && im.interactionModel.languageModel) {
      im.interactionModel.languageModel.invocationName = this._invocationName;
    }

    context.resources.resourceMap[paths.getInteractionModelPath(locale)] = JSON.stringify(
      im
    );
  };
}
