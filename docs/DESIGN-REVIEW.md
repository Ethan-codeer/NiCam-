# Source-based design review

Reviewed 2026-11-05: `src/styles.css` and `src/App.tsx`. This is a source review; browser rendering, screenshots, pointer interaction and physical viewport measurements were unavailable and are not claimed as verified.

## Coherence

The implementation consistently uses the specified ivory, graphite and muted bronze palette. One-pixel rules, restrained corners, serif numeric accents, repeatable overlines, line icons and the generous hero create a coherent editorial optical identity. Sidebar width, tablet icon rail, mobile bottom navigation, catalog/card grids, single-column detail on mobile, and scrolling comparison match the intended structural hierarchy. Product images are explicitly identified as original illustrations; this is an acceptable documented adaptation of the original photography direction.

The camera count is correctly rendered from `cameras.length`. Comparison selection and URL display are capped at two cameras. The laboratory route recognizes `dof`, `motion`, and `fov`. The corrected design documents now use the actual staged count of six cameras, the shutter motion laboratory, and the explicit two-camera scope.

## Findings for implementation owner

1. **Readability:** Much of the desktop explanatory copy is 9–11px, while narrow homepage cards use 8px paragraphs and 6px specification chips. Increase content copy to approximately 12–14px and chips to at least 10px, or use a single homepage card column below 480px. Keep tiny text exclusively for nonessential metadata. The current density diverges from the 14px body design target.
2. **Mobile targets:** Main buttons reach 44px, but bookmark buttons, comparison controls, search/close icons and small tabs lack a guaranteed 44px touch area. Add padding/minimum dimensions without enlarging the visual icon.
3. **Modal keyboard behavior:** Search has dialog semantics, autofocus, Escape handling and a visible close action. It lacks a focus trap and focus restoration in the reviewed source. Ensure keyboard focus remains within the open modal and returns to its trigger on close.
4. **Copy consistency:** Homepage laboratory discovery text still says `景深、曝光与视角`; update to `景深、快门运动与视角` so it reflects the available labs.
5. **Data-derived counts:** The six-brand and three-lab metrics currently match the content but are hardcoded. Prefer `brands.length` and a shared lab list length; derive the hero object's `01 — 06` caption as well.
6. **Detail navigation:** Camera and brand routes fall back to `影像档案` without an active parent sidebar entry. Map `/camera/*` to the encyclopedia and `/brand/*` to the museum to preserve orientation.
7. **Empty related section:** A camera's related grid filters only other cameras from the same brand. With one staged camera per brand, this can produce an empty `继续探索` section. Hide the empty section or offer other staged cameras.

## Responsive coverage from source

Desktop: 216px fixed rail and 40px content padding. Tablet 768–1199px: 72px rail, 24px padding and two-column products/brands/articles. Mobile below 768px: hidden rail, sticky header, 60px bottom bar, stacked hero/detail/brand story/article list, wrapping filters and a comparison table in a scrolling wrapper. Below 480px catalog becomes one column while homepage remains two; this is the primary readability concern. Comparison tray is raised above the mobile navigation and modal height is constrained. Reduced-motion rules exist. These are structural observations, not a visual pass/fail certification.
