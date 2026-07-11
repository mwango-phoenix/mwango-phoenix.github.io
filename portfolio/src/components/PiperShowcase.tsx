import { useState } from "react";
import Lightbox from "./Lightbox";
import type { LightboxItem } from "./Lightbox";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PALETTE = [
  { hex: "#FF00BF", label: "Piper Pink" },
  { hex: "#FF80DF", label: "Feathers" },
  { hex: "#FFF7F9", label: "Cream" },
];

// ─── PiperShowcase ────────────────────────────────────────────────────────────
export default function PiperShowcase({
  feature,
  assets,
  eyebrow,
}: {
  feature: string;
  assets: LightboxItem[];
  eyebrow?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* ── Hero block ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start">
        {/* Feature image */}
        <div className="relative overflow-hidden rounded-xs border border-border">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 55%, rgba(255,0,191,0.22) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <img
            src={feature}
            alt="Piper"
            className="relative z-10 w-3/5 mx-auto object-contain"
            style={{ maxWidth: "400px" }}
          />
          <span className="absolute top-3 right-3 z-20 font-mono text-2xs font-light tracking-label uppercase px-2 py-1 rounded-[2px] bg-bg-base/80 border border-border-mid text-electric backdrop-blur-sm">
            Character Art
          </span>
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-6 pt-1">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-2xs font-light tracking-label uppercase text-electric">
              {eyebrow}
            </p>
            <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight leading-none text-text-primary">
              Piper
            </h3>
            <p className="font-mono text-xs font-light leading-[1.9] text-text-secondary text-pretty">
              A wise owl created for MathSoc. Inspired by the owl's association
              with wisdom and the reputation of math students as nocturnal
              creatures (night owls), the character was designed to embody the
              curiosity, intelligence, and playful spirit of the faculty.
              Designed for branding, events, and merchandise, the character was
              produced into both a plush toy and enamel pin, turning a society
              icon into something students could proudly wear and display.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 border-t border-border">
            <p className="font-mono text-2xs font-light tracking-label uppercase text-text-tertiary">
              Palette
            </p>
            <div className="flex gap-3">
              {PALETTE.map(({ hex, label }) => (
                <div key={hex} className="flex flex-col gap-2 items-start">
                  <div
                    className="w-14 h-14 rounded-[2px] border border-border-mid"
                    style={{ backgroundColor: hex }}
                    aria-label={label}
                  />
                  <span className="font-mono text-[10px] font-light text-text-tertiary uppercase leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Character Assets ───────────────────────────────────────────── */}
      {assets.length > 0 && (
        <div className="mt-10 flex flex-col gap-4">
          <p className="font-mono text-2xs font-light tracking-label uppercase text-electric opacity-50">
            Character Assets
          </p>

          <div
            className="flex items-start gap-4 overflow-x-auto pb-3 -mx-1 px-1"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent",
            }}
          >
            {assets.map((asset, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                aria-label={`View ${asset.title}`}
                className="cursor-none group snap-start shrink-0 w-44 flex flex-col gap-2 bg-transparent border-0 p-0 text-left"
              >
                <div
                  className={[
                    "relative aspect-square overflow-hidden rounded-xs",
                    "border border-border",
                    "transition-all duration-300 ease-out",
                    "group-hover:scale-103",
                  ].join(" ")}
                >
                  <img
                    src={asset.src}
                    alt={asset.title}
                    loading="lazy"
                    className="relative z-0 w-full h-full object-contain p-3 bg-bg-surface"
                  />
                </div>
                <p className="font-mono text-2xs font-light tracking-label text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                  {asset.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={assets}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
