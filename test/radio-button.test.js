import { html, fixture } from "@open-wc/testing";
import { visualDiff } from "@web/test-runner-visual-regression";

// import "../dist/calcite/calcite.css";
import "../dist/components/calcite-label.js";
import "../dist/components/calcite-radio-button.js";

it("small labeled radio-button", async () => {
  const el = await fixture(html`
    <calcite-label for="stencil-def-s" layout="inline" scale="s">
      <calcite-radio-button id="stencil-def-s" name="def-s" scale="s" value="stencil-def-s"></calcite-radio-button>
      Stencil
    </calcite-label>
  `);
  await visualDiff(el, "small labeled radio-button");
});
