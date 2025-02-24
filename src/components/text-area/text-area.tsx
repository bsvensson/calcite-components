import {
  Component,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  VNode,
  Watch,
  Method,
  Host,
  State
} from "@stencil/core";
import { connectForm, disconnectForm, FormComponent, HiddenFormInputSlot } from "../../utils/form";
import { connectLabel, disconnectLabel, getLabelText, LabelableComponent } from "../../utils/label";
import { slotChangeHasAssignedElement, toAriaBoolean } from "../../utils/dom";
import { CSS, SLOTS, RESIZE_TIMEOUT } from "./resources";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter
} from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { TextAreaMessages } from "./assets/text-area/t9n";
import { throttle } from "lodash-es";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding text.
 * @slot footer-start - A slot for adding content to the start of the component's footer.
 * @slot footer-end - A slot for adding content to the end of the component's footer.
 */

@Component({
  tag: "calcite-text-area",
  styleUrl: "text-area.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class TextArea
  implements
    FormComponent,
    LabelableComponent,
    LocalizedComponent,
    LoadableComponent,
    T9nComponent,
    InteractiveComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteTextAreaElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, the component is focused on page load. Only one element can contain `autofocus`. If multiple elements have `autofocus`, the first element will receive focus.
   *
   * @mdn [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus)
   */
  @Prop({ reflect: true }) autofocus = false;

  /**
   * Specifies the component's number of columns.
   *
   * @mdn [cols](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols)
   */
  @Prop({ reflect: true }) columns: number;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @mdn [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The ID of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor `<form>` element, if any.
   */
  @Prop({ reflect: true })
  form: string;

  /**
   * When `true`, number values are displayed with a group separator corresponding to the language and country format.
   */
  @Prop({ reflect: true }) groupSeparator = false;

  /**
   * Accessible name for the component.
   */
  @Prop() label: string;

  /**
   * Specifies the maximum number of characters allowed.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-maxlength)
   */
  @Prop({ reflect: true }) maxLength: number;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TextAreaMessages;

  /**
   * Specifies the name of the component.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-name)
   */
  @Prop({ reflect: true }) name: string;

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  /**
   * Specifies the placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-placeholder)
   */
  @Prop() placeholder: string;

  /**
   * When `true`, the component's `value` can be read, but cannot be modified.
   *
   * @readonly
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @Prop({ reflect: true }) readOnly = false;

  /**
   * When `true`, the component must have a value in order for the form to submit.
   *
   * @mdn [required]https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @Prop({ reflect: true }) required = false;

  /** Specifies if the component is resizable. */
  @Prop({ reflect: true }) resize: "both" | "horizontal" | "vertical" | "none" = "both";

  /**
   * Specifies the component's number of rows.
   *
   * @mdn [rows](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows)
   */
  @Prop({ reflect: true }) rows: number;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: "l" | "m" | "s" = "m";

  /** The component's value. */
  @Prop({ mutable: true }) value: string;

  /**
   * Specifies the wrapping mechanism for the text.
   *
   * @mdn [wrap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap)
   */
  @Prop({ reflect: true }) wrap: "soft" | "hard" = "soft";

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TextAreaMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Event Emitters
  //
  //--------------------------------------------------------------------------
  /**
   * Fires each time a new `value` is typed.
   */
  @Event() calciteTextAreaInput: EventEmitter<void>;

  /**
   * Fires each time a new `value` is typed and committed.
   */
  @Event() calciteTextAreaChange: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLabel(this);
    connectForm(this);
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
    this.setTextAreaHeight();
  }

  disconnectedCallback(): void {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  render(): VNode {
    const hasFooter = this.startSlotHasElements || this.endSlotHasElements || !!this.maxLength;
    return (
      <Host>
        <textarea
          aria-invalid={toAriaBoolean(this.value?.length > this.maxLength)}
          aria-label={getLabelText(this)}
          autofocus={this.autofocus}
          class={{
            [CSS.readOnly]: this.readOnly,
            [CSS.textAreaInvalid]: this.value?.length > this.maxLength,
            [CSS.footerSlotted]: this.endSlotHasElements && this.startSlotHasElements,
            [CSS.blockSizeFull]: !hasFooter,
            [CSS.borderColor]: !hasFooter
          }}
          cols={this.columns}
          disabled={this.disabled}
          name={this.name}
          onChange={this.handleChange}
          onInput={this.handleInput}
          placeholder={this.placeholder}
          readonly={this.readOnly}
          required={this.required}
          rows={this.rows}
          value={this.value}
          wrap={this.wrap}
          // eslint-disable-next-line react/jsx-sort-props
          ref={this.setTextAreaEl}
        />
        <span class={{ [CSS.content]: true }}>
          <slot onSlotchange={this.contentSlotChangeHandler} />
        </span>
        <footer
          class={{
            [CSS.footer]: true,
            [CSS.readOnly]: this.readOnly,
            [CSS.hide]: !hasFooter
          }}
          ref={(el) => (this.footerEl = el as HTMLElement)}
        >
          <div
            class={{
              [CSS.container]: true,
              [CSS.footerEndSlotOnly]: !this.startSlotHasElements && this.endSlotHasElements
            }}
          >
            <slot
              name={SLOTS.footerStart}
              onSlotchange={(event) =>
                (this.startSlotHasElements = slotChangeHasAssignedElement(event))
              }
            />
            <slot
              name={SLOTS.footerEnd}
              onSlotchange={(event) =>
                (this.endSlotHasElements = slotChangeHasAssignedElement(event))
              }
            />
          </div>
          {this.renderCharacterLimit()}
        </footer>
        <HiddenFormInputSlot component={this} />
      </Host>
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
    await componentLoaded(this);
    this.textAreaEl.focus();
  }

  /** Selects the text of the component's `value`. */
  @Method()
  async selectText(): Promise<void> {
    await componentLoaded(this);
    this.textAreaEl.select();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  defaultValue: TextArea["value"];

  footerEl: HTMLElement;

  formEl: HTMLFormElement;

  labelEl: HTMLCalciteLabelElement;

  textAreaEl: HTMLTextAreaElement;

  @State() defaultMessages: TextAreaMessages;

  @State() endSlotHasElements: boolean;

  @State() startSlotHasElements: boolean;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  onFormReset(): void {
    this.value = this.defaultValue;
  }

  onLabelClick(): void {
    this.setFocus();
  }

  handleInput = (event: InputEvent): void => {
    this.value = event.target["value"];
    this.calciteTextAreaInput.emit();
  };

  handleChange = (): void => {
    this.calciteTextAreaChange.emit();
  };

  contentSlotChangeHandler = (): void => {
    if (!this.value) {
      const nodes = this.el.childNodes;
      nodes.forEach((el) => {
        if (el.nodeName === "#text") {
          this.value = el.nodeValue.trim();
        }
      });
    }
  };

  renderCharacterLimit = (): VNode => {
    return this.maxLength ? (
      <span class={CSS.characterLimit}>
        <span class={{ [CSS.characterOverLimit]: this.value?.length > this.maxLength }}>
          {this.getLocalizedCharacterLength()}
        </span>
        {"/"}
        {numberStringFormatter.localize(this.maxLength.toString())}
      </span>
    ) : null;
  };

  getLocalizedCharacterLength(): string {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "never",
      useGrouping: this.groupSeparator
    };
    return numberStringFormatter.localize(this.value ? this.value.length.toString() : "0");
  }

  resizeObserver = createObserver("resize", async () => {
    await componentLoaded(this);
    const { textAreaHeight, textAreaWidth, elHeight, elWidth, footerHeight, footerWidth } =
      this.getHeightandWidthOfElements();
    if (footerWidth > 0 && footerWidth !== textAreaWidth) {
      this.footerEl.style.width = `${textAreaWidth}px`;
    }
    if (elWidth !== textAreaWidth || elHeight !== textAreaHeight + (footerHeight || 0)) {
      this.setHeightAndWidthToAuto();
    }
  });

  syncHiddenFormInput(input: HTMLInputElement): void {
    input.setCustomValidity("");
    if (this.value?.length > this.maxLength) {
      input.setCustomValidity(this.messages.tooLong);
    }
  }

  // height and width are set to auto here to avoid overlapping on to neighboring elements in the layout when user starts resizing.
  // throttle is used to avoid flashing of textarea when user resizes.
  private setHeightAndWidthToAuto = throttle(
    (): void => {
      if (this.resize === "vertical" || this.resize === "both") {
        this.el.style.height = "auto";
      }
      if (this.resize === "horizontal" || this.resize === "both") {
        this.el.style.width = "auto";
      }
    },
    RESIZE_TIMEOUT,
    { leading: false }
  );

  setTextAreaEl = (el: HTMLTextAreaElement): void => {
    this.textAreaEl = el;
    this.resizeObserver.observe(el);
  };

  setTextAreaHeight(): void {
    const { textAreaHeight, elHeight, footerHeight } = this.getHeightandWidthOfElements();
    if (footerHeight > 0 && textAreaHeight + footerHeight != elHeight) {
      this.textAreaEl.style.height = `${elHeight - footerHeight}px`;
    }
  }

  getHeightandWidthOfElements(): {
    textAreaHeight: number;
    textAreaWidth: number;
    elHeight: number;
    elWidth: number;
    footerHeight: number;
    footerWidth: number;
  } {
    const { height: textAreaHeight, width: textAreaWidth } =
      this.textAreaEl.getBoundingClientRect();
    const { height: elHeight, width: elWidth } = this.el.getBoundingClientRect();
    const { height: footerHeight, width: footerWidth } = this.footerEl?.getBoundingClientRect();

    return {
      textAreaHeight,
      textAreaWidth,
      elHeight,
      elWidth,
      footerHeight,
      footerWidth
    };
  }
}
