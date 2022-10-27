import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h,
  VNode,
  State,
  Watch
} from "@stencil/core";

import { closestElementCrossShadowBoundary, getElementDir } from "../../utils/dom";
import { Scale } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import {
  NumberStringFormat,
  LocalizedComponent,
  connectLocalized,
  disconnectLocalized
} from "../../utils/locale";

@Component({
  tag: "calcite-date-picker-day",
  styleUrl: "date-picker-day.scss",
  shadow: true
})
export class DatePickerDay implements InteractiveComponent, LocalizedComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDatePickerDayElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** Day of the month to be shown. */
  @Prop() day!: number;

  /** Date is outside of range and can't be selected */
  @Prop({ reflect: true }) disabled = false;

  /** Date is in the current month. */
  @Prop({ reflect: true }) currentMonth = false;

  /** Date is the current selected date of the picker */
  @Prop({ reflect: true }) selected = false;

  /** Date is currently highlighted as part of the range */
  @Prop({ reflect: true }) highlighted = false;

  /** Showing date range */
  @Prop({ reflect: true }) range = false;

  /** Date is the start of date range */
  @Prop({ reflect: true }) startOfRange = false;

  /** Date is the end of date range */
  @Prop({ reflect: true }) endOfRange = false;

  /** Date is being hovered and within the set range */
  @Prop({ reflect: true }) rangeHover = false;

  /** Date is actively in focus for keyboard navigation */
  @Prop({ reflect: true }) active = false;

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: Scale;

  /** Date value for the day. */
  @Prop() value: Date;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  onClick = (): void => {
    !this.disabled && this.calciteDaySelect.emit();
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      !this.disabled && this.calciteDaySelect.emit();
      event.preventDefault();
    }
  };

  @Listen("pointerover")
  mouseoverHandler(): void {
    this.calciteInternalDayHover.emit();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted when user selects day
   */
  @Event({ cancelable: false }) calciteDaySelect: EventEmitter<void>;

  /**
   * Emitted when user hovers over a day
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalDayHover: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
  }

  componentWillLoad(): void {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(
      this.el,
      "calcite-date-picker"
    ) as HTMLCalciteDatePickerElement;

    this.formatter.numberFormatOptions = {
      useGrouping: false,
      numberingSystem: this.parentDatePickerEl?.numberingSystem,
      locale: this.effectiveLocale
    };
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
  }

  render(): VNode {
    const formattedDay = this.formatter.localize(String(this.day));
    const dir = getElementDir(this.el);
    return (
      <Host onClick={this.onClick} onKeyDown={this.keyDownHandler} role="gridcell">
        <div class={{ "day-v-wrapper": true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          <div class="day-wrapper">
            <span class="day">
              <span class="text">{formattedDay}</span>
            </span>
          </div>
        </div>
      </Host>
    );
  }

  componentDidRender(): void {
    updateHostInteraction(this, this.isTabbable);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private parentDatePickerEl: HTMLCalciteDatePickerElement;

  @State() formatter = new NumberStringFormat();

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleWatcher(locale: string): void {
    this.formatter.numberFormatOptions = {
      useGrouping: false,
      numberingSystem: this.parentDatePickerEl?.numberingSystem,
      locale
    };
  }

  isTabbable(): boolean {
    return this.active;
  }
}
