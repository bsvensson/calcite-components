import {
  Build,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import { CSS, SLOTS, ICONS } from "./resources";
import { Appearance, Kind, Scale, SelectionMode } from "../interfaces";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { slotChangeHasAssignedElement } from "../../utils/dom";
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
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import { isActivationKey } from "../../utils/key";
import { ChipMessages } from "./assets/chip/t9n";
import { ChipAria } from "./interfaces";

/**
 * @slot - A slot for adding text.
 * @slot image - A slot for adding an image.
 */
@Component({
  tag: "calcite-chip",
  styleUrl: "chip.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Chip
  implements ConditionalSlotComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Specifies the appearance style of the component. */
  @Prop({ reflect: true }) appearance: Extract<"outline" | "outline-fill" | "solid", Appearance> =
    "solid";

  /** Specifies the kind of the component (will apply to border and background if applicable). */
  @Prop({ reflect: true }) kind: Extract<"brand" | "inverse" | "neutral", Kind> = "neutral";

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true }) closable = false;

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: string;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The component's value. */
  @Prop() value!: any;

  /** When `true`, hides the component. */
  @Prop({ reflect: true, mutable: true }) closed = false;

  /**
   * This internal property, managed by a containing `calcite-chip-group`, is
   * conditionally set based on the `selectionMode` of the parent
   *
   * @internal
   */
  @Prop() selectionMode: Extract<"multiple" | "single" | "single-persist" | "none", SelectionMode> =
    "none";

  /** When true, the component is selected.  */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ChipMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ChipMessages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  // --------------------------------------------------------------------------

  @State() defaultMessages: ChipMessages;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() private hasContent = false;

  @State() private hasImage = false;

  private containerEl: HTMLDivElement;

  private parentGroupEl: HTMLCalciteChipGroupElement;

  private mutationObserver = createObserver("mutation", () => this.updateHasContent());

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the component's close button is selected.
   */
  @Event({ cancelable: false }) calciteChipClose: EventEmitter<void>;

  /**
   * Fires when the selected state of the component changes.
   */
  @Event({ cancelable: false }) calciteChipSelect: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalChipKeyEvent: EventEmitter<KeyboardEvent>;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.parentGroupEl = this.el.parentElement as HTMLCalciteChipGroupElement;
    connectConditionalSlotComponent(this);
    connectLocalized(this);
    connectMessages(this);
    this.setupTextContentObserver();
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    if (Build.isBrowser) {
      await setUpMessages(this);
      this.updateHasContent();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown", { capture: true })
  keyDownHandler(event: KeyboardEvent): void {
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.itemSelectHandler();
          event.preventDefault();
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalChipKeyEvent.emit(event);
          event.preventDefault();
          break;
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** When `closable` is `true`, sets focus on the component's "close" button (the first focusable item). */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.containerEl?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private closeHandler = (): void => {
    this.calciteChipClose.emit();
    this.selected = false;
    this.closed = true;
  };

  private closeButtonKeyDownHandler = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      event.preventDefault();
      this.closeHandler();
    }
  };

  private updateHasContent() {
    const slottedContent = this.el.textContent.trim().length > 0 || this.el.childNodes.length > 0;
    this.hasContent =
      this.el.childNodes.length > 0 && this.el.childNodes[0]?.nodeName === "#text"
        ? this.el.textContent?.trim().length > 0
        : slottedContent;
  }

  private setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  private handleSlotImageChange = (event: Event): void => {
    this.hasImage = slotChangeHasAssignedElement(event);
  };

  private itemSelectHandler = (): void => {
    this.calciteChipSelect.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderChipImage(): VNode {
    return (
      <div class={CSS.imageContainer} key="image">
        <slot name={SLOTS.image} onSlotchange={this.handleSlotImageChange} />
      </div>
    );
  }

  renderSelectionIcon(): VNode {
    const icon =
      this.selectionMode === "multiple" && this.selected
        ? "check-circle-f"
        : this.selectionMode === "multiple"
        ? "circle"
        : this.selected && "circle-f";

    return (
      <div
        class={`select-icon ${this.selectionMode === "multiple" || this.selected ? "active" : ""}`}
      >
        <calcite-icon
          class={CSS.chipIcon}
          icon={icon ? icon : undefined}
          scale={this.scale === "l" ? "m" : "s"}
        />
      </div>
    );
  }

  renderCloseButton(): VNode {
    return (
      <button
        aria-label={this.messages.dismissLabel}
        class={CSS.close}
        onClick={this.closeHandler}
        onKeyDown={this.closeButtonKeyDownHandler}
      >
        <calcite-icon
          class={CSS.closeIcon}
          icon={ICONS.close}
          scale={this.scale === "l" ? "m" : "s"}
        />
      </button>
    );
  }

  renderImageSlot(): VNode {
    return (
      <div class={CSS.imageContainer} key="image">
        <slot name={SLOTS.image} />
      </div>
    );
  }

  renderIcon(): VNode {
    return (
      <calcite-icon class={CSS.chipIcon} flipRtl={this.iconFlipRtl} icon={this.icon} scale="s" />
    );
  }

  render(): VNode {
    const aria: ChipAria = {
      "aria-checked": toAriaBoolean(this.selected),
      "aria-labelledby": this.parentGroupEl.label,
      role: this.selectionMode === "multiple" ? "checkbox" : "radio"
    };

    return (
      <Host>
        <div
          {...aria}
          class={{
            [CSS.container]: true,
            [CSS.contentSlotted]: this.hasContent,
            [CSS.imageSlotted]: this.hasImage
          }}
          onClick={this.itemSelectHandler}
          tabIndex={0}
          // eslint-disable-next-line react/jsx-sort-props
          ref={(el) => (this.containerEl = el)}
        >
          {this.selectionMode !== "none" && this.renderSelectionIcon()}
          {this.renderChipImage()}
          {this.icon && this.renderIcon()}
          <span class={CSS.title}>
            <slot />
          </span>
          {this.closable && this.renderCloseButton()}
        </div>
      </Host>
    );
  }
}
