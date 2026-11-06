import { useState } from "react";
import type { Camera } from "./data";
import photos from "./photos.json";

type Photo = {
  src: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  width: number;
  height: number;
  note?: string;
};
const photoMap: Record<string, Photo> = photos;

export function CameraArt({ camera, large = false }: { camera?: Camera; large?: boolean }) {
  const id = camera?.id || "nikon-z8";
  const name = camera?.name || "Nikon Z 8";
  const photo = photoMap[id];
  // Keying the inner component resets loading state when a comparison slot changes model.
  return <CameraPhoto key={id} photo={photo} name={name} large={large} />;
}

function CameraPhoto({ photo, name, large }: { photo?: Photo; name: string; large: boolean }) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  return (
    <figure className={"camera-art camera-photo " + (large ? "large" : "")}>
      <div className="camera-photo-frame">
        {photo && state !== "error" ? (
          <>
            <img
              src={photo.src}
              alt={name}
              width={photo.width}
              height={photo.height}
              loading={large ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => setState("loaded")}
              onError={() => setState("error")}
            />
            {state === "loading" && <span className="photo-status" role="status">正在加载 {name} 实物照片…</span>}
          </>
        ) : (
          <span className="photo-status photo-failure" role="status">{name} 实物照片暂时无法显示</span>
        )}
      </div>
      {photo && (
        <figcaption className="photo-credit">
          <a href={photo.sourceUrl} target="_blank" rel="noreferrer">照片：{photo.author}</a>
          <span aria-hidden="true"> · </span>
          <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a>
          <span> · 尺寸适配 / WebP</span>
          {photo.note && <span className="photo-edition"> · {photo.note}</span>}
        </figcaption>
      )}
    </figure>
  );
}
