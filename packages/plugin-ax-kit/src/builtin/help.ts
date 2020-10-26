import { alexa as ax, AlexaDialogContext, AlexaEvent, Locale } from "@chitchatjs/alexa";
import { DEFAULT_LOCALES } from "../constants";

export default (helpMessage: string, locales?: Locale[]) => {
  return ax
    .localize(locales || DEFAULT_LOCALES)
    .block(
      ax
        .compound()
        .add(ax.intent("AMAZON.HelpIntent").samples(["help"]).build())
        .add(
          ax
            .when()
            .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
              return (
                event.currentRequest.request.type === "IntentRequest" &&
                event.currentRequest.request.intent.name === "AMAZON.HelpIntent"
              );
            })
            .then(ax.ask(helpMessage).build())
            .build()
        )
        .build()
    )
    .build();
};
