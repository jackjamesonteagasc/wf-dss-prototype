import test from "node:test";
import assert from "node:assert/strict";
import { runScenario } from "../src/engine/index.js";
import type { Packs, ScenarioInput } from "../src/contracts/types.js";
import { crop, expectOk, num, packsFixture } from "./fixtures.js";

function twoYearScenario(overrides: Partial<ScenarioInput> = {}): ScenarioInput {
  return {
    id: "scenario.test",
    name: "Two years of crop.c1",
    farmId: "farm",
    areaHa: 10,
    baseline: true,
    years: [
      { cropId: "crop.c1", establishmentVariant: "conv" },
      { cropId: "crop.c1", establishmentVariant: "conv" },
    ],
    ...overrides,
  };
}

test("end-to-end hand calculation matches engine output", () => {
  // 10 ha, rate 2 ha/h, window 10H1-10H2 (2 buckets), 2 years:
  // hours/yr = 5; per bucket = 2.5; total = 10; per bucket total = 5
  // yield 8 t/ha -> 80 t/yr; GM = 8*200 - (150+250) - 100 = 1100 EUR/ha
  const result = runScenario(packsFixture(), twoYearScenario());

  assert.equal(result.cropYears.length, 2);
  assert.equal(expectOk(result.summary.meanYieldTPerHa), 8);
  assert.equal(expectOk(result.summary.totalOutputTonnes), 160);
  assert.equal(expectOk(result.summary.annualisedGrossMarginPerHa), 1100);
  assert.equal(expectOk(result.summary.annualisedGrossMarginTotal), 11000);
  assert.equal(expectOk(result.summary.totalHoursPerYear), 10);

  const buckets = expectOk(result.summary.hoursByPeriod);
  assert.equal(buckets.length, 24);
  assert.equal(buckets.find((slice) => slice.period === "10H1")?.hours, 5);
  assert.equal(buckets.find((slice) => slice.period === "10H2")?.hours, 5);
  assert.equal(buckets.find((slice) => slice.period === "01H1")?.hours, 0);

  const peak = expectOk(result.summary.peakPeriod);
  assert.equal(peak.period, "10H1");
  assert.equal(peak.hours, 5);
});

test("missing price propagates as missing margin, not zero", () => {
  const packs: Packs = packsFixture();
  packs.crops.entries["crop.c1"] = crop("crop.c1", { pricePerTonne: num(null, "EUR/t") });
  const result = runScenario(packs, twoYearScenario());
  assert.equal(result.summary.annualisedGrossMarginPerHa.status, "missing");
  assert.equal(result.summary.annualisedGrossMarginTotal.status, "missing");
});

test("missing work rate propagates to summary hours", () => {
  const packs: Packs = packsFixture();
  const set = packs.operations.entries[0];
  if (!set?.operations[0]) throw new Error("fixture missing operation");
  set.operations[0].workRateHaPerH = num(null, "ha/h");
  const result = runScenario(packs, twoYearScenario());
  assert.equal(result.summary.hoursByPeriod.status, "missing");
  assert.equal(result.summary.totalHoursPerYear.status, "missing");
});

test("unknown crop is reported as a warning and yields missing outputs", () => {
  const result = runScenario(
    packsFixture(),
    twoYearScenario({
      years: [{ cropId: "crop.unknown", establishmentVariant: "conv" }],
    }),
  );
  assert.match(result.warnings.join(" "), /unknown crop/i);
  assert.equal(result.cropYears[0]?.effectiveYieldTPerHa.status, "missing");
});

test("unknown establishment variant produces a missing machinery record", () => {
  const result = runScenario(
    packsFixture(),
    twoYearScenario({
      years: [{ cropId: "crop.c1", establishmentVariant: "direct-drill" }],
    }),
  );
  assert.match(result.warnings.join(" "), /no operation set/i);
  assert.equal(result.machinery[0]?.hoursPerYear.status, "missing");
});

test("user-supplied preceding-crop modifier changes the result and is noted", () => {
  const result = runScenario(
    packsFixture(),
    twoYearScenario({
      previousCropId: "crop.c1",
      yieldModifiers: [
        {
          precedingCropId: "crop.c1",
          cropId: "crop.c1",
          type: "percent",
          value: 10,
          provenance: {
            sourceType: "user-provided",
            source: "UI adjustment",
            date: "2026-10-20",
            geography: "n/a",
            uncertainty: "unverified user assumption",
            status: "provisional",
          },
        },
      ],
    }),
  );
  // Year 1 follows previousCropId; year 2 follows year 1 (crop.c1): both +10%
  assert.equal(expectOk(result.cropYears[0]?.effectiveYieldTPerHa ?? { status: "missing", reasons: [] }), 8.8);
  assert.equal(expectOk(result.cropYears[1]?.effectiveYieldTPerHa ?? { status: "missing", reasons: [] }), 8.8);
  assert.match(result.cropYears[0]?.notes.join(" ") ?? "", /unverified user modifier/i);
});
