import { select, text, number } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/TextArea",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-text-area
    scale="${select("scale", ["s", "m", "l"], "m")}"
    placeholder="${text("placeholder", "Add Notes")}"
    ${boolean("disabled", false)}
    columns="${number("columns", 20)}"
    resize="${text("resize", "both")}
    rows="${number("rows", 2)}"
    label="${text("label", "")}"
    name="${text("name", "")}"
  >
  </calcite-text-area>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-text-area dir="rtl" class="calcite-mode-dark"> </calcite-text-area>
`;

export const withSlottedElements = (): string => html`
  <calcite-text-area
    placeholder="${text("placeholder", "Add Notes")}"
    max-length="${number("max-length", 50)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    placeholder="${text("placeholder", "Add Notes")}"
    ${boolean("disabled", false)}
    columns="${number("columns", 20)}"
    rows="${number("rows", 2)}"
    ${boolean("required", false)}
    ${boolean("readonly", false)}
    label="${text("label", "")}"
    name="${text("name", "")}"
  >
    <calcite-button slot="${text("slot", "footer-start")}">RESET</calcite-button>
    <calcite-action icon="code" slot="${text("slot", "footer-end")}"></calcite-action>
  </calcite-text-area>
`;

export const withSlottedElementsDarkModeRTL_TestOnly = (): string => html`
  <calcite-text-area max-length="50" placeholder="Add Notes" dir="rtl" class="calcite-mode-dark">
    <calcite-button slot="${text("slot", "footer-start")}">RESET</calcite-button>
    <calcite-action icon="code" slot="${text("slot", "footer-end")}"></calcite-action>
  </calcite-text-area>
`;

export const disabled_TestOnly = (): string => html` <calcite-text-area disabled> </calcite-text-area> `;

export const readonly_TestOnly = (): string => html` <calcite-text-area readonly> </calcite-text-area> `;

export const resizeDisabled_TestOnly = (): string => html` <calcite-text-area resize="none"> </calcite-text-area> `;

export const groupSeparator_TestOnly = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
`;

export const exceedingMaxLength_TestOnly = (): string => html`
  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>
`;

export const chineseLangNumberingSystem_TestOnly = (): string => html`
  <calcite-text-area
    value="Rocky Mountains National Park"
    lang="zh-cn"
    numbering-system="hanidec"
    group-separator
    max-length="654321"
  >
  </calcite-text-area>
`;

export const insideContainerWithHeightAndWidth_TestOnly = (): string =>
  html`<div style="width:500px;height:500px"><calcite-text-area></calcite-text-area></div>`;
