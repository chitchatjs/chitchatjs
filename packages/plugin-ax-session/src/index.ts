// import _end from "./blocks/end";
import { AlexaBuilderContext, AlexaDialogContext, AlexaEvent, ax, Locale } from "@chitchatjs/alexa";
import { CompoundBlock } from "../../alexa/node_modules/@chitchatjs/core/dist";

/**
 * Session management building blocks for Alexa Skills.
 */
export namespace session {
  /**
   * Sets the session end flag in the response.
   *
   * @param shouldEnd true|false|undefined
   */
  export let end = (
    shouldEnd?: boolean
  ): CompoundBlock<AlexaBuilderContext, AlexaDialogContext, AlexaEvent> => {
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
