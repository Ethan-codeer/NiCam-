# NiCam staged acceptance

This checklist records the intended staged scope and required verification. Unchecked items are not claims of completion.

## Content and integrity

- [ ] 60–80 camera records are available across all six requested brands.
- [x] 20–30 substantive Chinese knowledge articles are available.
- [x] Camera, brand and article identifiers are unique and all cross-references resolve.
- [ ] Equipment records identify official manufacturer sources and clearly expose pending verification.
- [ ] Unknown specifications remain unknown; comparisons do not invent missing data.
- [ ] Displayed totals match the actual loaded records.

## Navigation and interactions

- [ ] Hash routes support home, catalog, equipment detail, comparison, museum, brand detail, knowledge, article detail and laboratories.
- [ ] Search returns useful local results and supports an empty state.
- [ ] Catalog brand, format and search controls change the result set; reset restores it.
- [ ] Comparison uses the same records as the catalog, allows removal and handles missing values.
- [ ] Brand pages contain distinct history, timelines and related equipment.
- [ ] Knowledge views open complete articles and resolve equipment/laboratory links.
- [ ] All three laboratories change a visible visualization and numeric result when controls change; reset restores defaults.

## Scientific behavior

- [x] Depth of field expands when stopping down with other inputs fixed.
- [x] Motion blur increases with exposure duration and subject speed; a stationary subject has zero subject-motion blur.
- [x] Field of view narrows as focal length increases, with sensor width included in the calculation.
- [ ] Units, assumptions and limitations are visible; invalid physical values are rejected.

## Presentation and accessibility

- [ ] Desktop, tablet and phone views preserve readable content and usable controls.
- [ ] Comparison may scroll locally; the full page has no unintended horizontal overflow.
- [ ] Links, buttons and form controls have accessible names and visible keyboard focus.
- [ ] Images have useful alternative text and unavailable-image fallbacks.
- [ ] Navigation exposes the active destination, and selected filters/comparison items have visible state.

## Verification record

Automated validation and source review are distinct. Passing tests does not mean all editorial data has been independently verified. The current environment does not provide browser automation; visual, responsive and keyboard checks must remain explicitly unverified unless a supported browser is available. Do not install a browser or run an unsupported preview to bypass that restriction.

Final test/build results and any unresolved limitations should accompany the delivered Site. This document deliberately leaves acceptance items unchecked until that evidence is available.

## Automated evidence — 2026-11-05

- `npm test`: 3 test files, 12 tests passed. Tests cover content IDs and references, official HTTPS source domains, verification states, measurement validity educational model invariants, unknown comparison values, differences-only rows and empty/single comparison states.
- Import-validator smoke check: valid pending proposals and verified proposals with evidence were accepted. Duplicate IDs, negative measurements, HTTP sources and verified proposals without evidence were rejected (six expected outcomes passed).
- Source inspection confirms three laboratory models with labeled controls, numeric readouts, assumptions, reset and supported article deep links. This is source inspection, not browser interaction verification.
- Current content: 7 cameras, six brands, 20 articles. Two camera records are verified, five remain pending. The 60–80 camera target remains incomplete.
- Browser screenshots, responsive layout, keyboard traversal and image loading have not been verified in this environment.
- Final integrated `npm run build`: passed TypeScript project build and Vite production compilation (1,589 modules). Generated `dist/index.html` plus CSS and JavaScript assets.
- Updated comparison source review confirms per-camera verification status, source links, explicit measurement conventions and a same-scale width/height bounds illustration when both records have dimensions.
- Updated search source review confirms dialog labeling, initial input focus, Tab/Shift+Tab focus wrapping, Escape dismissal, focus restoration and route-change dismissal. Actual keyboard behavior remains a browser verification item.
