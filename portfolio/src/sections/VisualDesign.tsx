import { useState } from "react";
import goose from "../assets/posters/goose.png";
import soar from "../assets/posters/Soar.png";
import personalities from "../assets/characters/personalities.png";
import { CHARACTERS, piperFront, piperLeft, piperDown, piperPlush, piperFullPin, piperMinimalPin } from "../assets/characters";
import CharacterShowcase from "../components/CharacterShowcase";
import PiperShowcase from "../components/PiperShowcase";

const characterSrc = (title: string) =>
  CHARACTERS.find((c) => c.title === title)?.src;

// ─── Types ────────────────────────────────────────────────────────────────────
interface DesignPiece {
  title: string;
  type: "image" | "video";
  src?: string;
  note?: string;
}

interface Category {
  label: string;
  kind?: "sticker" | "mascot";
  // Curated artwork shown as a small fan while the row is collapsed.
  previews?: (string | undefined)[];
  pieces: DesignPiece[];
  // "mascot" kind extras
  mascotFeature?: string;
  mascotEyebrow?: string;
}


// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    label: "Posters",
    previews: [goose, soar],
    pieces: [
      { title: "Goose", type: "image", src: goose },
      { title: "Soar", type: "image", src: soar },
    ],
  },
  {
    label: "GenTube Character Design",
    kind: "sticker",
    previews: [
      characterSrc("Paintbrush"),
      characterSrc("Pirate"),
      characterSrc("DJ"),
      characterSrc("Flowers"),
    ],
    pieces: CHARACTERS.map((c) => ({
      title: c.title,
      type: "image" as const,
      src: c.src,
      note: c.note,
    })),
  },
  {
    label: "Piper — MathSoc Mascot",
    kind: "mascot",
    previews: [piperFront, piperPlush, piperFullPin],
    mascotFeature: piperFront,
    mascotEyebrow: "Owl · Brand Mascot · Character Art",
    pieces: [
      {
        title: "Front",
        type: "image",
        src: piperFront,
      },
      {
        title: "Side View",
        type: "image",
        src: piperLeft,
      },
      {
        title: "Laying Down",
        type: "image",
        src: piperDown,
      },
      {
        title: "Plush",
        type: "image",
        src: piperPlush,
      },
      {
        title: "Full Pin",
        type: "image",
        src: piperFullPin,
      },
      {
        title: "Minimal Pin",
        type: "image",
        src: piperMinimalPin,
      },
    ],
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
          className="w-full max-h-65 object-contain bg-bg-surface"
        />
      ) : (
        <video
          src={piece.src}
          controls
          playsInline
          className="w-full max-h-65 bg-black"
        />
      )}
      <p className="font-mono text-2xs font-light text-text-secondary">
        {piece.title}
      </p>
    </div>
  );
}

// ─── Collapsed-row sticker fan ────────────────────────────────────────────────
function StickerFan({
  previews,
  open,
}: {
  previews?: (string | undefined)[];
  open: boolean;
}) {
  const srcs = (previews ?? []).filter((s): s is string => Boolean(s));
  if (srcs.length === 0) return null;

  return (
    <span
      aria-hidden="true"
      className={[
        "hidden sm:flex shrink-0 items-center ml-auto mr-4",
        "transition-opacity duration-300 ease-in-out",
        open ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
    >
      {srcs.map((src, i) => (
        <span
          key={src}
          className={[
            "w-12 h-12 -ml-3 first:ml-0 rounded-xs overflow-hidden",
            "border border-border bg-bg-surface",
            "transition-transform duration-300 ease-out",
            i % 2 ? "rotate-6" : "-rotate-6",
            "group-hover:rotate-0 group-hover:-translate-y-0.5",
            i > 1 ? "hidden md:block" : "block",
          ].join(" ")}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            className="w-full h-full object-contain p-1"
          />
        </span>
      ))}
    </span>
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

        <StickerFan previews={category.previews} open={open} />

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
              <CharacterShowcase
                pieces={category.pieces
                  .filter((p) => p.src)
                  .map((p) => ({ title: p.title, src: p.src!, note: p.note }))}
                feature={personalities}
              />
            ) : category.kind === "mascot" && category.mascotFeature ? (
              <PiperShowcase
                feature={category.mascotFeature}
                assets={category.pieces
                  .filter((p) => p.src)
                  .map((p) => ({ title: p.title, src: p.src!, note: p.note }))}
                eyebrow={category.mascotEyebrow}
              />
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
            <h2 className="font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] tracking-tight">
              Visual Design
            </h2>
          </div>
          <p className="font-mono text-md font-light leading-[1.9] text-text-secondary max-w-145">
            Illustration, mascot design, and more taken from rough concept to finished asset, 
            staying consistent across formats from posters to plush toys to pins.
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
