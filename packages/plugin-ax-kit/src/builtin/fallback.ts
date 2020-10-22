import { alexa as ax, AlexaDialogContext, AlexaEvent, Locale } from "@chitchatjs/alexa";
import { DEFAULT_LOCALES } from "../constants";

export default (fallbackMessage?: string, locales?: Locale[]) => {
  return ax
    .localize(locales || DEFAULT_LOCALES)
    .block(
      ax
        .compound()
        .add(ax.intent("AMAZON.FallbackIntent").samples(["dummy"]).build())
        .add(
          ax
            .when()
            .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
              return (
                event.currentRequest.request.type == "IntentRequest" &&
                event.currentRequest.request.intent.name == "AMAZON.FallbackIntent"
              );
            })
            .then(
              ax
                .ask(fallbackMessage || "Sorry I didn't understand. Please try again.")
                .reprompt("Please try again.")
                .build()
            )
            .build()
        )
        .build()
    )
    .build();
};
