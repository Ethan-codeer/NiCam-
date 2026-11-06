import "./brand-logos.css";

const logoFiles: Record<string, string> = {
  nikon: "nikon.svg",
  canon: "canon.svg",
  sony: "sony.svg",
  fujifilm: "fujifilm.svg",
  leica: "leica.svg",
  hasselblad: "hasselblad.svg",
  olympus: "olympus.svg",
  panasonic: "panasonic.svg",
  pentax: "pentax.svg",
  ricoh: "ricoh.svg",
};

export default function BrandLogo({ brand, name, className = "" }: {
  brand: string;
  name: string;
  className?: string;
}) {
  const file = logoFiles[brand];
  return file ? (
    <span className={`brand-logo brand-logo--${brand} ${className}`}>
      <img src={`/brands/${file}`} alt={name} decoding="async" />
    </span>
  ) : <span className={className}>{name}</span>;
}
