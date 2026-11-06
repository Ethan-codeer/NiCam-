import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const json = async name => JSON.parse(await readFile(path.join(root, name), 'utf8'));
const ids = await json('src/camera-order.json');
if (ids.length < 100 || new Set(ids).size !== ids.length) throw Error('Catalog requires at least100 unique digital camera IDs');
const cameras = await Promise.all(ids.map(id => json(`src/cameras/${id}.json`)));
const photos = await json('src/photos.json');
for (const [index, camera] of cameras.entries()) {
  if (camera.id !== ids[index] || camera.digital !== true) throw Error(`Invalid digital model: ${ids[index]}`);
  const rows = camera.specGroups?.flatMap(group => group.rows) ?? [];
  if (camera.specGroups.length < 7 || rows.length < 30) throw Error(`Incomplete specifications: ${camera.id}`);
  if (!photos[camera.id]) throw Error(`Missing photographic credit: ${camera.id}`);
  for (const row of rows) {
    if (!row.label || !row.value || !row.sourceUrl?.startsWith('https://')) throw Error(`Incomplete source row: ${camera.id}`);
  }
}
const save = (name, value) => writeFile(path.join(root, name), JSON.stringify(value, null, 2) + '\n');
await mkdir(path.join(root, 'src/digital-batches'), { recursive: true });
// Keep editorial originals in reviewed source files; the public UI only uses the concise translation.
const runtimeCameras = cameras.map(camera => ({ ...camera, specGroups: camera.specGroups.map(group => ({ ...group, rows: group.rows.map(({ originalValue, ...row }) => row) })) }));
await save('src/digital-cameras.json', runtimeCameras);
for (const key of ['nikon', 'canon', 'sony', 'fujifilm', 'other']) {
  const group = cameras.filter(camera => key === 'other' ? !['nikon', 'canon', 'sony', 'fujifilm'].includes(camera.brand) : camera.brand === key);
  await save(`src/digital-batches/${key}.json`, { cameras: group, photos: Object.fromEntries(group.map(camera => [camera.id, photos[camera.id]])) });
}
console.log(`Catalog generated: ${cameras.length} digital cameras; ${cameras.reduce((total, camera) => total + camera.specGroups.reduce((n, group) => n + group.rows.length, 0), 0)} sourced parameter rows.`);
