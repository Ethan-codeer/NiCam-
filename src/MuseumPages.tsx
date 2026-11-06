import { Aperture, ArrowUpRight } from "lucide-react";
import { cameras, brands } from "./data";
import EquipmentCard from "./EquipmentCard";
import BrandLogo from "./BrandLogo";
const intro = (en: string, title: string, description: string) => (
  <div className="page-intro">
    <span className="eyebrow">{en}</span>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);
const source = (url: string) => (
  <a className="source" href={url} target="_blank" rel="noreferrer">
    延伸阅读 / 参考来源 <ArrowUpRight size={13} />
  </a>
);
export default function MuseumPages({
  path,
  saved,
  selection,
  toggleSaved,
  toggleCompare,
}: {
  path: string;
  saved: string[];
  selection: string[];
  toggleSaved: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  if (path === "/museum")
    return (
      <>
        {intro(
          "THE HOUSES OF PHOTOGRAPHY",
          "多种视角，一段影像史。",
          `从精密机械到数字革新，走进塑造我们观看方式的 ${brands.length} 个影像品牌。`,
        )}
        <div className="brand-grid">
          {brands.map((b, i) => (
            <a className="brand-card" href={"#/brand/" + b.id} key={b.id}>
              <span className="eyebrow">
                HOUSE {String(i + 1).padStart(2, "0")}{b.timeline[0] ? ` / EST. ${b.timeline[0].year}` : " / BRAND ARCHIVE"}
              </span>
              <BrandLogo brand={b.id} name={b.name} />
              <p>{b.description}</p>
              <span className="brand-link">
                探索品牌档案 <ArrowUpRight size={17} />
              </span>
            </a>
          ))}
        </div>
      </>
    );
  else if (path.startsWith("/brand/")) {
    const b = brands.find((b) => b.id === path.split("/")[2]);
    return b ? (
      <>
        <a className="back" href="#/museum">
          ← 返回品牌博物馆
        </a>
        <div className="page-intro">
          <span className="eyebrow">THE BRAND ARCHIVE</span>
          <h1><BrandLogo brand={b.id} name={b.name} className="brand-archive-logo" /></h1>
          <p>{b.description}</p>
        </div>
        <p className="note">历史条目待逐项核验，品牌官网提供进一步阅读。</p>
        <div className="brand-story">
          <div>
            <span className="eyebrow">MILESTONES / 时间的足迹</span>
            <div className="timeline">
              {b.timeline.map((t, i) => (
                <div key={i}>
                  <strong>{t.year}</strong>
                  <p>{t.event}</p>
                </div>
              ))}
            </div>
            {source(b.sourceUrl)}
          </div>
          <div className="brand-quote">
            <Aperture size={42} strokeWidth={1} />
            <h2>
              影像，
              <br />
              是与世界的对话。
            </h2>
            <p>{b.description}</p>
            <span className="eyebrow">
              THE {b.name.toUpperCase()} PERSPECTIVE
            </span>
          </div>
        </div>
        <section>
          <h2>标志性器材</h2>
          <div className="product-grid">
            {cameras
              .filter((c) => c.brand === b.id)
              .map((c) => (
                <EquipmentCard
                  saved={saved}
                  selection={selection}
                  toggleSaved={toggleSaved}
                  toggleCompare={toggleCompare}
                  key={c.id}
                  c={c}
                />
              ))}
          </div>
        </section>
      </>
    ) : (
      <div className="empty">品牌档案未找到</div>
    );
  }
  return null;
}
