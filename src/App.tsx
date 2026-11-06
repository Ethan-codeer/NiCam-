import { useEffect, useState } from "react";
import {
  Aperture,
  ArrowUpRight,
  ArrowRight,
  Search,
  Home,
  Camera as CameraIcon,
  Columns2,
  Landmark,
  FlaskConical,
  BookOpen,
  Bookmark,
  X,
  Menu,
  SlidersHorizontal,
  Grid2X2,
  List,
} from "lucide-react";
import { cameras, brands, articles, type Camera } from "./data";
import Labs from "./Labs";
import { CameraArt } from "./CameraArt";
import EquipmentCard from "./EquipmentCard";
import MuseumPages from "./MuseumPages";
import CatalogPage from "./CatalogPage";
import ComparePage from "./ComparePage";
import SearchDialog from "./SearchDialog";
import SpecificationSheet from "./SpecificationSheet";
const paths = [
  ["首页", "/", Home],
  ["器材百科", "/catalog", CameraIcon],
  ["器材对比", "/compare", Columns2],
  ["品牌博物馆", "/museum", Landmark],
  ["光学实验室", "/labs", FlaskConical],
  ["摄影知识", "/knowledge", BookOpen],
] as const;
const go = (path: string) => {
  window.location.hash = path;
  window.scrollTo(0, 0);
};
const val = (v: number | null, unit = "") => (v === null ? "—" : `${v}${unit}`);
export default function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || "/");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const parsed: unknown = JSON.parse(
        localStorage.getItem("nicam-saved") || "[]",
      );
      return Array.isArray(parsed)
        ? parsed.filter(
            (id): id is string =>
              typeof id === "string" && cameras.some((c) => c.id === id),
          )
        : [];
    } catch {
      return [];
    }
  });
  const [selection, setSelection] = useState<string[]>([]);
  const [diff, setDiff] = useState(false);
  const [knowledgeCategory, setKnowledgeCategory] = useState("全部");
  useEffect(() => {
    const f = () => {
      setRoute(location.hash.slice(1) || "/");
      setSearchOpen(false);
      setMore(false);
    };
    window.addEventListener("hashchange", f);
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("hashchange", f);
      window.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("nicam-saved", JSON.stringify(saved));
    } catch {
      /* Browsers may disable local persistence. */
    }
  }, [saved]);
  useEffect(() => {
    if (!searchOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(
      () =>
        document
          .querySelector<HTMLInputElement>(".search-modal input")
          ?.focus(),
      0,
    );
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".search-modal input, .search-modal button, .search-modal a",
        ),
      );
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", trap);
      previous?.focus();
    };
  }, [searchOpen]);
  const toggleSaved = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleCompare = (id: string) =>
    setSelection((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : s.length < 2
          ? [...s, id]
          : [s[1], id],
    );
  const path = route.split("?")[0];
  const navPath = path.startsWith("/camera/")
    ? "/catalog"
    : path.startsWith("/brand/")
      ? "/museum"
      : path.startsWith("/article/")
        ? "/knowledge"
        : path;
  const current = paths.find(([, p]) =>
    p === "/" ? navPath === "/" : navPath.startsWith(p),
  );
  const selected = cameras.filter((c) => selection.includes(c.id));
  const compareIds =
    new URLSearchParams(route.split("?")[1] || "").get("ids")?.split(",") ||
    selection;
  const compared = cameras.filter((c) => compareIds.includes(c.id)).slice(0, 2);
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
  let content;
  if (path === "/")
    content = (
      <>
        <div className="eyebrow top-line">
          <i /> THE PHOTOGRAPHY ATLAS / 摄影探索图鉴
        </div>
        <section className="hero">
          <div className="hero-copy">
            <h1>
              每一次快门，
              <br />
              都是<span>新的发现。</span>
            </h1>
            <p>
              从一台经典相机，到光的运行原理。
              <br />
              在这里，重新认识摄影的每一种可能。
            </p>
            <div className="actions">
              <a className="button dark" href="#/catalog">
                探索器材百科 <ArrowUpRight size={15} />
              </a>
              <a className="text-button" href="#/museum">
                走进品牌博物馆 <ArrowRight size={15} />
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>
                  {cameras.length}
                  <sup>款</sup>
                </strong>
                <span>精选经典器材</span>
              </div>
              <div>
                <strong>
                  {brands.length}<sup>大</sup>
                </strong>
                <span>影像品牌档案</span>
              </div>
              <div>
                <strong>
                  3<sup>个</sup>
                </strong>
                <span>交互光学实验室</span>
              </div>
            </div>
          </div>
          <div className="hero-object">
            <div className="object-top">
              <span>OBJECT NO. 001</span>
              <Aperture size={21} />
            </div>
            <CameraArt
              camera={cameras.find((c) => c.brand === "nikon") || cameras[0]}
              large
            />
            <div className="object-caption">
              <span className="caption-rule" />
              <div>
                <b>
                  {
                    (cameras.find((c) => c.brand === "nikon") || cameras[0])
                      ?.name
                  }
                </b>
                <small>凝固时间的精密艺术 / CAMERA PHOTOGRAPH</small>
              </div>
              <span>01 — {String(cameras.length).padStart(2, "0")}</span>
            </div>
          </div>
        </section>
        <section>
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / DISCOVER</span>
              <h2>探索，从这里开始</h2>
            </div>
            <a href="#/catalog">
              查看全部 <ArrowRight size={14} />
            </a>
          </div>
          <div className="discover-grid">
            {[
              {
                title: "器材百科",
                en: "THE COLLECTION",
                text: "探索数码相机的完整参数，发现每一台相机背后的独特性格。",
                icon: CameraIcon,
                path: "/catalog",
              },
              {
                title: "品牌博物馆",
                en: "THE HERITAGE",
                text: "走进六大影像品牌，沿着时间的轨迹，重访那些决定性瞬间。",
                icon: Landmark,
                path: "/museum",
              },
              {
                title: "光学实验室",
                en: "THE LABORATORY",
                text: "亲手调节参数，让景深、快门运动与视角，从抽象概念变得直观。",
                icon: Aperture,
                path: "/labs",
              },
            ].map((x, i) => (
              <a href={"#" + x.path} className="discover-card" key={x.title}>
                <span className="eyebrow">
                  0{i + 1} / {x.en}
                </span>
                <x.icon size={33} strokeWidth={1} />
                <h3>
                  {x.title}
                  <ArrowUpRight size={20} />
                </h3>
                <p>{x.text}</p>
              </a>
            ))}
          </div>
        </section>
        <section>
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / SELECTED OBJECTS</span>
              <h2>值得认识的经典</h2>
            </div>
            <a href="#/catalog">
              浏览全部器材 <ArrowRight size={14} />
            </a>
          </div>
          <div className="product-grid home-grid">
            {cameras.slice(0, 4).map((c) => (
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
        <section className="lab-banner">
          <div>
            <span className="eyebrow">EXPERIMENT. OBSERVE. UNDERSTAND.</span>
            <h2>让原理，看得见。</h2>
            <p>用一次小小的实验，解开光影中的大问题。</p>
            <a className="button light" href="#/labs">
              进入光学实验室 <ArrowUpRight size={15} />
            </a>
          </div>
          <svg viewBox="0 0 400 200" aria-label="光线经过凸透镜的示意图">
            <path
              d="M190 25Q235 100 190 175Q145 100 190 25Z"
              fill="#637261"
              opacity=".6"
            />
            <path
              d="M0 40L190 65L370 150M0 100H400M0 160L190 135L370 50"
              stroke="#c5b18f"
              fill="none"
            />
            <path d="M190 10V190" stroke="#b3bdb0" strokeDasharray="4 5" />
          </svg>
        </section>
      </>
    );
  else if (path === "/catalog")
    content = (
      <CatalogPage
        saved={saved}
        selection={selection}
        toggleSaved={toggleSaved}
        toggleCompare={toggleCompare}
      />
    );
  else if (path.startsWith("/camera/")) {
    const c = cameras.find((c) => c.id === path.split("/")[2]);
    content = c ? (
      <>
        <a className="back" href="#/catalog">
          ← 返回器材百科
        </a>
        <div className="detail-hero">
          <div className="detail-art">
            <CameraArt camera={c} large />
          </div>
          <div>
            {intro(
              `${c.brand.toUpperCase()} / ${c.year ?? "年份待核验"}`,
              c.name,
              c.description,
            )}
            <div className="detail-metrics">
              <div>
                <span>画幅</span>
                <b>{c.format}</b>
              </div>
              <div>
                <span>有效像素</span>
                <b>{val(c.megapixels, " MP")}</b>
              </div>
              <div>
                <span>类型</span>
                <b>{c.type}</b>
              </div>
              <div>
                <span>发布年份</span>
                <b>{c.year ?? "—"}</b>
              </div>
            </div>
            <div className="actions">
              <button
                className="button dark"
                onClick={() => toggleCompare(c.id)}
              >
                {selection.includes(c.id) ? "✓ 已加入对比" : "+ 加入对比"}
              </button>
              <button className="button" onClick={() => toggleSaved(c.id)}>
                <Bookmark size={16} />
                {saved.includes(c.id) ? "已收藏" : "收藏器材"}
              </button>
            </div>
          </div>
        </div>
        <nav className="chapter-nav">
          <a
            href="#/camera"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("specs")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            详细规格
          </a>
          <a
            href="#/camera"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("story")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            设计故事
          </a>
          <a href="#/catalog">探索相关器材</a>
        </nav>
        <SpecificationSheet key={c.id} camera={c} />
        <section id="story">
          <span className="eyebrow">DESIGN & PERSPECTIVE</span>
          <h2>一种观看世界的方式</h2>
          <p className="reading">
            {c.description}{" "}
            每一代器材的设计，都回应着摄影者所处的时代。理解它的画幅与机身形态，是理解这种观看方式的起点。具体历史与参数请参阅品牌原始资料。
          </p>
        </section>
        <section>
          <h2>继续探索</h2>
          <div className="product-grid">
            {cameras
              .filter((x) => x.id !== c.id)
              .slice(0, 3)
              .map((x) => (
                <EquipmentCard
                  saved={saved}
                  selection={selection}
                  toggleSaved={toggleSaved}
                  toggleCompare={toggleCompare}
                  key={x.id}
                  c={x}
                />
              ))}
          </div>
        </section>
      </>
    ) : (
      <div className="empty">
        未找到这台器材。<a href="#/catalog">返回百科</a>
      </div>
    );
  } else if (path === "/compare") {
    content = (
      <ComparePage
        compared={compared}
        compareIds={compareIds}
        diff={diff}
        setDiff={setDiff}
        setSelection={setSelection}
      />
    );
  } else if (path === "/museum" || path.startsWith("/brand/")) {
    content = (
      <MuseumPages
        path={path}
        saved={saved}
        selection={selection}
        toggleSaved={toggleSaved}
        toggleCompare={toggleCompare}
      />
    );
  } else if (path.startsWith("/labs"))
    content = (
      <Labs
        initialLab={
          (["dof", "motion", "fov"].includes(path.split("/")[2])
            ? path.split("/")[2]
            : "dof") as "dof" | "motion" | "fov"
        }
      />
    );
  else if (path === "/knowledge") {
    const cats = ["全部", "摄影基础", "光学原理", "器材指南", "影像故事"];
    const categorise = (i: number) => cats[1 + (i % 4)];
    const shown = articles.filter(
      (_, i) =>
        knowledgeCategory === "全部" || categorise(i) === knowledgeCategory,
    );
    content = (
      <>
        {intro(
          "THE READING ROOM / 摄影知识",
          "理解光，才能创造影像。",
          "从第一张照片出发，在原理、器材与影像故事之间，慢慢建立自己的摄影语言。",
        )}
        <div className="tabs">
          {cats.map((x) => (
            <button
              className={knowledgeCategory === x ? "active" : ""}
              onClick={() => setKnowledgeCategory(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="article-grid">
          {shown.map((a) => (
            <a className="article-card" key={a.id} href={"#/article/" + a.id}>
              <div className="article-art">
                <Aperture size={76} strokeWidth={0.7} />
                <span>{a.english}</span>
              </div>
              <div className="eyebrow">
                {categorise(articles.indexOf(a))} / 约{" "}
                {Math.max(3, a.body.length * 2)} 分钟
              </div>
              <h2>{a.title}</h2>
              <p>{a.summary}</p>
              <span className="brand-link">
                开始阅读 <ArrowRight size={15} />
              </span>
            </a>
          ))}
        </div>
      </>
    );
  } else if (path.startsWith("/article/")) {
    const a = articles.find((a) => a.id === path.split("/")[2]);
    content = a ? (
      <>
        <a className="back" href="#/knowledge">
          ← 返回摄影知识
        </a>
        <article className="reading article-reading">
          {intro(a.english, a.title, a.summary)}
          {a.body.map((p, i) => (
            <div key={i}>
              <h2>
                {
                  ["从直觉开始", "看见原理", "在拍摄中实践", "进一步思考"][
                    i % 4
                  ]
                }
              </h2>
              <p>{p}</p>
            </div>
          ))}
          {source(a.sourceUrl)}
          {a.lab && (
            <a className="button dark" href={"#/labs/" + a.lab}>
              在实验室中试一试 <ArrowUpRight size={15} />
            </a>
          )}
        </article>
        <section>
          <h2>相关器材</h2>
          <div className="product-grid">
            {cameras
              .filter((c) => a.relatedCameraIds.includes(c.id))
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
      <div className="empty">文章未找到</div>
    );
  } else if (path === "/saved")
    content = (
      <>
        {intro(
          "YOUR COLLECTION / 我的收藏",
          "留下，让你心动的器材。",
          "你的收藏保存在当前浏览器中。",
        )}
        <div className="product-grid">
          {cameras
            .filter((c) => saved.includes(c.id))
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
        {!saved.length && (
          <div className="empty">
            <Bookmark />
            <h2>第一件收藏，等待被发现。</h2>
            <a className="button" href="#/catalog">
              探索器材百科
            </a>
          </div>
        )}
      </>
    );
  else
    content = (
      <>
        {intro(
          "ABOUT NICAM!",
          "保持好奇，持续探索。",
          "NiCam! 是一个面向摄影爱好者的中文器材图鉴、品牌档案与交互光学实验室。",
        )}
        <div className="reading">
          <h2>关于内容</h2>
          <p>
            本站以精选相机为起点，提供可比较的参数和可亲手探索的光学原理。器材与品牌条目附有公开资料来源，未知数据明确标记。器材照片附有作者、授权协议与原始来源链接。
          </p>
          <h2>反馈建议</h2>
          <p>
            发现资料疑问时，请先查阅条目中的原始资料链接。本站为独立摄影学习项目，与所列品牌不存在隶属关系。
          </p>
          <a className="button" href="#/catalog">
            继续探索 <ArrowRight size={15} />
          </a>
        </div>
      </>
    );
  return (
    <>
      <aside className="sidebar">
        <a className="logo" href="#/">
          <Aperture size={27} strokeWidth={1.4} />
          <span>NiCam!</span>
        </a>
        <span className="tagline">EXPLORE BEYOND THE LENS</span>
        <div className="nav-label">探索 / EXPLORE</div>
        <nav>
          {paths.map(([label, p, Icon], i) => (
            <div key={p}>
              {i === 3 && <div className="nav-label">光影档案 / ARCHIVES</div>}
              <a
                href={"#" + p}
                title={label}
                className={current?.[1] === p ? "active" : ""}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{label}</span>
                {current?.[1] === p && <small>↗</small>}
              </a>
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span>
            <i /> 持续探索，持续更新
          </span>
          <small>{brands.length} 个品牌 · 3 座实验室</small>
        </div>
      </aside>
      <div className="shell">
        <header>
          <div className="breadcrumb">
            <span>NiCam!</span>
            <span>/</span>
            {current?.[0] || "影像档案"}
          </div>
          <div className="header-actions">
            <button
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={16} />
              <span>搜索相机、品牌或知识…</span>
              <kbd>⌘ K</kbd>
            </button>
            <a className="icon-button" href="#/saved" aria-label="我的收藏">
              <Bookmark size={18} />
              {saved.length > 0 && <small>{saved.length}</small>}
            </a>
            <span className="avatar">N</span>
          </div>
        </header>
        <main>{content}</main>
        <footer>
          <a className="footer-logo" href="#/">
            NiCam!
          </a>
          <div>
            <a href="#/about">关于 NiCam!</a>
            <a href="#/about">内容说明</a>
            <a href="#/about">反馈建议</a>
          </div>
          <small>
            © {new Date().getFullYear()} NiCam!{" "}
            <span>Explore Beyond the Lens.</span>
          </small>
        </footer>
      </div>
      <nav className="mobile-nav">
        {paths.slice(0, 4).map(([label, p, Icon]) => (
          <a
            key={p}
            className={current?.[1] === p ? "active" : ""}
            href={"#" + p}
          >
            <Icon size={19} />
            <span>
              {label === "器材百科"
                ? "器材"
                : label === "器材对比"
                  ? "对比"
                  : label === "品牌博物馆"
                    ? "博物馆"
                    : label}
            </span>
          </a>
        ))}
        <button onClick={() => setMore(!more)}>
          <Menu size={19} />
          <span>更多</span>
        </button>
      </nav>
      {more && (
        <div className="mobile-drawer">
          {paths.slice(4).map(([l, p, I]) => (
            <a href={"#" + p} key={p}>
              <I size={20} />
              {l}
              <ArrowRight size={17} />
            </a>
          ))}
        </div>
      )}
      {selected.length > 0 && path != "/compare" && (
        <div className="compare-tray">
          <span>
            已选择 <b>{selected.length} / 2</b>
          </span>
          <div>
            {selected.map((c) => (
              <button key={c.id} onClick={() => toggleCompare(c.id)}>
                {c.name}
                <X size={12} />
              </button>
            ))}
          </div>
          <button className="text-button" onClick={() => setSelection([])}>
            清空
          </button>
          <button
            className="button dark"
            onClick={() => go("/compare?ids=" + selection.join(","))}
          >
            开始对比 <ArrowRight size={15} />
          </button>
        </div>
      )}
      {searchOpen && (
        <SearchDialog
          query={query}
          setQuery={setQuery}
          setSearchOpen={setSearchOpen}
        />
      )}
    </>
  );
}
