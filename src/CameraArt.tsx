import type { Camera } from "./data";
export function CameraArt({
  camera,
  large = false,
}: {
  camera?: Camera;
  large?: boolean;
}) {
  const color =
    camera?.brand === "fujifilm"
      ? "#82867c"
      : camera?.brand === "leica"
        ? "#595b55"
        : "#373b36";
  return (
    <svg
      className={"camera-art " + (large ? "large" : "")}
      viewBox="0 0 600 380"
      role="img"
      aria-label={`${camera?.name || "经典相机"} 原创示意插画`}
    >
      <ellipse
        cx="310"
        cy="310"
        rx="205"
        ry="18"
        fill="#292c25"
        opacity=".08"
      />
      <path
        d="M116 137 Q116 126 129 126H220L242 91H355L377 126H475Q488 126 488 140V278Q488 292 474 292H130Q116 292 116 278Z"
        fill={color}
      />
      <path d="M116 148H488V178H116Z" fill="#acaaa0" />
      <path d="M142 185H463V277H142Z" fill="#292d29" />
      <rect x="139" y="113" width="55" height="16" rx="4" fill="#50554d" />
      <rect x="402" y="111" width="52" height="17" rx="3" fill="#696c63" />
      <rect x="265" y="108" width="65" height="28" rx="3" fill="#777a70" />
      <circle cx="304" cy="220" r="91" fill="#191f1c" />
      <circle cx="304" cy="220" r="77" fill="#72766a" />
      <circle cx="304" cy="220" r="67" fill="#282f2a" />
      <circle cx="304" cy="220" r="52" fill="#111e1b" />
      <circle cx="304" cy="220" r="38" fill="#263d36" />
      <circle cx="292" cy="207" r="20" fill="#7e9b8d" opacity=".3" />
      <circle cx="316" cy="234" r="12" fill="#5b786d" opacity=".35" />
      <circle cx="437" cy="161" r="6" fill="#a27c51" />
      <text x="151" y="164" fill="#f2efe4" fontSize="13" letterSpacing="2">
        {camera?.brand || "NiCam"}
      </text>
      <path d="M126 192V265M480 192V265" stroke="#76796f" strokeWidth="3" />
      <text
        x="300"
        y="354"
        fill="#99988e"
        fontSize="9"
        textAnchor="middle"
        letterSpacing="3"
      >
        NICAM ORIGINAL · 相机结构示意插画
      </text>
    </svg>
  );
}
