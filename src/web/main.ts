import { parsePacks, parseScenario } from "../contracts/validate.js";
import { runScenario } from "../engine/index.js";
import type {
  CropEntry,
  FieldState,
  MachineryDemandRecord,
  Packs,
  Provenance,
  ScenarioInput,
  ScenarioResult,
} from "../contracts/types.js";

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

interface YearDraft {
  cropId: string;
  variant: string;
}

interface ScenarioDraft {
  id: string;
  name: string;
  baseline: boolean;
  previousCropId: string;
  years: YearDraft[];
}

interface ModifierDraft {
  preceding: string;
  crop: string;
  type: "percent" | "t_per_ha";
  value: number;
}

interface AppState {
  packs: Packs | null;
  drafts: ScenarioDraft[];
  initialDrafts: ScenarioDraft[];
  overrides: Map<string, number>;
  modifiers: ModifierDraft[];
  areaHa: number;
  results: ScenarioResult[];
}

const state: AppState = {
  packs: null,
  drafts: [],
  initialDrafts: [],
  overrides: new Map(),
  modifiers: [],
  areaHa: 100,
  results: [],
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CATEGORIES = ["establishment", "spray", "harvest", "straw", "other"] as const;
type Category = (typeof CATEGORIES)[number];

const COLOURS: Record<string, string[]> = {
  baseline: ["#007841", "#4bae3b", "#8fbf5a", "#b7d38a", "#d5e3b8"],
  comparison: ["#ea7d31", "#f0a05f", "#f5bd8a", "#e2c48f", "#d8b27a"],
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function $(id: string): HTMLElement {
  const node = document.getElementById(id);
  if (!node) throw new Error(`missing element #${id}`);
  return node;
}

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const fmt = (value: number, digits = 1): string =>
  value.toLocaleString("en-IE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

function uiProvenance(note: string): Provenance {
  return {
    sourceType: "user-provided",
    source: `UI adjustment (${note})`,
    date: new Date().toISOString().slice(0, 10),
    geography: "n/a",
    uncertainty: "unverified user assumption",
    status: "provisional",
  };
}

function stateText<T>(value: FieldState<T>, render: (v: T) => string): string {
  return value.status === "ok" ? render(value.value) : "Missing";
}

function stateReasons<T>(value: FieldState<T>): string {
  return value.status === "ok" ? "" : value.reasons.join("; ");
}

function cell(value: FieldState<number>, render: (v: number) => string): HTMLTableCellElement {
  const td = h("td", "right");
  if (value.status === "ok") {
    td.textContent = render(value.value);
  } else {
    td.textContent = "Missing";
    td.classList.add("state-missing");
    td.title = value.reasons.join("; ");
  }
  return td;
}

/* ------------------------------------------------------------------ */
/* Data loading                                                        */
/* ------------------------------------------------------------------ */

async function getJson(path: string): Promise<unknown> {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path} (${response.status})`);
  return response.json();
}

function toDraft(scenario: ScenarioInput): ScenarioDraft {
  return {
    id: scenario.id,
    name: scenario.name,
    baseline: scenario.baseline,
    previousCropId: scenario.previousCropId ?? "",
    years: scenario.years.map((year) => ({
      cropId: year.cropId,
      variant: year.establishmentVariant,
    })),
  };
}

async function init(): Promise<void> {
  try {
    $("run-status").textContent = "Loading data packs…";
    const [farm, crops, operations, charges, rawScenarios] = await Promise.all([
      getJson("./data/farm.pack.json"),
      getJson("./data/crops.pack.json"),
      getJson("./data/operations.pack.json"),
      getJson("./data/charges.pack.json"),
      getJson("./data/scenarios.json"),
    ]);

    state.packs = parsePacks({ farm, crops, operations, charges });

    const list = Array.isArray(rawScenarios)
      ? rawScenarios
      : (rawScenarios as { scenarios?: unknown }).scenarios;
    if (!Array.isArray(list)) throw new Error("scenarios.json must be an array");

    const scenarios = list.map((entry, index) => parseScenario(entry, `scenarios[${index}]`));
    state.drafts = scenarios.map(toDraft);
    state.initialDrafts = scenarios.map(toDraft);
    state.areaHa = scenarios[0]?.areaHa ?? 100;

    ($("area") as HTMLInputElement).value = String(state.areaHa);
    renderAllInputs();
    run();
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  }
}

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

function crops(): Array<[string, CropEntry]> {
  const packs = state.packs;
  if (!packs) return [];
  return Object.entries(packs.crops.entries).sort((a, b) => a[1].name.localeCompare(b[1].name));
}

function variantsFor(cropId: string): string[] {
  const packs = state.packs;
  if (!packs) return [];
  const found = packs.operations.entries
    .filter((entry) => entry.cropId === cropId)
    .map((entry) => entry.establishmentVariant);
  return found.length > 0 ? [...new Set(found)] : ["conventional"];
}

function packYieldText(crop: CropEntry): string {
  if (crop.relativeYield) {
    const reference = state.packs?.crops.entries[crop.relativeYield.cropId];
    const base = reference?.baseYield.value;
    const multiplier = crop.relativeYield.multiplier.value;
    if (base !== null && base !== undefined && multiplier !== null) {
      return `${fmt(base * multiplier)} t/ha (${fmt(multiplier * 100, 1)}% of ${reference?.name ?? "reference"})`;
    }
    return "derived (reference unavailable)";
  }
  return crop.baseYield.value === null ? "not supplied" : `${fmt(crop.baseYield.value)} t/ha`;
}

function renderAllInputs(): void {
  renderEditors();
  renderOverrides();
  renderModifiers();
}

function renderEditors(): void {
  const container = $("scenario-editors");
  container.replaceChildren();

  state.drafts.forEach((draft, draftIndex) => {
    const card = h("section", `scenario-card${draft.baseline ? "" : " comparison"}`);
    const head = h("div", "scenario-head");
    head.append(
      h("h2", undefined, draft.name),
      h("span", "badge", draft.baseline ? "Baseline" : "Comparison"),
    );
    card.append(head);

    const previousLabel = h("label", "field");
    previousLabel.append(h("span", undefined, "Crop before year 1 (optional)"));
    const previousSelect = document.createElement("select");
    previousSelect.append(new Option("(none)", ""));
    for (const [id, crop] of crops()) previousSelect.append(new Option(crop.name, id));
    previousSelect.value = draft.previousCropId;
    previousSelect.addEventListener("change", () => {
      draft.previousCropId = previousSelect.value;
      scheduleRun();
    });
    previousLabel.append(previousSelect);
    card.append(previousLabel);

    const table = h("table", "years-table");
    const thead = h("thead");
    const headRow = h("tr");
    for (const label of ["Year", "Crop", "Establishment", ""]) {
      headRow.append(h("th", undefined, label));
    }
    thead.append(headRow);
    table.append(thead);

    const tbody = h("tbody");
    draft.years.forEach((year, yearIndex) => {
      const row = h("tr");
      row.append(h("td", "num", String(yearIndex + 1)));

      const cropCell = h("td");
      const cropSelect = document.createElement("select");
      for (const [id, crop] of crops()) cropSelect.append(new Option(crop.name, id));
      cropSelect.value = year.cropId;
      cropSelect.addEventListener("change", () => {
        year.cropId = cropSelect.value;
        const options = variantsFor(year.cropId);
        if (!options.includes(year.variant)) year.variant = options[0] ?? "conventional";
        renderEditors();
        scheduleRun();
      });
      cropCell.append(cropSelect);
      row.append(cropCell);

      const variantCell = h("td");
      const variantSelect = document.createElement("select");
      for (const variant of variantsFor(year.cropId)) {
        variantSelect.append(new Option(variant, variant));
      }
      variantSelect.value = year.variant;
      variantSelect.addEventListener("change", () => {
        year.variant = variantSelect.value;
        scheduleRun();
      });
      variantCell.append(variantSelect);
      row.append(variantCell);

      const actionCell = h("td");
      const remove = h("button", "ghost", "✕");
      remove.type = "button";
      remove.title = "Remove this year";
      remove.disabled = draft.years.length <= 1;
      remove.addEventListener("click", () => {
        draft.years.splice(yearIndex, 1);
        renderEditors();
        scheduleRun();
      });
      actionCell.append(remove);
      row.append(actionCell);

      tbody.append(row);
    });
    table.append(tbody);
    card.append(table);

    const actions = h("div", "row-actions");
    const add = h("button", "secondary", "+ Add year");
    add.type = "button";
    add.addEventListener("click", () => {
      if (draft.years.length >= 8) return;
      const options = crops().filter(([id]) =>
        state.packs?.operations.entries.some((entry) => entry.cropId === id),
      );
      const first = options[0] ?? crops()[0];
      if (!first) return;
      const variant = variantsFor(first[0])[0] ?? "conventional";
      draft.years.push({ cropId: first[0], variant });
      renderEditors();
      scheduleRun();
    });
    actions.append(add);
    if (draftIndex === 0) {
      const hint = h("span", "note", "Baseline drives the deltas.");
      actions.append(hint);
    }
    card.append(actions);
    container.append(card);
  });
}

function renderOverrides(): void {
  const container = $("override-editor");
  container.replaceChildren();

  const used = new Set<string>();
  for (const draft of state.drafts) {
    for (const year of draft.years) used.add(year.cropId);
  }
  if (used.size === 0) {
    container.append(h("p", "note", "No crops selected yet."));
    return;
  }

  for (const cropId of used) {
    const crop = state.packs?.crops.entries[cropId];
    if (!crop) continue;

    const row = h("div", "override-row");
    const label = h("div", "label", crop.name);
    label.append(h("span", "hint", `pack: ${packYieldText(crop)}`));
    row.append(label);

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.1";
    input.inputMode = "decimal";
    input.title = "Base yield override (t/ha). Blank uses the pack value.";
    const existing = state.overrides.get(cropId);
    input.value = existing === undefined ? "" : String(existing);
    input.addEventListener("input", () => {
      const value = input.value.trim();
      if (value === "") {
        state.overrides.delete(cropId);
      } else {
        const parsed = Number(value);
        if (Number.isFinite(parsed) && parsed > 0) state.overrides.set(cropId, parsed);
      }
      scheduleRun();
    });
    row.append(input);
    container.append(row);
  }
}

function renderModifiers(): void {
  const list = $("modifier-list");
  list.replaceChildren();

  if (state.modifiers.length === 0) {
    list.append(h("p", "note", "None set: base yields are used unchanged."));
  }

  state.modifiers.forEach((modifier, index) => {
    const previous = state.packs?.crops.entries[modifier.preceding]?.name ?? modifier.preceding;
    const crop = state.packs?.crops.entries[modifier.crop]?.name ?? modifier.crop;
    const render = modifier.type === "percent" ? `${modifier.value}%` : `${modifier.value} t/ha`;
    const row = h("div", "modifier-row");
    row.append(h("span", undefined, `${previous} → ${crop}: ${render}`));
    const remove = h("button", "ghost", "Remove");
    remove.type = "button";
    remove.addEventListener("click", () => {
      state.modifiers.splice(index, 1);
      renderModifiers();
      scheduleRun();
    });
    row.append(remove);
    list.append(row);
  });

  const form = $("modifier-form");
  form.replaceChildren();

  const previousSelect = document.createElement("select");
  previousSelect.append(new Option("Previous crop…", ""));
  for (const [id, crop] of crops()) previousSelect.append(new Option(crop.name, id));

  const cropSelect = document.createElement("select");
  cropSelect.append(new Option("Current crop…", ""));
  for (const [id, crop] of crops()) cropSelect.append(new Option(crop.name, id));

  const typeSelect = document.createElement("select");
  typeSelect.append(new Option("% of base", "percent"));
  typeSelect.append(new Option("t/ha delta", "t_per_ha"));

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.step = "0.1";
  valueInput.placeholder = "value";
  valueInput.inputMode = "decimal";

  const add = h("button", "primary small", "Add");
  add.type = "button";

  form.append(previousSelect, cropSelect);
  const triple = h("div", "triple");
  triple.append(typeSelect, valueInput, add);
  form.append(triple);

  add.addEventListener("click", () => {
    const value = Number(valueInput.value);
    if (!previousSelect.value || !cropSelect.value || !Number.isFinite(value)) return;
    state.modifiers.push({
      preceding: previousSelect.value,
      crop: cropSelect.value,
      type: typeSelect.value === "t_per_ha" ? "t_per_ha" : "percent",
      value,
    });
    renderModifiers();
    scheduleRun();
  });
}

/* ------------------------------------------------------------------ */
/* Run                                                                 */
/* ------------------------------------------------------------------ */

let runTimer: number | undefined;
function scheduleRun(): void {
  window.clearTimeout(runTimer);
  runTimer = window.setTimeout(run, 140);
}

function buildInput(draft: ScenarioDraft): ScenarioInput {
  const overrides: Record<string, { value: number; provenance: Provenance }> = {};
  for (const [cropId, value] of state.overrides) {
    overrides[cropId] = {
      value,
      provenance: uiProvenance(`base yield override for ${cropId}`),
    };
  }
  return {
    id: draft.id,
    name: draft.name,
    farmId: "farm.synthetic1",
    areaHa: state.areaHa,
    baseline: draft.baseline,
    previousCropId: draft.previousCropId || null,
    years: draft.years.map((year) => ({
      cropId: year.cropId,
      establishmentVariant: year.variant,
    })),
    yieldOverridesPerHa: Object.keys(overrides).length > 0 ? overrides : undefined,
    yieldModifiers:
      state.modifiers.length > 0
        ? state.modifiers.map((modifier) => ({
            precedingCropId: modifier.preceding,
            cropId: modifier.crop,
            type: modifier.type,
            value: modifier.value,
            provenance: uiProvenance(`modifier ${modifier.preceding} -> ${modifier.crop}`),
          }))
        : undefined,
  };
}

function run(): void {
  const packs = state.packs;
  if (!packs) return;
  try {
    state.results = state.drafts.map((draft) => runScenario(packs, buildInput(draft)));
    hideError();
    renderKpis();
    renderComparison();
    renderChart();
    renderCropTables();
    renderMachineryTables();
    renderMissing();
    renderSources();
    $("run-status").textContent = `Updated ${new Date().toLocaleTimeString("en-IE")}`;
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  }
}

function showError(message: string): void {
  const banner = $("error");
  banner.hidden = false;
  banner.textContent = message;
}

function hideError(): void {
  $("error").hidden = true;
}

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

function statCard(
  label: string,
  value: FieldState<number>,
  render: (v: number) => string,
  sub?: string,
): HTMLElement {
  const wrapper = h("div", "stat");
  wrapper.append(h("span", "label", label));
  const valueEl = h("span", "value");
  if (value.status === "ok") {
    valueEl.textContent = render(value.value);
  } else {
    valueEl.textContent = "Missing";
    valueEl.classList.add("state-missing");
    valueEl.title = value.reasons.join("; ");
  }
  wrapper.append(valueEl);
  if (sub) wrapper.append(h("span", "sub", sub));
  return wrapper;
}

function peakCard(label: string, value: FieldState<{ period: string; hours: number }>): HTMLElement {
  const wrapper = h("div", "stat");
  wrapper.append(h("span", "label", label));
  const valueEl = h("span", "value");
  if (value.status === "ok") {
    valueEl.textContent = `${value.value.period} · ${fmt(value.value.hours)} h`;
  } else {
    valueEl.textContent = "Missing";
    valueEl.classList.add("state-missing");
    valueEl.title = value.reasons.join("; ");
  }
  wrapper.append(valueEl);
  return wrapper;
}

function renderKpis(): void {
  const box = $("kpis");
  box.replaceChildren();

  for (const result of state.results) {
    const card = h("section", `kpi-card${result.scenario.baseline ? "" : " comparison"}`);
    const head = h("div", "kpi-head");
    head.append(
      h("h3", undefined, result.scenario.name),
      h("span", "badge", result.scenario.baseline ? "Baseline" : "Comparison"),
    );
    card.append(head);

    const stats = h("div", "kpi-stats");
    stats.append(
      statCard("Mean yield", result.summary.meanYieldTPerHa, (v) => `${fmt(v)} t/ha`),
      statCard(
        "Gross margin",
        result.summary.annualisedGrossMarginPerHa,
        (v) => `€${fmt(v, 0)}/ha`,
        "annualised; excl. straw",
      ),
      statCard("Machine hours", result.summary.totalHoursPerYear, (v) => `${fmt(v)} h`, "rotation total"),
      peakCard("Peak half-month", result.summary.peakPeriod),
    );
    card.append(stats);
    box.append(card);
  }
}

function deltaText(
  baseline: FieldState<number>,
  other: FieldState<number>,
  digits: number,
  unit: string,
): HTMLTableCellElement {
  const td = h("td", "right");
  if (baseline.status === "ok" && other.status === "ok") {
    const change = other.value - baseline.value;
    td.textContent = `${change >= 0 ? "+" : ""}${fmt(change, digits)}${unit ? ` ${unit}` : ""}`;
    td.classList.add(change >= 0 ? "delta-pos" : "delta-neg");
  } else {
    td.textContent = "n/a";
    td.classList.add("state-missing");
  }
  return td;
}

function renderComparison(): void {
  const box = $("comparison");
  box.replaceChildren();

  if (state.results.length < 2) {
    box.append(h("p", "note", "Add a second rotation to compare."));
    return;
  }

  const baseline = state.results.find((result) => result.scenario.baseline) ?? state.results[0];
  if (!baseline) return;
  const others = state.results.filter((result) => result !== baseline);

  for (const other of others) {
    const wrapper = h("div", "table-scroll");
    const table = h("table", "data");
    const thead = h("thead");
    const headRow = h("tr");
    for (const label of ["Metric", baseline.scenario.name, other.scenario.name, "Δ"]) {
      headRow.append(h("th", label === "Δ" ? "right" : undefined, label));
    }
    thead.append(headRow);
    table.append(thead);

    const tbody = h("tbody");
    const addRow = (
      label: string,
      left: FieldState<number>,
      right: FieldState<number>,
      digits: number,
      unit: string,
      render: (v: number) => string,
    ): void => {
      const row = h("tr");
      row.append(h("td", undefined, label));
      row.append(cell(left, render));
      row.append(cell(right, render));
      row.append(deltaText(left, right, digits, unit));
      tbody.append(row);
    };

    addRow("Mean yield", baseline.summary.meanYieldTPerHa, other.summary.meanYieldTPerHa, 1, "t/ha", (v) => fmt(v));
    addRow("Total output", baseline.summary.totalOutputTonnes, other.summary.totalOutputTonnes, 0, "t", (v) => fmt(v, 0));
    addRow(
      "Annualised gross margin",
      baseline.summary.annualisedGrossMarginPerHa,
      other.summary.annualisedGrossMarginPerHa,
      0,
      "€/ha",
      (v) => `€${fmt(v, 0)}`,
    );
    addRow(
      "Annualised GM total",
      baseline.summary.annualisedGrossMarginTotal,
      other.summary.annualisedGrossMarginTotal,
      0,
      "€",
      (v) => `€${fmt(v, 0)}`,
    );
    addRow(
      "Machine hours",
      baseline.summary.totalHoursPerYear,
      other.summary.totalHoursPerYear,
      1,
      "h",
      (v) => fmt(v),
    );

    const peakRow = h("tr");
    peakRow.append(h("td", undefined, "Peak half-month"));
    const leftPeak = h("td", "right");
    leftPeak.textContent = stateText(baseline.summary.peakPeriod, (v) => `${v.period} · ${fmt(v.hours)} h`);
    if (baseline.summary.peakPeriod.status === "missing") leftPeak.classList.add("state-missing");
    const rightPeak = h("td", "right");
    rightPeak.textContent = stateText(other.summary.peakPeriod, (v) => `${v.period} · ${fmt(v.hours)} h`);
    if (other.summary.peakPeriod.status === "missing") rightPeak.classList.add("state-missing");
    peakRow.append(leftPeak, rightPeak, h("td", "right", "—"));
    tbody.append(peakRow);

    table.append(tbody);
    wrapper.append(table);
    box.append(wrapper);
    box.append(
      h(
        "p",
        "note",
        "Deltas are comparison minus baseline. Margins exclude straw revenue and BISS/CRISS/Eco payments.",
      ),
    );
  }
}

/* ------------------------------------------------------------------ */
/* Chart                                                               */
/* ------------------------------------------------------------------ */

function categoryOf(machineSetId: string): Category {
  if (/plough|disc|drill/.test(machineSetId)) return "establishment";
  if (/sprayer/.test(machineSetId)) return "spray";
  if (/combine/.test(machineSetId)) return "harvest";
  if (/straw/.test(machineSetId)) return "straw";
  return "other";
}

interface Series {
  buckets: Map<string, Partial<Record<Category, number>>>;
  missing: number;
  years: number;
}

function seriesFor(result: ScenarioResult): Series {
  const buckets = new Map<string, Partial<Record<Category, number>>>();
  let missing = 0;
  for (const record of result.machinery) {
    if (record.byPeriod.status !== "ok") {
      missing += 1;
      continue;
    }
    const category = categoryOf(record.machineSetId);
    for (const slice of record.byPeriod.value) {
      const bucket = buckets.get(slice.period) ?? {};
      bucket[category] = (bucket[category] ?? 0) + slice.hours;
      buckets.set(slice.period, bucket);
    }
  }
  return { buckets, missing, years: Math.max(result.cropYears.length, 1) };
}

function bucketTotal(series: Series, period: string): number {
  const bucket = series.buckets.get(period);
  if (!bucket) return 0;
  return CATEGORIES.reduce((sum, category) => sum + (bucket[category] ?? 0), 0);
}

function periodId(index: number): string {
  const month = Math.floor(index / 2) + 1;
  const half = index % 2 === 0 ? 1 : 2;
  return `${String(month).padStart(2, "0")}H${half}`;
}

function niceMax(value: number): { max: number; step: number } {
  if (!(value > 0)) return { max: 1, step: 0.25 };
  const rawStep = value / 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalised = rawStep / magnitude;
  const factor = normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 5 ? 5 : 10;
  const step = factor * magnitude;
  return { max: step * 4, step };
}

function renderChart(): void {
  const container = $("chart");
  const notes = $("chart-notes");
  container.replaceChildren();
  notes.replaceChildren();

  if (state.results.length === 0) return;

  const series = state.results.map((result) => ({ result, data: seriesFor(result) }));
  const baseline = series.find((entry) => entry.result.scenario.baseline) ?? series[0];
  const peakValues: number[] = [];
  for (const entry of series) {
    for (let index = 0; index < 24; index += 1) {
      peakValues.push(bucketTotal(entry.data, periodId(index)) / entry.data.years);
    }
  }
  const maxObserved = Math.max(...peakValues, 0);
  if (!(maxObserved > 0)) {
    container.append(
      h(
        "p",
        "note",
        "No machinery hours can be calculated yet: work rates are still missing for every operation in these rotations.",
      ),
    );
  }

  const W = 1100;
  const H = 400;
  const L = 54;
  const R = 16;
  const T = 34;
  const B = 58;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const groupW = plotW / 24;
  const barW = groupW * 0.34;
  const gap = groupW * 0.08;
  const { max, step } = niceMax(maxObserved);
  const y = (value: number): number => T + plotH - (value / max) * plotH;

  const parts: string[] = [];
  parts.push(
    `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Machinery hours by half-month, stacked by operation group, one series per rotation">`,
  );

  // Seasonal bands
  const bands: Array<[number, number, string, string]> = [
    [0, 2, "#f5f6f5", "Winter"],
    [4, 10, "#eef4ee", "Spring"],
    [10, 16, "#fbf6ea", "Summer"],
    [16, 22, "#f7eef0", "Autumn"],
    [22, 24, "#f5f6f5", ""],
  ];
  for (const [start, end, fill, label] of bands) {
    const x = L + start * groupW;
    const width = (end - start) * groupW;
    parts.push(`<rect x="${x.toFixed(1)}" y="${T}" width="${width.toFixed(1)}" height="${plotH}" fill="${fill}"/>`);
    if (label) {
      parts.push(
        `<text x="${(x + width / 2).toFixed(1)}" y="${T - 12}" text-anchor="middle" font-size="11" fill="#6a747d" font-family="Segoe UI, Arial, sans-serif">${label}</text>`,
      );
    }
  }

  // Gridlines and y labels
  for (let tick = 0; tick <= 4; tick += 1) {
    const value = step * tick;
    const yy = y(value);
    parts.push(
      `<line x1="${L}" y1="${yy.toFixed(1)}" x2="${W - R}" y2="${yy.toFixed(1)}" stroke="#e2e7e3" stroke-width="1"/>`,
      `<text x="${L - 8}" y="${(yy + 3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">${fmt(value, value < 10 ? 1 : 0)}</text>`,
    );
  }

  // Month separators
  for (let index = 2; index < 24; index += 2) {
    const x = L + index * groupW;
    parts.push(`<line x1="${x.toFixed(1)}" y1="${T}" x2="${x.toFixed(1)}" y2="${T + plotH}" stroke="#e6ebe7" stroke-width="1"/>`);
  }

  // Bars
  series.forEach((entry, seriesIndex) => {
    const colour = entry.result.scenario.baseline
      ? COLOURS.baseline ?? []
      : COLOURS.comparison ?? [];
    for (let index = 0; index < 24; index += 1) {
      const period = periodId(index);
      const bucket = entry.data.buckets.get(period);
      if (!bucket) continue;
      const xA =
        L + index * groupW + groupW * 0.1 + (seriesIndex === 0 ? 0 : barW + gap);
      let bottom = T + plotH;
      CATEGORIES.forEach((category, categoryIndex) => {
        const hours = (bucket[category] ?? 0) / entry.data.years;
        if (hours <= 0) return;
        const height = (hours / max) * plotH;
        bottom -= height;
        const label = `${entry.result.scenario.name} · ${period} · ${category}: ${fmt(hours)} h`;
        parts.push(
          `<rect x="${xA.toFixed(1)}" y="${bottom.toFixed(1)}" width="${barW.toFixed(1)}" height="${height.toFixed(1)}" fill="${colour[categoryIndex] ?? "#999"}" stroke="#ffffff" stroke-width="0.4"><title>${esc(label)}</title></rect>`,
        );
      });
    }
  });

  // X labels
  for (let index = 0; index < 24; index += 1) {
    const x = L + index * groupW + groupW / 2;
    const month = MONTHS[Math.floor(index / 2)] ?? "";
    const half = index % 2 === 0 ? "H1" : "H2";
    parts.push(
      `<text x="${x.toFixed(1)}" y="${H - B + 16}" text-anchor="middle" font-size="9" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">${month}</text>`,
      `<text x="${x.toFixed(1)}" y="${H - B + 28}" text-anchor="middle" font-size="8" fill="#8b949b" font-family="Segoe UI, Arial, sans-serif">${half}</text>`,
    );
  }

  // Axis titles
  parts.push(
    `<text x="${L}" y="${H - 8}" font-size="10" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">Half-month period (H1 = days 1–15, H2 = day 16 to month end)</text>`,
    `<text x="14" y="${T + plotH / 2}" transform="rotate(-90 14 ${T + plotH / 2})" text-anchor="middle" font-size="10" fill="#55606b" font-family="Segoe UI, Arial, sans-serif">Average machine hours per rotation-year</text>`,
    `</svg>`,
  );

  container.innerHTML = parts.join("");

  // Legend and peak notes
  const legendBaseline = h("span", "legend-item");
  const swatchBaseline = h("span", "legend-swatch");
  swatchBaseline.style.background = COLOURS.baseline?.[0] ?? "#007841";
  legendBaseline.append(swatchBaseline, h("span", undefined, baseline?.result.scenario.name ?? "Baseline"));
  notes.append(legendBaseline);

  for (const entry of series) {
    if (entry === baseline) continue;
    const legend = h("span", "legend-item");
    const swatch = h("span", "legend-swatch");
    swatch.style.background = COLOURS.comparison?.[0] ?? "#ea7d31";
    legend.append(swatch, h("span", undefined, entry.result.scenario.name));
    notes.append(legend);
  }

  const peakParts: string[] = [];
  for (const entry of series) {
    let bestPeriod = "";
    let bestValue = 0;
    for (let index = 0; index < 24; index += 1) {
      const period = periodId(index);
      const value = bucketTotal(entry.data, period) / entry.data.years;
      if (value > bestValue) {
        bestValue = value;
        bestPeriod = period;
      }
    }
    peakParts.push(
      bestValue > 0
        ? `${entry.result.scenario.name}: ${bestPeriod} (${fmt(bestValue)} h)`
        : `${entry.result.scenario.name}: unavailable`,
    );
  }
  notes.append(h("span", "caption", `Peak average half-month workload — ${peakParts.join(" · ")}.`));

  const missingParts = series
    .filter((entry) => entry.data.missing > 0)
    .map((entry) => `${entry.result.scenario.name}: ${entry.data.missing} operation record(s) lack work rates and are excluded`);
  notes.append(
    h(
      "span",
      "caption",
      missingParts.length > 0
        ? `Partial chart — ${missingParts.join("; ")}.`
        : "Segments (bottom to top): establishment, spray, harvest, straw, other.",
    ),
  );
}

/* ------------------------------------------------------------------ */
/* Tables                                                              */
/* ------------------------------------------------------------------ */

function tableFor(headers: string[], rows: Array<Array<HTMLElement | string>>): HTMLTableElement {
  const table = h("table", "data");
  const thead = h("thead");
  const headRow = h("tr");
  headers.forEach((label, index) => {
    headRow.append(h("th", index === 0 ? undefined : "right", label));
  });
  thead.append(headRow);
  table.append(thead);
  const tbody = h("tbody");
  for (const values of rows) {
    const row = h("tr");
    values.forEach((value, index) => {
      if (typeof value === "string") {
        row.append(h("td", index === 0 ? undefined : "right", value));
      } else {
        row.append(value);
      }
    });
    tbody.append(row);
  }
  table.append(tbody);
  return table;
}

function renderCropTables(): void {
  const container = $("crop-tables");
  container.replaceChildren();

  for (const result of state.results) {
    const card = h("div", "table-card");
    card.append(h("h3", undefined, result.scenario.name));

    const rows: Array<Array<HTMLElement | string>> = result.cropYears.map((row) => {
      const note = [row.notes.join("; "), row.modifier ? "modifier applied" : ""]
        .filter(Boolean)
        .join(" · ");
      const cropCell = h("td");
      cropCell.textContent = row.cropName;
      if (note) cropCell.title = note;
      return [
        String(row.yearIndex + 1),
        cropCell,
        row.establishmentVariant,
        row.predecessorCropId ?? "—",
        cell(row.effectiveYieldTPerHa, (v) => fmt(v)),
        cell(row.outputTonnes, (v) => fmt(v, 0)),
        cell(row.grossMarginPerHa, (v) => `€${fmt(v, 0)}`),
      ];
    });

    const scroll = h("div", "table-scroll");
    scroll.append(
      tableFor(
        ["Year", "Crop", "Est.", "Predecessor", "Yield t/ha", "Output t", "GM €/ha"],
        rows,
      ),
    );
    card.append(scroll);

    const total = h("p", "note");
    total.textContent = `Rotation total: ${stateText(result.summary.totalOutputTonnes, (v) => `${fmt(v, 0)} t`)}, annualised GM ${stateText(
      result.summary.annualisedGrossMarginPerHa,
      (v) => `€${fmt(v, 0)}/ha`,
    )}. Excludes straw revenue and BISS/CRISS/Eco payments.`;
    card.append(total);
    container.append(card);
  }
}

function renderMachineryTables(): void {
  const container = $("machinery-tables");
  container.replaceChildren();

  for (const result of state.results) {
    const card = h("div", "table-card");
    card.append(h("h3", undefined, result.scenario.name));

    const rows: Array<Array<HTMLElement | string>> = result.machinery.map((record) => {
      const peak = peakBucket(record);
      const operationCell = h("td");
      operationCell.textContent = `${record.cropId.replace("crop.", "")} · ${record.operationName}`;
      return [
        operationCell,
        record.machineSetId.replace("machine.", "") || "—",
        cell(record.hoursPerYear, (v) => fmt(v)),
        peak,
        cell(record.labourHoursPerYear, (v) => fmt(v)),
      ];
    });

    const scroll = h("div", "table-scroll");
    scroll.append(
      tableFor(["Operation", "Machine set", "Hours", "Peak", "Labour"], rows),
    );
    card.append(scroll);
    card.append(
      h(
        "p",
        "note",
        "Hours are rotation totals across all years. Buckets follow the half-month convention (A-015); missing work rates show as Missing and are excluded from totals.",
      ),
    );
    container.append(card);
  }
}

function peakBucket(record: MachineryDemandRecord): HTMLTableCellElement {
  const td = h("td", "right");
  if (record.byPeriod.status === "ok") {
    let best = record.byPeriod.value[0];
    for (const slice of record.byPeriod.value) {
      if (best === undefined || slice.hours > best.hours) best = slice;
    }
    td.textContent = best ? `${best.period} · ${fmt(best.hours)} h` : "—";
  } else {
    td.textContent = "Missing";
    td.classList.add("state-missing");
    td.title = record.byPeriod.reasons.join("; ");
  }
  return td;
}

/* ------------------------------------------------------------------ */
/* Missing data and sources                                            */
/* ------------------------------------------------------------------ */

function collectMissing(result: ScenarioResult): string[] {
  const reasons: string[] = [];
  for (const row of result.cropYears) {
    const prefix = `${result.scenario.name} · year ${row.yearIndex + 1} (${row.cropId})`;
    const states: Array<[string, FieldState<unknown>]> = [
      ["effective yield", row.effectiveYieldTPerHa],
      ["output", row.outputTonnes],
      ["revenue", row.revenuePerHa],
      ["variable costs", row.variableCostsPerHa],
      ["machinery charge", row.machineryChargePerHa],
    ];
    for (const [label, value] of states) {
      if (value.status === "missing") {
        for (const reason of value.reasons) reasons.push(`${prefix} ${label}: ${reason}`);
      }
    }
  }
  for (const record of result.machinery) {
    if (record.hoursPerYear.status === "missing") {
      for (const reason of record.hoursPerYear.reasons) {
        reasons.push(`${result.scenario.name} · ${record.cropId} ${record.operationName}: ${reason}`);
      }
    }
  }
  for (const warning of result.warnings) reasons.push(`${result.scenario.name}: ${warning}`);
  return [...new Set(reasons)];
}

function renderMissing(): void {
  const container = $("missing");
  container.replaceChildren();

  const all = state.results.flatMap(collectMissing);
  if (all.length === 0) {
    container.append(h("p", "missing-empty", "No missing states in the current run."));
    return;
  }

  container.append(
    h("p", "note", `${all.length} missing-data state(s). Values are never replaced with zeros.`),
  );
  const list = h("ul", "missing-list");
  for (const reason of all) list.append(h("li", undefined, reason));
  container.append(list);
}

function renderSources(): void {
  const body = $("sources-body");
  body.replaceChildren();
  const result = state.results[0];

  const lines: string[] = [
    "Yields: CSO 10-year national averages where available (winter wheat 11.5, winter barley 8.8, spring barley 7.3, winter oats 8.7, WOSR 4.4 t/ha), product-owner placeholders for other crops, and malting barley derived as 93.75% of the feed spring barley base (C&R implied target ratio 7.5/8.0). CSO reliability is questioned by the product owner; all yields are placeholders.",
    "Economics: Teagasc Crops Costs and Returns 2026 (Collins and Phelan, Oak Park, January 2026) — net prices, MATERIALS and MISCELLANEOUS subtotals, and crop-level HIRE MACHINERY totals. Protein Crops Scheme €500/ha included for peas and spring beans.",
    "Work rates: establishment rates from project assumption A-001 (product-owner concept; provisional); other work rates are not yet supplied. Operation timing windows are illustrative placeholders (A-020).",
    "Boundaries: margins exclude straw revenue and BISS/CRISS/Eco payments; land, fixed costs and machinery ownership are outside this prototype. Peak workload is not a capacity-feasibility judgement.",
  ];
  if (result) {
    lines.push(
      `Engine ${result.engineVersion} · packs: ${Object.entries(result.packVersions)
        .map(([name, version]) => `${name} ${version}`)
        .join(", ")}.`,
    );
  }

  for (const line of lines) body.append(h("p", undefined, line));

  const link = h("a", undefined, "Full source register (DATA_SOURCES.md)");
  link.href = "https://github.com/jackjamesonteagasc/wf-dss-prototype/blob/main/data/DATA_SOURCES.md";
  link.target = "_blank";
  link.rel = "noreferrer";
  body.append(link);
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

$("area").addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  const value = Number(input.value);
  if (Number.isFinite(value) && value > 0) {
    state.areaHa = value;
    scheduleRun();
  }
});

$("reset").addEventListener("click", () => {
  state.drafts = structuredClone(state.initialDrafts);
  state.overrides.clear();
  state.modifiers = [];
  ($("area") as HTMLInputElement).value = String(state.areaHa);
  renderAllInputs();
  scheduleRun();
});

void init();
