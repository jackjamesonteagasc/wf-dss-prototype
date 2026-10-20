import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePacks, parseScenario } from "../contracts/validate.js";
import type { Packs, ScenarioInput } from "../contracts/types.js";

export interface Dataset {
  packs: Packs;
  scenarios: ScenarioInput[];
}

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8")) as unknown;
}

export function loadDataset(dataDir: string): Dataset {
  const packs = parsePacks({
    farm: readJson(join(dataDir, "farm.pack.json")),
    crops: readJson(join(dataDir, "crops.pack.json")),
    operations: readJson(join(dataDir, "operations.pack.json")),
    charges: readJson(join(dataDir, "charges.pack.json")),
  });

  const raw = readJson(join(dataDir, "scenarios.json"));
  const list = Array.isArray(raw)
    ? raw
    : (raw as { scenarios?: unknown }).scenarios;
  if (!Array.isArray(list)) {
    throw new Error("scenarios.json must be an array or { scenarios: [...] }");
  }

  const scenarios = list.map((entry, index) =>
    parseScenario(entry, `scenarios[${index}]`),
  );

  return { packs, scenarios };
}
