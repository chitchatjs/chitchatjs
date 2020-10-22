import _all from "./builtin/all";
import _fallback from "./builtin/fallback";
import _help from "./builtin/help";
import _stop from "./builtin/stop";
import _about from "./greetings/about";
import _bye from "./greetings/bye";
import _hello from "./greetings/hello";

/**
 * Alexa starter kit.
 * All of these building blocks are customizable.
 */
export namespace axkit {
  /**
   * Greeting related building blocks
   */
  export namespace greet {
    /**
     * Handles utterances like "who are you", "what are you" etc.
     */
    export let about = _about;

    /**
     * Handles utterances like "bye", "good bye" etc.
     */
    export let bye = _bye;

    /**
     * Handles utterances like "hello", "hi" etc.
     */
    export let hello = _hello;
  }

  /**
   * Builtin handlers
   */
  export namespace builtin {
    /**
     * Injects and handles AMAZON.FallbackIntent.
     */
    export let fallback = _fallback;

    /**
     * Injects and handles AMAZON.HelpIntent.
     */
    export let help = _help;

    /**
     * Injects and handles AMAZON.CancelIntent & AMAZON.StopIntent.
     */
    export let stop = _stop;

    /**
     * Returns all the bultins your skill needs.
     *
     * @param helpMessage Help message that you want to render when user asks for help.
     * @param locales List of Locales. Default en-US
     */
    export let all = _all;
  }
}
