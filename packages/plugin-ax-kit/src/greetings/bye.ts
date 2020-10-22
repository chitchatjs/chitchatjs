import { alexa as ax, Locale } from "@chitchatjs/alexa";
import { DEFAULT_LOCALES } from "../constants";

/**
 * Renders a bye message when user says bye or related utterances.
 * It also closes the session.
 */
export default (byeMessage?: string, locales?: Locale[]) => {
  return ax
    .localize(locales || DEFAULT_LOCALES)
    .block(
      ax
        .compound()
        .add(
          ax
            .intent("axs_greetings_bye_Intent")
            .samples(["bye", "good bye", "see you", "bye bye", "good night"])
            .build()
        )
        .add(
          ax
            .whenIntentName("axs_greetings_bye_Intent")
            .then(ax.say(`${byeMessage || "Good bye!"}`))
            .build()
        )
        .build()
    )
    .build();
};
