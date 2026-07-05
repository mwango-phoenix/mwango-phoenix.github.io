import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import goose from "../assets/posters/goose.png";
import soar from "../assets/posters/Soar.png";
import personalities from "../assets/characters/personalities.png";
import { CHARACTERS } from "../assets/characters";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DesignPiece {
  title: string;
  type: "image" | "video";
  src?: string;
  // Optional one-line explanation shown in the lightbox caption.
  note?: string;
}

interface Category {
  label: string;
  kind?: "sticker"; 
  pieces: DesignPiece[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    label: "Posters",
    pieces: [
      { title: "Goose", type: "image", src: goose },
      { title: "Soar", type: "image", src: soar },
    ],
  },
  {
    label: "Character Design",
    kind: "sticker",
    pieces: CHARACTERS.map((c) => ({
      title: c.title,
      type: "image" as const,
      src: c.src,
      note: c.note,
    })),
  },
  // {
  //   label: "Brand Identity",
  //   pieces: [],
  // },
  // {
  //   label: "Illustration",
  //   pieces: [],
  // },
];

// ─── Sticker lightbox ─────────────────────────────────────────────────────────
function StickerLightbox({
  pieces,
  startIndex,
  onClose,
}: {
  pieces: DesignPiece[];
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

  // Body scroll lock — runs once so the scroll position is captured and
  // restored exactly once (avoids scrolling to top when handlers change).
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
        className={[
          "cursor-none absolute top-5 right-5 z-10",
          "w-9 h-9 flex items-center justify-center",
          "border border-border-mid rounded-xs text-text-secondary",
          "transition-all duration-200 hover:border-[rgba(255,255,255,0.3)] hover:text-text-primary",
        ].join(" ")}
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
          <button
            onClick={goPrev}
            aria-label="Previous"
            className={[
              "cursor-none shrink-0 w-10 h-10 flex items-center justify-center",
              "border border-border-mid rounded-full text-text-secondary",
              "transition-all duration-200 hover:border-electric hover:text-electric",
            ].join(" ")}
          >
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
          <button
            onClick={goNext}
            aria-label="Next"
            className={[
              "cursor-none shrink-0 w-10 h-10 flex items-center justify-center",
              "border border-border-mid rounded-full text-text-secondary",
              "transition-all duration-200 hover:border-electric hover:text-electric",
            ].join(" ")}
          >
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
          <p className="font-mono text-2xs font-light leading-relaxed text-text-secondary max-w-md text-center">
            {piece.note}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

// ─── Character showcase (horizontal carousel) ──────────────────────────────────
function CharacterShowcase({
  pieces,
  feature,
}: {
  pieces: DesignPiece[];
  feature: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shown = pieces.filter((p) => p.src);

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
              alt="Character personalities"
              className="w-full object-contain rounded-xs"
            />
            <div className="flex flex-col gap-2">
              <p className="font-mono text-2xs font-light tracking-label uppercase text-electric">
                The Cast
              </p>
              <h4 className="font-display text-lg font-bold tracking-tight text-text-primary">
                Meet the Personalities
              </h4>
              <p className="font-mono text-xs font-light leading-relaxed text-text-secondary">
                A mascot system with distinct personalities, each with its
                own poses and props. Tap any sticker to take a closer look.
              </p>
            </div>
          </div>

          {/* Individual sticker cards */}
          {shown.map((piece, i) => (
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
          pieces={shown}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ─── Piece thumbnail (non-sticker categories) ──────────────────────────────────
function PieceThumbnail({ piece }: { piece: DesignPiece }) {
  if (!piece.src) return null;

  return (
    <div className="flex flex-col gap-2">
      {piece.type === "image" ? (
        <img
          src={piece.src}
          alt={piece.title}
          loading="lazy"
          className="w-full max-h-[260px] object-contain bg-bg-surface"
        />
      ) : (
        <video
          src={piece.src}
          controls
          playsInline
          className="w-full max-h-[260px] bg-black"
        />
      )}
      <p className="font-mono text-2xs font-light text-text-secondary">
        {piece.title}
      </p>
    </div>
  );
}

// ─── Accordion row ────────────────────────────────────────────────────────────
function AccordionRow({
  category,
  index,
  open,
  onToggle,
}: {
  category: Category;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const count = category.pieces.filter((p) => p.src).length;

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={[
          "cursor-none w-full flex items-center justify-between gap-6",
          "px-0 py-5 bg-transparent border-0 text-left",
          "group transition-colors duration-200",
        ].join(" ")}
      >
        <div className="flex items-center gap-6 min-w-0">
          <span className="font-mono text-2xs font-light tracking-label text-electric opacity-50 shrink-0 w-6 text-right">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={[
              "font-display text-base font-bold tracking-tight",
              "transition-colors duration-200",
              open
                ? "text-text-primary"
                : "text-text-secondary group-hover:text-text-primary",
            ].join(" ")}
          >
            {category.label}
          </h3>
          {count > 0 && (
            <span className="font-mono text-2xs font-light tracking-label uppercase text-electric opacity-40">
              {count} {count === 1 ? "piece" : "pieces"}
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          className={[
            "shrink-0 text-electric transition-transform duration-400 ease-in-out",
            open ? "rotate-45" : "",
          ].join(" ")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>

      {/* Collapsible body */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "1600px" : "0px" }}
      >
        <div className="pb-8">
          {count > 0 ? (
            category.kind === "sticker" ? (
              <CharacterShowcase pieces={category.pieces} feature={personalities} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.pieces
                  .filter((p) => p.src)
                  .map((piece, i) => (
                    <PieceThumbnail key={i} piece={piece} />
                  ))}
              </div>
            )
          ) : (
            <div className="h-24 flex items-center">
              <span className="font-mono text-2xs tracking-label uppercase text-text-secondary opacity-30">
                Coming soon
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function VisualDesign() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="design" className="relative z-10 border-t border-border">
      <div className="px-[clamp(1.5rem,4vw,3rem)] py-24 md:py-32 max-w-360 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-12 reveal">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-2xs font-light tracking-label uppercase text-electric">
              Design
            </p>
            <h2 className="font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] tracking-tight">
              Visual Design
            </h2>
          </div>
          <p className="font-mono text-md font-light leading-[1.9] text-text-secondary max-w-95">
            Posters, motion, and graphic work.
          </p>
        </div>

        {/* Accordion */}
        <div className="border-t border-border">
          {CATEGORIES.map((category, i) => (
            <AccordionRow
              key={category.label}
              category={category}
              index={i}
              open={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
