export type SourceType =
  | "user-provided"
  | "published"
  | "assumption"
  | "illustrative"
  | "unknown";

export type ValueStatus = "provisional" | "verified-for-stated-use" | "unknown";

export interface Provenance {
  sourceType: SourceType;
  source: string;
  date: string | null;
  geography: string;
  uncertainty: string | null;
  status: ValueStatus;
}

/** A number with an explicit unit and provenance; null means "not supplied". */
export interface NumericValue {
  value: number | null;
  unit: string;
  provenance: Provenance;
}

/** `MMHn`: month 01-12, H1 = days 1-15, H2 = day 16 to month end. */
export type HalfMonthId = string;

export interface FarmEntry {
  id: string;
  name: string;
  areaHa: NumericValue;
  soilCategory?: string | null;
  synthetic: true;
}

export interface VariableCostEntry {
  item: string;
  cost: NumericValue;
}

export interface CropEntry {
  id: string;
  name: string;
  baseYield: NumericValue;
  pricePerTonne: NumericValue;
  variableCostsPerHa: VariableCostEntry[];
  harvestWindow?: { start: HalfMonthId; end: HalfMonthId; provenance: Provenance } | null;
}

export interface OperationEntry {
  id: string;
  name: string;
  machineSetId: string;
  workRateHaPerH: NumericValue;
  passes: number;
  labourPersons: number;
  window: { start: HalfMonthId; end: HalfMonthId; provenance: Provenance };
  strawRelated: boolean;
  fuelLPerHa?: NumericValue | null;
}

export interface OperationSetEntry {
  id: string;
  cropId: string;
  establishmentVariant: string;
  operations: OperationEntry[];
}

export type ChargeBasis = "own-equipment" | "contractor" | "hybrid";

export interface ChargeEntry {
  machineSetId: string;
  basis: ChargeBasis;
  chargePerHa: NumericValue;
  note?: string;
}

/**
 * User-supplied preceding-crop yield modifier. Always an explicit, unverified
 * user assumption (A-003/A-016); never a shipped coefficient.
 */
export interface YieldModifierInput {
  precedingCropId: string;
  cropId: string;
  type: "percent" | "t_per_ha";
  value: number;
  provenance: Provenance;
}

export interface ScenarioYear {
  cropId: string;
  establishmentVariant: string;
}

export interface ScenarioInput {
  id: string;
  name: string;
  farmId: string;
  areaHa: number;
  baseline: boolean;
  previousCropId?: string | null;
  years: ScenarioYear[];
  yieldOverridesPerHa?: Record<string, { value: number; provenance: Provenance }>;
  yieldModifiers?: YieldModifierInput[];
}

export type FieldState<T> =
  | { status: "ok"; value: T }
  | { status: "missing"; reasons: string[] };

export interface PeriodHours {
  period: HalfMonthId;
  hours: number;
}

export interface MachineryDemandRecord {
  yearIndex: number;
  cropId: string;
  establishmentVariant: string;
  operationId: string;
  operationName: string;
  machineSetId: string;
  hoursPerYear: FieldState<number>;
  byPeriod: FieldState<PeriodHours[]>;
  labourHoursPerYear: FieldState<number>;
}

export interface AppliedModifier {
  type: "percent" | "t_per_ha";
  value: number;
  provenance: Provenance;
}

export interface CropYearResult {
  yearIndex: number;
  cropId: string;
  cropName: string;
  establishmentVariant: string;
  predecessorCropId: string | null;
  baseYieldTPerHa: FieldState<number>;
  modifier: AppliedModifier | null;
  effectiveYieldTPerHa: FieldState<number>;
  outputTonnes: FieldState<number>;
  revenuePerHa: FieldState<number>;
  variableCostsPerHa: FieldState<number>;
  machineryChargePerHa: FieldState<number>;
  grossMarginPerHa: FieldState<number>;
  notes: string[];
}

export interface RotationSummary {
  meanYieldTPerHa: FieldState<number>;
  totalOutputTonnes: FieldState<number>;
  annualisedGrossMarginPerHa: FieldState<number>;
  annualisedGrossMarginTotal: FieldState<number>;
  hoursByPeriod: FieldState<PeriodHours[]>;
  peakPeriod: FieldState<{ period: HalfMonthId; hours: number }>;
  totalHoursPerYear: FieldState<number>;
}

export interface ScenarioResult {
  scenario: { id: string; name: string; baseline: boolean; areaHa: number };
  engineVersion: string;
  packVersions: Record<string, string>;
  cropYears: CropYearResult[];
  machinery: MachineryDemandRecord[];
  summary: RotationSummary;
  warnings: string[];
}

export interface Packs {
  farm: { version: string; entries: Record<string, FarmEntry> };
  crops: { version: string; entries: Record<string, CropEntry> };
  operations: { version: string; entries: OperationSetEntry[] };
  charges: { version: string; entries: ChargeEntry[] };
}
