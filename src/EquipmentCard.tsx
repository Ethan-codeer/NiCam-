import { Bookmark } from "lucide-react";
import type { Camera } from "./data";
import { CameraArt } from "./CameraArt";
const go = (path: string) => {
  location.hash = path;
  window.scrollTo(0, 0);
};
const val = (v: number | null, unit = "") => (v === null ? "—" : `${v}${unit}`);
export default function EquipmentCard({
  c,
  saved,
  selection,
  toggleSaved,
  toggleCompare,
}: {
  c: Camera;
  saved: string[];
  selection: string[];
  toggleSaved: (id: string) => void;
  toggleCompare: (id: string) => void;
}) {
  return (
    <article className="equipment-card">
      <div className="object-image">
        <button
          className={"save " + (saved.includes(c.id) ? "active" : "")}
          aria-label={`收藏 ${c.name}`}
          onClick={() => toggleSaved(c.id)}
        >
          <Bookmark
            size={17}
            fill={saved.includes(c.id) ? "currentColor" : "none"}
          />
        </button>
        <button className="art-link" onClick={() => go("/camera/" + c.id)}>
          <CameraArt camera={c} />
        </button>
      </div>
      <div className="card-copy">
        {c.verification === "pending" && (
          <span className="verification-badge">资料待核验</span>
        )}
        <span className="eyebrow">
          {c.brand} <span> / {c.year}</span>
        </span>
        <h3>
          <a href={"#/camera/" + c.id}>{c.name}</a>
        </h3>
        <p>{c.description}</p>
        <div className="spec-chips">
          <span>{c.format}</span>
          <span>{val(c.megapixels, " MP")}</span>
        </div>
        <button
          className={
            "compare-add " + (selection.includes(c.id) ? "active" : "")
          }
          onClick={() => toggleCompare(c.id)}
        >
          {selection.includes(c.id) ? "✓ 已加入对比" : "+ 加入对比"}
        </button>
      </div>
    </article>
  );
}
