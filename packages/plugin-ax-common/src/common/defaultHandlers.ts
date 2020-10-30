import {
  alexa as ax,
  AlexaBlock,
  AlexaCompoundBlock,
  AlexaDialogContext,
  AlexaEvent,
} from "@chitchatjs/alexa";
import { session } from "@chitchatjs/plugin-ax-session";

export default (input?: {
  stop?: AlexaBlock;
  fallback?: AlexaBlock;
  help?: AlexaBlock;
}): AlexaCompoundBlock => {
  if (!input) input = {};

  return ax
    .compound()
    .add(
      ax
        .compound()
        .add(ax.intent("AMAZON.StopIntent").build())
        .add(ax.intent("AMAZON.CancelIntent").build())
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
            .then(
              ax
                .compound()
                .add(input.stop || ax.say("Good bye!"))
                .add(session.end(true))
                .build()
            )
            .build()
        )
        .build()
    )
    .add(ax.intent("AMAZON.HelpIntent").build())
    .add(
      ax
        .whenIntentName("AMAZON.HelpIntent")
        .then(
          input.help || ax.ask("I'm here to help, what would you like to do?").build()
        )
        .build()
    )
    .add(ax.intent("AMAZON.FallbackIntent").build())
    .add(
      ax
        .whenIntentName("AMAZON.FallbackIntent")
        .then(
          input.fallback ||
            ax
              .ask("Sorry I didn't understand. Please try again.")
              .reprompt("Please try again.")
              .build()
        )
        .build()
    )
    .add(ax.end())
    .build();
};
