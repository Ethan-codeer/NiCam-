import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import ComparePage from './ComparePage';
import { cameras, type Camera } from './data';

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
    expect(render([first], true)).toContain('添加对比器材');
    expect(render([first], true)).toContain('<th>宽度</th>');
    expect(render([])).toContain('从两种视角，认识一台相机。');
  });
});
