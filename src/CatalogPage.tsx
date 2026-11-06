import { useState } from "react";
import {
  Camera as CameraIcon,
  Grid2X2,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { cameras, brands } from "./data";
import EquipmentCard from "./EquipmentCard";
const intro = (en: string, title: string, description: string) => (
  <div className="page-intro">
    <span className="eyebrow">{en}</span>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);
export default function CatalogPage({
  saved,
  selection,
  toggleSaved,
  toggleCompare,
}: {
  saved: string[];
  selection: string[];
  toggleSaved: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  const [brand, setBrand] = useState("");
  const [format, setFormat] = useState("");
  const [kind, setKind] = useState("");
  const [year, setYear] = useState("");
  const [mp, setMp] = useState("");
  const [sort, setSort] = useState("new");
  const [catalogQ, setCatalogQ] = useState("");
  const [list, setList] = useState(false);
  const filterKey = JSON.stringify([brand, format, kind, year, mp, sort, catalogQ]);
  const [pagination, setPagination] = useState({ key: filterKey, count: 24 });
  const visibleCount = pagination.key === filterKey ? pagination.count : 24;
  if (pagination.key !== filterKey) {
    setPagination({ key: filterKey, count: 24 });
  }
  const reset = () => {
    setBrand("");
    setFormat("");
    setKind("");
    setYear("");
    setMp("");
    setCatalogQ("");
  };
  let filtered = cameras.filter(
    (c) =>
      (!brand || c.brand === brand) &&
      (!format || c.format === format) &&
      (!kind || c.type === kind) &&
      (!year || (c.year !== null && (year === "2000" ? c.year >= 2000 : c.year < 2000))) &&
      (!mp || (c.megapixels !== null && c.megapixels >= Number(mp))) &&
      `${c.name} ${c.brand}`.toLowerCase().includes(catalogQ.toLowerCase()),
  );
  filtered = [...filtered].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "mp") return (b.megapixels ?? -1) - (a.megapixels ?? -1);
    if (a.year === null) return b.year === null ? 0 : 1;
    if (b.year === null) return -1;
    return sort === "old" ? a.year - b.year : b.year - a.year;
  });
  return (
    <>
      {intro(
        "THE COLLECTION / 器材百科",
        "每一台相机，都有自己的性格。",
        "了解经典器材的参数、设计与故事，找到属于你的观看方式。",
      )}
      <div className="catalog-top">
        <span>{filtered.length} 件精选器材</span>
        <div className="view-buttons">
          <button
            aria-label="网格视图"
            className={!list ? "active" : ""}
            onClick={() => setList(false)}
          >
            <Grid2X2 size={17} />
          </button>
          <button
            aria-label="列表视图"
            className={list ? "active" : ""}
            onClick={() => setList(true)}
          >
            <List size={17} />
          </button>
        </div>
      </div>
      <div className="filters">
        <SlidersHorizontal size={17} />
        <select
          aria-label="品牌"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">全部品牌</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <select
          aria-label="画幅"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="">全部画幅</option>
          {[...new Set(cameras.map((c) => c.format))].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          aria-label="器材类型"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
        >
          <option value="">全部类型</option>
          {[...new Set(cameras.map((c) => c.type))].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select
          aria-label="发布年代"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">全部年代</option>
          <option value="2000">2000 年及以后</option>
          <option value="before">2000 年以前</option>
        </select>
        <select
          aria-label="最低像素"
          value={mp}
          onChange={(e) => setMp(e.target.value)}
        >
          <option value="">全部像素</option>
          <option value="24">24 MP 以上</option>
          <option value="40">40 MP 以上</option>
        </select>
        <input
          placeholder="搜索型号…"
          aria-label="搜索器材型号"
          value={catalogQ}
          onChange={(e) => setCatalogQ(e.target.value)}
        />
        <select
          aria-label="排序方式"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="new">最新发布</option>
          <option value="old">经典优先</option>
          <option value="mp">像素从高到低</option>
          <option value="name">型号名称</option>
        </select>
      </div>
      {(brand || format || kind || year || mp || catalogQ) && (
        <div className="filter-tags">
          {[
            [brand, setBrand],
            [format, setFormat],
            [kind, setKind],
            [
              year === "2000" ? "2000年以后" : year ? "2000年以前" : "",
              setYear,
            ],
            [mp ? `${mp} MP 以上` : "", setMp],
            [catalogQ, setCatalogQ],
          ].map(
            ([v, set], i) =>
              v && (
                <button
                  key={i}
                  onClick={() => typeof set === "function" && set("")}
                >
                  {String(v)} <X size={12} />
                </button>
              ),
          )}
          <button onClick={reset}>重置筛选</button>
        </div>
      )}
      <div className={"product-grid " + (list ? "list-view" : "")}>
        {filtered.slice(0, visibleCount).map((c) => (
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
      {filtered.length > 0 && (
        <div className="catalog-top">
          <span role="status" aria-live="polite">
            已显示 {Math.min(visibleCount, filtered.length)} / {filtered.length} 件器材
          </span>
          {visibleCount < filtered.length && (
            <button
              className="button"
              onClick={() => setPagination({ key: filterKey, count: visibleCount + 24 })}
            >
              加载更多器材（{Math.min(24, filtered.length - visibleCount)} 件）
            </button>
          )}
        </div>
      )}
      {!filtered.length && (
        <div className="empty">
          <CameraIcon />
          <h2>还没有符合条件的器材</h2>
          <p>试着放宽筛选，发现另一种可能。</p>
          <button className="button" onClick={reset}>
            重置筛选
          </button>
        </div>
      )}
    </>
  );
}
