import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import {
  hexify,
  normalizeAlpha,
  hexChar,
  isLonghandHex,
  isValidHex,
  normalizeHex,
  rgbToHex,
  canConvertToHexa
} from "../color-picker/utils";
import Color from "color";
import { CSS } from "./resources";
import { Scale } from "../interfaces";
import { RGB } from "../color-picker/interfaces";
import { focusElement } from "../../utils/dom";
import { TEXT } from "../color-picker/resources";

const DEFAULT_COLOR = Color();

@Component({
  tag: "calcite-color-picker-hex-input",
  styleUrl: "color-picker-hex-input.scss",
  shadow: true
})
export class ColorPickerHexInput {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteColorPickerHexInputElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const { allowEmpty, alphaEnabled, value } = this;

    if (value) {
      const normalized = normalizeHex(value);

      if (isValidHex(normalized, alphaEnabled)) {
        this.internalSetValue(normalized, normalized, false);
      }

      return;
    }

    if (allowEmpty) {
      this.internalSetValue(null, null, false);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.
   *
   * When true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty.
   */
  @Prop() allowEmpty = false;

  /**
   * When true, the input will process and display hex characters for the alpha channel.
   */
  @Prop() alphaEnabled = false;

  /**
   * Label used for the hex input.
   * @default "Hex"
   */
  @Prop() intlHex = TEXT.hex;

  /**
   * Label used for the hex input when there is no color selected.
   * @default "No color"
   */
  @Prop() intlNoColor = TEXT.noColor;

  /**
   * The component's scale.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The hex value.
   */
  @Prop({ mutable: true, reflect: true }) value: string = normalizeHex(
    hexify(DEFAULT_COLOR, this.alphaEnabled)
  );

  @Watch("value")
  handleValueChange(value: string, oldValue: string): void {
    this.internalSetValue(value, oldValue, false);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when the hex value changes.
   */
  @Event() calciteColorPickerHexInputChange: EventEmitter;

  private onCalciteInputBlur = (): void => {
    const node = this.inputNode;
    const inputValue = node.value;
    const hex = `#${inputValue}`;
    const { allowEmpty, alphaEnabled } = this;
    const willClearValue = allowEmpty && !inputValue;
    const isLonghand = isLonghandHex(hex);

    if (willClearValue || (isValidHex(hex, alphaEnabled) && isLonghand)) {
      return;
    }

    if (alphaEnabled) {
      if (canConvertToHexa(hex)) {
        this.internalSetValue(`${hex}${isLonghand ? "ff" : "f"}`, this.value);
      }
    }

    const { internalColor } = this;

    // manipulating DOM directly since rerender doesn't update input value
    node.value =
      allowEmpty && !internalColor
        ? ""
        : this.formatForInternalInput(
            rgbToHex(
              alphaEnabled
                ? normalizeAlpha(internalColor.object())
                : (internalColor.object() as any as RGB)
            )
          );
  };

  private onInputChange = (): void => {
    this.internalSetValue(this.inputNode.value, this.value);
  };

  // using @Listen as a workaround for VDOM listener not firing
  @Listen("keydown", { capture: true })
  protected onInputKeyDown(event: KeyboardEvent): void {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const { alphaEnabled, internalColor, value } = this;
    const key = event.key;

    if (key === "Tab" || key === "Enter") {
      this.onInputChange();
      return;
    }

    const isNudgeKey = key === "ArrowDown" || key === "ArrowUp";
    const oldValue = this.value;

    if (isNudgeKey) {
      if (!value) {
        this.internalSetValue(this.previousNonNullValue, oldValue);
        event.preventDefault();
        return;
      }

      const direction = key === "ArrowUp" ? 1 : -1;
      const bump = shiftKey ? 10 : 1;

      this.internalSetValue(
        normalizeHex(hexify(this.nudgeRGBChannels(internalColor, bump * direction), alphaEnabled)),
        oldValue
      );

      event.preventDefault();
      return;
    }

    const withModifiers = altKey || ctrlKey || metaKey;
    const singleChar = key.length === 1;
    const validHexChar = hexChar.test(key);

    if (singleChar && !withModifiers && !validHexChar) {
      event.preventDefault();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private inputNode: HTMLCalciteInputElement;

  /**
   * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
   */
  @State() internalColor: Color | null = DEFAULT_COLOR;

  private previousNonNullValue: string = this.value;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const { alphaEnabled, intlHex, value } = this;
    const hexInputValue = this.formatForInternalInput(value);

    return (
      <div class={CSS.container}>
        <calcite-input
          class={CSS.input}
          label={intlHex}
          maxLength={alphaEnabled ? 8 : 6}
          onCalciteInputBlur={this.onCalciteInputBlur}
          onCalciteInputChange={this.onInputChange}
          prefixText="#"
          ref={this.storeInputRef}
          scale={this.scale}
          value={hexInputValue}
        />
        {hexInputValue ? (
          <calcite-color-picker-swatch
            active
            class={CSS.preview}
            color={`#${hexInputValue}`}
            scale={this.scale}
          />
        ) : null}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.inputNode);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private internalSetValue(value: string | null, oldValue: string | null, emit = true): void {
    if (value) {
      const { alphaEnabled } = this;
      const normalized = normalizeHex(value);

      if (
        !alphaEnabled
          ? isValidHex(normalized)
          : isValidHex(normalized, true) || canConvertToHexa(normalized)
      ) {
        const { internalColor: currentColor } = this;
        const nextColor = Color(normalized);
        const normalizedLonghand = normalizeHex(hexify(nextColor, alphaEnabled));

        this.internalColor = nextColor;
        this.previousNonNullValue = normalizedLonghand;
        this.value = normalizedLonghand;

        const changed =
          !currentColor || normalizedLonghand !== normalizeHex(hexify(currentColor, alphaEnabled));

        if (changed && emit) {
          this.calciteColorPickerHexInputChange.emit();
        }

        return;
      }
    } else if (this.allowEmpty) {
      this.internalColor = null;
      this.value = null;

      if (emit) {
        this.calciteColorPickerHexInputChange.emit();
      }

      return;
    }

    this.value = oldValue;
  }

  private storeInputRef = (node: HTMLCalciteInputElement): void => {
    this.inputNode = node;
  };

  private formatForInternalInput(hex: string): string {
    return hex ? hex.replace("#", "") : "";
  }

  private nudgeRGBChannels(color: Color, amount: number): Color {
    const nudgedRGBChannels = color.array().map((channel) => channel + amount);
    const nudgedColor = Color.rgb(nudgedRGBChannels);

    return this.alphaEnabled ? nudgedColor.alpha(color.alpha()) : nudgedColor;
  }
}
