"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const fallbackImage = "/banner/new-products/banner-1.png";

function getImageUrl(image) {
  if (!image) return fallbackImage;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) return `${API_BASE}${image}`;
  if (image.startsWith("/")) return image;
  return `${API_BASE}/${image}`;
}

export default function SignatureCategoryCircles() {
  const rowRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  // Same database-controlled setting as your existing CategorySlider.
  const visibleCategories = useMemo(
    () => categories.filter((item) => item?.isActive !== false && item?.showInHomeSlider === true),
    [categories]
  );

  // Desktop shows a maximum of 5 large round category cards in one row.
  // If fewer categories exist, they expand evenly instead of leaving empty space.
  const desktopCircleCount = Math.min(Math.max(visibleCategories.length, 1), 5);
  const desktopCircleWidth = `calc((100% - ${(desktopCircleCount - 1) * 24}px) / ${desktopCircleCount})`;

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(`${API_BASE}/api/categories/home-slider`, { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load category collections");
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : data?.categories || data?.data || []);
      } catch (error) {
        console.error("Signature category fetch error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const scroll = (direction) => {
    const row = rowRef.current;
    if (!row) return;
    const firstItem = row.firstElementChild;
    const amount = firstItem ? firstItem.getBoundingClientRect().width + 24 : 260;
    row.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused || visibleCategories.length < 6) return;
    const timer = window.setInterval(() => {
      const row = rowRef.current;
      if (!row) return;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 8;
      if (atEnd) row.scrollTo({ left: 0, behavior: "smooth" });
      else scroll("right");
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, visibleCategories.length]);

  if (!loading && !visibleCategories.length) return null;

  return (
    <section className="overflow-hidden bg-[#fffdf9] py-12 md:py-16">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-9 max-w-3xl text-center md:mb-11">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B38B2D]/30 bg-[#fff7e5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1F5C4A]">
            <Sparkles size={15} /> Curated for beautiful living
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight text-[#1F5C4A] md:text-5xl">
            Explore Our Signature Collections
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#58625e] md:text-base">
            Discover thoughtfully selected decor categories—from elegant accents to meaningful gifting—crafted to make every corner feel special.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="mx-auto w-full">
                <div className="aspect-square animate-pulse rounded-full bg-[#eee9dc]" />
                <div className="mx-auto mt-3 h-3 w-3/4 animate-pulse rounded bg-[#eee9dc]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <button type="button" onClick={() => scroll("left")} aria-label="Previous collections" className="absolute left-0 top-[42%] z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-[#B38B2D]/30 bg-white text-[#1F5C4A] shadow-lg lg:flex">
              <ChevronLeft size={20} />
            </button>
            <div ref={rowRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-3 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visibleCategories.map((category) => (
                <Link
                  key={category._id || category.slug}
                  href={`/products?category=${encodeURIComponent(category.slug)}`}
                  style={{ "--desktop-circle-width": desktopCircleWidth }}
                  className="group w-[160px] shrink-0 snap-start text-center sm:w-[185px] md:w-[215px] lg:w-[var(--desktop-circle-width)]"
                >
                  <div className="aspect-square overflow-hidden rounded-full border-2 border-[#e6d6aa] bg-[#f6f2ea] p-1.5 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-[#B38B2D] group-hover:shadow-lg">
                    <img src={getImageUrl(category.image)} alt={category.name} className="h-full w-full rounded-full object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-base font-bold leading-6 text-[#273c35] transition group-hover:text-[#B38B2D] md:text-lg">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
            <button type="button" onClick={() => scroll("right")} aria-label="Next collections" className="absolute right-0 top-[42%] z-10 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-[#B38B2D]/30 bg-white text-[#1F5C4A] shadow-lg lg:flex">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
