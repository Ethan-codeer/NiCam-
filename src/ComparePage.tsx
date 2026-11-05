import { Columns2, ArrowRight, ArrowUpRight } from "lucide-react";
import { cameras, type Camera } from "./data";
import { CameraArt } from "./CameraArt";
const go = (path: string) => {
  location.hash = path;
  window.scrollTo(0, 0);
};
const val = (v: number | null, unit = "") => (v === null ? "—" : `${v}${unit}`);
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
export default function ComparePage({
  compared,
  compareIds,
  diff,
  setDiff,
  setSelection,
}: {
  compared: Camera[];
  compareIds: string[];
  diff: boolean;
  setDiff: (value: boolean) => void;
  setSelection: (value: string[]) => void;
}) {
  const rows: [string, (c: Camera) => string][] = [
    ["品牌", (c) => c.brand],
    ["发布年份", (c) => String(c.year)],
    ["器材类型", (c) => c.type],
    ["画幅", (c) => c.format],
    ["有效像素", (c) => val(c.megapixels, " MP")],
    ["宽度", (c) => val(c.width, " mm")],
    ["高度", (c) => val(c.height, " mm")],
    ["厚度", (c) => val(c.depth, " mm")],
  ];
  return (
    <>
      {intro(
        "SIDE BY SIDE / 器材对比",
        "不同器材，同一把标尺。",
        "选择两台相机，从画幅到机身尺寸，清晰地理解每一个差异。",
      )}
      <div className="compare-control">
        <label>
          <input
            type="checkbox"
            checked={diff}
            onChange={(e) => setDiff(e.target.checked)}
          />{" "}
          仅看差异
        </label>
        <button
          onClick={() => {
            setSelection([]);
            go("/compare");
          }}
        >
          清空对比
        </button>
      </div>
      {compared.length ? (
        <div>
          <p className="note">
            尺寸为厂商公布机身尺寸；是否包含突出部件因品牌口径不同，请查阅原始规格。有效像素采用厂商标称值。—
            表示未知，不代表零。
          </p>
          <div className="size-diagram">
            <span className="eyebrow">
              BODY BOUNDS / 机身外接矩形尺寸示意 · 同一比例
            </span>
            <svg
              viewBox="0 0 500 210"
              role="img"
              aria-label="相机机身宽高比例示意"
            >
              {compared.map((c, i) =>
                c.width !== null && c.height !== null ? (
                  <g key={c.id} transform={`translate(${40 + i * 240} 25)`}>
                    <rect
                      y={130 - c.height * 0.8}
                      width={c.width * 0.8}
                      height={c.height * 0.8}
                      fill={i ? "#d7c9b5" : "#c4cec0"}
                      stroke="#92704d"
                    />
                    <text y="155" fontSize="12" fill="#242724">
                      {c.name}
                    </text>
                    <text y="175" fontSize="10" fill="#76776f">
                      {c.width} × {c.height} mm
                    </text>
                  </g>
                ) : (
                  <text
                    key={c.id}
                    x={40 + i * 240}
                    y="90"
                    fontSize="12"
                    fill="#76776f"
                  >
                    {c.name}：尺寸未知
                  </text>
                ),
              )}
            </svg>
          </div>
          <div className="comparison-wrap">
            <table className="comparison">
              <thead>
                <tr>
                  <th>器材档案</th>
                  {compared.map((c) => (
                    <th key={c.id}>
                      <CameraArt camera={c} />
                      <a href={"#/camera/" + c.id}>{c.name}</a>
                      <span className="verification-badge">
                        {c.verification === "verified"
                          ? "已核对官方资料"
                          : "资料待核验"}
                      </span>
                      <button
                        aria-label={`移除 ${c.name}`}
                        onClick={() =>
                          go(
                            "/compare?ids=" +
                              compared
                                .filter((x) => x.id !== c.id)
                                .map((x) => x.id)
                                .join(","),
                          )
                        }
                      >
                        移除 ×
                      </button>
                    </th>
                  ))}
                  {compared.length < 2 && (
                    <th>
                      <select
                        aria-label="添加对比器材"
                        value=""
                        onChange={(e) =>
                          go(
                            "/compare?ids=" +
                              [
                                ...compared.map((c) => c.id),
                                e.target.value,
                              ].join(","),
                          )
                        }
                      >
                        <option value="">+ 选择第二台相机</option>
                        {cameras
                          .filter((c) => !compareIds.includes(c.id))
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter(
                    ([, f]) =>
                      !diff ||
                      compared.length < 2 ||
                      f(compared[0]) !== f(compared[1]),
                  )
                  .map(([label, f]) => (
                    <tr
                      key={label}
                      className={
                        compared.length === 2 &&
                        f(compared[0]) !== f(compared[1])
                          ? "different"
                          : ""
                      }
                    >
                      <th>{label}</th>
                      {compared.map((c) => (
                        <td key={c.id}>{f(c)}</td>
                      ))}
                      {compared.length < 2 && <td>—</td>}
                    </tr>
                  ))}
                <tr>
                  <th>资料来源</th>
                  {compared.map((c) => (
                    <td key={c.id}>{source(c.sourceUrl)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty">
          <Columns2 size={38} />
          <h2>从两种视角，认识一台相机。</h2>
          <p>在器材卡片上点击「加入对比」，或从下面开始。</p>
          <div className="suggestions">
            {cameras.slice(0, 3).map((c) => (
              <button
                className="button"
                key={c.id}
                onClick={() => go("/compare?ids=" + c.id)}
              >
                + {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
