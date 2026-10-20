import type {
  ChargeEntry,
  CropEntry,
  FieldState,
  OperationEntry,
} from "../contracts/types.js";
import { missing, ok } from "../contracts/state.js";

export interface MarginOutcome {
  revenue: FieldState<number>;
  variableCosts: FieldState<number>;
  machineryCharges: FieldState<number>;
  margin: FieldState<number>;
}

/**
 * M5: gross margin = yield x price - variable costs - machinery charges.
 * Boundary per A-017/A-018: excludes land/rent, labour overheads, ownership
 * and drying costs. Partial margins are never presented as farm income.
 */
export function evaluateMargin(params: {
  cropId: string;
  effectiveYield: FieldState<number>;
  operations: OperationEntry[];
  crops: Record<string, CropEntry>;
  charges: ChargeEntry[];
}): MarginOutcome {
  const crop = params.crops[params.cropId];
  const price = crop?.pricePerTonne.value ?? null;
  const support = crop?.supportPerHa;
  const supportValue = support ? support.value : 0;
  const yieldValue =
    params.effectiveYield.status === "ok" ? params.effectiveYield.value : null;

  const revenueReasons: string[] = [];
  if (yieldValue === null) revenueReasons.push("effective yield unavailable");
  if (price === null) revenueReasons.push(`no price supplied for '${params.cropId}'`);
  if (support && supportValue === null) {
    revenueReasons.push(`support value missing for '${params.cropId}'`);
  }
  const revenue =
    revenueReasons.length === 0
      ? ok((yieldValue as number) * (price as number) + (supportValue as number))
      : missing(...revenueReasons);

  const items = crop?.variableCostsPerHa ?? [];
  const unpricedItems = items.filter((item) => item.cost.value === null);
  let variableCosts: FieldState<number>;
  if (items.length === 0) {
    variableCosts = missing(`no variable costs supplied for '${params.cropId}'`);
  } else if (unpricedItems.length > 0) {
    variableCosts = missing(
      ...unpricedItems.map(
        (item) => `no ${item.item} cost supplied for '${params.cropId}'`,
      ),
    );
  } else {
    variableCosts = ok(
      items.reduce((sum, item) => sum + (item.cost.value as number), 0),
    );
  }

  // Crop-level charge (e.g. C&R hire-machinery total) takes precedence over
  // per-operation machine-set charges to prevent double counting (FR-08).
  const cropCharge = params.charges.find((candidate) => candidate.cropId === params.cropId);
  let machineryCharges: FieldState<number>;
  if (cropCharge) {
    machineryCharges =
      cropCharge.chargePerHa.value === null
        ? missing(`no crop-level machinery charge value for '${params.cropId}'`)
        : ok(cropCharge.chargePerHa.value);
  } else {
    let machinerySum = 0;
    const chargeReasons: string[] = [];
    for (const operation of params.operations) {
      const charge = params.charges.find(
        (candidate) => candidate.machineSetId === operation.machineSetId,
      );
      if (!charge) {
        chargeReasons.push(
          `no charge entry for machine set '${operation.machineSetId}' (${operation.name})`,
        );
        continue;
      }
      if (charge.chargePerHa.value === null) {
        chargeReasons.push(
          `no charge value for machine set '${operation.machineSetId}'`,
        );
        continue;
      }
      machinerySum += charge.chargePerHa.value * operation.passes;
    }
    if (params.operations.length === 0) {
      machineryCharges = missing(`no operations supplied for '${params.cropId}'`);
    } else if (chargeReasons.length > 0) {
      machineryCharges = missing(...chargeReasons);
    } else {
      machineryCharges = ok(machinerySum);
    }
  }

  const states = [revenue, variableCosts, machineryCharges];
  const margin =
    states.every((state) => state.status === "ok")
      ? ok(
          (revenue as { value: number }).value -
            (variableCosts as { value: number }).value -
            (machineryCharges as { value: number }).value,
        )
      : missing(
          ...states.flatMap((state) =>
            state.status === "missing" ? state.reasons : [],
          ),
        );

  return { revenue, variableCosts, machineryCharges, margin };
}
