import { useEffect, useState } from "react";
import { depthOfField, fieldOfView, motionBlur } from "./science";
import "./labs.css";
const apertures = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16];
const shutters = [
  1 / 15,
  1 / 30,
  1 / 60,
  1 / 125,
  1 / 250,
  1 / 500,
  1 / 1000,
  1 / 2000,
];
const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(2) : "∞");
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
  display: string;
}) {
  return (
    <label className="lab-range">
      <span>
        {label}
        <strong>{display}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
export default function Labs({
  initialLab = "dof",
}: {
  initialLab?: "dof" | "motion" | "fov";
}) {
  const [tab, setTab] = useState(["dof", "motion", "fov"].indexOf(initialLab));
  useEffect(() => {
    setTab(["dof", "motion", "fov"].indexOf(initialLab));
  }, [initialLab]);
  const [ap, setAp] = useState(2);
  const [distance, setDistance] = useState(3);
  const [dofFocal, setDofFocal] = useState(50);
  const [shutter, setShutter] = useState(3);
  const [speed, setSpeed] = useState(5);
  const [focal, setFocal] = useState(50);
  const [sensor, setSensor] = useState(36);
  function resetDefaults() {
    setAp(2);
    setDistance(3);
    setDofFocal(50);
    setShutter(3);
    setSpeed(5);
    setFocal(50);
    setSensor(36);
  }
  const dof = depthOfField(dofFocal, apertures[ap], distance);
  const motion = motionBlur(speed, shutters[shutter], 50, 10);
  const field = fieldOfView(focal, sensor, 10);
  return (
    <section className="photo-labs" id="labs" aria-labelledby="lab-heading">
      <div className="lab-intro">
        <div>
          <p className="lab-eyebrow">THE INTERACTIVE LAB</p>
          <h2 id="lab-heading">把原理，变成直觉。</h2>
        </div>
        <p>
          拖动一个参数，观察画面的变化。
          <br />
          从理解开始，让每一次按下快门都有把握。
        </p>
      </div>
      <div className="lab-tabs" role="tablist" aria-label="摄影实验室">
        {["01 / 光圈与景深", "02 / 快门与运动", "03 / 焦距与画幅"].map(
          (name, i) => (
            <button
              key={name}
              id={`lab-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={tab === i}
              aria-controls={`lab-panel-${i}`}
              tabIndex={tab === i ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const next = (tab + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setTab(next);
                  document.getElementById(`lab-tab-${next}`)?.focus();
                }
              }}
              onClick={() => setTab(i)}
            >
              {name}
              <span>↗</span>
            </button>
          ),
        )}
      </div>
      <div
        className="lab-panel"
        id={`lab-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`lab-tab-${tab}`}
      >
        <div className={`lab-view lab-view-${tab}`}>
          {tab === 0 && (
            <>
              <div
                className="lab-scene-background"
                style={{
                  filter: `blur(${Math.max(0, (((dofFocal / 50) * 9) / distance) * 3 - apertures[ap] * 0.55)}px)`,
                }}
              />
              <div className="lab-vase">
                <i />
                <b />
              </div>
              <span className="lab-image-tag">
                {dofFocal} MM · {distance.toFixed(1)} M · ƒ/{apertures[ap]}
              </span>
              <div className="lab-focus-mark" />
              <span className="lab-scene-caption">
                焦点固定在主体 · 背景虚化为示意
              </span>
            </>
          )}
          {tab === 1 && (
            <>
              <div className="lab-motion-grid" />
              {[3, 2, 1].map((i) => (
                <div
                  key={i}
                  className="lab-ball lab-ghost"
                  style={{
                    transform: `translateX(${(-Math.min(190, motion.blurPx / 3) * i) / 3}px)`,
                    opacity: 0.12 * (4 - i),
                  }}
                />
              ))}
              <div className="lab-ball" />
              <span className="lab-image-tag">
                1/{Math.round(1 / shutters[shutter])} S · {speed} M/S
              </span>
              <span className="lab-scene-caption">
                横向移动 · 固定机位 · 示意拖影
              </span>
            </>
          )}
          {tab === 2 && (
            <>
              <div className="lab-landscape">
                <i />
                <b />
                <em />
              </div>
              <div
                className="lab-frame"
                style={{
                  width: `${Math.min(91, Math.max(18, field.horizontalDegrees))}%`,
                  height: `${Math.min(82, Math.max(22, field.horizontalDegrees * 0.8))}%`,
                }}
              >
                <span>{field.horizontalDegrees.toFixed(1)}°</span>
              </div>
              <span className="lab-image-tag">
                {focal} MM · {sensor === 36 ? "FULL FRAME" : "APS-C 1.5×"}
              </span>
              <span className="lab-scene-caption">
                同一机位 · 画框展示相对视角
              </span>
            </>
          )}
        </div>
        <div className="lab-controls">
          <p className="lab-eyebrow">
            {
              [
                "APERTURE & DEPTH OF FIELD",
                "SHUTTER & MOTION",
                "FOCAL LENGTH & SENSOR",
              ][tab]
            }
          </p>
          <h3>
            {
              [
                "清晰的边界，由你决定。",
                "让时间停下，或流动。",
                "改变视角，看见更多。",
              ][tab]
            }
          </h3>
          <p className="lab-description">
            {
              [
                "光圈越大，景深越浅。试着收小光圈，观察背景与清晰范围的变化。",
                "快门越慢，移动物体留下的轨迹越长。提高速度，感受凝固瞬间所需的快门。",
                "焦距越长，视角越窄。相同焦距下，更小的传感器记录更小的画面范围。",
              ][tab]
            }
          </p>
          {tab === 0 && (
            <>
              <Range
                label="光圈 Aperture"
                min={0}
                max={7}
                value={ap}
                onChange={setAp}
                display={`ƒ/${apertures[ap]}`}
              />
              <Range
                label="对焦距离 Focus distance"
                min={0.5}
                max={10}
                step={0.1}
                value={distance}
                onChange={setDistance}
                display={`${distance.toFixed(1)} m`}
              />
              <Range
                label="焦距 Focal length"
                min={24}
                max={135}
                value={dofFocal}
                onChange={setDofFocal}
                display={`${dofFocal} mm`}
              />
              <div className="lab-results" aria-live="polite">
                <div>
                  <span>清晰范围 · m</span>
                  <strong>
                    {fmt(dof.nearM)} — {fmt(dof.farM)}
                  </strong>
                </div>
                <div>
                  <span>景深 · m</span>
                  <strong>{fmt(dof.depthM)}</strong>
                </div>
              </div>
            </>
          )}
          {tab === 1 && (
            <>
              <Range
                label="快门速度 Shutter speed"
                min={0}
                max={7}
                value={shutter}
                onChange={setShutter}
                display={`1/${Math.round(1 / shutters[shutter])} s`}
              />
              <Range
                label="主体速度 Subject speed"
                min={0}
                max={15}
                value={speed}
                onChange={setSpeed}
                display={`${speed} m/s`}
              />
              <div className="lab-results" aria-live="polite">
                <div>
                  <span>曝光期间位移</span>
                  <strong>{(motion.travelM * 100).toFixed(1)} cm</strong>
                </div>
                <div>
                  <span>理论拖影 / 1200 px 图像</span>
                  <strong>{motion.blurPx.toFixed(1)} px</strong>
                </div>
              </div>
            </>
          )}
          {tab === 2 && (
            <>
              <Range
                label="焦距 Focal length"
                min={16}
                max={200}
                value={focal}
                onChange={setFocal}
                display={`${focal} mm`}
              />
              <div className="lab-presets">
                {[24, 35, 50, 85].map((mm) => (
                  <button
                    type="button"
                    key={mm}
                    aria-pressed={focal === mm}
                    onClick={() => setFocal(mm)}
                  >
                    {mm} mm
                  </button>
                ))}
              </div>
              <label className="lab-select">
                传感器 Sensor
                <select
                  value={sensor}
                  onChange={(e) => setSensor(Number(e.target.value))}
                >
                  <option value={36}>全画幅 Full frame · 36 mm</option>
                  <option value={24}>APS-C · 24 mm / 1.5×</option>
                </select>
              </label>
              <div className="lab-results" aria-live="polite">
                <div>
                  <span>10 m 处水平取景宽度</span>
                  <strong>{field.widthM.toFixed(1)} m</strong>
                </div>
                <div>
                  <span>全画幅等效焦距</span>
                  <strong>{field.equivalentMm.toFixed(0)} mm</strong>
                </div>
              </div>
            </>
          )}
          <button className="lab-reset" type="button" onClick={resetDefaults}>
            恢复默认参数 ↺
          </button>
          <p className="lab-assumption">
            {
              [
                "模型假设：薄透镜、全画幅、容许弥散圈 0.03 mm；忽略衍射与镜头像差。",
                "模型假设：50 mm、全画幅、距离 10 m，主体垂直于光轴匀速运动；不含机震与追随拍摄。",
                "模型假设：直线投影镜头、距离 10 m，以传感器宽度计算水平视角；透视由拍摄位置决定。",
              ][tab]
            }
          </p>
        </div>
      </div>
    </section>
  );
}
