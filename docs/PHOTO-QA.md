# Visual photograph QA

Reviewed all 100 imported WebP images on 2026-11-05 using four PIL contact sheets, 25 labeled images per sheet. Opened each sheet with the image viewing tool. Also inspected Nikon F2, Nikon F100, and Minolta X-1 individually at larger size.

## Findings

- All 100 images depict actual cameras. No lens-only, generated illustration, unrelated subject, or empty/error image found.
- No confirmed model mismatch found. Nikon F2 is the F2 DE1 body, distinct from the Nikon F image. Nikon F100's body marking is clearly F100. Minolta X-1 photograph displays the regional XM badge; XM is the regional equivalent of X-1.
- Three digital images needed improved framing: Nikon Z8 initially showed its back/setup menu; Fujifilm X100VI initially showed two cameras; Hasselblad X2D initially showed a top-down angle. Replacement source entries were researched in `src/digital-photos.json`: Nikon Z 8 27 may 2023a.jpg; Fujifilm X100VI 25 may 2024c.jpg; Hb-x2d-earth-explorer-04.jpg. Their source licenses and authors were verified individually.
- Canon EOS 3000 photograph has a busy desk background and camera angled away, but camera remains clearly visible. This is a composition weakness rather than incorrect subject.
- Canon EOS-1 photograph includes front and rear views of one model in a two-panel composition. This accurately identifies the model, though a single front photograph would look more consistent.
- Pentax 67II photograph has no finder or lens, correctly matching the filename and model body.

## Resolution

The film dataset supplies images at up to 700px width. The final importer preserves source resolution and does not enlarge files. The root agent upgraded 13 images from original Commons downloads. Card-size rendering remains usable for the inspected photos.

## Replacement status

Nikon Z8 replacement `a` and Hasselblad replacement `04` downloaded successfully and were visually inspected: both show front perspectives of the exact model. Updated manifest and `/tmp/nicam-digital-photos/` originals are synchronized for re-import.

Fujifilm variants `c` and `e` show the back; `a` and `b` show two X100VI bodies in silver/black. Retained `b` because both cameras are the same correct model, shown clearly from the front. No single-front photograph was available in this set. This is a composition consistency limitation, not an incorrect model.
