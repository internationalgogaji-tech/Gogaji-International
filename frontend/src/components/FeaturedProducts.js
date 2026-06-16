"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { API_BASE } from "@/lib/api";

const fallbackSection = {
  title: "Semiconductor Products",
  subtitle:
    "Explore ICs, voltage regulators, transistors, MOSFETs and other semiconductor components for wholesale supply.",
  categorySlug: "semiconductors",
  limit: 8,
  viewAllText: "View All",
  viewAllLink: "/products?category=semiconductors",
};

export default function FeaturedProducts() {
  const [section, setSection] = useState(fallbackSection);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSection = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/home-sections`, {
        cache: "no-store",
      });

      const data = await res.json();

      const selected = (data.sections || []).find(
        (item) => item.key === "featured-products"
      );

      if (selected) {
        setSection({
          ...fallbackSection,
          ...selected,
        });
        return selected;
      }
    } catch (error) {
      console.error("Home section fetch error:", error);
    }

    return fallbackSection;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const activeSection = await fetchSection();

        const category = activeSection?.categorySlug || "semiconductors";
        const limit = activeSection?.limit || 8;

        const res = await fetch(
          `${API_BASE}/api/products?category=${encodeURIComponent(
            category
          )}&limit=${limit}`,
          { cache: "no-store" }
        );

        const data = await res.json();

        if (data?.success) {
          setProducts(data.products || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Featured products fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (section?.isActive === false) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-royal">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#B38B2D]/30 bg-[#FFF8E8] px-5 py-2 text-sm font-semibold text-[#1F5C4A] mb-4">
              Premium Home Decor Collection
            </span>

            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              <span className="text-[#1F5C4A]">
                {section.title?.split(" ")[0] || "Featured"}
              </span>{" "}
              <span className="text-[#B38B2D]">
                {section.title?.split(" ").slice(1).join(" ") || "Products"}
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-lg text-[#2F3A3A]">
              {section.subtitle}
            </p>
          </div>

          <Link
            href={section.viewAllLink || "/products"}
            className="hidden md:inline-flex items-center rounded-full bg-[#B38B2D] px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#9A7624]"          >
            <span className="text-white">
              {section.viewAllText || "View All"}
            </span>
          </Link>
        </div>

        {loading ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(Number(section.limit || 8))].map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-[24px] border border-[#B38B2D]/20 bg-[#FFFDF8]"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.slug}
                  product={product}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center md:hidden">
              <Link
                href={section.viewAllLink || "/products"}
                className="inline-flex rounded-full bg-[#B38B2D] px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#9A7624]"              >
                <span className="text-white">
                  {section.viewAllText || "View All"}
                </span>
              </Link>
            </div>
          </>
        ) : (
         <div className="rounded-[24px] border border-[#B38B2D]/20 bg-white p-8 text-center shadow-sm">
           <p className="text-sm text-[#2F3A3A]">
              No products available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}