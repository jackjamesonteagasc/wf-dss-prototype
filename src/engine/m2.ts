import type { OperationEntry, OperationSetEntry } from "../contracts/types.js";
import type { ResolvedYear } from "./m1.js";

export interface YearOperations {
  yearIndex: number;
  cropId: string;
  establishmentVariant: string;
  predecessorCropId: string | null;
  operationSetId: string | null;
  operations: OperationEntry[];
}

export interface ExpandedOperations {
  results: YearOperations[];
  problems: string[];
}

/** M2: expand each crop-year into its operation list from the operation catalogue. */
export function expandOperations(
  years: ResolvedYear[],
  sets: OperationSetEntry[],
): ExpandedOperations {
  const problems: string[] = [];

  const results: YearOperations[] = years.map((year) => {
    const set = sets.find(
      (candidate) =>
        candidate.cropId === year.cropId &&
        candidate.establishmentVariant === year.establishmentVariant,
    );
    if (!set) {
      problems.push(
        `no operation set for crop '${year.cropId}' with establishment '${year.establishmentVariant}' (year ${year.yearIndex + 1})`,
      );
      return { ...year, operationSetId: null, operations: [] };
    }
    return { ...year, operationSetId: set.id, operations: set.operations };
  });

  return { results, problems };
}
