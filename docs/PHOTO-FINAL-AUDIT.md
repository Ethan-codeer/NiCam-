# Photo source metadata audit

Audit date: 2026-11-06. This is a metadata source audit; final downloaded image identity, local availability and all-100 coverage must be checked separately.

## Leica Q2 correction

Changed `scripts/other-photos.json` Leica Q2 source to [Leica Q2 (40794004333).jpg](https://commons.wikimedia.org/wiki/File:Leica_Q2_(40794004333).jpg), by GillyBerlin, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). The Commons description identifies the depicted model as Leica Q2. The file is also used by the English Wikipedia Leica Q2 article. Original image dimensions: 5472 × 3080.

Original media URL: `https://upload.wikimedia.org/wikipedia/commons/a/ad/Leica_Q2_%2840794004333%29.jpg`.

The previous local Q2 asset was flagged as a landscape in the upstream visual review. The replacement must be downloaded and visually checked before release; changing metadata alone does not replace cached pixels.

## Ten additional Commons metadata checks

Checked source descriptions, author fields and license sections directly on Commons. Nine manifest credits and license identifiers match the pages. One credit requires correction as described below.

| Model | Commons file | Author | License | Finding |
| --- | --- | --- | --- | --- |
| Leica Q | [Leica Q (24140304236).jpg](https://commons.wikimedia.org/wiki/File:Leica_Q_(24140304236).jpg) | Kārlis Dambrāns | CC BY 2.0 | Matches |
| Leica SL2 | [Leica SL2.jpg](https://commons.wikimedia.org/wiki/File:Leica_SL2.jpg) | Jack Baty | CC BY-SA 2.0 | Matches |
| Leica SL | [Leica SL.jpg](https://commons.wikimedia.org/wiki/File:Leica_SL.jpg) | GodeNehler | CC BY-SA 4.0 | Matches |
| Leica M10 | [M10 Black.jpg](https://commons.wikimedia.org/wiki/File:M10_Black.jpg) | BUTTON74 | CC BY-SA 4.0 | Matches |
| Hasselblad X1D II | [HASSELBLAD X1D II.jpg](https://commons.wikimedia.org/wiki/File:HASSELBLAD_X1D_II.jpg) | Dinkun Chen | CC BY-SA 4.0 | Matches |
| Hasselblad X1D | [Hasselblad X1D.jpg](https://commons.wikimedia.org/wiki/File:Hasselblad_X1D.jpg) | Esquilo; required attribution Johan Fredriksson | CC BY-SA 3.0 | Credit correction needed |
| Panasonic GH5 | [Panasonic.Lumix.DC-GH5.jpg](https://commons.wikimedia.org/wiki/File:Panasonic.Lumix.DC-GH5.jpg) | Bautsch | CC0 | Matches |
| Panasonic G9 | [Panasonic.Lumix.DC-G9.jpg](https://commons.wikimedia.org/wiki/File:Panasonic.Lumix.DC-G9.jpg) | Bautsch | CC0 | Matches |
| Olympus E-M1 II | [Olympus OM-D E-M1 Mark II.jpg](https://commons.wikimedia.org/wiki/File:Olympus_OM-D_E-M1_Mark_II.jpg) | Kuroc622 | CC BY-SA 4.0 | Matches |
| Pentax K-1 | [Pentax K-1 20160429a.jpg](https://commons.wikimedia.org/wiki/File:Pentax_K-1_20160429a.jpg) | Focus35mm | CC BY-SA 4.0 | Matches |

The Hasselblad X1D source explicitly specifies **Attribution: Johan Fredriksson**. Use `Johan Fredriksson (Esquilo)` in the manifest and rendered credits. This audit changed only the Leica Q2 manifest record as assigned; the release owner should apply the Hasselblad credit correction wherever credits are generated.
