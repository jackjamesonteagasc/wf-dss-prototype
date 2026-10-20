import { z } from "zod";
import type {
  ChargeEntry,
  CropEntry,
  FarmEntry,
  OperationSetEntry,
  Packs,
  ScenarioInput,
} from "./types.js";

const sourceTypeSchema = z.enum([
  "user-provided",
  "published",
  "assumption",
  "illustrative",
  "unknown",
]);

const statusSchema = z.enum(["provisional", "verified-for-stated-use", "unknown"]);

const provenanceSchema = z.object({
  sourceType: sourceTypeSchema,
  source: z.string().min(1),
  date: z.string().nullable(),
  geography: z.string().min(1),
  uncertainty: z.string().nullable(),
  status: statusSchema,
});

const numericValueSchema = z.object({
  value: z.number().nullable(),
  unit: z.string().min(1),
  provenance: provenanceSchema,
});

const halfMonthPattern = /^(0[1-9]|1[0-2])H[12]$/;

const windowSchema = z.object({
  start: z.string().regex(halfMonthPattern, 'expected half-month id like "10H1"'),
  end: z.string().regex(halfMonthPattern, 'expected half-month id like "10H2"'),
  provenance: provenanceSchema,
});

const farmPackSchema = z.object({
  pack: z.literal("farm"),
  version: z.string().min(1),
  formatVersion: z.literal(1),
  entries: z.record(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      areaHa: numericValueSchema,
      soilCategory: z.string().nullable().optional(),
      synthetic: z.literal(true),
    }),
  ),
});

const cropPackSchema = z.object({
  pack: z.literal("crops"),
  version: z.string().min(1),
  formatVersion: z.literal(1),
  entries: z.record(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      baseYield: numericValueSchema,
      pricePerTonne: numericValueSchema,
      variableCostsPerHa: z.array(
        z.object({ item: z.string().min(1), cost: numericValueSchema }),
      ),
      harvestWindow: windowSchema.nullable().optional(),
    }),
  ),
});

const operationsPackSchema = z.object({
  pack: z.literal("operations"),
  version: z.string().min(1),
  formatVersion: z.literal(1),
  entries: z.array(
    z.object({
      id: z.string().min(1),
      cropId: z.string().min(1),
      establishmentVariant: z.string().min(1),
      operations: z.array(
        z.object({
          id: z.string().min(1),
          name: z.string().min(1),
          machineSetId: z.string().min(1),
          workRateHaPerH: numericValueSchema,
          passes: z.number().int().positive(),
          labourPersons: z.number().positive(),
          window: windowSchema,
          strawRelated: z.boolean(),
          fuelLPerHa: numericValueSchema.nullable().optional(),
        }),
      ),
    }),
  ),
});

const chargesPackSchema = z.object({
  pack: z.literal("charges"),
  version: z.string().min(1),
  formatVersion: z.literal(1),
  entries: z.array(
    z.object({
      machineSetId: z.string().min(1),
      basis: z.enum(["own-equipment", "contractor", "hybrid"]),
      chargePerHa: numericValueSchema,
      note: z.string().optional(),
    }),
  ),
});

const scenarioSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  farmId: z.string().min(1),
  areaHa: z.number().positive(),
  baseline: z.boolean(),
  previousCropId: z.string().nullable().optional(),
  years: z
    .array(
      z.object({
        cropId: z.string().min(1),
        establishmentVariant: z.string().min(1),
      }),
    )
    .min(1),
  yieldOverridesPerHa: z
    .record(z.object({ value: z.number(), provenance: provenanceSchema }))
    .optional(),
  yieldModifiers: z
    .array(
      z.object({
        precedingCropId: z.string().min(1),
        cropId: z.string().min(1),
        type: z.enum(["percent", "t_per_ha"]),
        value: z.number(),
        provenance: provenanceSchema,
      }),
    )
    .optional(),
});

function parseWith<T>(schema: z.ZodType<T>, raw: unknown, label: string): T {
  const result = schema.safeParse(raw);
  if (!result.success) {
    const details = result.error.issues
      .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("; ");
    throw new Error(`${label}: invalid data: ${details}`);
  }
  return result.data;
}

export function parsePacks(raw: {
  farm: unknown;
  crops: unknown;
  operations: unknown;
  charges: unknown;
}): Packs {
  const farm = parseWith(farmPackSchema, raw.farm, "farm pack");
  const crops = parseWith(cropPackSchema, raw.crops, "crops pack");
  const operations = parseWith(operationsPackSchema, raw.operations, "operations pack");
  const charges = parseWith(chargesPackSchema, raw.charges, "charges pack");

  return {
    farm: {
      version: farm.version,
      entries: farm.entries as unknown as Record<string, FarmEntry>,
    },
    crops: {
      version: crops.version,
      entries: crops.entries as unknown as Record<string, CropEntry>,
    },
    operations: {
      version: operations.version,
      entries: operations.entries as OperationSetEntry[],
    },
    charges: {
      version: charges.version,
      entries: charges.entries as ChargeEntry[],
    },
  };
}

export function parseScenario(raw: unknown, label: string): ScenarioInput {
  return parseWith(scenarioSchema, raw, label);
}
