import _defaultHandlers from "./common/defaultHandlers";

/**
 * Common building blocks for building alexa skills.
 */
export namespace common {
  /**
   * Sets intents and their handlers for:
   *  - AMAZON.StopIntent
   *  - AMAZON.CancelIntent
   *  - AMAZON.FallbackIntent
   *
   * @param input Configuration.
   */
  export const defaultHandlers = _defaultHandlers;
}
