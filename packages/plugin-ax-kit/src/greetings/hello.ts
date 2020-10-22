import { alexa as ax, Locale } from "@chitchatjs/alexa";
import { DEFAULT_LOCALES } from "../constants";

/**
 * Renders a hello message when user says hello or related utterances.
 */
export default (helloMsg?: string, locales?: Locale[]) => {
  return ax
    .localize(locales || DEFAULT_LOCALES)
    .block(
      ax
        .compound()
        .add(
          ax
            .intent("axs_greetings_bye_Intent")
            .samples(["hello", "hi there", "good evening", "good morning", "good afternoon"])
            .build()
        )
        .add(
          ax
            .whenIntentName("axs_greetings_bye_Intent")
            .then(ax.ask(`${helloMsg || "Hello! what can I do for you?"}`).build())
            .build()
        )
        .build()
    )
    .build();
};
