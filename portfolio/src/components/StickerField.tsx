import { useEffect, useRef } from "react";
import { OVERLAYS } from "../assets/characters";

// Stickers scattered down the page. 
interface ScatterSticker {
  src?: string;
  top: string;
  side: "left" | "right";
  rotate: number;
  size: number;
  depth: number;
  nudge?: string;
  from?: "sm" | "md";
}

const character = (title: string) =>
  OVERLAYS.find((c) => c.title === title)?.src;

const SCATTER: ScatterSticker[] = [
  { src: character("Cozy"), top: "calc(var(--nav-h) + 7vh)", side: "left", rotate: -13, size: 130, nudge: "3rem", depth: 0.06, from: "md" },
  { src: character("Puddle"), top: "75vh", side: "right", rotate: 12, size: 120, nudge: "4rem", depth: 0.06, from: "sm" },
  { src: character("Pug"), top: "17%", side: "left", rotate: 8, size: 116, depth: 0.035, nudge: "2.25rem", from: "md" },
  { src: character("Wink2"), top: "24%", side: "right", rotate: -9, size: 96, depth: 0.055, from: "md" },
  { src: character("Owl"), top: "33%", side: "left", rotate: 15, size: 84, depth: 0.045, nudge: "5rem" },
  { src: character("Teddy"), top: "48%", side: "right", rotate: -16, size: 100, depth: 0.06, from: "sm" },
  { src: character("Coocoo"), top: "67%", side: "right", rotate: 7, size: 110,  nudge: "4rem", depth: 0.04, from: "md" },
  { src: character("Calculator"), top: "89%", side: "right", rotate: 11, nudge: "2rem", size: 86, depth: 0.05 },
  { src: character("Wink"), top: "74%", side: "left", rotate: -11, size: 78, depth: 0.045, from: "sm", nudge: "1.5rem" },
];

const SHOW_FROM = { sm: "hidden sm:block", md: "hidden md:block" } as const;

export default function StickerField() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const items = Array.from(layer.querySelectorAll<HTMLElement>("[data-sticker]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = reduce.matches ? 0 : window.scrollY;
      for (const el of items) {
        const depth = Number(el.dataset.depth) || 0;
        const rot = el.dataset.rotate || "0";
        el.style.transform = `translate3d(0, ${(-y * depth).toFixed(1)}px, 0) rotate(${rot}deg)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const stickers = SCATTER.filter((s): s is ScatterSticker & { src: string } =>
    Boolean(s.src),
  );

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {stickers.map((sticker, i) => (
        <div
          key={`${sticker.top}-${sticker.side}`}
          data-sticker
          data-hover
          data-depth={sticker.depth}
          data-rotate={sticker.rotate}
          onClick={(e) => {
            const face = e.currentTarget.querySelector(".scatter-face");
            if (!face) return;
            face.classList.remove("is-flicked");
            void (face as HTMLElement).offsetWidth;
            face.classList.add("is-flicked");
          }}
          className={[
            "scatter-sticker pointer-events-auto absolute cursor-none",
            sticker.side === "left" ? "is-left" : "is-right",
            sticker.from ? SHOW_FROM[sticker.from] : "",
          ].join(" ")}
          style={{
            top: sticker.top,
            zIndex: i + 1,
            transform: `rotate(${sticker.rotate}deg)`,
            ["--sticker-size" as string]: `${sticker.size}px`,
            ["--nudge" as string]: sticker.nudge ?? "0px",
            ["--float-delay" as string]: `${(i * 0.65) % 4.5}s`,
            ["--float-dur" as string]: `${6.5 + (i % 4) * 0.8}s`,
          }}
        >
          <span
            className="scatter-face"
            onAnimationEnd={(e) => {
              if (e.animationName === "stickerFlick") {
                e.currentTarget.classList.remove("is-flicked");
              }
            }}
          >
            <img
              src={sticker.src}
              alt=""
              draggable={false}
              className="w-full h-auto select-none"
            />
          </span>
        </div>
      ))}
    </div>
  );
}
