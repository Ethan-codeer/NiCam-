// Validate a proposed JSON camera import before editorial review; never publishes data.
import { readFileSync } from 'node:fs';
const path = process.argv[2];
if (!path) { console.error('Usage: node scripts/check-import.mjs cameras.json'); process.exit(1); }
try {
  const rows = JSON.parse(readFileSync(path, 'utf8'));
  if (!Array.isArray(rows) || !rows.length) throw Error('Expected a nonempty array');
  const ids = new Set();
  for (const row of rows) {
    for (const field of ['id', 'name', 'brand', 'format', 'type', 'description']) {
      if (typeof row[field] !== 'string' || !row[field].trim()) throw Error(`Missing ${field}`);
    }
    if (!/^[a-z0-9-]+$/.test(row.id) || ids.has(row.id)) throw Error(`Invalid or duplicate ID: ${row.id}`);
    ids.add(row.id);
    if (!Number.isInteger(row.year) || row.year < 1800 || row.year > new Date().getFullYear()) throw Error(`Invalid year: ${row.id}`);
    for (const field of ['megapixels', 'width', 'height', 'depth']) {
      if (row[field] !== null && (typeof row[field] !== 'number' || !Number.isFinite(row[field]) || row[field] <= 0)) throw Error(`Invalid ${field}: ${row.id}`);
    }
    const url = new URL(row.sourceUrl);
    if (url.protocol !== 'https:') throw Error(`HTTPS source required: ${row.id}`);
    if (!['pending', 'verified'].includes(row.verification)) throw Error(`Invalid verification: ${row.id}`);
    if (row.verification === 'verified' && (!row.evidence || !row.reviewedAt)) throw Error(`Verified import requires evidence and reviewedAt: ${row.id}`);
  }
  console.log(`Validated ${rows.length} proposals. Editorial source review and duplicate checks against the existing catalog are still required.`);
} catch (error) { console.error(error.message); process.exit(1); }
