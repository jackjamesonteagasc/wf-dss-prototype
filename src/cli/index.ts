import { join } from "node:path";
import { loadDataset } from "../packs/load.js";
import { runScenario } from "../engine/index.js";
import type {
  FieldState,
  PeriodHours,
  ScenarioResult,
} from "../contracts/types.js";

const dataDir = process.argv[2] ?? join(process.cwd(), "data");
const dataset = loadDataset(dataDir);
const results = dataset.scenarios.map((scenario) =>
  runScenario(dataset.packs, scenario),
);

const fmt = (value: number, digits = 1): string => value.toFixed(digits);
const stateText = <T>(state: FieldState<T>, render: (value: T) => string): string =>
  state.status === "ok" ? render(state.value) : "MISSING";

function rotationLabel(result: ScenarioResult): string {
  return result.cropYears
    .map((row) => `${row.cropId} (${row.establishmentVariant})`)
    .join(" -> ");
}

function nonZeroBuckets(state: FieldState<PeriodHours[]>): string {
  if (state.status === "missing") return "MISSING";
  const parts = state.value
    .filter((slice) => slice.hours > 0)
    .map((slice) => `${slice.period} ${fmt(slice.hours)}h`);
  return parts.length > 0 ? parts.join(" · ") : "none";
}

function collectMissing(result: ScenarioResult): string[] {
  const reasons: string[] = [];
  for (const row of result.cropYears) {
    const prefix = `year ${row.yearIndex + 1} (${row.cropId})`;
    for (const [label, state] of Object.entries({
      yield: row.effectiveYieldTPerHa,
      output: row.outputTonnes,
      revenue: row.revenuePerHa,
      "variable costs": row.variableCostsPerHa,
      "machinery charge": row.machineryChargePerHa,
    })) {
      const typed = state as FieldState<number>;
      if (typed.status === "missing") {
        for (const reason of typed.reasons) reasons.push(`${prefix} ${label}: ${reason}`);
      }
    }
  }
  for (const record of result.machinery) {
    if (record.hoursPerYear.status === "missing") {
      for (const reason of record.hoursPerYear.reasons) {
        reasons.push(
          `year ${record.yearIndex + 1} (${record.cropId}) ${record.operationName}: ${reason}`,
        );
      }
    }
  }
  for (const warning of result.warnings) reasons.push(warning);
  return [...new Set(reasons)];
}

function printScenario(result: ScenarioResult): void {
  console.log(`\n## Scenario: ${result.scenario.name}${result.scenario.baseline ? " (baseline)" : ""}`);
  console.log(`Area: ${result.scenario.areaHa} ha · rotation: ${rotationLabel(result)}`);

  console.log("\n### Crop-year results");
  console.log(
    "| Year | Crop | Establishment | Predecessor | Base t/ha | Modifier | Effective t/ha | Output t | GM EUR/ha |",
  );
  console.log("|---|---|---|---|---|---|---|---|---|");
  for (const row of result.cropYears) {
    const modifier =
      row.modifier === null
        ? "none"
        : row.modifier.type === "percent"
          ? `${row.modifier.value}%`
          : `${row.modifier.value} t/ha`;
    console.log(
      `| ${row.yearIndex + 1} | ${row.cropName} | ${row.establishmentVariant} | ${row.predecessorCropId ?? "-"} | ${stateText(row.baseYieldTPerHa, (v) => fmt(v))} | ${modifier} | ${stateText(row.effectiveYieldTPerHa, (v) => fmt(v))} | ${stateText(row.outputTonnes, (v) => fmt(v, 0))} | ${stateText(row.grossMarginPerHa, (v) => fmt(v, 0))} |`,
    );
  }

  console.log("\n### Machinery demand (half-month buckets)");
  console.log("| Year | Crop | Operation | Machine set | Hours/yr | Labour h/yr |");
  console.log("|---|---|---|---|---|---|");
  for (const record of result.machinery) {
    console.log(
      `| ${record.yearIndex + 1} | ${record.cropId} | ${record.operationName} | ${record.machineSetId || "-"} | ${stateText(record.hoursPerYear, (v) => fmt(v))} | ${stateText(record.labourHoursPerYear, (v) => fmt(v))} |`,
    );
  }
  console.log(`\nNon-zero buckets: ${nonZeroBuckets(result.summary.hoursByPeriod)}`);

  const summary = result.summary;
  console.log("\n### Rotation summary");
  console.log(
    [
      `- Mean yield: ${stateText(summary.meanYieldTPerHa, (v) => `${fmt(v)} t/ha`)}`,
      `- Total output: ${stateText(summary.totalOutputTonnes, (v) => `${fmt(v, 0)} t`)}`,
      `- Annualised gross margin: ${stateText(summary.annualisedGrossMarginPerHa, (v) => `${fmt(v, 0)} EUR/ha`)} (${stateText(summary.annualisedGrossMarginTotal, (v) => `${fmt(v, 0)} EUR total`)}; partial, not farm income)`,
      `- Total machine hours: ${stateText(summary.totalHoursPerYear, (v) => `${fmt(v)} h/yr`)}`,
      `- Peak half-month: ${stateText(summary.peakPeriod, (v) => `${v.period} (${fmt(v.hours)} h)`)}`,
    ].join("\n"),
  );

  const missing = collectMissing(result);
  if (missing.length > 0) {
    console.log("\n### Missing data / problems");
    for (const reason of missing) console.log(`- ${reason}`);
  }
}

function delta(
  baseline: FieldState<number>,
  other: FieldState<number>,
  digits = 1,
): string {
  if (baseline.status === "missing" || other.status === "missing") return "n/a (missing)";
  const change = other.value - baseline.value;
  const sign = change > 0 ? "+" : "";
  return `${sign}${fmt(change, digits)}`;
}

function printComparison(baseline: ScenarioResult, others: ScenarioResult[]): void {
  for (const other of others) {
    console.log(`\n## Comparison: ${other.scenario.name} vs baseline (${baseline.scenario.name})`);
    console.log("| Metric | Baseline | This scenario | Delta |");
    console.log("|---|---|---|---|");
    const rows: Array<[string, FieldState<number>, FieldState<number>, number, string]> = [
      ["Mean yield (t/ha)", baseline.summary.meanYieldTPerHa, other.summary.meanYieldTPerHa, 1, "t/ha"],
      ["Total output (t)", baseline.summary.totalOutputTonnes, other.summary.totalOutputTonnes, 0, "t"],
      ["Annualised GM (EUR/ha)", baseline.summary.annualisedGrossMarginPerHa, other.summary.annualisedGrossMarginPerHa, 0, "EUR/ha"],
      ["Annualised GM (EUR total)", baseline.summary.annualisedGrossMarginTotal, other.summary.annualisedGrossMarginTotal, 0, "EUR"],
      ["Total machine hours (h/yr)", baseline.summary.totalHoursPerYear, other.summary.totalHoursPerYear, 1, "h"],
    ];
    for (const [label, left, right, digits, unit] of rows) {
      console.log(
        `| ${label} | ${stateText(left, (v) => fmt(v, digits))} | ${stateText(right, (v) => fmt(v, digits))} | ${delta(left, right, digits)} ${left.status === "ok" && right.status === "ok" ? unit : ""} |`,
      );
    }
    const peakLeft = stateText(baseline.summary.peakPeriod, (v) => `${v.period} (${fmt(v.hours)} h)`);
    const peakRight = stateText(other.summary.peakPeriod, (v) => `${v.period} (${fmt(v.hours)} h)`);
    console.log(`| Peak half-month | ${peakLeft} | ${peakRight} | - |`);
  }
}

console.log("# Whole-farm tillage DSS - prototype v1 rotation comparison");
console.log("SYNTHETIC / ILLUSTRATIVE - not validated. Missing values must be supplied by the product owner.");
console.log(
  `Engine ${results[0]?.engineVersion ?? "?"} · packs: ${Object.entries(results[0]?.packVersions ?? {}).map(([name, version]) => `${name} ${version}`).join(", ")}`,
);

for (const result of results) printScenario(result);

const baseline = results.find((result) => result.scenario.baseline) ?? results[0];
if (baseline) {
  const others = results.filter((result) => result !== baseline);
  if (others.length > 0) printComparison(baseline, others);
}

console.log("\n---");
console.log(
  "Software tests establish software behaviour only; agronomic validity requires independent evidence and review.",
);
