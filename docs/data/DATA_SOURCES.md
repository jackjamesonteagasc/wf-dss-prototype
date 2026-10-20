# v1 data sources and assumptions register (code repository)

Every numeric value used by the prototype is listed here with its source, basis and status. Values are **provisional** unless marked otherwise. Software tests do not validate any agronomic or financial value. The authoritative register for the wider project remains `ASSUMPTIONS_REGISTER.md` in the OneDrive project folder; this file is the code-repository companion and must be updated whenever a pack changes.

Pack versions: farm 0.1.0 · crops 0.3.0 · operations 0.1.0 · charges 0.2.0 · engine 0.1.0.

## 1. Source documents

| Key | Document | Location | Date | Use |
|---|---|---|---|---|
| CSO-ODS | CSO yield workings (10-year national averages), Sheet1 and C_&_R_2026 | `prototype development/preliminary_data/CSO_yields_workings_for_another_q` (project folder, not copied into the repo) | supplied 2026-10-20 | Crop base yields where available |
| C&R-2026 | *Crops Costs and Returns 2026*, Ciaran Collins and Shay Phelan, Teagasc Crops, Environment and Land-Use Programme, Oak Park | `prototype development/preliminary_data/Crop-Costs-and-Returns-2026.pdf` | January 2026 | Prices, variable-cost subtotals, hire machinery, protein support |
| A-001 | Product-owner establishment work-rate concept | Project `ASSUMPTIONS_REGISTER.md` | 2026 | Establishment work rates (provisional) |
| A-011/A-020 | Synthetic prototype and illustrative timing placeholders | Project `ASSUMPTIONS_REGISTER.md` | 2026-10-20 | Synthetic labelling; operation windows |
| BRAND | Teagasc brand colours and guidelines | `research_officer/teagasc_branding/` | current | UI palette (`web/theme.css`) |

## 2. Crop base yields (crops pack 0.3.0)

| Crop | Value (t/ha) | Source | Basis / caveat |
|---|---|---|---|
| Winter wheat | 11.5 | CSO-ODS Sheet1, "Yield 10 year CSO average" | Placeholder; CSO reliability questioned by product owner. The same file's rotation workings also show 9.9 t/ha — unresolved. |
| Winter barley | 8.8 | CSO-ODS Sheet1 (overall average) | File also notes 8.6 after cereal and 9.9 after break crop; explore via user modifiers, not built-in coefficients. |
| Spring barley (feed) | 7.3 | CSO-ODS Sheet1 | Placeholder. |
| Winter oats | 8.7 | CSO-ODS Sheet1 | Placeholder. |
| Winter oilseed rape | 4.4 | CSO-ODS Sheet1 (WOSR) | Placeholder. |
| Spring wheat | 6.5 | Product-owner instruction 2026-10-20 | Not an observation. |
| Winter rye | 11.5 | Product-owner instruction (borrowed from winter wheat) | No CSO rye series; explicitly a placeholder. |
| Winter beans | 5.0 | Product-owner instruction | Not an observation. |
| Spring beans | 4.0 | Product-owner instruction | Not an observation. |
| Spring oilseed rape | 2.8 | Product-owner instruction | Not an observation. |
| Spring oats | 7.4 | Product-owner instruction | Not an observation. |
| Peas (feed) | 5.0 | Product-owner instruction | Not an observation. |
| Malting barley | **derived** = 0.9375 × feed spring barley (7.3) = 6.84375 | C&R-2026 p.5 ratio: malting target 7.5 / feed spring barley target 8.0 = 93.75% | Target yields inferred from printed cost/tonne (€184 vs €174); underlining not recoverable from text. Follows the spring barley base automatically. |

Moisture basis is not stated in the supplied CSO file; treat all yields as "t/ha at an unconfirmed moisture basis".

## 3. Prices (crops pack 0.3.0)

| Crop | Net price (€/t) | Source | Caveat |
|---|---|---|---|
| Winter wheat | 190 | C&R-2026 p.5 | Indicative guide price; contract/quality basis to confirm |
| Spring wheat | 190 | C&R-2026 p.5 | as above |
| Winter barley | 180 | C&R-2026 p.5 | as above |
| Spring barley (feed) | 180 | C&R-2026 p.5 | as above |
| Malting barley | 210 | C&R-2026 p.5 | Requires contract and quality specification |
| Winter oats | 170 | C&R-2026 p.5 | Food-grade contracts may differ |
| Spring oats | 170 | C&R-2026 p.5 | Food-grade contracts may differ |
| Winter rye | 180 | C&R-2026 p.7 | End-use contract to confirm |
| Winter oilseed rape | 430 | C&R-2026 p.7 | Oil content/contract basis to confirm |
| Spring beans | 230 | C&R-2026 p.7 | Protein/quality basis to confirm |
| Peas (feed) | 240 | C&R-2026 p.7 | Protein/quality basis to confirm |
| Winter beans | null | — | C&R has a single beans enterprise; price to be supplied |
| Spring oilseed rape | null | — | No spring OSR enterprise in C&R; to be supplied |

Prices are "net price" as printed and exclude BISS, CRISS, Eco-scheme and straw.

## 4. Variable costs (crops pack 0.3.0)

Two items per crop, taken from the C&R subtotals (€/ha, 2026):

| Crop | MATERIALS | MISCELLANEOUS | Sum used | C&R page |
|---|---|---|---|---|
| Winter wheat | 1076 | 138 | 1214 | p.5 |
| Spring wheat | 792 | 95 | 887 | p.5 |
| Winter barley | 954 | 128 | 1082 | p.5 |
| Spring barley (feed) | 741 | 86 | 827 | p.5 |
| Malting barley | 729 | 82 | 811 | p.5 |
| Winter oats | 739 | 109 | 848 | p.5 |
| Spring oats | 698 | 81 | 779 | p.5 |
| Winter rye | 932 | 111 | 1043 | p.7 |
| Winter oilseed rape | 839 | 76 | 915 | p.7 |
| Spring beans | 483 | 62 | 545 | p.7 |
| Peas (feed) | 423 | 67 | 490 | p.7 |
| Winter beans / spring OSR | null | null | — | not in C&R |

MATERIALS includes seed, fertiliser, sprays and (where applicable) plant growth regulator. MISCELLANEOUS includes interest at 7%, transport at €8/t and (where applicable) bird control. C&R states totals may differ by rounding; the subtotals are used exactly as printed.

## 5. Machinery charges (charges pack 0.2.0)

Crop-level totals (C&R "HIRE MACHINERY" subtotal, €/ha, contractor/hire basis). A crop-level entry takes precedence over per-operation machine-set charges in the engine to prevent double counting (FR-08).

| Crop | Charge (€/ha) | Covers | C&R page |
|---|---|---|---|
| Winter wheat | 625 | plough/one-pass/roll, spray, fertiliser spreading, harvesting | p.5 |
| Spring wheat | 615 | as above | p.5 |
| Winter barley | 625 | as above | p.5 |
| Spring barley (feed) | 566 | as above | p.5 |
| Malting barley | 566 | as above | p.5 |
| Winter oats | 577 | as above | p.5 |
| Spring oats | 596 | as above | p.5 |
| Winter rye | 625 | as above | p.7 |
| Winter oilseed rape | 625 | as above | p.7 |
| Spring beans | 547 | plough/till/sow, spray, spreading, harvesting | p.7 |
| Peas (feed) | 547 | as above | p.7 |
| Winter beans / spring OSR | null | — | not costed separately |

Fallback per-operation charges (used only when a crop-level total is absent): spraying €30/ha per pass and harvesting €160/ha (both C&R-2026 p.4 explanatory notes).

## 6. Support payments

| Crop | €/ha | Source | Note |
|---|---|---|---|
| Spring beans | 500 | C&R-2026 p.7, Protein Crops Scheme | Included in C&R margins; rate and eligibility to confirm |
| Peas | 500 | C&R-2026 p.7, Protein Crops Scheme | as above |
| Others | none | — | BISS, CRISS and Eco-scheme payments are excluded from this prototype |

## 7. Operations, work rates and timing

- **Establishment work rates** (operations pack): ploughing 1.1 ha/h, discing 2.2 ha/h. Source A-001 (product-owner concept, 2026), labelled `user-provided`/`provisional`; implement, field efficiency, soil and operator unverified. Drilling work rate is null pending confirmation.
- **All other work rates** (drilling, spraying, combining, straw baling): null, provenance `unknown`, pending product-owner/adviser supply (AG-02).
- **Operation timing windows**: illustrative placeholders only (A-020), each entry labelled `illustrative`/`unknown`, e.g. autumn ploughing 09H2–10H2, harvest 08H1–09H2. They exercise the half-month engine and are not claims about Irish operation timing.
- **Passes**: spray passes (3 for cereals, 2 for beans) and establishment passes are template values labelled illustrative; labour is 1 person per machine.
- **Machine sets**: plough, disc, drill, sprayer, combine, straw — not yet matched to actual implements or power.

## 8. Model assumptions that affect these numbers

| Ref | Assumption |
|---|---|
| A-015 | Machinery demand reported in 24 half-month buckets; operation windows split evenly across buckets; no weather weighting and no feasibility claims. |
| A-016 | User may override base yields and set preceding-crop modifiers; defaults off; every modifier is an unverified user assumption. |
| A-017 | Gross-margin boundary: revenue (yield × price + supplied support) − variable costs − machinery charge. Excludes land/rent, labour overheads, ownership, drying and straw revenue. |
| A-018/A-023 | Crop-level C&R hire-machinery charge takes precedence over per-operation charges. |
| A-019 | Whole-farm comparison on one synthetic area; no field splitting. |
| A-020 | Operation timing windows are illustrative placeholders. |
| A-021/A-022 | Crop yields are placeholders (CSO where available; product-owner values otherwise). |
| A-024 | Relative yields: malting barley = 93.75% of the feed spring barley base yield (C&R target ratio), applied to the CSO spring barley placeholder. |

## 9. Known mismatches and open items

1. **Winter wheat yield**: 11.5 (CSO table) vs 9.9 (rotation workings in the same file) — unresolved; CSO value retained per instruction.
2. **Target yields vs placeholders**: C&R margins assume higher target yields (e.g. feed spring barley 8.0 vs CSO 7.3), so prototype margins will not reproduce the booklet exactly.
3. **Straw**: C&R includes straw value based on the Straw Incorporation Measure (€250/ha; OSR €150/ha). The prototype excludes straw revenue and includes baling operations that imply straw removal — the straw treatment needs a decision.
4. **BISS/CRISS/Eco** excluded; protein scheme included only for peas and spring beans.
5. **Moisture basis** of CSO yields and grain prices not confirmed.
6. **Future crops** (maincrop potatoes, open maize, fodder beet): see `FUTURE_CROPS.md`; C&R costs recorded but yields/machinery not modelled.
7. **Winter beans and spring OSR** have no C&R enterprise; prices/costs are null and margins report missing states.
