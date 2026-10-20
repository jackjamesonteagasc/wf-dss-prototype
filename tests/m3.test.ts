import test from "node:test";
import assert from "node:assert/strict";
import { demandForYear } from "../src/engine/m3.js";
import type { YearOperations } from "../src/engine/m2.js";
import { expectOk, num, op, prov } from "./fixtures.js";

function year(operations = [op({ id: "op.1", name: "Operation one", machineSetId: "m1" })]): YearOperations {
  return {
    yearIndex: 0,
    cropId: "crop.c1",
    establishmentVariant: "conv",
    predecessorCropId: null,
    operationSetId: "set.1",
    operations,
  };
}

test("computes hours, buckets and labour from area and work rate", () => {
  const [record] = demandForYear(year(), 10);
  assert.ok(record);
  assert.equal(expectOk(record.hoursPerYear), 5); // 10 ha / 2 ha/h x 1 pass
  assert.deepEqual(expectOk(record.byPeriod), [
    { period: "10H1", hours: 2.5 },
    { period: "10H2", hours: 2.5 },
  ]);
  assert.equal(expectOk(record.labourHoursPerYear), 5);
});

test("multiplies by passes and labour persons", () => {
  const [record] = demandForYear(
    year([op({ id: "op.1", name: "Operation one", machineSetId: "m1", passes: 2, labourPersons: 2 })]),
    10,
  );
  assert.ok(record);
  assert.equal(expectOk(record.hoursPerYear), 10);
  assert.equal(expectOk(record.labourHoursPerYear), 20);
});

test("missing work rate yields an explicit missing state, not zero", () => {
  const [record] = demandForYear(
    year([op({ id: "op.1", name: "Operation one", machineSetId: "m1", workRateHaPerH: num(null, "ha/h") })]),
    10,
  );
  assert.ok(record);
  assert.equal(record.hoursPerYear.status, "missing");
  assert.equal(record.byPeriod.status, "missing");
  assert.match((record.hoursPerYear as { reasons: string[] }).reasons.join(" "), /no work rate/i);
});

test("missing operation set produces a missing demand record", () => {
  const empty: YearOperations = { ...year(), operationSetId: null, operations: [] };
  const records = demandForYear(empty, 10);
  assert.equal(records.length, 1);
  assert.equal(records[0]?.hoursPerYear.status, "missing");
});

test("invalid window (end before start) is reported as missing", () => {
  const [record] = demandForYear(
    year([
      op({
        id: "op.1",
        name: "Operation one",
        machineSetId: "m1",
        window: { start: "10H2", end: "09H1", provenance: prov({ sourceType: "illustrative" }) },
      }),
    ]),
    10,
  );
  assert.ok(record);
  assert.equal(record.hoursPerYear.status, "missing");
});
