import type { CropEntry, ScenarioInput } from "../contracts/types.js";

export interface ResolvedYear {
  yearIndex: number;
  cropId: string;
  establishmentVariant: string;
  predecessorCropId: string | null;
}

export interface ResolvedRotation {
  years: ResolvedYear[];
  problems: string[];
}

/** M1: normalise the user rotation into crop-years with resolved predecessors. */
export function resolveRotation(
  scenario: ScenarioInput,
  crops: Record<string, CropEntry>,
): ResolvedRotation {
  const problems: string[] = [];

  if (!(scenario.areaHa > 0) || !Number.isFinite(scenario.areaHa)) {
    problems.push(`${scenario.id}: area must be a positive number of hectares`);
  }
  if (scenario.years.length === 0) {
    problems.push(`${scenario.id}: rotation contains no years`);
  }
  if (scenario.previousCropId && !crops[scenario.previousCropId]) {
    problems.push(
      `${scenario.id}: previous crop '${scenario.previousCropId}' is not in the crop pack`,
    );
  }

  const years: ResolvedYear[] = scenario.years.map((year, index) => {
    if (!crops[year.cropId]) {
      problems.push(`${scenario.id}: year ${index + 1} uses unknown crop '${year.cropId}'`);
    }
    const predecessorCropId =
      index === 0
        ? (scenario.previousCropId ?? null)
        : (scenario.years[index - 1]?.cropId ?? null);
    return {
      yearIndex: index,
      cropId: year.cropId,
      establishmentVariant: year.establishmentVariant,
      predecessorCropId,
    };
  });

  return { years, problems };
}
