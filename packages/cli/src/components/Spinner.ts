// withSpinner(...message: string[]) {
//   console.log(ora({ text: message.join(" "), spinner: cliSpinners.random }).start());
// }

import ora from "ora";

/**
 * Shows a spinner with the text beside it.
 * Currently set to randomize the spinner choice every time user runs it.
 *
 * @param text Text
 */
export let initSpinner = (text: string) => {
  return ora({
    text,
    color: "cyan",
  });
};
