import type {
  ChargeEntry,
  CropEntry,
  FieldState,
  NumericValue,
  OperationEntry,
  OperationSetEntry,
  Packs,
  Provenance,
} from "../src/contracts/types.js";

export function expectOk<T>(state: FieldState<T>): T {
  if (state.status !== "ok") {
    throw new Error(`expected ok state, got missing: ${state.reasons.join("; ")}`);
  }
  return state.value;
}

export function prov(overrides: Partial<Provenance> = {}): Provenance {
  return {
    sourceType: "user-provided",
    source: "test fixture",
    date: "2026-10-20",
    geography: "test",
    uncertainty: null,
    status: "provisional",
    ...overrides,
  };
}

export function num(
  value: number | null,
  unit: string,
  overrides: Partial<Provenance> = {},
): NumericValue {
  return { value, unit, provenance: prov(overrides) };
}

export function op(
  overrides: Partial<OperationEntry> & Pick<OperationEntry, "id" | "name" | "machineSetId">,
): OperationEntry {
  return {
    workRateHaPerH: num(2, "ha/h"),
    passes: 1,
    labourPersons: 1,
    window: {
      start: "10H1",
      end: "10H2",
      provenance: prov({ sourceType: "illustrative", status: "unknown" }),
    },
    strawRelated: false,
    ...overrides,
  };
}

export function crop(id: string, overrides: Partial<CropEntry> = {}): CropEntry {
  return {
    id,
    name: id,
    baseYield: num(8, "t/ha"),
    pricePerTonne: num(200, "EUR/t"),
    variableCostsPerHa: [
      { item: "seed", cost: num(150, "EUR/ha") },
      { item: "fertiliser", cost: num(250, "EUR/ha") },
    ],
    ...overrides,
  };
}

export function charge(machineSetId: string, value: number | null): ChargeEntry {
  return {
    machineSetId,
    basis: "own-equipment",
    chargePerHa: num(value, "EUR/ha per pass"),
  };
}

export function operationSet(
  cropId: string,
  establishmentVariant: string,
  operations: OperationEntry[],
): OperationSetEntry {
  return { id: `opset.${cropId}.${establishmentVariant}`, cropId, establishmentVariant, operations };
}

/** One crop, one operation set, one machine set: exact arithmetic for hand checks. */
export function packsFixture(): Packs {
  return {
    farm: { version: "test", entries: {} },
    crops: { version: "test", entries: { "crop.c1": crop("crop.c1") } },
    operations: {
      version: "test",
      entries: [
        operationSet("crop.c1", "conv", [
          op({ id: "op.1", name: "Operation one", machineSetId: "m1" }),
        ]),
      ],
    },
    charges: { version: "test", entries: [charge("m1", 100)] },
  };
}
