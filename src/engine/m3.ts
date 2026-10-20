import type { MachineryDemandRecord, OperationEntry } from "../contracts/types.js";
import { missing, ok } from "../contracts/state.js";
import { expandWindow, splitEvenly } from "./periods.js";
import type { YearOperations } from "./m2.js";

/** M3: machinery and labour hours, bucketed into 24 half-month periods (A-015). */
export function demandForYear(year: YearOperations, areaHa: number): MachineryDemandRecord[] {
  if (year.operationSetId === null) {
    const reason = `no operation set for crop '${year.cropId}' with establishment '${year.establishmentVariant}'`;
    return [
      {
        yearIndex: year.yearIndex,
        cropId: year.cropId,
        establishmentVariant: year.establishmentVariant,
        operationId: "(missing operation set)",
        operationName: "Missing operation set",
        machineSetId: "",
        hoursPerYear: missing(reason),
        byPeriod: missing(reason),
        labourHoursPerYear: missing(reason),
      },
    ];
  }
  return year.operations.map((operation) => demandForOperation(year, operation, areaHa));
}

function demandForOperation(
  year: YearOperations,
  operation: OperationEntry,
  areaHa: number,
): MachineryDemandRecord {
  const base = {
    yearIndex: year.yearIndex,
    cropId: year.cropId,
    establishmentVariant: year.establishmentVariant,
    operationId: operation.id,
    operationName: operation.name,
    machineSetId: operation.machineSetId,
  };

  const rate = operation.workRateHaPerH.value;
  if (rate === null || !(rate > 0)) {
    const reason = `no work rate supplied for ${operation.name} (${operation.id})`;
    return {
      ...base,
      hoursPerYear: missing(reason),
      byPeriod: missing(reason),
      labourHoursPerYear: missing(reason),
    };
  }

  let periods;
  try {
    periods = expandWindow(operation.window.start, operation.window.end);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return {
      ...base,
      hoursPerYear: missing(reason),
      byPeriod: missing(reason),
      labourHoursPerYear: missing(reason),
    };
  }

  const hours = (areaHa / rate) * operation.passes;
  return {
    ...base,
    hoursPerYear: ok(hours),
    byPeriod: ok(splitEvenly(hours, periods)),
    labourHoursPerYear: ok(hours * operation.labourPersons),
  };
}
