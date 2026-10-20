import type {
  CropYearResult,
  FieldState,
  MachineryDemandRecord,
  PeriodHours,
  RotationSummary,
} from "../contracts/types.js";
import { missing, ok } from "../contracts/state.js";
import { ALL_PERIODS } from "./periods.js";

function okValues<T>(states: FieldState<T>[]): T[] | null {
  const values: T[] = [];
  for (const state of states) {
    if (state.status === "missing") return null;
    values.push(state.value);
  }
  return values;
}

function reasonsFor<T>(states: FieldState<T>[], label: string): string[] {
  const reasons: string[] = [];
  states.forEach((state, index) => {
    if (state.status === "missing") {
      for (const reason of state.reasons) reasons.push(`year ${index + 1} ${label}: ${reason}`);
    }
  });
  return reasons.length > 0 ? reasons : [`${label}: unavailable`];
}

/** M6: rotation summary and per-period aggregation. */
export function summarise(
  cropYears: CropYearResult[],
  machinery: MachineryDemandRecord[],
  areaHa: number,
): RotationSummary {
  const yearCount = Math.max(cropYears.length, 1);

  const yieldStates = cropYears.map((row) => row.effectiveYieldTPerHa);
  const yields = okValues(yieldStates);
  const meanYield = yields
    ? ok(yields.reduce((sum, value) => sum + value, 0) / yearCount)
    : missing(...reasonsFor(yieldStates, "yield"));

  const outputStates = cropYears.map((row) => row.outputTonnes);
  const outputs = okValues(outputStates);
  const totalOutput = outputs
    ? ok(outputs.reduce((sum, value) => sum + value, 0))
    : missing(...reasonsFor(outputStates, "output"));

  const marginStates = cropYears.map((row) => row.grossMarginPerHa);
  const margins = okValues(marginStates);
  const annualisedMargin = margins
    ? ok(margins.reduce((sum, value) => sum + value, 0) / yearCount)
    : missing(...reasonsFor(marginStates, "margin"));
  const annualisedMarginTotal =
    annualisedMargin.status === "ok"
      ? ok(annualisedMargin.value * areaHa)
      : missing(...annualisedMargin.reasons);

  let hoursByPeriod: FieldState<PeriodHours[]>;
  const missingRecords = machinery.filter((record) => record.byPeriod.status === "missing");
  if (machinery.length === 0) {
    hoursByPeriod = missing("no operations were generated for this rotation");
  } else if (missingRecords.length > 0) {
    hoursByPeriod = missing(
      ...missingRecords.map((record) => {
        const state = record.byPeriod as { status: "missing"; reasons: string[] };
        return `${record.cropId} / ${record.operationName}: ${state.reasons.join("; ")}`;
      }),
    );
  } else {
    const totals = new Map<string, number>(ALL_PERIODS.map((period) => [period, 0]));
    for (const record of machinery) {
      if (record.byPeriod.status !== "ok") continue;
      for (const slice of record.byPeriod.value) {
        totals.set(slice.period, (totals.get(slice.period) ?? 0) + slice.hours);
      }
    }
    hoursByPeriod = ok(
      ALL_PERIODS.map((period) => ({ period, hours: totals.get(period) ?? 0 })),
    );
  }

  const hoursStates = machinery.map((record) => record.hoursPerYear);
  const hoursValues = okValues(hoursStates);
  const totalHoursPerYear = hoursValues
    ? ok(hoursValues.reduce((sum, value) => sum + value, 0))
    : missing(...reasonsFor(hoursStates, "hours"));

  let peakPeriod: FieldState<{ period: string; hours: number }>;
  if (hoursByPeriod.status === "ok") {
    let best: PeriodHours = hoursByPeriod.value[0] ?? { period: ALL_PERIODS[0] ?? "01H1", hours: 0 };
    for (const slice of hoursByPeriod.value) {
      if (slice.hours > best.hours) best = slice;
    }
    peakPeriod = ok({ period: best.period, hours: best.hours });
  } else {
    peakPeriod = missing(...hoursByPeriod.reasons);
  }

  return {
    meanYieldTPerHa: meanYield,
    totalOutputTonnes: totalOutput,
    annualisedGrossMarginPerHa: annualisedMargin,
    annualisedGrossMarginTotal: annualisedMarginTotal,
    hoursByPeriod,
    peakPeriod,
    totalHoursPerYear,
  };
}
