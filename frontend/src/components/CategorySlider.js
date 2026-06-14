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
      <section className="w-full bg-[#f5fbff] py-16">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[380px] animate-pulse rounded-[28px] bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!visibleCategories.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#f5fbff] py-16">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="mb-14 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 px-6 py-3 text-sm font-bold text-purple-700 shadow-sm">
            <Layers3 size={18} />
            Premium Home Decor Collections
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">

            <span className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Discover Luxury
            </span>

            <br />

            <span className="text-[#1e1b4b]">
              Home Decor Categories
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-5xl text-lg md:text-xl leading-9 text-slate-600">
            Explore premium decorative vases, luxury planters, candle holders,
            pooja essentials, wall decor, decorative accents and elegant home
            accessories crafted to elevate modern living spaces.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <span className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2 text-white font-semibold shadow-md">
              Decorative Vases
            </span>

            <span className="rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-2 text-white font-semibold shadow-md">
              Luxury Planters
            </span>

            <span className="rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2 text-white font-semibold shadow-md">
              Candle Holders
            </span>

            <span className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-white font-semibold shadow-md">
              Wall Decor
            </span>

            <span className="rounded-full bg-gradient-to-r from-rose-600 to-pink-500 px-5 py-2 text-white font-semibold shadow-md">
              Home Accessories
            </span>

          </div>

          <div className="mt-10">
            <Link
              href="/categories"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#ec4899] px-10 py-4 text-lg font-extrabold text-white shadow-xl transition hover:scale-105"
            >
              <Grid3X3 size={22} className="text-white" />

              <span className="text-white">
                Explore All Collections
              </span>

              <ChevronRight size={20} className="text-white" />
            </Link>
          </div>

        </div>

        <div className="relative w-full">
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#b9defa] bg-white text-[#006bb6] shadow-lg transition hover:bg-[#eaf6ff] lg:flex"
          >
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
                className="relative min-w-[420px] h-[650px] overflow-hidden rounded-xl group flex-shrink-0"
              >
                <img
                  src={getImageUrl(cat.image)}
                  alt={cat.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-4xl font-bold mb-2">
                    {cat.name}
                  </h3>

                  <p className="max-w-xs text-sm opacity-90">
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
    </section>
  );
}