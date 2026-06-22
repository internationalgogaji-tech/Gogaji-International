"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { getProductImage } from "@/lib/getProductImage";
import WishlistToggleButton from "@/components/WishlistToggleButton";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gogaji-international.onrender.com";

const getImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/500x500?text=No+Image";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
};

function getStockData(product) {
  const qty = Number(product?.stock || 0);

  const isOut =
    product?.isOutOfStock ||
    product?.stockStatus === "out_of_stock" ||
    qty <= 0;

  if (isOut) {
    return {
      label: product?.allowBackorder
        ? "Available on Request"
        : "Out of Stock",

      className:
        product?.allowBackorder
          ? "bg-[#fff7ed] text-[#c2410c]"
          : "bg-[#fee2e2] text-[#b91c1c]",

      isOut: true,
    };
  }

  if (qty <= 10 || product?.stockStatus === "low_stock") {
    return {
      label: "Only few left",
      className: "bg-[#FFF8E8] text-[#B38B2D]",
      isOut: false,
    };
  }

  return {
    label: "In Stock",
    className: "bg-[#E8F8EE] text-[#1F5C4A]",
    isOut: false,
  };
}

export default function ProductCard({ product }) {
  const image =
    product?.thumbnail ||
    product?.images?.find((img) => img?.isPrimary)?.url ||
    product?.images?.[0]?.url ||
    "";

  const productLink = `/product/${product?.slug || product?._id}`;
  const stockData = getStockData(product);
  const price = Number(product?.price || 0);
  const mrp = Number(product?.mrp || 0);
  const moq = Number(product?.moq || 1);
  const rating = 4.8;

  return (
    <div className="group overflow-hidden rounded-[24px] border border-[#B38B2D]/20 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
<div className="relative border-b border-[#B38B2D]/15 bg-[#F8F6F2]">
        <div className="absolute right-3 top-3 z-10">
          <WishlistToggleButton product={product} />
        </div>

        <Link href={productLink} className="block">
          <div className="h-[180px] overflow-hidden bg-[#F8F6F2]">
            <img
              src={getProductImage(product)}
              alt={product?.name || "Product"}
              className="
      w-full
      h-full
      h-[180px]

      object-cover
      object-center
      transition-all
      duration-500
      group-hover:scale-105
    "
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `${API_BASE}/uploads/new-products/LM358.jpg`;
              }}
            />
          </div>
        </Link>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-[5px] text-[11px] font-semibold ${stockData.className}`}
          >
            {stockData.label}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF8E8] px-3 py-[5px] text-[11px] font-semibold text-[#1F5C4A]">
            <Star size={12} className="fill-[#B38B2D] text-[#B38B2D]" />
            {rating}
          </span>
        </div>

        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#B38B2D]">
          {product?.brand || "Generic"}
        </p>

        <Link href={productLink}>
          <h3 className="mt-2 line-clamp-2 min-h-[52px] text-[17px] font-extrabold leading-[1.2] text-[#2F3A3A] transition hover:text-[#1F5C4A]">
            {product?.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-1 min-h-[24px] text-[13px] leading-6 text-[#5A6464]">
          {product?.shortDescription || "Industrial electronic component."}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#F7F4EC] px-3 py-[5px] text-[11px] font-semibold text-[#1F5C4A]">
            MOQ: {moq} {product?.unit || "piece"}
          </span>

          {Number(product?.stock || 0) > 0 ? (
            <span className="rounded-full bg-[#E8F8EE] px-3 py-[5px] text-[11px] font-semibold text-[#1F5C4A]">
              Stock: {Number(product?.stock || 0)}
            </span>
          ) : null}
        </div>

        <div className="mt-3">
          <div className="flex items-end gap-2">
            <span className="text-[18px] font-extrabold leading-none text-[#1F5C4A]">
              ₹{price.toLocaleString("en-IN")}
            </span>

            {mrp > price ? (
              <span className="text-[13px] font-semibold text-[#8a97a6] line-through">
                ₹{mrp.toLocaleString("en-IN")}
              </span>
            ) : null}

            {mrp > price ? (
              <span className="text-[12px] font-semibold text-[#B38B2D]">
                ({Math.round(((mrp - price) / mrp) * 100)}% OFF)
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-[11px] leading-5 text-[#6A7373]">
            Ex. GST • Bulk procurement ready
          </p>
        </div>

        {stockData.isOut ? (
          <div className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#B38B2D]/30 bg-[#FFF8E8] text-[#B38B2D] font-extrabold text-red-700">
            <ShoppingCart size={16} />
            {product?.allowBackorder
              ? "Request Availability"
              : "Out Of Stock"}
          </div>
        ) : (
          <Link
            href={productLink}
            className="
    mt-4
    flex
    h-[50px]
    w-full
    items-center
    justify-center
    gap-2
    rounded-full
    bg-[#B38B2D]
    text-[15px]
    font-bold
    text-white
    shadow-md
    transition-all
    duration-300
    hover:bg-[#9D7824]
    hover:shadow-[0_10px_25px_rgba(179,139,45,0.35)]
    hover:-translate-y-0.5
  "
          >
            <ShoppingCart
              size={18}
              className="text-white flex-shrink-0"
            />

            <span className="text-white">
              View Details
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}