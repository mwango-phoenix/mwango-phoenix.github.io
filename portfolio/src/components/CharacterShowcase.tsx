import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ShowcasePiece {
  title: string;
  src: string;
  // Optional one-line explanation shown in the lightbox caption.
  note?: string;
}

// ─── Sticker lightbox ─────────────────────────────────────────────────────────
function StickerLightbox({
  pieces,
  startIndex,
  onClose,
}: {
  pieces: ShowcasePiece[];
  startIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const total = pieces.length;

  const goPrev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const goNext = useCallback(
    () => setCurrentIndex((i) => (i + 1) % total),
    [total],
  );

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Keyboard nav + Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  const onBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const piece = pieces[currentIndex];

  return createPortal(
    <div
      onClick={onBackdrop}
      className="fixed inset-0 z-200 bg-black/85 backdrop-blur-[6px] flex flex-col items-center justify-center p-4 md:p-8"
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="icon-btn absolute top-5 right-5 z-10"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="1" y1="1" x2="11" y2="11" />
          <line x1="11" y1="1" x2="1" y2="11" />
        </svg>
      </button>

      <div className="flex items-center gap-4 md:gap-8 w-full justify-center">
        {total > 1 && (
          <button onClick={goPrev} aria-label="Previous" className="icon-btn icon-btn--round">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="10,3 5,8 10,13" />
            </svg>
          </button>
        )}

        <img
          src={piece.src}
          alt={piece.title}
          className="max-h-[75dvh] max-w-[75vw] object-contain"
        />

        {total > 1 && (
          <button onClick={goNext} aria-label="Next" className="icon-btn icon-btn--round">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6,3 11,8 6,13" />
            </svg>
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold tracking-tight text-text-primary">
            {piece.title}
          </span>
          <span className="font-mono text-2xs font-light tracking-label text-electric opacity-60">
            {currentIndex + 1} / {total}
          </span>
        </div>
        {piece.note && (
          <p className="font-mono text-2xs font-light leading-relaxed text-text-secondary text-pretty max-w-md text-center">
            {piece.note}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

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

          {/* Individual sticker cards */}
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
        <StickerLightbox
          pieces={pieces}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
