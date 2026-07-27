"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Layers3 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const fallbackImage = "/banner/new-products/banner-1.png";
const CARD_GAP = 12;

function getImageUrl(image) {
  if (!image) return fallbackImage;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) return `${API_BASE}${image}`;
  if (image.startsWith("/")) return image;
  return `${API_BASE}/${image}`;
}

export default function CategorySlider() {
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const visibleCategories = useMemo(
    () => categories.filter((cat) => cat?.isActive !== false && cat?.showInHomeSlider === true),
    [categories]
  );

  // At most 3 large cards are visible on desktop. Fewer cards still fill the row.
  const desktopCardCount = Math.min(Math.max(visibleCategories.length, 1), 3);
  const desktopCardWidth = `calc((100vw - ${(desktopCardCount - 1) * CARD_GAP}px) / ${desktopCardCount})`;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE}/api/categories/home-slider`, { cache: "no-store" });
        if (!response.ok) throw new Error("Categories could not be loaded");
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : data?.categories || data?.data || []);
      } catch (error) {
        console.error("Category fetch error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const firstCard = slider.firstElementChild;
    const amount = firstCard
      ? firstCard.getBoundingClientRect().width + CARD_GAP
      : slider.clientWidth * 0.8;
    slider.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (isPaused || visibleCategories.length < 2) return;
    const timer = window.setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;
      const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;
      if (isAtEnd) slider.scrollTo({ left: 0, behavior: "smooth" });
      else scrollSlider("right");
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, visibleCategories.length]);

  if (loading) {
    return (
      <section className="w-full overflow-hidden bg-[#FDFBF5] py-10 md:py-14">
        <div className="grid w-screen grid-cols-2 gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-[290px] animate-pulse bg-[#eee9dc] md:h-[400px] lg:h-[480px]" />
          ))}
        </div>
      </section>
    );
  }

  if (!visibleCategories.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FDFBF5] py-10 md:py-14">
      {/* Heading remains neatly aligned; only the card row is full-bleed. */}
      <div className="mb-7 px-4 text-center md:mb-9 sm:px-6 lg:px-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B38B2D]/30 bg-[#FFF8E8] px-4 py-2 text-xs font-bold text-[#1F5C4A] md:text-sm">
          <Layers3 size={16} /> Premium Home Decor Collections
        </div>
        <h2 className="text-3xl font-black leading-tight md:text-5xl">
          <span className="text-[#1F5C4A]">Discover Luxury </span>
          <span className="text-[#B38B2D]">Home Decor</span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#4b5552] md:text-base">
          Premium decorative pieces, planters, pooja essentials, wall decor and elegant accessories for every space.
        </p>
      </div>

      {/* w-screen + no horizontal padding = first/last card touch the screen edge. */}
      <div
        className="relative left-1/2 w-screen -translate-x-1/2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          type="button"
          onClick={() => scrollSlider("left")}
          aria-label="Previous categories"
          className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#B38B2D]/40 bg-white text-[#1F5C4A] shadow-md transition hover:bg-[#FFF8E8] lg:flex"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleCategories.map((cat) => (
            <Link
              key={cat._id || cat.slug}
              href={`/products?category=${encodeURIComponent(cat.slug)}`}
              style={{ "--desktop-card-width": desktopCardWidth }}
              className="group relative h-[290px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#B38B2D]/15 shadow-sm transition-shadow hover:shadow-xl sm:w-[310px] md:h-[400px] lg:h-[480px] lg:w-[var(--desktop-card-width)]"
            >
              <img
                src={getImageUrl(cat.image)}
                alt={cat.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                <h3 className="text-xl font-semibold leading-tight md:text-2xl">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-2 line-clamp-2 max-w-[260px] text-xs leading-5 text-white/90 md:text-sm">
                    {cat.description}
                  </p>
                )}
                <span className="mt-3 inline-block border-b border-white/70 pb-0.5 text-xs font-semibold uppercase tracking-wider">
                  Explore collection
                </span>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollSlider("right")}
          aria-label="Next categories"
          className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#B38B2D]/40 bg-white text-[#1F5C4A] shadow-md transition hover:bg-[#FFF8E8] lg:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
