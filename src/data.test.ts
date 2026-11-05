import { describe, expect, it } from 'vitest';
import { articles, brands, cameras } from './data';

const officialHosts: Record<string, string[]> = {
  nikon: ['nikon.com', 'nikonusa.com'],
  canon: ['canon.com', 'canon-europe.com', 'global.canon'],
  sony: ['sony.com', 'sony.co.uk'],
  fujifilm: ['fujifilm.com', 'fujifilm-x.com'],
  leica: ['leica-camera.com'],
  hasselblad: ['hasselblad.com'],
};
const isOfficialHost = (hostname: string, hosts: string[]) =>
  hosts.some(host => hostname === host || hostname.endsWith(`.${host}`));

describe('editorial data integrity', () => {
  it('keeps stable IDs unique within each collection', () => {
    for (const records of [cameras, brands, articles]) {
      expect(new Set(records.map(record => record.id)).size).toBe(records.length);
      for (const record of records) expect(record.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('resolves camera brands and article relationships', () => {
    const brandIds = new Set(brands.map(brand => brand.id));
    const cameraIds = new Set(cameras.map(camera => camera.id));
    for (const camera of cameras) expect(brandIds.has(camera.brand), camera.id).toBe(true);
    for (const article of articles) {
      for (const id of article.relatedCameraIds) expect(cameraIds.has(id), `${article.id}: ${id}`).toBe(true);
      if (article.lab) expect(['dof', 'motion', 'fov']).toContain(article.lab);
    }
  });

  it('uses official HTTPS source domains and explicit camera verification status', () => {
    for (const camera of cameras) {
      const source = new URL(camera.sourceUrl);
      expect(source.protocol, camera.id).toBe('https:');
      expect(isOfficialHost(source.hostname, officialHosts[camera.brand] ?? []), camera.id).toBe(true);
      expect(['verified', 'pending']).toContain(camera.verification);
    }
    for (const brand of brands) {
      const source = new URL(brand.sourceUrl);
      expect(source.protocol).toBe('https:');
      expect(isOfficialHost(source.hostname, officialHosts[brand.id] ?? []), brand.id).toBe(true);
    }
    for (const article of articles) {
      const source = new URL(article.sourceUrl);
      expect(source.protocol).toBe('https:');
      expect(isOfficialHost(source.hostname, Object.values(officialHosts).flat()), article.id).toBe(true);
      expect(article.body.length, article.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('represents unknown measurements as null and known measurements as positive finite numbers', () => {
    for (const camera of cameras) {
      for (const key of ['megapixels', 'width', 'height', 'depth'] as const) {
        const value = camera[key];
        if (value !== null) {
          expect(Number.isFinite(value), `${camera.id}: ${key}`).toBe(true);
          expect(value, `${camera.id}: ${key}`).toBeGreaterThan(0);
        }
      }
    }
  });
});
