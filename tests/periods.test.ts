import test from "node:test";
import assert from "node:assert/strict";
import {
  ALL_PERIODS,
  expandWindow,
  formatPeriodIndex,
  parsePeriodId,
  splitEvenly,
} from "../src/engine/periods.js";

test("parses half-month ids", () => {
  assert.deepEqual(parsePeriodId("10H1"), { month: 10, half: 1, index: 18 });
  assert.deepEqual(parsePeriodId("10H2"), { month: 10, half: 2, index: 19 });
  assert.deepEqual(parsePeriodId("01H1"), { month: 1, half: 1, index: 0 });
  assert.deepEqual(parsePeriodId("12H2"), { month: 12, half: 2, index: 23 });
});

test("rejects malformed ids", () => {
  assert.equal(parsePeriodId("13H1"), null);
  assert.equal(parsePeriodId("1H1"), null);
  assert.equal(parsePeriodId("10H3"), null);
  assert.equal(parsePeriodId("10h1"), null);
});

test("index formatting round-trips and covers 24 buckets", () => {
  assert.equal(ALL_PERIODS.length, 24);
  for (let index = 0; index < 24; index += 1) {
    assert.equal(parsePeriodId(formatPeriodIndex(index))?.index, index);
  }
  assert.throws(() => formatPeriodIndex(24));
});

test("expands windows inclusively in calendar order", () => {
  assert.deepEqual(expandWindow("09H2", "10H1"), ["09H2", "10H1"]);
  assert.deepEqual(expandWindow("10H1", "10H2"), ["10H1", "10H2"]);
  assert.equal(expandWindow("01H1", "12H2").length, 24);
  assert.deepEqual(expandWindow("12H1", "12H2"), ["12H1", "12H2"]);
  assert.throws(() => expandWindow("10H2", "09H1"));
});

test("splits hours evenly across the window (A-015)", () => {
  assert.deepEqual(splitEvenly(10, ["09H2", "10H1"]), [
    { period: "09H2", hours: 5 },
    { period: "10H1", hours: 5 },
  ]);
  const thirds = splitEvenly(9, ["10H1", "10H2", "11H1"]);
  assert.deepEqual(thirds.map((slice) => slice.hours), [3, 3, 3]);
  assert.throws(() => splitEvenly(10, []));
});
