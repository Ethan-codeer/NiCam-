# Comparison and museum logo QA

Reviewed 2026-11-06. This review used source inspection, server-rendered React tests, XML validation, checksum verification, and a CairoSVG/Pillow logo contact sheet. No browser was installed, started, or used. Browser interaction and responsive layout checks remain unverified in this environment.

## Comparison

`npx vitest run src/ComparePage.test.tsx` passed all six tests.

- Every catalog camera is offered by each empty-slot picker. Search matches model name, brand ID, localized brand name, and year; selected models are excluded from other slots.
- Three slots are rendered. Shared selection helpers remove unknown IDs and duplicates, preserve order, and cap selection at three. Detail-page and card actions also enforce this limit.
- Each occupied slot exposes replacement and removal controls. Replacement updates its index; removal compacts the remaining selection. Updates write both selection state and the comparison hash.
- Share links retain ordered camera IDs. `App.tsx` reads IDs from the route, normalizes them, renders the same order, and restores the global selection when the comparison route changes. Empty `ids` clears the selection. Malformed/unknown IDs cannot create undefined camera entries.
- Difference filtering considers every selected camera, including the third; matching rows disappear only when at least two cameras are present. Sources remain visible. Unknown values display an em dash and are not converted to zero.
- The common-scale body diagram supports three cameras and uses an explicit unknown-size message when either dimension is unavailable.
- Clipboard failure exposes the selectable share-link input. Camera image state resets when a slot changes model.

No blocking comparison issue was found by this static/test review. Tests do not execute DOM event handlers; replacement, removal, clipboard, hash navigation, and keyboard behavior were inspected in code rather than exercised in a browser.

## Logos

All ten brands exported by `data.ts` have local SVG artwork: Canon, Fujifilm, Hasselblad, Leica, Nikon, Olympus, Panasonic, Pentax, Ricoh, and Sony. Museum cards and brand detail headers render the shared `BrandLogo` image component with brand-name alternative text.

All ten SVGs rendered successfully and were visually inspected in [the contact sheet](brand-logo-contact-sheet.png). Their original proportions, colors, and distinctive artwork are preserved. CSS uses `object-fit: contain` with width/height limits; square Nikon and Leica logos have a separate height allowance. The contact sheet is an asset review, not a page screenshot.

XML validation found no scripts, SVG text elements, embedded images, foreign objects, event handlers, or external resource references. Each local SVG SHA-256 matched its recorded original download hash. These are downloaded vector artwork, not manually typeset approximations.

Source file pages and original download URLs are recorded in [`public/brands/sources.json`](../public/brands/sources.json). Each Commons file page was checked for `PD-textlogo` and trademark notices. [`CREDITS.md`](../public/brands/CREDITS.md) records attribution context and trademark ownership. Trademark notices do not imply unrestricted trademark use or manufacturer endorsement.

`npx tsc -b` passed after logo integration. No publishing or commits were performed by this QA task.

## Additional parameter language review

Reviewed all 20 Leica, Hasselblad, Panasonic, Olympus, Pentax, and Ricoh source camera files after the shared dictionary pass. Rewrote 457 mixed-language values as complete simplified Chinese specifications across 14 files; six files already used Chinese wording. Proper lens names, standards, codecs, model codes, and complete numerical enumerations remain intact. Long Panasonic/Pentax conditional specifications were rewritten as full clauses rather than another word replacement pass.

Invariant checks confirmed original row labels, source URLs, row/group order, and existing `originalValue` fields were retained. New `originalValue` fields preserve the complete pre-rewrite wording. All 20 models retain eight groups and 37–106 rows. No conditions were dropped from separate condition fields (these files had none); conditions embedded in values were retained in the translated values. Residual English grammar search found only intentional proper names and technical codes. Source inconsistencies in Leica Q3 USB power/audio rate and GH5 weight pairs were explicitly identified as original-spec values rather than silently corrected. The parent integration step must rebuild the generated catalog before the final build/tests.
