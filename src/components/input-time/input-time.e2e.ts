import { newE2EPage } from "@stencil/core/testing";
import { localizeTimeString, localizeTimeStringToParts } from "../../utils/time";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  labelable,
  reflects,
  renders
} from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-input-time", () => {
  it("renders", async () => renders("calcite-input-time", { display: "inline-block" }));

  it("is accessible", async () =>
    accessible(`
    <calcite-label>
      Input Time
      <calcite-input-time name="test"></calcite-input-time>
    </calcite-label>
  `));

  it("has defaults", async () =>
    defaults("calcite-input-time", [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 }
    ]));

  it("reflects", async () =>
    reflects(`calcite-input-time`, [
      { propertyName: "disabled", value: true },
      { propertyName: "iconFlipRtl", value: true },
      { propertyName: "required", value: true },
      { propertyName: "scale", value: "m" }
    ]));

  it("is labelable", async () => labelable("calcite-input-time"));

  it("should focus the hour input when setFocus is called", async () =>
    focusable(`calcite-input-time`, {
      shadowFocusTargetSelector: "span.hour"
    }));

  it("can be disabled", () => disabled("calcite-input-time"));

  it("when set to readOnly, element still focusable but won't display the controls or allow for changing the value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time id="canReadOnly" readonly></calcite-input-time>`);

    const component = await page.find("calcite-input-time");

    await component.callMethod("setFocus");
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe("canReadOnly");

    await component.click();
    await page.waitForChanges();

    await component.type("12");
    await page.keyboard.press("Tab");
    await component.type("30");
    await page.waitForChanges();

    expect(await component.getProperty("value")).toBeNull();
  });

  it.skip("opens the time picker on input keyboard focus", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time></calcite-input-time>`
    });
    const popover = await page.find("calcite-input-time >>> calcite-popover");

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it.skip("opens the time picker on input click", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time></calcite-input-time>`
    });
    const input = await page.find("calcite-input-time >>> calcite-input");
    const popover = await page.find("calcite-input-time >>> calcite-popover");

    await input.click();
    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("programmatically changing the value reflects in the UI for da lang (24-hour with period delimiter)", async () => {
    const lang = "da";
    const page = await newE2EPage({
      html: `<calcite-input-time lang="${lang}"" step="1"></calcite-input-time>`
    });

    const inputTimeEl = await page.find("calcite-input-time");
    const hourEl = await page.find(`calcite-input-time >>> .${CSS.hour}`);
    const delimiterEls = await page.findAll(`calcite-input-time >>> .${CSS.delimiter}`);
    const minuteEl = await page.find(`calcite-input-time >>> .${CSS.minute}`);
    const secondEl = await page.find(`calcite-input-time >>> .${CSS.second}`);

    const expectedValue = "14:59:30";
    const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond } =
      localizeTimeStringToParts(expectedValue, lang);

    inputTimeEl.setProperty("value", expectedValue);

    await page.waitForChanges();

    expect(await inputTimeEl.getProperty("value")).toBe(expectedValue);
    expect(localizedHourSuffix).toEqualText(".");
    expect(localizedMinuteSuffix).toEqualText(".");
    expect(await hourEl.getProperty("textContent")).toEqualText(localizedHour);
    expect(await delimiterEls[0].getProperty("textContent")).toEqualText(localizedHourSuffix);
    expect(await minuteEl.getProperty("textContent")).toEqualText(localizedMinute);
    expect(await delimiterEls[1].getProperty("textContent")).toEqualText(localizedMinuteSuffix);
    expect(await secondEl.getProperty("textContent")).toEqualText(localizedSecond);
  });

  it("value displays correctly in the input when it is programmatically changed for a 12-hour language", async () => {
    const lang = "en";
    const page = await newE2EPage({
      html: `<calcite-input-time step="1"></calcite-input-time>`
    });

    const inputTime = await page.find("calcite-input-time");
    const input = await page.find("calcite-input-time >>> calcite-input");

    const date = new Date(0);
    date.setHours(13);
    date.setMinutes(59);
    date.setSeconds(59);

    const expectedValue = date.toISOString().substr(11, 8);
    const expectedDisplayValue = localizeTimeString(expectedValue, lang);

    inputTime.setProperty("value", expectedValue);

    await page.waitForChanges();

    const inputValue = await input.getProperty("value");
    const inputTimeValue = await inputTime.getProperty("value");

    expect(inputValue).toBe(expectedDisplayValue);
    expect(inputTimeValue).toBe(expectedValue);
  });

  it("value displays correctly in the input when it is programmatically changed for a 12-hour language when a default value is present", async () => {
    const lang = "en";
    const page = await newE2EPage({
      html: `<calcite-input-time step="1" value="11:00:00"></calcite-input-time>`
    });

    const inputTime = await page.find("calcite-input-time");
    const input = await page.find("calcite-input-time >>> calcite-input");

    expect(await input.getProperty("value")).toBe("11:00:00 AM");
    expect(await inputTime.getProperty("value")).toBe("11:00:00");

    const date = new Date(0);
    date.setHours(13);
    date.setMinutes(59);
    date.setSeconds(59);

    const expectedValue = date.toISOString().substr(11, 8);
    const expectedDisplayValue = localizeTimeString(expectedValue, lang);

    inputTime.setProperty("value", expectedValue);

    await page.waitForChanges();

    const inputValue = await input.getProperty("value");
    const inputTimeValue = await inputTime.getProperty("value");

    expect(inputValue).toBe(expectedDisplayValue);
    expect(inputTimeValue).toBe(expectedValue);
  });

  it("value displays correctly in the input when it is programmatically changed for a 24-hour language when a default value is present", async () => {
    const lang = "fr";
    const page = await newE2EPage({
      html: `<calcite-input-time step="1" value="11:00:00" lang="${lang}"></calcite-input-time>`
    });

    const inputTime = await page.find("calcite-input-time");
    const input = await page.find("calcite-input-time >>> calcite-input");

    expect(await input.getProperty("value")).toBe("11:00:00");
    expect(await inputTime.getProperty("value")).toBe("11:00:00");

    const date = new Date(0);
    date.setHours(13);
    date.setMinutes(59);
    date.setSeconds(59);

    const expectedValue = "13:59:59";
    const expectedDisplayValue = localizeTimeString(expectedValue, lang);

    inputTime.setProperty("value", expectedValue);

    await page.waitForChanges();

    const inputValue = await input.getProperty("value");
    const inputTimeValue = await inputTime.getProperty("value");

    expect(inputValue).toBe(expectedDisplayValue);
    expect(inputTimeValue).toBe(expectedValue);
  });

  it("appropriately triggers calciteInputTimeChange event when the user types a value", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time step="1"></calcite-input-time>`);

    const inputTime = await page.find("calcite-input-time");
    const changeEvent = await inputTime.spyOnEvent("calciteInputTimeChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Tab");
    await page.keyboard.press("1");
    await page.keyboard.press(":");
    await page.keyboard.press("2");

    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(1);

    await page.keyboard.press(":");
    await page.keyboard.press("3");

    await page.waitForChanges();

    expect(changeEvent).toHaveReceivedEventTimes(2);
  });

  it("formats valid typed time value appropriately on blur", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-input-time step="1"></calcite-input-time><input>`);

    const inputTime = await page.find("calcite-input-time");

    await page.keyboard.press("Tab");
    await page.keyboard.type("2:3:4");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    expect(await inputTime.getProperty("value")).toBe("02:03:04");
  });

  it("resets to previous value when default event behavior is prevented", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time value="14:59"></calcite-input-time>`
    });
    const inputTime = await page.find("calcite-input-time");

    await page.evaluate(() => {
      const inputTime = document.querySelector("calcite-input-time");
      inputTime.addEventListener("calciteInputTimeChange", (event) => {
        event.preventDefault();
      });
    });

    expect(await inputTime.getProperty("value")).toBe("14:59");

    await page.keyboard.press("Tab");
    await page.keyboard.press(":");
    await page.keyboard.press("5");
    await page.waitForChanges();

    expect(await inputTime.getProperty("value")).toBe("14:59");
  });

  it("sets initial value to undefined when it is not a valid time value", async () => {
    const page = await newE2EPage({
      html: `<calcite-input-time value="invalid"></calcite-input-time>`
    });
    const inputTime = await page.find("calcite-input-time");

    expect(await inputTime.getProperty("value")).toBeUndefined();
  });

  it("is form-associated", () => formAssociated("calcite-input-time", { testValue: "03:23", submitsOnEnter: true }));
});
