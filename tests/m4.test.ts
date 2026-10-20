import test from "node:test";
import assert from "node:assert/strict";
import { evaluateYield } from "../src/engine/m4.js";
import type { YearOperations } from "../src/engine/m2.js";
import type { ScenarioInput } from "../src/contracts/types.js";
import { crop, expectOk, num, prov } from "./fixtures.js";

const crops = { "crop.c1": crop("crop.c1") };

function year(predecessorCropId: string | null = "crop.c1"): YearOperations {
  return {
    yearIndex: 1,
    cropId: "crop.c1",
    establishmentVariant: "conv",
    predecessorCropId,
    operationSetId: "set.1",
    operations: [],
  };
}

function scenario(overrides: Partial<ScenarioInput> = {}): ScenarioInput {
  return {
    id: "s",
    name: "s",
    farmId: "farm",
    areaHa: 10,
    baseline: false,
    years: [{ cropId: "crop.c1", establishmentVariant: "conv" }],
    ...overrides,
  };
}

test("no modifier by default", () => {
  const outcome = evaluateYield(year(), scenario(), crops);
  assert.equal(expectOk(outcome.base), 8);
  assert.equal(outcome.modifier, null);
  assert.equal(expectOk(outcome.effective), 8);
  assert.equal(expectOk(outcome.output), 80);
});

test("percent modifier increases effective yield", () => {
  const outcome = evaluateYield(
    year(),
    scenario({
      yieldModifiers: [
        {
          precedingCropId: "crop.c1",
          cropId: "crop.c1",
          type: "percent",
          value: 10,
          provenance: prov({ sourceType: "user-provided" }),
        },
      ],
    }),
    crops,
  );
  assert.equal(expectOk(outcome.effective), 8.8);
  assert.equal(expectOk(outcome.output), 88);
  assert.match(outcome.notes.join(" "), /unverified user modifier/i);
});

test("absolute t/ha modifier subtracts", () => {
  const outcome = evaluateYield(
    year(),
    scenario({
      yieldModifiers: [
        {
          precedingCropId: "crop.c1",
          cropId: "crop.c1",
          type: "t_per_ha",
          value: -1,
          provenance: prov({ sourceType: "user-provided" }),
        },
      ],
    }),
    crops,
  );
  assert.equal(expectOk(outcome.effective), 7);
});

test("modifier only applies to a matching predecessor", () => {
  const outcome = evaluateYield(
    year("crop.other"),
    scenario({
      yieldModifiers: [
        {
          precedingCropId: "crop.c1",
          cropId: "crop.c1",
          type: "percent",
          value: 10,
          provenance: prov({ sourceType: "user-provided" }),
        },
      ],
    }),
    crops,
  );
  assert.equal(outcome.modifier, null);
  assert.equal(expectOk(outcome.effective), 8);
});

test("scenario override replaces the pack base yield", () => {
  const outcome = evaluateYield(
    year(),
    scenario({
      yieldOverridesPerHa: { "crop.c1": { value: 9, provenance: prov({ source: "UI adjustment" }) } },
      yieldModifiers: [
        {
          precedingCropId: "crop.c1",
          cropId: "crop.c1",
          type: "percent",
          value: 10,
          provenance: prov({ source: "UI adjustment" }),
        },
      ],
    }),
    crops,
  );
  assert.equal(expectOk(outcome.base), 9);
  assert.equal(expectOk(outcome.effective), 9.9);
  assert.match(outcome.notes.join(" "), /overridden/i);
});

test("missing base yield is explicit, never zero", () => {
  const outcome = evaluateYield(
    year(),
    scenario(),
    { "crop.c1": crop("crop.c1", { baseYield: num(null, "t/ha") }) },
  );
  assert.equal(outcome.base.status, "missing");
  assert.equal(outcome.effective.status, "missing");
  assert.equal(outcome.output.status, "missing");
});

test("relative yield derives from a reference crop base yield", () => {
  const cropsWithRelative = {
    "crop.base": crop("crop.base", { baseYield: num(7.3, "t/ha") }),
    "crop.mb": crop("crop.mb", {
      baseYield: num(null, "t/ha"),
      relativeYield: {
        cropId: "crop.base",
        multiplier: num(0.9375, "fraction of crop.base base yield"),
      },
    }),
  };
  const outcome = evaluateYield(
    { ...year(), cropId: "crop.mb" },
    scenario({ years: [{ cropId: "crop.mb", establishmentVariant: "conv" }] }),
    cropsWithRelative,
  );
  assert.equal(expectOk(outcome.effective), 7.3 * 0.9375);
  assert.match(outcome.notes.join(" "), /93\.75% of 'crop\.base'/);
});

test("missing relative reference is explicit", () => {
  const outcome = evaluateYield(
    { ...year(), cropId: "crop.mb" },
    scenario({ years: [{ cropId: "crop.mb", establishmentVariant: "conv" }] }),
    {
      "crop.mb": crop("crop.mb", {
        baseYield: num(null, "t/ha"),
        relativeYield: { cropId: "crop.gone", multiplier: num(0.9, "fraction") },
      }),
    },
  );
  assert.equal(outcome.effective.status, "missing");
  assert.match(outcome.notes.join(" "), /reference 'crop\.gone' unavailable/);
});
