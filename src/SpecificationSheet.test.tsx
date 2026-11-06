import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import SpecificationSheet, { filterSpecifications } from './SpecificationSheet';
import type { Camera, SpecGroup } from './data';

const groups: SpecGroup[] = [
  { id: 'sensor', title: '传感器与影像', rows: [
    { label: '有效像素', value: '24.2 MP', sourceUrl: 'https://example.org/sensor' },
    { label: '感光度', value: 'ISO 100–51200', sourceUrl: 'https://example.org/iso', condition: '静态照片；标准范围' },
  ] },
  { id: 'video', title: '视频拍摄', rows: [
    { label: '最高分辨率', value: '3840 × 2160 / 60p', sourceUrl: 'https://example.org/video', condition: 'APS-C 裁切；需兼容存储卡' },
  ] },
];
const camera: Camera = {
  id: 'spec-fixture', name: '参数测试相机', brand: 'test', year: 2024,
  format: '全画幅', type: '无反相机', megapixels: 24.2, width: null, height: null, depth: null,
  description: '用于显示测试的数码相机', sourceUrl: 'https://example.org/camera', verification: 'verified', digital: true, specGroups: groups,
};

describe('specification search', () => {
  it('matches group titles, values and operating conditions with all query terms', () => {
    expect(filterSpecifications(groups, '视频 APS-C')[0].rows[0].label).toBe('最高分辨率');
    expect(filterSpecifications(groups, ' iso   标准范围 ')[0].rows[0].label).toBe('感光度');
    expect(filterSpecifications(groups, '视频 24.2')).toEqual([]);
    expect(filterSpecifications(groups, '不存在')).toEqual([]);
  });

  it('preserves the complete input for an empty search and never mutates records', () => {
    const snapshot = JSON.stringify(groups);
    expect(filterSpecifications(groups, '  ')).toBe(groups);
    const result = filterSpecifications(groups, '24.2');
    expect(result).toHaveLength(1);
    expect(result[0].rows).toHaveLength(1);
    expect(JSON.stringify(groups)).toBe(snapshot);
  });
});

describe('detailed specification presentation', () => {
  it('expands every group and retains row sources and performance conditions', () => {
    const html = renderToStaticMarkup(<SpecificationSheet camera={camera} />);
    expect(html).toContain('2 个分组 · 3 项参数');
    for (const group of groups) {
      expect(html).toContain(`href="#spec-${camera.id}-${group.id}"`);
      expect(html).toContain(`id="spec-${camera.id}-${group.id}"`);
      for (const row of group.rows) {
        expect(html).toContain(row.label);
        expect(html).toContain(row.value);
        expect(html).toContain(`href="${row.sourceUrl}"`);
        if (row.condition) expect(html).toContain(row.condition);
      }
    }
    expect(html).not.toMatch(/<details|保修|附件|胶片/);
    expect(html).toContain('数码相机');
  });

  it('makes missing detailed data explicit and preserves unknown basic measurements', () => {
    const html = renderToStaticMarkup(<SpecificationSheet camera={{ ...camera, specGroups: [], verification: 'pending' }} />);
    expect(html).toContain('详细分组资料尚未收录');
    expect(html).toContain('暂无可靠资料');
    expect(html).toContain('资料待进一步核验');
    expect(html).not.toMatch(/NaN|undefined|0 mm|已查阅官方资料/);
  });
});
