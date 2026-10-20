import type {
  AppliedModifier,
  CropEntry,
  FieldState,
  ScenarioInput,
} from "../contracts/types.js";
import { missing, ok } from "../contracts/state.js";
import type { YearOperations } from "./m2.js";

export interface YieldOutcome {
  base: FieldState<number>;
  modifier: AppliedModifier | null;
  effective: FieldState<number>;
  output: FieldState<number>;
  notes: string[];
}

/**
 * M4: effective yield = base x (1 + modifier) or base + modifier.
 * Defaults to no modifier. Any modifier is an explicit unverified user
 * assumption (A-003/A-016); none are shipped.
 */
export function evaluateYield(
  year: YearOperations,
  scenario: ScenarioInput,
  crops: Record<string, CropEntry>,
): YieldOutcome {
  const notes: string[] = [];
  const crop = crops[year.cropId];
  const override = scenario.yieldOverridesPerHa?.[year.cropId];

  let baseValue: number | null;
  if (override) {
    baseValue = override.value;
  } else if (crop?.relativeYield) {
    const reference = crops[crop.relativeYield.cropId];
    const referenceValue = reference?.baseYield.value ?? null;
    const multiplier = crop.relativeYield.multiplier.value;
    if (reference?.relativeYield) {
      baseValue = null;
      notes.push(`nested relative yields are not supported ('${crop.relativeYield.cropId}')`);
    } else if (referenceValue === null || multiplier === null) {
      baseValue = null;
      notes.push(`relative yield reference '${crop.relativeYield.cropId}' unavailable`);
    } else {
      baseValue = referenceValue * multiplier;
      notes.push(
        `base yield derived as ${(multiplier * 100).toFixed(2)}% of '${crop.relativeYield.cropId}' (${referenceValue} t/ha)`,
      );
    }
  } else {
    baseValue = crop?.baseYield.value ?? null;
  }

  if (baseValue === null || !Number.isFinite(baseValue)) {
    const reasons = [`no base yield supplied for '${year.cropId}'`];
    return {
      base: missing(...reasons),
      modifier: null,
      effective: missing(...reasons),
      output: missing(...reasons),
      notes,
    };
  }

  const base: FieldState<number> = ok(baseValue);
  if (override) {
    notes.push(`base yield overridden by scenario input (${override.provenance.source})`);
  }

  const modifierInput = (scenario.yieldModifiers ?? []).find(
    (candidate) =>
      candidate.cropId === year.cropId &&
      candidate.precedingCropId === (year.predecessorCropId ?? ""),
  );

  let effectiveValue = baseValue;
  let modifier: AppliedModifier | null = null;
  if (modifierInput) {
    effectiveValue =
      modifierInput.type === "percent"
        ? baseValue * (1 + modifierInput.value / 100)
        : baseValue + modifierInput.value;
    modifier = {
      type: modifierInput.type,
      value: modifierInput.value,
      provenance: modifierInput.provenance,
    };
    const rendered =
      modifierInput.type === "percent"
        ? `${modifierInput.value}%`
        : `${modifierInput.value} t/ha`;
    notes.push(
      `unverified user modifier applied (${rendered}) after '${modifierInput.precedingCropId}'`,
    );
  }

  return {
    base,
    modifier,
    effective: ok(effectiveValue),
    output: ok(effectiveValue * scenario.areaHa),
    notes,
  };
}
