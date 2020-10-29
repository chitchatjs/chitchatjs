import { AlexaDialogContext, AlexaEvent, ax } from "@chitchatjs/alexa";

/**
 * Session management building blocks for Alexa Skills.
 */
export namespace session {
  /**
   * Sets the session end flag in the response.
   *
   * @param shouldEnd true|false|undefined
   */
  export const end = (shouldEnd?: boolean) => {
    return ax
      .compound()
      .add(
        ax
          .custom()
          .executor((c: AlexaDialogContext, e: AlexaEvent) => {
            c.currentResponse.response.shouldEndSession = shouldEnd;
            return c.currentResponse;
          })
          .build()
      )
      .build();
  };
}
