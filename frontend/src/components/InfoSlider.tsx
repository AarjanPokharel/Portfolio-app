"use client";

import { useState } from "react";

type InfoSliderItem = {
  id: number;
  title: string;
  subtitle: string;
  meta?: string;
  description?: string;
};

type InfoSliderProps = {
  label: string;
  heading: string;
  items: InfoSliderItem[];
  emptyMessage: string;
};

export default function InfoSlider({
  label,
  heading,
  items,
  emptyMessage,
}: InfoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasItems = items.length > 0;
  const currentItem = hasItems ? items[currentIndex] : null;

  function goToPrevious() {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? items.length - 1 : previousIndex - 1
    );
  }

  function goToNext() {
    setCurrentIndex((previousIndex) =>
      previousIndex === items.length - 1 ? 0 : previousIndex + 1
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-3xl border border-line bg-surface/70 p-6 md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-widest text-accent-soft">
              {label}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-content">{heading}</h2>
          </div>

          {hasItems && items.length > 1 && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                className="rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent-soft"
              >
                ❮ 
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent-soft"
              >
                 ❯
              </button>
            </div>
          )}
        </div>

        {currentItem ? (
          <article className="rounded-2xl border border-line bg-surface-2/70 p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h3 className="text-xl font-semibold text-content">
                  {currentItem.title}
                </h3>

                <p className="mt-2 font-medium text-accent-soft">{currentItem.subtitle}</p>
              </div>

              {currentItem.meta && (
                <p className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                  {currentItem.meta}
                </p>
              )}
            </div>

            {currentItem.description && (
              <p className="mt-5 whitespace-pre-line leading-8 text-muted">
                {currentItem.description}
              </p>
            )}

            {items.length > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 rounded-full transition ${
                      index === currentIndex
                        ? "w-8 bg-accent"
                        : "w-2.5 bg-line hover:bg-faint"
                    }`}
                    aria-label={`Show item ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </article>
        ) : (
          <div className="rounded-2xl border border-line bg-surface-2/70 p-6 text-muted">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
}