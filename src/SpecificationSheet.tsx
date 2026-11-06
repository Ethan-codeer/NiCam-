import { useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Camera, SpecGroup } from "./data";
import "./specifications.css";

type Group = SpecGroup;

export function filterSpecifications(groups: Group[], query: string): Group[] {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return groups;
  return groups.map(group => ({ ...group, rows: group.rows.filter(row => {
    const text = `${group.title} ${row.label} ${row.value} ${row.condition ?? ""}`.toLocaleLowerCase();
    return words.every(word => text.includes(word));
  }) })).filter(group => group.rows.length > 0);
}

function basicSpecifications(camera: Camera): Group[] {
  const value = (number: number | null, unit = "") => number === null ? "暂无可靠资料" : `${number}${unit}`;
  return [{ id: "overview", title: "基本资料", rows: [
    ["品牌", camera.brand], ["型号", camera.name], ["发布年份", value(camera.year)],
    ["器材类型", camera.type], ["传感器画幅", camera.format],
    ["有效像素", value(camera.megapixels, " MP")], ["机身宽度", value(camera.width, " mm")],
    ["机身高度", value(camera.height, " mm")], ["机身厚度", value(camera.depth, " mm")],
  ].map(([label, value]) => ({ label, value, sourceUrl: camera.sourceUrl })) }];
}

export default function SpecificationSheet({ camera }: { camera: Camera }) {
  const [query, setQuery] = useState("");
  const detailed = Boolean(camera.specGroups?.length);
  const groups = detailed ? camera.specGroups! : basicSpecifications(camera);
  const visible = filterSpecifications(groups, query);
  const total = groups.reduce((sum, group) => sum + group.rows.length, 0);
  const count = visible.reduce((sum, group) => sum + group.rows.length, 0);
  const anchor = (id: string) => `spec-${camera.id}-${id}`;
  return <section id="specs" className="specifications" aria-labelledby="specifications-title">
    <header className="specifications-heading">
      <div><span className="eyebrow">TECHNICAL SPECIFICATIONS</span><h2 id="specifications-title">详细规格</h2>
        <p>数码相机 · {groups.length} 个分组 · {total} 项参数 <span className="spec-status">{camera.verification === "verified" ? "已查阅官方资料" : "资料待进一步核验"}</span></p>
      </div>
      <a className="spec-original" href={camera.sourceUrl} target="_blank" rel="noreferrer">查看原始资料 <ArrowUpRight size={14} /></a>
    </header>
    {!detailed && <p className="spec-notice">该机型的详细分组资料尚未收录，以下为现有基本参数。缺少可靠依据的项目保留为暂无可靠资料。</p>}
    <div className="spec-search"><Search size={17} aria-hidden="true" /><input type="search" aria-label="搜索本机参数" placeholder="搜索参数，如：对焦、视频、ISO…" value={query} onChange={event => setQuery(event.target.value)} />{query && <button type="button" onClick={() => setQuery("")} aria-label="清除参数搜索"><X size={16} /></button>}</div>
    <p className="spec-search-status" role="status">{query ? `找到 ${count} 项参数，共 ${visible.length} 个分组` : "全部参数已展开，可按分组跳转或搜索关键词。"}</p>
    <div className="spec-layout">
      <nav className="spec-group-nav" aria-label="参数分组">{visible.map(group => <a key={group.id} href={`#${anchor(group.id)}`} onClick={event => { event.preventDefault(); document.getElementById(anchor(group.id))?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><span>{group.title}</span><small>{group.rows.length}</small></a>)}</nav>
      <div className="spec-groups">{visible.map((group, index) => {
        const sources = [...new Set(group.rows.map(row => row.sourceUrl).filter(Boolean))];
        return <section className="spec-group" id={anchor(group.id)} key={group.id} aria-labelledby={`${anchor(group.id)}-title`}>
          <header><h3 id={`${anchor(group.id)}-title`}><span>{String(index + 1).padStart(2, "0")}</span>{group.title}</h3><div className="spec-group-sources">{sources.map((url, sourceIndex) => <a key={url} href={url} target="_blank" rel="noreferrer">分组来源{sources.length > 1 ? ` ${sourceIndex + 1}` : ""}<ArrowUpRight size={12} /></a>)}</div></header>
          <dl>{group.rows.map((row, rowIndex) => <div className="spec-row" key={`${row.label}-${rowIndex}`}><dt>{row.label}</dt><dd><div className="spec-value">{row.value || "暂无可靠资料"}</div>{row.condition && <p className="spec-condition"><span>适用条件</span>{row.condition}</p>}<div className="spec-row-source">{row.sourceUrl && <a href={row.sourceUrl} target="_blank" rel="noreferrer" aria-label={`${row.label}的资料来源`}>来源<ArrowUpRight size={12} /></a>}</div></dd></div>)}</dl>
        </section>;
      })}{visible.length === 0 && <div className="spec-empty"><h3>没有找到匹配参数</h3><p>尝试更短的关键词，或清除搜索查看全部规格。</p><button className="button" onClick={() => setQuery("")}>查看全部参数</button></div>}</div>
    </div>
    <p className="spec-footnote">性能上限需结合对应拍摄模式、镜头及测试条件理解。规格以所链接资料为依据；未收录的项目不代表相机不支持该功能。</p>
  </section>;
}
