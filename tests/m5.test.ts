import test from "node:test";
import assert from "node:assert/strict";
import { evaluateMargin } from "../src/engine/m5.js";
import { charge, crop, expectOk, num, op } from "./fixtures.js";

const crops = { "crop.c1": crop("crop.c1") };
const operations = [op({ id: "op.1", name: "Operation one", machineSetId: "m1" })];
const charges = [charge("m1", 100)];

test("gross margin hand calculation: 8 t/ha x 200 - 400 - 100 = 1100", () => {
  const outcome = evaluateMargin({
    cropId: "crop.c1",
    effectiveYield: { status: "ok", value: 8 },
    operations,
    crops,
    charges,
  });
  assert.equal(expectOk(outcome.revenue), 1600);
  assert.equal(expectOk(outcome.variableCosts), 400);
  assert.equal(expectOk(outcome.machineryCharges), 100);
  assert.equal(expectOk(outcome.margin), 1100);
});

test("machinery charge applies per pass", () => {
  const outcome = evaluateMargin({
    cropId: "crop.c1",
    effectiveYield: { status: "ok", value: 8 },
    operations: [op({ id: "op.1", name: "Operation one", machineSetId: "m1", passes: 2 })],
    crops,
    charges,
  });
  assert.equal(expectOk(outcome.machineryCharges), 200);
  assert.equal(expectOk(outcome.margin), 1000);
});

test("missing price produces a missing margin with a named reason", () => {
  const outcome = evaluateMargin({
    cropId: "crop.c1",
    effectiveYield: { status: "ok", value: 8 },
    operations,
    crops: { "crop.c1": crop("crop.c1", { pricePerTonne: num(null, "EUR/t") }) },
    charges,
  });
  assert.equal(outcome.revenue.status, "missing");
  assert.equal(outcome.margin.status, "missing");
  assert.match((outcome.margin as { reasons: string[] }).reasons.join(" "), /no price supplied/i);
});

test("missing variable cost item blocks the margin", () => {
  const outcome = evaluateMargin({
    cropId: "crop.c1",
    effectiveYield: { status: "ok", value: 8 },
    operations,
    crops: {
      "crop.c1": crop("crop.c1", {
        variableCostsPerHa: [
          { item: "seed", cost: num(150, "EUR/ha") },
          { item: "fertiliser", cost: num(null, "EUR/ha") },
        ],
      }),
    },
    charges,
  });
  assert.equal(outcome.margin.status, "missing");
  assert.match((outcome.margin as { reasons: string[] }).reasons.join(" "), /fertiliser/i);
});

test("missing machinery charge blocks the margin", () => {
  const outcome = evaluateMargin({
    cropId: "crop.c1",
    effectiveYield: { status: "ok", value: 8 },
    operations,
    crops,
    charges: [charge("m1", null)],
  });
  assert.equal(outcome.machineryCharges.status, "missing");
  assert.equal(outcome.margin.status, "missing");
});

test("missing effective yield blocks revenue and margin", () => {
  const outcome = evaluateMargin({
    cropId: "crop.c1",
    effectiveYield: { status: "missing", reasons: ["no base yield supplied"] },
    operations,
    crops,
    charges,
  });
  assert.equal(outcome.revenue.status, "missing");
  assert.equal(outcome.margin.status, "missing");
});
