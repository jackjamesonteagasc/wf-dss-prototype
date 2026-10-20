import type { HalfMonthId, PeriodHours } from "../contracts/types.js";

const pattern = /^(0[1-9]|1[0-2])H([12])$/;

export interface ParsedPeriod {
  month: number;
  half: 1 | 2;
  index: number;
}

export function parsePeriodId(id: string): ParsedPeriod | null {
  const match = pattern.exec(id);
  if (!match) return null;
  const month = Number(match[1]);
  const half = (match[2] === "1" ? 1 : 2) as 1 | 2;
  return { month, half, index: (month - 1) * 2 + (half - 1) };
}

export function formatPeriodIndex(index: number): HalfMonthId {
  if (!Number.isInteger(index) || index < 0 || index > 23) {
    throw new Error(`half-month index out of range: ${index}`);
  }
  const month = Math.floor(index / 2) + 1;
  const half = index % 2 === 0 ? 1 : 2;
  return `${String(month).padStart(2, "0")}H${half}`;
}

export function expandWindow(start: HalfMonthId, end: HalfMonthId): HalfMonthId[] {
  const from = parsePeriodId(start);
  const to = parsePeriodId(end);
  if (!from) throw new Error(`invalid start half-month id: "${start}"`);
  if (!to) throw new Error(`invalid end half-month id: "${end}"`);
  if (to.index < from.index) {
    throw new Error(`operation window ends before it starts: ${start} -> ${end}`);
  }
  const periods: HalfMonthId[] = [];
  for (let i = from.index; i <= to.index; i += 1) periods.push(formatPeriodIndex(i));
  return periods;
}

/** Even spread across the window is an explicit model assumption (A-015). */
export function splitEvenly(totalHours: number, periods: HalfMonthId[]): PeriodHours[] {
  if (periods.length === 0) throw new Error("operation window contains no periods");
  const hours = totalHours / periods.length;
  return periods.map((period) => ({ period, hours }));
}

export const ALL_PERIODS: HalfMonthId[] = Array.from({ length: 24 }, (_, i) =>
  formatPeriodIndex(i),
);
