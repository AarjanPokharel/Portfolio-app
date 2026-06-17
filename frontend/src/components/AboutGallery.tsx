"use client";

import { useEffect, useState, useCallback } from "react";

type Photo = { src: string; caption?: string };

type Props = {
  photos: Photo[];
  /** Milliseconds between auto-advances. */
  interval?: number;
};

export default function AboutGallery({ photos, interval = 4000 }: Props) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => setIndex((next + photos.length) % photos.length),
    [photos.length]
  );

  // Auto-advance (pauses nothing fancy; resets when index changes)
  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setTimeout(() => go(index + 1), interval);
    return () => clearTimeout(id);
  }, [index, photos.length, interval, go]);

  if (photos.length === 0) return null;

  return (
    <div className="group relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-line bg-surface-2">
      {/* Slides */}
      {photos.map((photo, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.caption || "About photo"}
            className="h-full w-full object-cover"
          />
          {photo.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm font-medium text-white">{photo.caption}</p>
            </div>
          )}
        </div>
      ))}

      {photos.length > 1 && (
        <>
          {/* Prev / Next — appear on hover */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/60"
          >
            ❮
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/60"
          >
            ❯
          </button>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
