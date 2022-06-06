import {
  Component,
  h,
  Prop,
  Event,
  Element,
  Host,
  State,
  EventEmitter,
  Watch,
  VNode,
  Build
} from "@stencil/core";
import { getLocaleData, DateLocaleData } from "./utils";
import {
  dateFromRange,
  dateFromISO,
  dateToISO,
  getDaysDiff,
  HoverRange,
  inRange
} from "../../utils/date";
import { HeadingLevel } from "../functional/Heading";

import { DateRangeChange } from "./interfaces";
import { HEADING_LEVEL, TEXT } from "./resources";

@Component({
  assetsDirs: ["assets"],
  tag: "calcite-date-picker",
  styleUrl: "date-picker.scss",
  shadow: true
})
export class DatePicker {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteDatePickerElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** Active range */
  @Prop() activeRange?: "start" | "end";

  /** Selected date */
  @Prop({ mutable: true }) value?: string | string[];

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Selected date as full date object*/
  @Prop({ mutable: true }) valueAsDate?: Date | Date[];

  @Watch("valueAsDate")
  handleValueAsDate(date: Date | Date[]): void {
    if (!Array.isArray(date) && date && date !== this.activeDate) {
      this.activeDate = date;
    }
  }

  /**
   * Selected start date as full date object
   *
   * @deprecated use valueAsDate instead
   */
  @Prop({ mutable: true }) startAsDate?: Date;

  /**
   * Selected end date as full date object
   *
   * @deprecated use valueAsDate instead
   */
  @Prop({ mutable: true }) endAsDate?: Date;

  /** Earliest allowed date as full date object */
  @Prop({ mutable: true }) minAsDate?: Date;

  /** Latest allowed date as full date object */
  @Prop({ mutable: true }) maxAsDate?: Date;

  @Watch("startAsDate")
  @Watch("endAsDate")
  handleRangeChange(): void {
    const { startAsDate: startDate, endAsDate: endDate } = this;

    this.activeEndDate = endDate;
    this.activeStartDate = startDate;
  }

  /** Earliest allowed date ("yyyy-mm-dd") */
  @Prop({ mutable: true }) min?: string;

  @Watch("min")
  onMinChanged(min: string): void {
    if (min) {
      this.minAsDate = dateFromISO(min);
    }
  }

  /** Latest allowed date ("yyyy-mm-dd") */
  @Prop({ mutable: true }) max?: string;

  @Watch("max")
  onMaxChanged(max: string): void {
    if (max) {
      this.maxAsDate = dateFromISO(max);
    }
  }

  /**
   * Localized string for "previous month" (used for aria label)
   *
   * @default "Previous month"
   */
  @Prop() intlPrevMonth?: string = TEXT.prevMonth;

  /**
   * Localized string for "next month" (used for aria label)
   *
   * @default "Next month"
   */
  @Prop() intlNextMonth?: string = TEXT.nextMonth;

  /**
   * Localized string for "year" (used for aria label)
   *
   * @default "Year"
   */
  @Prop() intlYear?: string = TEXT.year;

  /** BCP 47 language tag for desired language and country format */
  @Prop() locale?: string = document.documentElement.lang || "en";

  /** specify the scale of the date picker */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Range mode activation */
  @Prop({ reflect: true }) range = false;

  /**
   * Selected start date
   *
   * @deprecated use value instead
   */
  @Prop({ mutable: true }) start?: string;

  /**
   * Selected end date
   *
   * @deprecated use value instead
   */
  @Prop({ mutable: true }) end?: string;

  /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
  @Prop() proximitySelectionDisabled = false;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /**
   * Trigger calcite date change when a user changes the date.
   */
  @Event() calciteDatePickerChange: EventEmitter<Date>;

  /**
   * Trigger calcite date change when a user changes the date range.
   *
   * @see [DateRangeChange](https://github.com/Esri/calcite-components/blob/master/src/components/date-picker/interfaces.ts#L1)
   */
  @Event() calciteDatePickerRangeChange: EventEmitter<DateRangeChange>;

  /**
   * Active date.
   */
  @State() activeDate: Date;

  /**
   * Active start date.
   */
  @State() activeStartDate: Date;

  /**
   * Active end date.
   */
  @State() activeEndDate: Date;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback(): void {
    if (Array.isArray(this.value)) {
      this.valueAsDate = this.value.map((v) => dateFromISO(v));
      this.start = this.value[0];
      this.end = this.value[1];
    } else if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
    }

    if (this.start) {
      this.setStartAsDate(dateFromISO(this.start));
    }

    if (this.end) {
      this.setEndAsDate(dateFromISO(this.end));
    }

    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }

    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
  }

  async componentWillLoad(): Promise<void> {
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }

  render(): VNode {
    const date = this.range
      ? this.startAsDate
      : !Array.isArray(this.valueAsDate)
      ? this.valueAsDate
      : this.valueAsDate[0];

    const isValidDate =
      this.valueAsDate && (this.minAsDate || this.maxAsDate)
        ? inRange(
            this.range
              ? this.startAsDate
              : !Array.isArray(this.valueAsDate)
              ? (this.valueAsDate as Date)
              : this.valueAsDate[0],
            this.minAsDate,
            this.maxAsDate
          )
        : true;
    const activeStartDate = this.range
      ? this.getActiveStartDate(this.startAsDate, isValidDate, this.minAsDate, this.maxAsDate)
      : this.getActiveDate(date, isValidDate, this.minAsDate, this.maxAsDate);
    let activeDate = activeStartDate;
    const endDate = this.range ? this.endAsDate : null;
    const activeEndDate = this.getActiveEndDate(
      endDate,
      isValidDate,
      this.minAsDate,
      this.maxAsDate
    );

    if (
      (this.activeRange === "end" ||
        (this.hoverRange?.focused === "end" && (!this.proximitySelectionDisabled || endDate))) &&
      activeEndDate
    ) {
      activeDate = activeEndDate;
    }
    return (
      <Host onBlur={this.reset} onKeyUp={this.keyUpHandler} role="application">
        {this.renderCalendar(
          activeDate,
          this.maxAsDate,
          this.minAsDate,
          date,
          endDate,
          isValidDate
        )}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() private localeData: DateLocaleData;

  @State() private hoverRange: HoverRange;

  private mostRecentRangeValue?: Date;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  keyUpHandler = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      this.reset();
    }
  };

  @Watch("value")
  valueHandler(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.valueAsDate = value.map((v) => dateFromISO(v));
      this.start = value[0];
      this.end = value[1];
    } else if (value) {
      this.valueAsDate = dateFromISO(value);
      this.start = "";
      this.end = "";
    }
  }

  @Watch("start")
  startWatcher(start: string): void {
    this.setStartAsDate(dateFromISO(start));
  }

  @Watch("end")
  endWatcher(end: string): void {
    this.setEndAsDate(dateFromISO(end));
  }

  @Watch("locale")
  private async loadLocaleData(): Promise<void> {
    if (!Build.isBrowser) {
      return;
    }

    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }

  monthHeaderSelectChange = (e: CustomEvent<Date>): void => {
    const date = new Date(e.detail);
    if (!this.range) {
      this.activeDate = date;
    } else {
      if (this.activeRange === "end") {
        this.activeEndDate = date;
      } else {
        this.activeStartDate = date;
      }
      this.mostRecentRangeValue = date;
    }
  };

  monthActiveDateChange = (e: CustomEvent<Date>): void => {
    const date = new Date(e.detail);
    if (!this.range) {
      this.activeDate = date;
    } else {
      if (this.activeRange === "end") {
        this.activeEndDate = date;
      } else {
        this.activeStartDate = date;
      }
      this.mostRecentRangeValue = date;
    }
  };

  monthHoverChange = (e: CustomEvent<Date>): void => {
    if (!this.startAsDate) {
      this.hoverRange = undefined;
      return;
    }
    const date = new Date(e.detail);
    this.hoverRange = {
      focused: this.activeRange || "start",
      start: this.startAsDate,
      end: this.endAsDate
    };
    if (!this.proximitySelectionDisabled) {
      if (this.endAsDate) {
        const startDiff = getDaysDiff(date, this.startAsDate);
        const endDiff = getDaysDiff(date, this.endAsDate);
        if (endDiff > 0) {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        } else if (startDiff < 0) {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        } else if (startDiff > endDiff) {
          this.hoverRange.start = date;
          this.hoverRange.focused = "start";
        } else {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        }
      } else {
        if (date < this.startAsDate) {
          this.hoverRange = {
            focused: "start",
            start: date,
            end: this.startAsDate
          };
        } else {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        }
      }
    } else {
      if (!this.endAsDate) {
        if (date < this.startAsDate) {
          this.hoverRange = {
            focused: "start",
            start: date,
            end: this.startAsDate
          };
        } else {
          this.hoverRange.end = date;
          this.hoverRange.focused = "end";
        }
      } else {
        this.hoverRange = undefined;
      }
    }
    e.stopPropagation();
  };

  monthMouseOutChange = (): void => {
    if (this.hoverRange) {
      this.hoverRange = undefined;
    }
  };

  /**
   * Render calcite-date-picker-month-header and calcite-date-picker-month
   *
   * @param activeDate
   * @param maxDate
   * @param minDate
   * @param date
   * @param endDate
   * @param isValidDate
   */
  private renderCalendar(
    activeDate: Date,
    maxDate: Date,
    minDate: Date,
    date: Date,
    endDate: Date,
    isValidDate?: boolean
  ) {
    return (
      this.localeData && [
        <calcite-date-picker-month-header
          activeDate={activeDate}
          headingLevel={this.headingLevel || HEADING_LEVEL}
          intlNextMonth={this.intlNextMonth}
          intlPrevMonth={this.intlPrevMonth}
          intlYear={this.intlYear}
          isValidDate={isValidDate}
          localeData={this.localeData}
          max={maxDate}
          min={minDate}
          onCalciteDatePickerSelect={this.monthHeaderSelectChange}
          scale={this.scale}
          selectedDate={this.activeRange === "end" ? endDate : date || new Date()}
        />,
        <calcite-date-picker-month
          activeDate={activeDate}
          endDate={this.range ? endDate : undefined}
          hoverRange={this.hoverRange}
          localeData={this.localeData}
          max={maxDate}
          min={minDate}
          onCalciteDatePickerActiveDateChange={this.monthActiveDateChange}
          onCalciteDatePickerSelect={this.monthDateChange}
          onCalciteInternalDatePickerHover={this.monthHoverChange}
          onCalciteInternalDatePickerMouseOut={this.monthMouseOutChange}
          scale={this.scale}
          selectedDate={this.activeRange === "end" ? endDate : date}
          startDate={this.range ? date : undefined}
        />
      ]
    );
  }

  /**
   * Update date instance of start if valid
   *
   * @param startDate
   * @param emit
   */
  private setStartAsDate(startDate: Date, emit?: boolean): void {
    this.startAsDate = startDate;
    this.mostRecentRangeValue = this.startAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate,
        endDate: this.endAsDate
      });
    }
  }

  /**
   * Update date instance of end if valid
   *
   * @param endDate
   * @param emit
   */
  private setEndAsDate(endDate: Date, emit?: boolean): void {
    this.endAsDate = endDate;
    this.mostRecentRangeValue = this.endAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate: this.startAsDate,
        endDate
      });
    }
  }

  /**
   * Reset active date and close
   */
  reset = (): void => {
    if (
      !Array.isArray(this.valueAsDate) &&
      this.valueAsDate &&
      this.valueAsDate?.getTime() !== this.activeDate?.getTime()
    ) {
      this.activeDate = new Date(this.valueAsDate);
    }
    if (this.startAsDate && this.startAsDate?.getTime() !== this.activeStartDate?.getTime()) {
      this.activeStartDate = new Date(this.startAsDate);
    }
    if (this.endAsDate && this.endAsDate?.getTime() !== this.activeEndDate?.getTime()) {
      this.activeEndDate = new Date(this.endAsDate);
    }
  };

  private setEndDate(date: Date): void {
    this.end = date ? dateToISO(date) : "";
    this.setEndAsDate(date, true);
    this.activeEndDate = date || null;
  }

  private setStartDate(date: Date): void {
    this.start = date ? dateToISO(date) : "";
    this.setStartAsDate(date, true);
    this.activeStartDate = date || null;
  }

  /**
   * Event handler for when the selected date changes
   *
   * @param e
   */
  private monthDateChange = (e: CustomEvent<Date>): void => {
    const date = new Date(e.detail);
    if (!this.range) {
      this.value = date ? dateToISO(date) : "";
      this.valueAsDate = date || null;
      this.activeDate = date || null;
      this.calciteDatePickerChange.emit(date);
      return;
    }

    if (!this.startAsDate || (!this.endAsDate && date < this.startAsDate)) {
      if (this.startAsDate) {
        this.setEndDate(new Date(this.startAsDate));
      }
      if (this.activeRange == "end") {
        this.setEndDate(date);
      } else {
        this.setStartDate(date);
      }
    } else if (!this.endAsDate) {
      this.setEndDate(date);
    } else {
      if (!this.proximitySelectionDisabled) {
        if (this.activeRange) {
          if (this.activeRange == "end") {
            this.setEndDate(date);
          } else {
            this.setStartDate(date);
          }
        } else {
          const startDiff = getDaysDiff(date, this.startAsDate);
          const endDiff = getDaysDiff(date, this.endAsDate);
          if (endDiff === 0 || startDiff < 0) {
            this.setStartDate(date);
          } else if (startDiff === 0 || endDiff < 0) {
            this.setEndDate(date);
          } else if (startDiff < endDiff) {
            this.setStartDate(date);
          } else {
            this.setEndDate(date);
          }
        }
      } else {
        this.setStartDate(date);
        this.endAsDate = this.activeEndDate = this.end = undefined;
      }
    }
    this.calciteDatePickerChange.emit(date);
  };

  /**
   * Get an active date using the value, or current date as default
   *
   * @param value
   * @param isValidDate
   * @param min
   * @param max
   */
  private getActiveDate(
    value: Date | null,
    isValidDate = true,
    min: Date | null,
    max: Date | null
  ): Date {
    return isValidDate
      ? dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max)
      : this.activeDate || value;
  }

  private getActiveStartDate(
    value: Date | null,
    isValidDate = true,
    min: Date | null,
    max: Date | null
  ): Date {
    return isValidDate
      ? dateFromRange(this.activeStartDate, min, max) ||
          value ||
          dateFromRange(new Date(), min, max)
      : this.activeStartDate || value;
  }

  private getActiveEndDate(
    value: Date | null,
    isValidDate = true,
    min: Date | null,
    max: Date | null
  ): Date {
    return isValidDate
      ? dateFromRange(this.activeEndDate, min, max) || value || dateFromRange(new Date(), min, max)
      : this.activeEndDate || value;
  }
}
