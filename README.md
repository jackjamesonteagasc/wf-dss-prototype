# Whole-farm tillage DSS — prototype v1

Rotation comparison prototype: user-defined crop rotations on a synthetic farm, compared on yields, gross margins and machinery demand by half-month period.

**Status: contracts, engine (M1–M6), CLI report, tests and the static web UI are implemented. Synthetic/illustrative data only. Software tests do not establish agronomic validation.**

## Rules enforced in code

- No agronomic or financial value is hard-coded in the engine; every number comes from a provenance-labelled pack or a user-supplied scenario override.
- Missing (`null`) inputs produce explicit missing-data states, never zeros.
- Engine modules (`src/engine`) import nothing from CLI/UI and perform no file, network, clock or random access.
- Every output carries provenance/status labels; the CLI prints a synthetic/illustrative banner.

## Commands

```
npm install
npm run build
npm test          # unit, boundary, reconciliation and hand-calculation tests
npm run cli       # runs the example scenarios and prints a labelled report
npm run build:web # bundle the UI into docs/ (GitHub Pages source)
npm run serve:web # local preview at http://localhost:8080
```

## Layout

```
src/contracts/    types + zod validation (units, provenance, scenarios)
src/engine/       M1 rotation → M2 operations → M3 half-month hours → M4 yields → M5 margin → M6 comparison
src/packs/        JSON pack loader
src/cli/          scenario runner + markdown report
data/             packs + example scenarios (provenance in data/DATA_SOURCES.md)
web/              static UI source (index.html, theme.css, app.css)
docs/             built static site committed for GitHub Pages
tests/            node:test suites
```

## Data policy

`data/*.pack.json` values are `null` until supplied by the product owner (or approved advisers) with provenance. Do not fill them with plausible-looking numbers. Work rates seeded from ASSUMPTIONS_REGISTER A-001 are labelled user-supplied provisional values; operation timing windows are labelled illustrative placeholders pending confirmation. Crop base yields are placeholders: CSO 10-year national averages plus product-owner placeholders (A-021/A-022). Prices and costs are from Teagasc Crops Costs and Returns 2026 (A-023): MATERIALS and MISCELLANEOUS subtotals plus a crop-level hire-machinery charge; margins exclude straw revenue and BISS/CRISS/Eco payments (protein scheme included for peas/beans).

Plan: `prototype development/` in the OneDrive project folder (README, FRAMEWORK, DATA_REQUIREMENTS, DEVELOPMENT_PLAN, V1_MECHANICS). Data provenance for every pack value: [`data/DATA_SOURCES.md`](data/DATA_SOURCES.md). Future crops: [`data/FUTURE_CROPS.md`](data/FUTURE_CROPS.md).
