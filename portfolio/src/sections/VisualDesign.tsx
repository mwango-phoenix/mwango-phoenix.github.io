import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import goose from "../assets/posters/goose.png";
import soar from "../assets/posters/Soar.png";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DesignPiece {
  title: string;
  type: "image" | "video";
  src?: string;
  // Character Design only: additional assets shown in the modal
  assets?: string[];
}

interface Category {
  label: string;
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
  // {
  //   label: "Character Design",
  //   pieces: [
  //     {
  //       title: "Character Name",
  //       type: "image",
  //       src: characterThumb, // shown in the accordion grid
  //       assets: [sheet1, sheet2, detail1], // shown in the modal
  //     },
  //   ],
  // },
  // {
  //   label: "Brand Identity",
  //   pieces: [],
  // },
  // {
  //   label: "Illustration",
  //   pieces: [],
  // },
];

// ─── Character modal ──────────────────────────────────────────────────────────
function CharacterModal({
  piece,
  onClose,
}: {
  piece: DesignPiece;
  onClose: () => void;
}) {
  const allImages = [piece.src, ...(piece.assets ?? [])].filter(
    Boolean,
  ) as string[];

  // Escape to close + body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  const onBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return createPortal(
    <div
      onClick={onBackdrop}
      className="fixed inset-0 z-200 bg-black/75 backdrop-blur-[6px] flex items-center justify-center p-4 md:p-8"
    >
      <div className="relative w-full max-w-4xl max-h-[90dvh] flex flex-col bg-bg-surface rounded-xs shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-8 py-5 border-b border-border">
          <div className="flex flex-col gap-0.5">
            <p className="font-mono text-2xs font-light tracking-label uppercase text-electric opacity-60">
              Character Design
            </p>
            <h2 className="font-display text-lg font-bold tracking-tight text-text-primary">
              {piece.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={[
              "cursor-none shrink-0 w-9 h-9 flex items-center justify-center",
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
        </div>

        {/* Scrollable asset grid */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-6"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={i === 0 ? piece.title : `${piece.title} — asset ${i}`}
                loading="lazy"
                className={[
                  "w-full object-contain bg-bg-base",
                  i === 0 && allImages.length % 2 !== 0 ? "sm:col-span-2" : "",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Piece thumbnail ──────────────────────────────────────────────────────────
function PieceThumbnail({
  piece,
  isCharacter,
}: {
  piece: DesignPiece;
  isCharacter?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  if (!piece.src) return null;

  const content =
    piece.type === "image" ? (
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
    );

  return (
    <>
      <div className="flex flex-col gap-2">
        {isCharacter ? (
          <button
            onClick={() => setModalOpen(true)}
            className={[
              "cursor-none group relative block w-full text-left border-0 p-0",
              "transition-opacity duration-200 hover:opacity-80",
            ].join(" ")}
            aria-label={`View ${piece.title} assets`}
          >
            {content}
            {/* View all overlay */}
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
              <span className="font-mono text-2xs tracking-label uppercase text-white">
                View all assets ↗
              </span>
            </span>
          </button>
        ) : (
          content
        )}
        <p className="font-mono text-2xs font-light text-text-secondary">
          {piece.title}
        </p>
      </div>

      {modalOpen && isCharacter && (
        <CharacterModal piece={piece} onClose={() => setModalOpen(false)} />
      )}
    </>
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
  const isCharacter = category.label === "Character Design";

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
        style={{ maxHeight: open ? "1200px" : "0px" }}
      >
        <div className="pb-8">
          {category.pieces.some((p) => p.src) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.pieces
                .filter((p) => p.src)
                .map((piece, i) => (
                  <PieceThumbnail
                    key={i}
                    piece={piece}
                    isCharacter={isCharacter}
                  />
                ))}
            </div>
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
