import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import ComparePage from './ComparePage';
import { cameras, type Camera } from './data';
import { comparisonPath, normalizeCompareIds, toggleComparison } from './compareSelection';

const first: Camera = { ...cameras[0], megapixels: null, width: null };
const second: Camera = { ...first, id: 'comparison-fixture', name: 'Comparison fixture', megapixels: 24.5 };
const render = (compared: Camera[], diff = false) => renderToStaticMarkup(
  <ComparePage compared={compared} compareIds={compared.map(camera => camera.id)} diff={diff} setDiff={() => {}} setSelection={() => {}} />,
);

describe('comparison presentation', () => {
  it('preserves unknown specifications without inventing zero or invalid numbers', () => {
    const markup = render([first, second]);
    expect(markup).toContain('<td>—</td>');
    expect(markup).toContain('24.5 MP');
    expect(markup).not.toMatch(/NaN|undefined|null|0 MP/);
    expect(markup).toContain(first.sourceUrl);
    expect(markup).toContain(second.sourceUrl);
  });

  it('shows differences while hiding matching specification rows', () => {
    const markup = render([first, second], true);
    expect(markup).toContain('<th>有效像素</th>');
    expect(markup).not.toContain('<th>品牌</th>');
    expect(markup).not.toContain('<th>宽度</th>');
    expect(markup).toContain('<th>资料来源</th>');
  });

  it('keeps a single selection useful and presents a path from an empty comparison', () => {
    expect(render([first], true)).toContain('添加第 2 台对比器材');
    expect(render([first], true)).toContain('<th>宽度</th>');
    expect(render([])).toContain('选择器材，开始比较。');
  });
});


describe('three camera selection', () => {
  it('compares differences in the third camera even when the first two match', () => {
    const third = { ...first, id: 'third-fixture', name: 'Third fixture', megapixels: 42, width: 150, height: 100 };
    const markup = render([first, { ...first, id: 'second-fixture' }, third], true);
    expect(markup).toContain('<th>有效像素</th>');
    expect(markup).toContain('<th>宽度</th>');
    expect(markup).not.toContain('<th>品牌</th>');
    expect(markup).toContain('42 MP');
    expect(markup).toContain('viewBox="0 0 720 220"');
    expect(markup).toContain('translate(505 20)');
  });

  it('offers every catalog camera from the empty page and a replace picker for each filled slot', () => {
    const markup = render([]);
    for (const camera of cameras) expect(markup).toContain(`value="${camera.id}"`);
    expect(markup.match(/type="search"/g)).toHaveLength(3);
    const filled = render(cameras.slice(0, 3));
    for (const camera of cameras.slice(0, 3)) {
      expect(filled).toContain(`aria-label="替换 ${camera.name}"`);
      expect(filled).toContain(`aria-label="移除 ${camera.name}"`);
    }
    expect(filled).toContain('对比分享链接');
  });

  it('keeps URL order, removes invalid or repeated IDs and caps selection at three', () => {
    const ids = cameras.slice(0, 4).map(camera => camera.id);
    expect(normalizeCompareIds(['missing', ids[2], ids[0], ids[2], ids[1], ids[3]])).toEqual([ids[2], ids[0], ids[1]]);
    expect(comparisonPath([ids[2], ids[0]])).toBe(`/compare?ids=${ids[2]},${ids[0]}`);
    expect(toggleComparison(ids.slice(0, 3), ids[3])).toEqual(ids.slice(0, 3));
    expect(toggleComparison(ids.slice(0, 3), ids[1])).toEqual([ids[0], ids[2]]);
  });
});
