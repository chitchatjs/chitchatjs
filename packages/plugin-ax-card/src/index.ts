import * as cards from "./card";

/**
 * Card building blocks for building alexa skills.
 */
export namespace card {
  /**
   * Render a card with title and text body.
   */
  export const simple = cards.simple;
  /**
   * Render a card with title, text body, small and large Images.
   */
  export const standard = cards.standard;
  /**
   * Render a Link Account card for users to link account to Alexa Skills.
   */
  export const linkAccount = cards.linkAccount;
  /**
   * Render a card to ask permissions to users.
   */
  export const askPermissions = cards.askPermissions;

  /**
   * List of available permissions
   */
  export enum Permission {
    ListRead = "read::alexa:household:list",
    ListWrite = "write::alexa:household:list",
    FullAddressRead = "read::alexa:device:all:address",
    CountryAndPostalCodeRead = "read::alexa:device:all:address:country_and_postal_code",
  }
}
