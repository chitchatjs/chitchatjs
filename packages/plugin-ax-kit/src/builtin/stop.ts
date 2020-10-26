import { alexa as ax, AlexaDialogContext, AlexaEvent, Locale } from "@chitchatjs/alexa";
import { DEFAULT_LOCALES } from "../constants";

export default (byeMessage?: string, locales?: Locale[]) => {
  return ax
    .localize(locales || DEFAULT_LOCALES)
    .block(
      ax
        .compound()
        .add(ax.intent("AMAZON.StopIntent").samples(["stop"]).build())
        .add(ax.intent("AMAZON.CancelIntent").samples(["cancel"]).build())
        .add(
          ax
            .when()
            .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
              return (
                event.currentRequest.request.type === "IntentRequest" &&
                (event.currentRequest.request.intent.name === "AMAZON.StopIntent" ||
                  event.currentRequest.request.intent.name === "AMAZON.CancelIntent")
              );
            })
            .then(ax.say(byeMessage || "Good bye."))
            .build()
        )
        .add(ax.end())
        .build()
    )
    .build();
};
