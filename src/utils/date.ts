import { DateLocaleData } from "../components/date-picker/utils";

export interface HoverRange {
  focused: "end" | "start";
  start: Date;
  end: Date;
}

/**
 * Check if date is within a min and max
 *
 * @param date
 * @param min
 * @param max
 */
export function inRange(date: Date, min?: Date, max?: Date): boolean {
  const time = date.getTime();
  const afterMin = !(min instanceof Date) ? true : time >= min.getTime();
  const beforeMax = !(max instanceof Date) ? true : time <= max.getTime();
  return afterMin && beforeMax;
}

/**
 * Ensures date is within range,
 * returns min or max if out of bounds
 *
 * @param date
 * @param min
 * @param max
 */
export function dateFromRange(date?: any, min?: Date | string, max?: Date | string): Date | null {
  if (!(date instanceof Date)) {
    return null;
  }
  const time = date.getTime();
  const beforeMin = min instanceof Date && time < min.getTime();
  const afterMax = max instanceof Date && time > max.getTime();
  if (beforeMin) {
    return min as Date;
  }
  if (afterMax) {
    return max as Date;
  }
  return date;
}

/**
 * Parse an iso8601 string (YYYY-mm-dd) into a valid date.
 * TODO: handle time when time of day UI is added
 *
 * @param iso8601
 */
export function dateFromISO(iso8601: string | Date): Date | null {
  if (iso8601 instanceof Date) {
    return iso8601;
  }
  if (!iso8601 || typeof iso8601 !== "string") {
    return null;
  }
  const d = iso8601.split(/[: T-]/).map(parseFloat);
  const date = new Date(d[0], (d[1] || 1) - 1, d[2] || 1);
  date.setFullYear(d[0]);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ISO 8601 date: "${iso8601}"`);
  }
  return date;
}

/**
 * Return first portion of ISO string (YYYY-mm-dd)
 *
 * @param date
 */
export function dateToISO(date?: Date | string): string {
  if (typeof date === "string") {
    return date;
  }
  if (date instanceof Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  }
  return "";
}

/**
 * Check if two dates are the same day, month, year
 *
 * @param d1
 * @param d2
 */
export function sameDate(d1: Date, d2: Date): boolean {
  return (
    d1 instanceof Date &&
    d2 instanceof Date &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

/**
 * Get a date one month in the past
 *
 * @param date
 */
export function prevMonth(date: any): Date {
  const month = date.getMonth();
  const nextDate = new Date(date);
  nextDate.setMonth(month - 1);
  // date doesn't exist in new month, use last day
  if (month === nextDate.getMonth()) {
    return new Date(date.getFullYear(), month, 0);
  }
  return nextDate;
}

/**
 * Get a date one month in the future
 *
 * @param date
 */
export function nextMonth(date: any): Date {
  const month = date.getMonth();
  const nextDate = new Date(date);
  nextDate.setMonth(month + 1);
  // date doesn't exist in new month, use last day
  if ((month + 2) % 7 === nextDate.getMonth() % 7) {
    return new Date(date.getFullYear(), month + 2, 0);
  }
  return nextDate;
}

/**
 * Translate a number into a given locals numeral system
 *
 * @param num
 * @param localeData
 */
export function localizeNumber(num: number, localeData: DateLocaleData): string {
  return String(num)
    .split("")
    .map((i) => localeData.numerals[i])
    .join("");
}

/**
 * Calculate actual number from localized string
 *
 * @param str
 * @param localeData
 */
export function parseNumber(str: string, localeData: DateLocaleData): number {
  const numerals = "0123456789";
  return parseInt(
    str
      .split("")
      .map((i) => numerals[localeData.numerals.indexOf(i)])
      .filter((num) => num)
      .join("")
  );
}

/**
 * Parse numeric units for day, month, and year from a localized string
 * month starts at 0 (can pass to date constructor)
 *
 * @param str
 * @param localeData
 */
export function parseDateString(str: string, localeData: DateLocaleData): { day: number; month: number; year: number } {
  const { separator, unitOrder } = localeData;
  const order = getOrder(unitOrder);
  const values = replaceArabicNumerals(str).split(separator);
  return {
    day: parseInt(values[order.indexOf("d")]),
    month: parseInt(values[order.indexOf("m")]) - 1,
    year: parseInt(values[order.indexOf("y")])
  };
}

/**
 * Convert eastern arbic numerals
 *
 * @param str
 */
export function replaceArabicNumerals(str = ""): string {
  return str
    .replace(/[\u0660-\u0669]/g, (c) => (c.charCodeAt(0) - 0x0660) as any)
    .replace(/[\u06f0-\u06f9]/g, (c) => (c.charCodeAt(0) - 0x06f0) as any);
}

type unitOrderSignifier = "m" | "d" | "y";

/**
 * Based on the unitOrder string, find order of month, day, and year for locale
 *
 * @param unitOrder
 */
export function getOrder(unitOrder: string): unitOrderSignifier[] {
  const signifiers: unitOrderSignifier[] = ["d", "m", "y"];
  const order = unitOrder.toLowerCase();
  return signifiers.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

/**
 * Get number of days between two dates
 *
 * @param date1
 * @param date2
 */
export function getDaysDiff(date1: Date, date2: Date): number {
  const ts1 = date1.getTime();
  const ts2 = date2.getTime();
  return (ts1 - ts2) / (1000 * 3600 * 24);
}
