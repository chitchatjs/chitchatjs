import { alexa as ax, Locale } from "@chitchatjs/alexa";
import { DEFAULT_LOCALES } from "../constants";

/**
 * Greets the user when asked questions such as "who are you?"
 */
export default (introMessage?: string, locales?: Locale[]) => {
  return ax
    .localize(locales || DEFAULT_LOCALES)
    .block(
      ax
        .compound()
        .add(
          ax
            .intent("axs_greetings_about_Intent")
            .samples(["who are you", "tell me about yourself", "tell me about you", "what are you"])
            .build()
        )
        .add(
          ax
            .whenIntentName("axs_greetings_about_Intent")
            .then(ax.ask(`${introMessage || "I am an Alexa skill."}`).build())
            .build()
        )
        .build()
    )
    .build();
};
