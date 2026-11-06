# Camera photograph provenance

The catalog uses actual camera photographs. No image generation was used.

## Existing digital cameras

Seven model-specific original JPEGs were downloaded successfully with curl from Wikimedia Commons' upload host. The exact original URL, description page, author, and license are recorded in `src/digital-photos.json`. The source description pages were inspected through the available web search connector on 2026-11-05.

| Camera | Photographer | License |
| --- | --- | --- |
| Nikon Z 8 | 昼落ち | CC BY-SA 4.0 |
| Nikon Z f | 昼落ち | CC0 |
| Canon EOS R5 | Harrison Jones | CC BY-SA 4.0 |
| Sony a7 IV | Masum-al-Hasan Rocky | CC BY-SA 4.0 |
| Fujifilm X100VI | 昼落ち | CC0 |
| Leica Q3 | Peachyeung316 | CC BY-SA 4.0 |
| Hasselblad X2D 100C | Sebastian Nizan | CC0 |

The Hasselblad photograph depicts the X2D 100C Earth Explorer limited edition in tundra brown with XCD 2.5/55V lens. This is a photograph of the same model in its limited-edition finish. The Commons description explicitly identifies the photographed model; the EXIF camera model instead identifies the camera used to take the photograph.

CC BY-SA images must retain author credit, link to the source and license, and disclose changes such as resizing. Adapted versions remain available under the same license. CC0 source credits are retained for traceability.

## Film camera expansion

The accessible public repository [camera-gear-database](https://github.com/kapsikkum/camera-gear-database) contains model photographs and a per-image `images/CREDITS.csv`. Research snapshot commit: `05f34baf69747263e278295179f7687d630cb51d`. The credits contain image path, model, Commons filename, author, license, license URL, and original Commons description page. The repository's own source-code license does not replace the licenses of its photographs.

The repository has 370 image records across multiple camera and lens brands. Model labels need checking against their image filenames and photographed physical model; they should not be accepted blindly. For example, a Canon Canonflex record can point to a Canonflex RP photograph.

## Access findings

Direct Commons description/API requests from shell returned HTTP 403; the web connector could inspect description pages and their original-image links. The original `upload.wikimedia.org` photographs downloaded successfully with curl. Python urllib requests returned 403 for these images, so curl was used for the verified downloads. No destination access denial was bypassed.
