import type {
  CropYearResult,
  MachineryDemandRecord,
  Packs,
  ScenarioInput,
  ScenarioResult,
} from "../contracts/types.js";
import { resolveRotation } from "./m1.js";
import { expandOperations } from "./m2.js";
import { demandForYear } from "./m3.js";
import { evaluateYield } from "./m4.js";
import { evaluateMargin } from "./m5.js";
import { summarise } from "./m6.js";

export const ENGINE_VERSION = "0.1.0";

/** M1-M6 pipeline. Pure: no file, network, clock or random access. */
export function runScenario(packs: Packs, scenario: ScenarioInput): ScenarioResult {
  const warnings: string[] = [];

  const rotation = resolveRotation(scenario, packs.crops.entries);
  warnings.push(...rotation.problems);

  const expansion = expandOperations(rotation.years, packs.operations.entries);
  warnings.push(...expansion.problems);

  const cropYears: CropYearResult[] = [];
  const machinery: MachineryDemandRecord[] = [];

  for (const year of expansion.results) {
    const yieldOutcome = evaluateYield(year, scenario, packs.crops.entries);
    const marginOutcome = evaluateMargin({
      cropId: year.cropId,
      effectiveYield: yieldOutcome.effective,
      operations: year.operations,
      crops: packs.crops.entries,
      charges: packs.charges.entries,
    });

    cropYears.push({
      yearIndex: year.yearIndex,
      cropId: year.cropId,
      cropName: packs.crops.entries[year.cropId]?.name ?? year.cropId,
      establishmentVariant: year.establishmentVariant,
      predecessorCropId: year.predecessorCropId,
      baseYieldTPerHa: yieldOutcome.base,
      modifier: yieldOutcome.modifier,
      effectiveYieldTPerHa: yieldOutcome.effective,
      outputTonnes: yieldOutcome.output,
      revenuePerHa: marginOutcome.revenue,
      variableCostsPerHa: marginOutcome.variableCosts,
      machineryChargePerHa: marginOutcome.machineryCharges,
      grossMarginPerHa: marginOutcome.margin,
      notes: yieldOutcome.notes,
    });

    machinery.push(...demandForYear(year, scenario.areaHa));
  }

  const summary = summarise(cropYears, machinery, scenario.areaHa);

  return {
    scenario: {
      id: scenario.id,
      name: scenario.name,
      baseline: scenario.baseline,
      areaHa: scenario.areaHa,
    },
    engineVersion: ENGINE_VERSION,
    packVersions: {
      farm: packs.farm.version,
      crops: packs.crops.version,
      operations: packs.operations.version,
      charges: packs.charges.version,
    },
    cropYears,
    machinery,
    summary,
    warnings,
  };
}
