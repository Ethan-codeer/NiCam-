import {
  Search,
  X,
  Camera as CameraIcon,
  Landmark,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { cameras, brands, articles } from "./data";
export default function SearchDialog({
  query,
  setQuery,
  setSearchOpen,
}: {
  query: string;
  setQuery: (v: string) => void;
  setSearchOpen: (v: boolean) => void;
}) {
  return (
    <div className="modal-backdrop" onClick={() => setSearchOpen(false)}>
      <div
        className="search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="全站搜索"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-input">
          <Search size={21} />
          <input
            autoFocus
            aria-label="搜索全站"
            placeholder="输入相机、品牌或摄影知识…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button aria-label="关闭搜索" onClick={() => setSearchOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="search-results">
          <span className="eyebrow">
            {query ? "搜索结果" : "从这里开始探索"}
          </span>
          {cameras
            .filter((c) =>
              `${c.name} ${c.brand} ${c.format}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .slice(0, 5)
            .map((c) => (
              <a
                key={c.id}
                href={"#/camera/" + c.id}
                onClick={() => setSearchOpen(false)}
              >
                <CameraIcon size={18} />
                <span>
                  {c.name}
                  <small>
                    {c.brand} / {c.year}
                  </small>
                </span>
                <ArrowUpRight size={15} />
              </a>
            ))}
          {brands
            .filter((b) =>
              `${b.name} ${b.description}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .slice(0, 3)
            .map((b) => (
              <a
                key={b.id}
                href={"#/brand/" + b.id}
                onClick={() => setSearchOpen(false)}
              >
                <Landmark size={18} />
                <span>
                  {b.name}
                  <small>品牌档案</small>
                </span>
                <ArrowUpRight size={15} />
              </a>
            ))}
          {articles
            .filter((a) =>
              `${a.title} ${a.english} ${a.summary}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .slice(0, 3)
            .map((a) => (
              <a
                key={a.id}
                href={"#/article/" + a.id}
                onClick={() => setSearchOpen(false)}
              >
                <BookOpen size={18} />
                <span>
                  {a.title}
                  <small>摄影知识</small>
                </span>
                <ArrowUpRight size={15} />
              </a>
            ))}
          {query &&
            !cameras.some((c) =>
              `${c.name} ${c.brand} ${c.format}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            ) &&
            !brands.some((b) =>
              `${b.name} ${b.description}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            ) &&
            !articles.some((a) =>
              `${a.title} ${a.english} ${a.summary}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            ) && <p>没有找到相关结果，试试「Nikon」「全画幅」或「景深」。</p>}
        </div>
      </div>
    </div>
  );
}
