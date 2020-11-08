import { ResponseFactory } from "ask-sdk-core";

import {
  alexa as ax,
  AlexaCustomBlock,
  AlexaDialogContext,
  AlexaEvent,
} from "@chitchatjs/alexa";

import { card } from "../";

export const simple = (title: string, text: string): AlexaCustomBlock => {
  return ax
    .custom()
    .executor((c: AlexaDialogContext, e: AlexaEvent) => {
      const res = ResponseFactory.init().withSimpleCard(title, text).getResponse();
      Object.assign(c.currentResponse.response, res);
    })
    .build();
};

export const standard = (
  title: string,
  text: string,
  smallImageUrl?: string,
  largeImageUrl?: string
): AlexaCustomBlock => {
  return ax
    .custom()
    .executor((c: AlexaDialogContext, e: AlexaEvent) => {
      const res = ResponseFactory.init()
        .withStandardCard(title, text, smallImageUrl, largeImageUrl)
        .getResponse();
      Object.assign(c.currentResponse.response, res);
    })
    .build();
};

export const linkAccount = (): AlexaCustomBlock => {
  return ax
    .custom()
    .executor((c: AlexaDialogContext, e: AlexaEvent) => {
      const res = ResponseFactory.init().withLinkAccountCard().getResponse();
      Object.assign(c.currentResponse.response, res);
    })
    .build();
};

export const askPermissions = (
  permissions: card.Permission[] | string[] // string because don't know if there are more permissions.
): AlexaCustomBlock => {
  return ax
    .custom()
    .executor((c: AlexaDialogContext, e: AlexaEvent) => {
      const res = ResponseFactory.init()
        .withAskForPermissionsConsentCard(permissions)
        .getResponse();
      Object.assign(c.currentResponse.response, res);
    })
    .build();
};
