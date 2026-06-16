"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Layers3, Grid3X3 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const fallbackImage = "/banner/new-products/banner-1.png";



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

  const visibleCategories = useMemo(() => {
    return categories.filter(
      (cat) =>
        cat?.isActive !== false &&
        cat?.showInHomeSlider === true
    );
  }, [categories]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${API_BASE}/api/categories/home-slider`, {
          cache: "no-store",
        });

        const data = await res.json();

        const list = Array.isArray(data)
          ? data
          : data?.categories || data?.data || [];

        setCategories(list);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const amount = Math.floor(window.innerWidth * 0.85);

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="w-full bg-[#FDFBF5] py-16">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[380px] animate-pulse rounded-[28px] bg-[#FFFDF8] border border-[#B38B2D]/20 shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!visibleCategories.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FDFBF5] pt-4 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="mb-8 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B38B2D]/30 bg-[#FFF8E8] px-6 py-3 text-sm font-bold text-[#1F5C4A] shadow-sm">
            <Layers3 size={18} />
            Premium Home Decor Collections
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">

            <span className="text-[#1F5C4A]">
              Discover Luxury
            </span>

            <br />

            <span className="text-[#B38B2D]">
              Home Decor Categories
            </span>

          </h2>

          <p className="mx-auto mt-4 max-w-5xl text-lg md:text-xl leading-9 text-[#2F3A3A]">
            Explore premium decorative vases, luxury planters, candle holders,
            pooja essentials, wall decor, decorative accents and elegant home
            accessories crafted to elevate modern living spaces.
          </p>

         <div className="relative w-full mt-14">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#B38B2D] bg-white text-[#1F5C4A] shadow-lg transition hover:bg-[#FDFBF5] lg:flex"            >
              <ChevronLeft size={24} />
            </button>

            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {visibleCategories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  className="relative min-w-[420px] h-[650px] overflow-hidden rounded-[28px] border border-[#B38B2D]/20 shadow-lg group flex-shrink-0"
                >
                  <img
                    src={getImageUrl(cat.image)}
                    alt={cat.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F5C4A]/90 via-[#1F5C4A]/30 to-transparent" />

                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-4xl font-bold mb-2">
                      {cat.name}
                    </h3>

                    <p className="max-w-xs text-sm text-[#FDFBF5] opacity-95">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#b9defa] bg-white text-[#006bb6] shadow-lg transition hover:bg-[#eaf6ff] lg:flex"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}