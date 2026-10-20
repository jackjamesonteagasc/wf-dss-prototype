# Whole-farm tillage DSS — prototype v1

Rotation comparison prototype: user-defined crop rotations on a synthetic farm, compared on yields, gross margins and machinery demand by half-month period.

**Status: contracts, engine (M1–M6), CLI report and tests implemented. Web UI next. Synthetic/illustrative data only. Software tests do not establish agronomic validation.**

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
```

## Layout

```
src/contracts/    types + zod validation (units, provenance, scenarios)
src/engine/       M1 rotation → M2 operations → M3 half-month hours → M4 yields → M5 margin → M6 comparison
src/packs/        JSON pack loader
src/cli/          scenario runner + markdown report
data/             packs (null values pending product-owner supply) + example scenarios
tests/            node:test suites
```

## Data policy

`data/*.pack.json` values are `null` until supplied by the product owner (or approved advisers) with provenance. Do not fill them with plausible-looking numbers. Work rates seeded from ASSUMPTIONS_REGISTER A-001 are labelled user-supplied provisional values; operation timing windows are labelled illustrative placeholders pending confirmation. Crop base yields are placeholders: CSO 10-year national averages plus product-owner placeholders (A-021/A-022); prices and variable costs remain null, so margins report missing states.

Planning documents live in the project folder: `prototype development/` (README, FRAMEWORK, DATA_REQUIREMENTS, DEVELOPMENT_PLAN, V1_MECHANICS).
