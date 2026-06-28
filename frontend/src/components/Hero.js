"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, FileText, ShieldCheck, Truck, Wrench } from "lucide-react";
import { API_BASE } from "@/lib/api";

const fallbackSlides = [
  {
    image: "/banner/hero-1.jpg",

    label: "PREMIUM HOME DECOR",

    title1: "Luxury Home Decor",

    title2: "For Elegant Spaces",

    item: "Premium Vases, Decorative Accents & Luxury Living",

    description:
      "Discover handcrafted decorative accessories, statement vases, candle holders and luxury home accents designed for modern homes, hospitality projects and interior styling professionals.",

    primaryText: "Shop Collection",

    primaryLink: "/products",

    secondaryText: "Explore Categories",

    secondaryLink: "/categories",
  },

  {
    image: "/banner/hero-2.jpg",

    label: "PREMIUM PLANTERS",

    title1: "Premium Planters",

    title2: "For Modern Living",

    item: "Indoor Planters, Ceramic Pots & Green Styling",

    description:
      "Explore designer planters, ceramic pots and decorative greenery accessories crafted to elevate homes, offices and luxury interior spaces.",

    primaryText: "Shop Planters",

    primaryLink: "/products",

    secondaryText: "View Collection",

    secondaryLink: "/categories",
  },

  {
    image: "/banner/hero-3.jpg",

    label: "LUXURY VASE COLLECTION",

    title1: "Luxury Vases",

    title2: "For Timeless Interiors",

    item: "Ceramic Vases, Floral Decor & Accent Styling",

    description:
      "Premium ceramic vases and decorative floral accessories designed to create elegant interiors and sophisticated living spaces.",

    primaryText: "Shop Vases",

    primaryLink: "/products",

    secondaryText: "Explore Collection",

    secondaryLink: "/categories",
  },

  {
    image: "/banner/hero-4.jpg",

    label: "ELEGANT CANDLE HOLDERS",

    title1: "Decorative Candle Holders",

    title2: "For Luxury Ambience",

    item: "Premium Candle Stands & Table Styling",

    description:
      "Transform your home with elegant candle holders, luxury table accents and decorative accessories designed for modern interiors.",

    primaryText: "Shop Decor",

    primaryLink: "/products",

    secondaryText: "Explore Collection",

    secondaryLink: "/categories",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    text: "Premium Quality Decor",
  },
  {
    icon: Truck,
    text: "Pan India Delivery",
  },
  {
    icon: Wrench,
    text: "Elegant Home Styling",
  },
];

function getImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads")) return `${API_BASE}${url}`;
  return url;
}

export default function Hero() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedTitle1, setTypedTitle1] = useState("");
  const [typedTitle2, setTypedTitle2] = useState("");
  const [typedItem, setTypedItem] = useState("");

  const activeSlide = useMemo(() => {
    return slides[currentSlide] || slides[0] || fallbackSlides[0];
  }, [slides, currentSlide]);

  useEffect(() => {
    console.log("TOTAL SLIDES =", slides.length);
    console.log("CURRENT SLIDE =", currentSlide);
  }, [slides, currentSlide]);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hero-slides`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.success && Array.isArray(data.slides) && data.slides.length) {
          const activeSlides = data.slides
            .filter((slide) => slide.isActive !== false)
            .sort(
              (a, b) =>
                Number(a.order || 0) - Number(b.order || 0) ||
                new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
            );

          if (activeSlides.length) {
            setSlides(activeSlides);
            setCurrentSlide(0);
          }
        }
      } catch (error) {
        console.error("Hero slides fetch error:", error);
      }
    };

    fetchHeroSlides();
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 second

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    const fullTitle1 = activeSlide?.title1 || "";
    const fullTitle2 = activeSlide?.title2 || "";
    const fullItem = activeSlide?.item || "";

    setTypedTitle1("");
    setTypedTitle2("");
    setTypedItem("");

    let title1Index = 0;
    let title2Index = 0;
    let itemIndex = 0;

    let title2Timer = null;
    let itemTimer = null;

    const title1Timer = setInterval(() => {
      title1Index += 1;
      setTypedTitle1(fullTitle1.slice(0, title1Index));

      if (title1Index >= fullTitle1.length) {
        clearInterval(title1Timer);

        title2Timer = setInterval(() => {
          title2Index += 1;
          setTypedTitle2(fullTitle2.slice(0, title2Index));

          if (title2Index >= fullTitle2.length) {
            clearInterval(title2Timer);

            itemTimer = setInterval(() => {
              itemIndex += 1;
              setTypedItem(fullItem.slice(0, itemIndex));

              if (itemIndex >= fullItem.length) {
                clearInterval(itemTimer);
              }
            }, 60);
          }
        }, 60);
      }
    }, 60);

    return () => {
      clearInterval(title1Timer);
      if (title2Timer) clearInterval(title2Timer);
      if (itemTimer) clearInterval(itemTimer);
    };
  }, [activeSlide]);

  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-[#FDFBF5] sm:min-h-[590px] md:min-h-[560px] lg:min-h-[540px]">
      {slides.map((slide, index) => (
        <div
          key={slide._id || slide.image || index}
          className={`absolute inset-0 bg-cover bg-[78%_center] transition-opacity duration-[2000ms] sm:bg-[72%_center] md:bg-center ${currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url('${getImageUrl(slide.image)}')`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-r from-white/82 via-white/35 to-transparent sm:from-white/78 sm:via-white/25 sm:to-transparent lg:from-white/72 lg:via-white/15 lg:to-transparent"
      />

      <div className="container-royal relative z-10 flex min-h-[650px] items-center px-4 py-8 sm:min-h-[590px] sm:px-6 md:min-h-[560px] lg:min-h-[540px]">
        <div className="w-full max-w-[560px] rounded-[32px] p-2">          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#DCCB9E] bg-[#FDFBF5] px-3 py-2 text-[11px] font-bold text-[#2F3A3A] shadow-sm sm:px-4 sm:text-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#B38B2D]" />
          <span className="truncate">
            {activeSlide?.label || "Premium Home Decor"} • Fast
            Procurement • B2B Supply
          </span>
        </div>

          <h1 className="max-w-3xl text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[40px] md:text-[46px] lg:text-[52px]">
            <span className="text-[#1F5C4A]">
              {typedTitle1}
            </span>
            <br />
            <span className="text-[#B38B2D]">
              {typedTitle2}
            </span>
          </h1>

          <div className="mt-3 text-[16px] font-bold sm:text-[18px] md:text-[20px]">
            <span className="text-[#0f172a]">We supply </span>
            <span className="inline-block text-[#25D366]">
              {typedItem}
            </span>
          </div>

          <div className="mt-2 text-[13px] font-semibold text-[#B38B2D] sm:text-[14px]">
            Luxury Home Decor • Stylish Living • Premium Collection
          </div>

          <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-[#2F3A3A] sm:text-[15px] md:text-[16px]">
            {activeSlide?.description ||
              "Discover premium home decor products, elegant planters, decorative accents, candle holders and luxury styling pieces with reliable bulk supply support."}
          </p>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            {/* Primary Button */}
            <Link
              href={activeSlide?.primaryLink || "/products"}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1F5C4A] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:bg-[#18483A] hover:-translate-y-1 hover:shadow-2xl sm:w-auto"            >
              <ArrowRight
                size={18}
                className="text-white transition-transform duration-300 group-hover:translate-x-1"
              />

              <span className="text-white">
               {activeSlide?.primaryText || "Shop Collection"}
              </span>
            </Link>

            {/* Secondary Button */}
            <Link
              href={activeSlide?.secondaryLink || "/categories"}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#B38B2D] px-8 py-4 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(179,139,45,0.25)] transition-all duration-300 hover:bg-[#9E7725] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(179,139,45,0.35)] sm:w-auto"
            >
              <FileText
                size={18}
                className="text-white transition-transform duration-300 group-hover:scale-110"
              />

              <span className="text-white">
                {activeSlide?.secondaryText || "View Collection"}
              </span>
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-2xl border border-[#E8D8AE] bg-[#FDFBF5] backdrop-blur-sm px-4 py-3 text-sm font-bold text-[#2F3A3A] shadow-lg"                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1F5C4A] text-white">
                    <Icon size={18} />
                  </span>
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide._id || slide.image || index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                ? "w-8 bg-[#25D366]"
                : "w-2.5 bg-[#BBF7D0]"
                }`}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
