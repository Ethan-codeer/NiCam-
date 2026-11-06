import { useState } from 'react';
import { Columns2, ArrowUpRight } from 'lucide-react';
import { cameras, brands, type Camera } from './data';
import { CameraArt } from './CameraArt';
import { comparisonPath, MAX_COMPARISON } from './compareSelection';
import './ComparePage.css';
const val = (value: number | null, unit = '') => value === null ? '—' : `${value}${unit}`;

function CameraPicker({ index, current, selectedIds, onSelect }: { index: number; current?: Camera; selectedIds: string[]; onSelect: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const matches = cameras.filter(camera => (!selectedIds.includes(camera.id) || camera.id === current?.id) && `${camera.name} ${camera.brand} ${brands.find(brand => brand.id === camera.brand)?.name ?? ''} ${camera.year ?? ''}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="compare-picker">
    <label htmlFor={`compare-search-${index}`}>{current ? '替换相机' : `选择第 ${index + 1} 台相机`}</label>
    <input id={`compare-search-${index}`} type="search" placeholder="搜索所有相机 / 品牌" value={query} onChange={event => setQuery(event.target.value)} />
    <select aria-label={current ? `替换 ${current.name}` : `添加第 ${index + 1} 台对比器材`} value={current?.id ?? ''} onChange={event => { if (event.target.value) { onSelect(event.target.value); setQuery(''); } }}>
      <option value="">{matches.length ? `从 ${matches.length} 台相机中选择` : '没有匹配相机'}</option>
      {matches.map(camera => <option key={camera.id} value={camera.id}>{camera.name}</option>)}
    </select>
  </div>;
}

export default function ComparePage({ compared, compareIds, diff, setDiff, setSelection }: { compared: Camera[]; compareIds: string[]; diff: boolean; setDiff: (value: boolean) => void; setSelection: (value: string[]) => void }) {
  const [copyStatus, setCopyStatus] = useState('');
  const update = (ids: string[]) => { setSelection(ids); window.location.hash = comparisonPath(ids); };
  const rows: [string, (camera: Camera) => string][] = [
    ['品牌', c => c.brand], ['发布年份', c => val(c.year)], ['器材类型', c => c.type], ['画幅', c => c.format], ['有效像素', c => val(c.megapixels, ' MP')], ['宽度', c => val(c.width, ' mm')], ['高度', c => val(c.height, ' mm')], ['厚度', c => val(c.depth, ' mm')],
  ];
  const differs = (read: (camera: Camera) => string) => new Set(compared.map(read)).size > 1;
  const slots = Array.from({ length: MAX_COMPARISON }, (_, index) => compared[index]);
  const maxWidth = Math.max(160, ...compared.map(camera => camera.width ?? 0));
  const maxHeight = Math.max(130, ...compared.map(camera => camera.height ?? 0));
  const scale = Math.min(180 / maxWidth, 130 / maxHeight);
  const shareUrl = typeof window === 'undefined' ? `#${comparisonPath(compareIds)}` : `${window.location.href.split('#')[0]}#${comparisonPath(compareIds)}`;
  return <>
    <div className="page-intro"><span className="eyebrow">SIDE BY SIDE / 器材对比</span><h1>不同器材，同一把标尺。</h1><p>从全部器材中选择最多三台相机，比较画幅、参数与机身尺寸。</p></div>
    <div className="compare-control">
      <label><input type="checkbox" checked={diff} onChange={event => setDiff(event.target.checked)} /> 仅看差异</label>
      <span>{compared.length} / 3 台</span>
      <button onClick={() => update([])}>清空对比</button>
      <button disabled={!compared.length} onClick={async () => { try { await navigator.clipboard.writeText(shareUrl); setCopyStatus('对比链接已复制'); } catch { setCopyStatus('请复制下方对比链接'); } }}>复制对比链接</button>
      <span role="status">{copyStatus}</span>
    </div>
    {compared.length > 0 && <label className="compare-share">分享链接<input aria-label="对比分享链接" readOnly value={shareUrl} onFocus={event => event.target.select()} /></label>}
    {!compared.length && <div className="empty compare-empty"><Columns2 size={38} /><h2>选择器材，开始比较。</h2><p>搜索全部器材，选择第一台相机开始；最多同时比较三台。</p></div>}
    <div className="compare-slots">{slots.map((camera, index) => <div className="compare-slot" key={index}>
      <span className="eyebrow">CAMERA 0{index + 1}</span>
      {camera && <><CameraArt camera={camera} /><a className="compare-slot-name" href={`#/camera/${camera.id}`}>{camera.name}</a><span className="verification-badge">{camera.verification === 'verified' ? '已核对官方资料' : '资料待核验'}</span></>}
      <CameraPicker index={index} current={camera} selectedIds={compareIds} onSelect={id => { const ids = compared.map(item => item.id); if (camera) ids[index] = id; else ids.push(id); update(ids); }} />
      {camera && <button className="compare-remove" aria-label={`移除 ${camera.name}`} onClick={() => update(compared.filter(item => item.id !== camera.id).map(item => item.id))}>移除 ×</button>}
    </div>)}</div>
    {!!compared.length && <>
      <p className="note">已核验器材采用官方规格；待核验条目请结合资料来源确认。尺寸是否包含突出部件因资料口径不同，请查阅原始规格。— 表示未知，不代表零。</p>
      <div className="size-diagram"><span className="eyebrow">BODY BOUNDS / 机身外接矩形尺寸示意 · 同一比例</span>
        <svg viewBox={`0 0 ${compared.length * 240} 220`} role="img" aria-label="相机机身宽高比例示意">{compared.map((camera, index) => <g key={camera.id} transform={`translate(${index * 240 + 25} 20)`}>
          {camera.width !== null && camera.height !== null ? <><rect y={135 - camera.height * scale} width={camera.width * scale} height={camera.height * scale} fill={['#c4cec0', '#d7c9b5', '#bbc9cf'][index]} stroke="#92704d" /><text y="177" fontSize="11" fill="#76776f">{camera.width} × {camera.height} mm</text></> : <text y="90" fontSize="12" fill="#76776f">尺寸未知</text>}
          <text y="157" fontSize="12" fill="#242724">{camera.name}</text>
        </g>)}</svg>
      </div>
      <div className="comparison-wrap"><table className="comparison"><thead><tr><th>器材档案</th>{compared.map(camera => <th key={camera.id}><a href={`#/camera/${camera.id}`}>{camera.name}</a></th>)}</tr></thead><tbody>
        {rows.filter(([, read]) => !diff || compared.length < 2 || differs(read)).map(([label, read]) => <tr key={label} className={differs(read) ? 'different' : ''}><th>{label}</th>{compared.map(camera => <td key={camera.id}>{read(camera)}</td>)}</tr>)}
        <tr><th>资料来源</th>{compared.map(camera => <td key={camera.id}><a className="source" href={camera.sourceUrl} target="_blank" rel="noreferrer">延伸阅读 / 参考来源 <ArrowUpRight size={13} /></a></td>)}</tr>
      </tbody></table></div>
    </>}
  </>;
}
