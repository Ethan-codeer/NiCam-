# NiCam architecture

NiCam is a Chinese photography reference and interactive learning site implemented as a static React and TypeScript application for Sites. This document describes the staged implementation, not a completed comprehensive encyclopedia.

## Application boundaries

Hash routes provide in-browser navigation without requiring a server rewrite rule. The application shell owns navigation, search and comparison selection. Catalog, equipment detail, comparison, brand museum, knowledge articles and laboratory views consume shared local records. No authentication, payment service, database or remote write API is required.

`src/data.ts` is the content boundary: camera IDs are stable references used by details, article relationships and comparison. Brand IDs identify the six museum collections. Article relationships must resolve to existing cameras, and article laboratory links must resolve to an implemented laboratory. Camera dimensions use millimetres and unknown values remain null rather than fabricated zeroes.

Official manufacturer links identify the proposed source for each equipment record. A link alone does not establish that every field was verified. The `verification` value explicitly distinguishes audited records from pending editorial seeds. Content and interface counts should be derived from the actual dataset.

`src/science.ts` contains pure educational models, separate from React rendering. `src/Labs.tsx` renders controls and visual feedback. The models use explicit units, reject invalid physical inputs and describe their simplifying assumptions. These simulations are educational approximations, not calibrated camera measurements.

## Staged scope

The current dataset contains 7 camera records across Nikon, Canon, Sony, Fujifilm, Leica and Hasselblad and 20 knowledge articles. Two camera records are marked verified; the remaining five are pending. The target content stage is 60–80 camera records, 20–30 knowledge articles and three interactive laboratories. The camera-count target remains incomplete; see `docs/DATA.md` for evidence and expansion notes. Completion of the content stage does not imply official verification of every record or complete manufacturer coverage. The interface must communicate pending source review wherever relevant.

Static build output is the deployable artifact. Tests check scientific invariants and content relationships; the TypeScript and production build checks catch integration failures. Browser verification remains a separate acceptance activity because a successful build cannot establish layout, keyboard behavior or image loading.
