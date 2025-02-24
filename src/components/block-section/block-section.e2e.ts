import { CSS, TEXT } from "./resources";
import { accessible, defaults, hidden, reflects, renders, t9n } from "../../tests/commonTests";
import { E2EPage, newE2EPage } from "@stencil/core/testing";

describe("calcite-block-section", () => {
  it("renders", async () => renders("calcite-block-section", { display: "block" }));

  it("honors hidden attribute", async () => hidden("calcite-block-section"));

  it("reflects properties", async () =>
    reflects("calcite-block-section", [
      {
        propertyName: "open",
        value: true
      }
    ]));

  it("has property defaults", async () =>
    defaults("calcite-block-section", [
      {
        propertyName: "open",
        defaultValue: false
      },
      {
        propertyName: "toggleDisplay",
        defaultValue: "button"
      }
    ]));

  it("supports translation", () => t9n("calcite-block-section"));

  describe("toggle-display = 'switch'", () => {
    describe("accessibility", () => {
      it("when open", async () =>
        accessible(
          `<calcite-block-section text="text" toggle-display="switch" open><div>some content</div></calcite-block-section>`
        ));

      it("when closed", async () =>
        accessible(
          `<calcite-block-section text="text" toggle-display="switch"><div>some content</div></calcite-block-section>`
        ));
    });

    it("can display/hide content", async () => {
      const page = await newE2EPage({
        html: `<calcite-block-section toggle-display="switch"><div>some content</div></calcite-block-section>`
      });
      await assertContentIsDisplayedAndHidden(page);
    });

    it("can be toggled", async () => {
      const page = await newE2EPage({
        html: `<calcite-block-section toggle-display="switch"></calcite-block-section>`
      });
      await assertToggleBehavior(page);
    });

    it("renders section text", async () => {
      const page = await newE2EPage({
        html: `<calcite-block-section text="test text" open toggle-display="switch"></calcite-block-section>`
      });
      const element = await page.find(`calcite-block-section >>> .${CSS.toggle}`);
      expect(element.textContent).toBe("test text");
    });
  });

  describe("toggle-display = 'button' (default)", () => {
    describe("accessibility", () => {
      it("when open", async () =>
        accessible(`<calcite-block-section text="text" open><div>some content</div></calcite-block-section>`));

      it("when closed", async () =>
        accessible(`<calcite-block-section text="text"><div>some content</div></calcite-block-section>`));
    });

    it("can display/hide content", async () => {
      const page = await newE2EPage({ html: "<calcite-block-section><div>some content</div></calcite-block-section>" });
      await assertContentIsDisplayedAndHidden(page);
    });

    it("can be toggled", async () => {
      const page = await newE2EPage({ html: "<calcite-block-section></calcite-block-section>" });
      await assertToggleBehavior(page);
    });
  });

  describe("status = 'invalid'", () => {
    it("displays a status indicator when `status` is an accepted value", async () => {
      const page = await newE2EPage({
        html: `<calcite-block-section status="invalid"><div>content</div></calcite-block-section>`
      });
      const statusIconEl = await page.find(`calcite-block-section >>> .${CSS.statusIcon}`);
      expect(statusIconEl).not.toBeNull();
    });
  });

  describe("status = 'foo'", () => {
    it("does not display a status indicator when `status` is not an accepted value", async () => {
      const page2 = await newE2EPage({
        html: `<calcite-block-section status="foo"><div>content</div></calcite-block-section>`
      });
      const statusIconEl2 = await page2.find(`calcite-block-section >>> .${CSS.statusIcon}`);
      await page2.waitForChanges();
      expect(statusIconEl2).toBeNull();
    });
  });

  async function assertContentIsDisplayedAndHidden(page: E2EPage): Promise<void> {
    let element = await page.find("calcite-block-section");
    let content = await page.find(`calcite-block-section >>> .${CSS.content}`);

    expect(await content.isVisible()).toBe(false);

    element.setProperty("open", true);
    await page.waitForChanges();
    element = await page.find("calcite-block-section[open]");
    content = await page.find(`calcite-block-section >>> .${CSS.content}`);

    expect(element).toBeTruthy();
    expect(await content.isVisible()).toBe(true);

    element.setProperty("open", false);
    await page.waitForChanges();
    element = await page.find("calcite-block-section[open]");
    content = await page.find(`calcite-block-section >>> .${CSS.content}`);

    expect(element).toBeNull();
    expect(await content.isVisible()).toBe(false);
  }

  async function assertToggleBehavior(page: E2EPage): Promise<void> {
    const element = await page.find("calcite-block-section");
    const toggleSpy = await element.spyOnEvent("calciteBlockSectionToggle");
    const toggle = await page.find(`calcite-block-section >>> .${CSS.toggle}`);

    expect(toggle.getAttribute("aria-label")).toBe(TEXT.expand);

    await toggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(1);
    expect(await element.getProperty("open")).toBe(true);
    expect(toggle.getAttribute("aria-label")).toBe(TEXT.collapse);

    await toggle.click();

    expect(toggleSpy).toHaveReceivedEventTimes(2);
    expect(await element.getProperty("open")).toBe(false);
    expect(toggle.getAttribute("aria-label")).toBe(TEXT.expand);

    const keyboardToggleEmitter =
      toggle.tagName === "CALCITE-ACTION"
        ? (
            await page.evaluateHandle(() => {
              // keyboard event needs to be dispatched from the action's button for it to trigger a click
              // deep shadow piercing is based on https://github.com/puppeteer/puppeteer/issues/858#issuecomment-438540596
              return document
                .querySelector("calcite-block-section")
                .shadowRoot.querySelector("section > calcite-action")
                .shadowRoot.querySelector("button");
            })
          ).asElement()
        : toggle;

    await keyboardToggleEmitter.press(" ");
    await page.waitForChanges();

    expect(toggleSpy).toHaveReceivedEventTimes(3);
    expect(await element.getProperty("open")).toBe(true);
    expect(toggle.getAttribute("aria-label")).toBe(TEXT.collapse);

    await keyboardToggleEmitter.press("Enter");
    await page.waitForChanges();

    expect(toggleSpy).toHaveReceivedEventTimes(4);
    expect(await element.getProperty("open")).toBe(false);
    expect(toggle.getAttribute("aria-label")).toBe(TEXT.expand);
  }
});
