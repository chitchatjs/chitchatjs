// import { AlexaDialogContext, AlexaEvent, ax } from "@chitchatjs/alexa";

// export default (shouldEnd?: boolean) => {
//   return ax
//     .compound()
//     .add(
//       ax
//         .custom()
//         .executor((c: AlexaDialogContext, e: AlexaEvent) => {
//           c.currentResponse.response.shouldEndSession = shouldEnd;
//           return c.currentResponse;
//         })
//         .build()
//     )
//     .build();
// };
