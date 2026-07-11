import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

// ─── Shared type ──────────────────────────────────────────────────────────────
export interface LightboxItem {
  title: string;
  src: string;
  note?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: LightboxItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const total = items.length;

  const goPrev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const goNext = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  // Lock body scroll
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

  // Keyboard nav
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

  const item = items[idx];

  return createPortal(
    <div
      onClick={onBackdrop}
      className="fixed inset-0 z-200 bg-black/85 backdrop-blur-[6px] flex flex-col items-center justify-center p-4 md:p-8"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="icon-btn absolute top-5 right-5 z-10"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="1" y1="1" x2="11" y2="11" />
          <line x1="11" y1="1" x2="1" y2="11" />
        </svg>
      </button>

      <div className="flex items-center gap-4 md:gap-8 w-full justify-center">
        {total > 1 && (
          <button onClick={goPrev} aria-label="Previous" className="icon-btn icon-btn--round">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="10,3 5,8 10,13" />
            </svg>
          </button>
        )}

        <img
          src={item.src}
          alt={item.title}
          className="max-h-[75dvh] max-w-[75vw] object-contain"
        />

        {total > 1 && (
          <button onClick={goNext} aria-label="Next" className="icon-btn icon-btn--round">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6,3 11,8 6,13" />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold tracking-tight text-text-primary">
            {item.title}
          </span>
          <span className="font-mono text-2xs font-light tracking-label text-electric opacity-60">
            {idx + 1} / {total}
          </span>
        </div>
        {item.note && (
          <p className="font-mono text-2xs font-light leading-relaxed text-text-secondary text-pretty max-w-md text-center">
            {item.note}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
