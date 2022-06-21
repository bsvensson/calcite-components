import { html, fixture } from "@open-wc/testing";
import { visualDiff } from "@web/test-runner-visual-regression";

import "../dist/components/calcite-label.js";
import "../dist/components/calcite-radio-button.js";

it("small labeled radio-button", async () => {
  const el = await fixture(html`
    <!DOCTYPE html>
    <html lang="en">
      <head> </head>
      <body>
        <p>Paragraph</p>
      </body>
    </html>
  `);
  await visualDiff(el, "small labeled radio-button");
});
// it("small labeled radio-button", async () => {
//   const el = await fixture(html`
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <link rel="stylesheet" href="dist/calcite/calcite.css" />
//       </head>
//       <body>
//         <calcite-label for="stencil-def-s" layout="inline" scale="s">
//           <calcite-radio-button id="stencil-def-s" name="def-s" scale="s" value="stencil-def-s"></calcite-radio-button>
//           Stencil
//         </calcite-label>
//       </body>
//     </html>
//   `);
//   await visualDiff(el, "small labeled radio-button");
// });
