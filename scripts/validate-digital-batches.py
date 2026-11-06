"""Local structural QA; does not establish factual truth or image licensing."""
import json
from pathlib import Path
from urllib.parse import urlparse
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
errors = []
ids = set()
counts = []
for path in sorted((ROOT / 'src/digital-batches').glob('*.json')):
    batch = json.loads(path.read_text())
    counts.append((path.stem, len(batch['cameras'])))
    for camera in batch['cameras']:
        cid = camera['id']
        def issue(message):
            errors.append(f'{cid}: {message}')
        if cid in ids:
            issue('duplicate ID')
        ids.add(cid)
        if camera.get('digital') is not True:
            issue('digital flag missing')
        groups = camera.get('specGroups', [])
        rows = [r for g in groups for r in g['rows']]
        if len(groups) < 7 or len(rows) < 30:
            issue(f'insufficient detail ({len(groups)} groups, {len(rows)} rows)')
        seen = set()
        for group in groups:
            for row in group['rows']:
                key = (group['id'], row['label'], row['value'])
                if key in seen:
                    issue(f'duplicate fact {key}')
                seen.add(key)
                if not row.get('value') or row['value'].strip().lower() in {'unknown', '未知', '待补充', 'n/a'}:
                    issue(f'empty/filler row {key}')
                if urlparse(row.get('sourceUrl', '')).scheme != 'https':
                    issue(f'missing HTTPS source {key}')
                if any(word in row['label'] for word in ['保修', '报价', '包装清单']) or row['label'] in {'附件', '随机附件', '随附附件'}:
                    issue(f'excluded field {key}')
        photo = batch.get('photos', {}).get(cid)
        if not photo:
            issue('no photo record')
            continue
        for field in ['src', 'author', 'license', 'licenseUrl', 'sourceUrl', 'width', 'height', 'modifications']:
            if not photo.get(field):
                issue(f'missing photo {field}')
        image_path = ROOT / 'public' / photo.get('src', '').lstrip('/')
        if not image_path.is_file():
            issue('photo file absent')
        else:
            with Image.open(image_path) as im:
                if im.size != (photo.get('width'), photo.get('height')):
                    issue(f'photo dimensions metadata differs: {im.size}')
print('Batches:', ', '.join(f'{name}={n}' for name, n in counts))
print(f'Total unique digital models: {len(ids)}')
print('\n'.join(errors) if errors else 'Structural checks passed.')
raise SystemExit(bool(errors))
