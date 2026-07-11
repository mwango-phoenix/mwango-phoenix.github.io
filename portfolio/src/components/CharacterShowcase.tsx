import { useState } from "react";
import Lightbox from "./Lightbox";
import type { LightboxItem } from "./Lightbox";

// Re-export so existing callers don't break.
export type ShowcasePiece = LightboxItem;

// ─── Character showcase (horizontal carousel) ──────────────────────────────────
export default function CharacterShowcase({
  pieces,
  feature,
  eyebrow = "The Cast",
  title = "Meet the Personalities",
  description = "A mascot system with distinct personalities, each with its own poses and props. Tap any sticker to take a closer look.",
}: {
  pieces: ShowcasePiece[];
  feature: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Drag hint */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-2xs font-light tracking-label uppercase text-text-secondary opacity-40">
          Drag to explore
        </span>
        <span className="text-text-secondary opacity-40" aria-hidden="true">
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="0" y1="5" x2="17" y2="5" />
            <polyline points="13,1 18,5 13,9" />
          </svg>
        </span>
      </div>

      <div className="relative">
        <div
          className="flex items-start md:items-center gap-4 overflow-x-auto pb-4 -mx-1 px-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
        >
          <div className="snap-start shrink-0 w-[min(88%,620px)] flex flex-col gap-4 p-4">
            <img
              src={feature}
              alt={title}
              className="w-full object-contain rounded-xs"
            />
            <div className="flex flex-col gap-2">
              <p className="font-mono text-2xs font-light tracking-label uppercase text-electric">
                {eyebrow}
              </p>
              <h4 className="font-display text-lg font-bold tracking-tight text-text-primary">
                {title}
              </h4>
              <p className="font-mono text-xs font-light leading-relaxed text-text-secondary text-pretty">
                {description}
              </p>
            </div>
          </div>

          {pieces.map((piece, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${piece.title}`}
              className={[
                "cursor-none group snap-start shrink-0 w-40 flex flex-col gap-2",
                "bg-transparent border-0 p-0 text-left",
              ].join(" ")}
            >
              <div
                className={[
                  "relative aspect-square overflow-hidden rounded-xs",
                  "border border-border",
                  "transition-all duration-300 ease-out",
                  i % 2 ? "rotate-1" : "-rotate-1",
                  "group-hover:rotate-0 group-hover:scale-105 group-hover:border-electric",
                ].join(" ")}
              >
                <img
                  src={piece.src}
                  alt={piece.title}
                  loading="lazy"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <p className="font-mono text-2xs font-light tracking-label text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {piece.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={pieces}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
