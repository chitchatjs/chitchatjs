import { v1 } from "ask-smapi-model";

import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  ax,
  SkillManifestEnvelope,
} from "@chitchatjs/alexa";
import { Resources } from "@chitchatjs/core";

import * as imageLeftDetailDoc from "./apl/imageLeftDetail.json";
import * as imageWithTitleDoc from "./apl/imageWithTitle.json";
import * as shortTextDoc from "./apl/shortText.json";

/**
 * Display
 */
export namespace display {
  /**
   * Conditions
   */
  export namespace conditionals {
    /**
     * Checks if device supports screen display.
     */
    export let whenScreenDisplay = () => {
      return ax.when().true((c: AlexaDialogContext, e: AlexaEvent) => {
        let supportedInterfaces =
          e.currentRequest.context.System.device?.supportedInterfaces;

        if (supportedInterfaces && "Alexa.Presentation.APL" in supportedInterfaces) {
          return true;
        }
        return false;
      });
    };
  }

  /**
   * Some core utilities
   */
  export namespace core {
    /**
     * Enables APL interface in the skill manifest.
     */
    export const enableAPLInterface = () => {
      return ax
        .custom()
        .builder(
          (c: AlexaBuilderContext): Resources => {
            let resources = c.resources;
            let skillManifestStr = resources.resourceMap["/skill.json"];

            let skillManifest: SkillManifestEnvelope | undefined;
            if (!skillManifestStr) {
              skillManifest = {
                manifest: {
                  apis: {
                    custom: {
                      interfaces: [],
                    },
                  },
                },
              };
            } else {
              skillManifest = JSON.parse(skillManifestStr);
              if (skillManifest && !skillManifest.manifest) skillManifest.manifest = {};
              if (skillManifest && skillManifest.manifest && !skillManifest.manifest.apis)
                skillManifest.manifest.apis = {};
              if (
                skillManifest &&
                skillManifest.manifest &&
                skillManifest.manifest.apis &&
                !skillManifest.manifest.apis.custom
              )
                skillManifest.manifest.apis.custom = {};
              if (
                skillManifest &&
                skillManifest.manifest &&
                skillManifest.manifest.apis &&
                skillManifest.manifest.apis.custom &&
                !skillManifest.manifest.apis.custom.interfaces
              )
                skillManifest.manifest.apis.custom.interfaces = [];
            }

            let aplInterface: v1.skill.Manifest.Interface = {
              type: "ALEXA_PRESENTATION_APL",
              supportedViewports: [
                {
                  mode: "HUB",
                  shape: "ROUND",
                  minWidth: 480,
                  maxWidth: 480,
                  minHeight: 480,
                  maxHeight: 480,
                },
                {
                  mode: "HUB",
                  shape: "RECTANGLE",
                  minWidth: 1024,
                  maxWidth: 1024,
                  minHeight: 600,
                  maxHeight: 600,
                },
                {
                  mode: "HUB",
                  shape: "RECTANGLE",
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 800,
                  maxHeight: 800,
                },
                {
                  mode: "TV",
                  shape: "RECTANGLE",
                  minWidth: 960,
                  maxWidth: 960,
                  minHeight: 540,
                  maxHeight: 540,
                },
              ],
            };

            if (
              skillManifest &&
              skillManifest.manifest &&
              skillManifest.manifest.apis &&
              skillManifest.manifest.apis.custom &&
              skillManifest.manifest.apis.custom.interfaces
            )
              skillManifest.manifest.apis.custom.interfaces.push(aplInterface);

            c.resources.resourceMap["/skill.json"] = JSON.stringify(skillManifest);
            return c.resources;
          }
        )
        .build();
    };
  }

  /**
   * Sample APL Layouts
   */
  export namespace samples {
    export enum Image {
      CHEESE_DOG = "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v2/cheese_dog.jpg",
      CHEESE = "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v2/bg_cheese_1.jpg",
      CHEESE2 = "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v2/bg_cheese_2.jpg",
      PIZZA_PEPPERONI = "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v2/pizza_pepperoni.jpg",
      BG_PIZZA = "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v2/bg_pizza_1.jpg",
    }

    export enum Logo {
      SPEECH_BALOON = "https://img.icons8.com/emoji/344/speech-balloon.png",
      CHEESE = "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v2/icon_cheese.png",
    }

    /**
     * Shows an image in the center with title.
     * Good for showing a welcome screen.
     *
     * @param input input
     */
    export let image = (input: {
      backgroundImageUrl?: string | Image;
      title?: string;
      logoUrl?: string | Logo;
      imageUrl?: string | Image;
    }) => {
      const dataSource = {
        data: {
          backgroundImageUrl: input.backgroundImageUrl || Image.CHEESE_DOG,
          title: input.title || "Title",
          logoUrl: input.logoUrl || Logo.CHEESE,
          imageUrl: input.imageUrl || Image.CHEESE,
        },
      };

      return ax.directive({
        type: "Alexa.Presentation.APL.RenderDocument",
        datasources: dataSource,
        document: imageWithTitleDoc,
      });
    };

    /**
     * Shows a short text on the screen.
     * Good for showing a quick text on the screen.
     *
     * @param input input
     */
    export let shortText = (input: {
      primaryText?: string;
      secondaryText?: string;
      hintText?: string;
      logoUrl?: string | Logo;
      backgroundImageUrl?: string | Image;
    }) => {
      const dataSource = {
        data: {
          primaryText: input.primaryText || "Primary Text",
          secondaryText: input.secondaryText || "Secondary Text",
          hintText: input.hintText || "Hint text",
          logoUrl: input.logoUrl || Logo.CHEESE,
          backgroundImageUrl: input.backgroundImageUrl || Image.CHEESE2,
        },
      };
      return ax.directive({
        type: "Alexa.Presentation.APL.RenderDocument",
        datasources: dataSource,
        document: shortTextDoc,
      });
    };

    /**
     * Shows an image on the left with text components and more on the right.
     * Good for showing a product item or search result.
     *
     * @param input input
     */
    export let imageLeftDetail = (input: {
      title?: string;
      logoUrl?: string | Logo;
      leftImageUrl?: string | Image;
      leftImageCaption?: string;
      primaryText?: string;
      secondaryText?: string;
      rating?: number;
      ratingCount?: number;
      bodyText?: string;
      buttonLeftText?: string;
      buttonRightText?: string;
      tableTitle?: string;
      tableItems?: any[];
      backgroundImageUrl?: string | Image;
    }) => {
      const dataSource = {
        data: {
          title: input.title,
          logoUrl: input.logoUrl || Logo.CHEESE,
          leftImageUrl: input.leftImageUrl || Image.PIZZA_PEPPERONI,
          leftImageCaption: input.leftImageCaption,
          primaryText: input.primaryText,
          secondaryText: input.secondaryText,
          rating: input.rating,
          ratingCount: input.rating,
          bodyText: input.bodyText,
          buttonLeftText: input.buttonLeftText,
          buttonRightText: input.buttonRightText,
          tableTitle: input.tableTitle,
          tableItems: input.tableItems,
          backgroundImageUrl: input.backgroundImageUrl || Image.BG_PIZZA,
        },
      };
      return ax.directive({
        type: "Alexa.Presentation.APL.RenderDocument",
        datasources: dataSource,
        document: imageLeftDetailDoc,
      });
    };
  }
}
