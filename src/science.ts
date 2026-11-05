/** Thin-lens educational approximations. Distances use metres, focal lengths use mm. */
function positive(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0)
    throw new RangeError(`${label} must be finite and positive`);
  return value;
}
export function depthOfField(
  focalMm: number,
  aperture: number,
  distanceM: number,
  cocMm = 0.03,
) {
  const f = positive(focalMm, "focal length");
  const n = positive(aperture, "aperture");
  const s = positive(distanceM, "distance") * 1000;
  const c = positive(cocMm, "circle of confusion");
  if (s <= f) throw new RangeError("Subject must be beyond the focal plane");
  const h = (f * f) / (n * c) + f;
  const near = (h * s) / (h + s - f) / 1000;
  const far = s >= h ? Infinity : (h * s) / (h - s + f) / 1000;
  return { nearM: near, farM: far, depthM: far - near, hyperfocalM: h / 1000 };
}
/** Subject moves perpendicular to the optical axis. Sensor width defaults to full frame. */
export function motionBlur(
  speedMps: number,
  exposureSeconds: number,
  focalMm: number,
  distanceM: number,
  imageWidthPx = 1200,
  sensorWidthMm = 36,
) {
  if (!Number.isFinite(speedMps) || speedMps < 0)
    throw new RangeError("Speed must be finite and nonnegative");
  positive(exposureSeconds, "exposure");
  positive(focalMm, "focal length");
  positive(distanceM, "distance");
  positive(imageWidthPx, "image width");
  positive(sensorWidthMm, "sensor width");
  return {
    travelM: speedMps * exposureSeconds,
    blurPx:
      ((speedMps * exposureSeconds * focalMm) / distanceM / sensorWidthMm) *
      imageWidthPx,
  };
}
export function fieldOfView(
  focalMm: number,
  sensorWidthMm: number,
  distanceM: number,
) {
  positive(focalMm, "focal length");
  positive(sensorWidthMm, "sensor width");
  positive(distanceM, "distance");
  return {
    horizontalDegrees:
      (2 * Math.atan(sensorWidthMm / (2 * focalMm)) * 180) / Math.PI,
    widthM: (distanceM * sensorWidthMm) / focalMm,
    equivalentMm: (focalMm * 36) / sensorWidthMm,
  };
}
