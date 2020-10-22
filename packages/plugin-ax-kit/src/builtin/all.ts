import { alexa as ax, AlexaBlock, Locale } from "@chitchatjs/alexa";
import _fallback from "./fallback";
import _stop from "./stop";
import _help from "./help";

export default (helpMessage: string, locales?: Locale[]): AlexaBlock => {
  return ax
    .compound()
    .add(_help(helpMessage, locales))
    .add(_stop(undefined, locales))
    .add(_fallback(undefined, locales))
    .build();
};
