import { alexa as ax, Locale } from "@chitchatjs/alexa";
import greetingsAbout from "./greetings/about";
import greetingsBye from "./greetings/bye";
import greetingsHello from "./greetings/hello";

/**
 * Alexa starter kit
 */
export namespace axkit {
  /**
   * Greeting related building blocks
   */
  export namespace greet {
    export let about = greetingsAbout;
    export let bye = greetingsBye;
    export let hello = greetingsHello;
  }
}
