import { describe, expect, it } from 'vitest';
import { articles, brands, cameras } from './data';
import photos from './photos.json';
import { existsSync, readFileSync } from 'node:fs';

const officialHosts: Record<string, string[]> = {
  nikon: ['nikon.com', 'nikonusa.com', 'nikonimaging.com', 'nikonimglib.com'],
  canon: ['canon.com', 'canon-europe.com', 'global.canon', 'cam.start.canon'],
  sony: ['sony.com', 'sony.co.uk','sony.ie','sony.com.sg', 'sony.net', 'sony.co.jp'],
  fujifilm: ['fujifilm.com', 'fujifilm-x.com','fujifilm-dsc.com','fujifilm.com.mx'],
  leica: ['leica-camera.com'],
  hasselblad: ['hasselblad.com'],
  panasonic: ['panasonic.com','panasonic.net'],
  olympus: ['olympus-imaging.com','olympus.eu','olympus.com','om-digitalsolutions.com','omsystem.com'],
  pentax: ['ricoh-imaging.co.jp','ricoh-imaging.eu','ricoh-imaging.com'],
  ricoh: ['ricoh-imaging.co.jp','ricoh-imaging.eu','ricoh-imaging.com'],
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

  it('requires official sources for verified records and explicit status on secondary records', () => {
    for (const camera of cameras) {
      const source = new URL(camera.sourceUrl);
      expect(source.protocol, camera.id).toBe('https:');
      if(camera.verification === 'verified') expect(isOfficialHost(source.hostname, officialHosts[camera.brand] ?? []), camera.id).toBe(true);
      else expect(source.hostname.length, camera.id).toBeGreaterThan(0);
      expect(['verified', 'pending']).toContain(camera.verification);
    }
    for (const brand of brands) {
      const source = new URL(brand.sourceUrl);
      expect(source.protocol).toBe('https:');
      expect(isOfficialHost(source.hostname, officialHosts[brand.id] ?? []) || source.hostname === 'github.com', brand.id).toBe(true);
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


describe('digital catalog with detailed sourced specifications', () => {
  it('has at least100 distinct cameras, each with an attributed bundled real photo', () => {
    expect(cameras.length).toBeGreaterThanOrEqual(100);
    for (const camera of cameras) {
      expect(camera.digital, camera.id).toBe(true);
      expect(camera.type, camera.id).not.toMatch(/胶片|film/i);
      expect(camera.specGroups?.length, camera.id).toBeGreaterThanOrEqual(7);
      const rows = camera.specGroups!.flatMap(group => group.rows);
      expect(rows.length, camera.id).toBeGreaterThanOrEqual(30);
      for (const group of camera.specGroups!) {
        expect(group.title).not.toMatch(/保修|附件|warranty|accessories/i);
        for (const row of group.rows) {
          expect(row.label.trim().length, camera.id).toBeGreaterThan(0);
          expect(row.value.trim(), `${camera.id}: ${row.label}`).not.toMatch(/^(未知|待核验|N\/A|暂无可靠资料)$/i);
          expect(new URL(row.sourceUrl).protocol).toBe('https:');
          expect(isOfficialHost(new URL(row.sourceUrl).hostname, officialHosts[camera.brand] ?? []), `${camera.id}: ${row.label}`).toBe(true);
        }
      }
    }
    expect(Object.keys(photos).sort()).toEqual(cameras.map(camera => camera.id).sort());
    for (const camera of cameras) {
      const photo = (photos as Record<string, {src:string;author:string;license:string;licenseUrl:string;sourceUrl:string;width:number;height:number}>)[camera.id];
      expect(photo, camera.id).toBeTruthy();
      expect(photo.src).toMatch(/^\/cameras\/.+\.webp$/);
      const file = new URL('../public' + photo.src, import.meta.url);
      expect(existsSync(file), camera.id).toBe(true);
      expect(readFileSync(file).subarray(0,4).toString()).toBe('RIFF');
      expect(photo.author.trim().length).toBeGreaterThan(0);
      expect(photo.license).toMatch(/CC BY|CC0|Public domain|FAL|Free Art/);
      expect(photo.licenseUrl).toMatch(/^https?:\/\//);
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(Math.max(photo.width,photo.height),camera.id).toBeGreaterThanOrEqual(600);
    }
  });
});
