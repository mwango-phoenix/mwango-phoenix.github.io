import { useEffect, useState } from "react";
import "./Carousel.css";

export interface CarouselSlide {
  src: string;
  alt: string;
}

const ROTATE_MS = 4500;

export default function Carousel({ slides }: { slides: CarouselSlide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = count === 0 ? 0 : ((index % count) + count) % count;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => current + 1);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [count, paused, active]);

  if (count === 0) return null;

  const canStep = count > 1;

  return (
    <figure
      className="carousel shrink-0"
      aria-roledescription="carousel"
      aria-label="Images"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        setPaused(false);
      }}
    >
      <div className="carousel-stage">
        {slides.map((slide, slideIndex) => (
          <img
            key={`${slide.src}-${slideIndex}`}
            src={slide.src}
            alt={slideIndex === active ? slide.alt : ""}
            aria-hidden={slideIndex !== active}
            className={slideIndex === active ? "carousel-active" : undefined}
          />
        ))}
      </div>

      <div className="carousel-bar">
        <button
          type="button"
          className="carousel-nav"
          aria-label="Previous image"
          disabled={!canStep}
          onClick={() => setIndex((current) => current - 1)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="10,3 5,8 10,13" />
          </svg>
        </button>

        <div
          className="carousel-indicators"
          role="tablist"
          aria-label={`${count} images`}
        >
          {slides.map((slide, slideIndex) => (
            <button
              key={`${slide.src}-tick-${slideIndex}`}
              type="button"
              role="tab"
              className="carousel-tick"
              aria-label={`Image ${slideIndex + 1} of ${count}`}
              aria-selected={slideIndex === active}
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-nav"
          aria-label="Next image"
          disabled={!canStep}
          onClick={() => setIndex((current) => current + 1)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6,3 11,8 6,13" />
          </svg>
        </button>
      </div>

      <p className="carousel-count" aria-hidden="true">
        {String(active + 1).padStart(2, "0")}
        <span>/</span>
        {String(count).padStart(2, "0")}
      </p>
    </figure>
  );
}
