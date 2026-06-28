"use client";

import Link from "next/link";
import {
  LoaderCircle,
  Sparkles,
  Leaf,
  Flower2,
  Home,
  ShieldCheck,
  Truck,
  PackageSearch,
  LampDesk,
  ShoppingBag,
  HeartHandshake,
} from "lucide-react";

const iconMap = {
  Sparkles,
  Leaf,
  Flower2,
  Home,
  ShieldCheck,
  Truck,
  PackageSearch,
  LampDesk,
  ShoppingBag,
  HeartHandshake,
};

const fallbackLoader = {
  title: "Elegant Home Decor For Modern Living",
  subtitle: "Premium Home Decor • Fast Procurement • B2B Supply",
  description:
    "Goga Ji International supplies premium planters, vases, candle holders, pooja essentials, trays, urlis and luxury home decor accessories crafted to elevate modern living spaces.",
  seoHeading: "Premium Home Decor Sourcing Made Easy",
  seoParagraph:
    "Goga Ji International helps retailers, interior designers, hotels, event planners and bulk buyers source stylish home decor products including planters, vases, pooja and mandir items, candle holders, trays, urlis and decor accents.",
  bottomContent:
    "Shop elegant home decor, premium quality accessories and bulk procurement products with reliable pan India delivery support.",
  keywords: [
    { label: "Planters & Vases", link: "/products?category=planters-vases" },
    { label: "Pooja & Mandir", link: "/products?category=pooja-mandir" },
    { label: "Candle Holders", link: "/products?category=candle-holders" },
    { label: "Decor Accents", link: "/products?category=decor-accents" },
    { label: "Trays & Urlis", link: "/products?category=trays-urlis" },
  ],
  cards: [
    {
      title: "Premium Home Decor",
      description:
        "Elegant decor pieces, luxury accessories and stylish products for homes, hotels and interiors.",
      icon: "Sparkles",
      link: "/products",
    },
    {
      title: "Planters & Vases",
      description:
        "Beautiful ceramic, metal and designer planters, flower vases and table styling products.",
      icon: "Flower2",
      link: "/products?category=planters-vases",
    },
    {
      title: "Bulk Procurement",
      description:
        "Fast sourcing support for retailers, interior projects, gifting suppliers and B2B buyers.",
      icon: "PackageSearch",
      link: "/request-products",
    },
    {
      title: "Pan India Delivery",
      description:
        "Reliable shipping support for decor products, bulk orders and premium collections.",
      icon: "Truck",
      link: "/track-request",
    },
  ],
  trustedBrands: [
    { name: "Premium Quality" },
    { name: "Elegant Styling" },
    { name: "Pan India Delivery" },
    { name: "Bulk Orders" },
    { name: "B2B Supply" },
  ],
};

export default function SeoLoaderContent({ loader }) {
  const data = loader || fallbackLoader;

  const keywords = (data.keywords || fallbackLoader.keywords).filter(
    (item) => item?.label
  );

  const cards = (data.cards || fallbackLoader.cards)
    .filter((item) => item?.isActive !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));

  const brands = (data.trustedBrands || fallbackLoader.trustedBrands)
    .filter((item) => item?.isActive !== false)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fbfaf4] px-4 py-8 text-[#11231c] sm:px-6 lg:px-10">
      <div className="absolute left-8 top-10 h-32 w-32 rounded-full border-[14px] border-[#d9ead7]" />
      <div className="absolute right-10 bottom-10 h-44 w-44 rounded-full border-[16px] border-[#efe2b8]" />
      <div className="absolute right-24 top-20 h-8 w-8 rounded-full bg-[#c19a2e]/30" />
      <div className="absolute left-1/4 bottom-20 h-5 w-5 rounded-full bg-[#1f604d]/25" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d6bd72] bg-white px-5 py-3 text-sm font-extrabold text-[#1f604d] shadow-sm">
              <LoaderCircle className="animate-spin" size={18} />
              Loading Goga Ji International Home Decor
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-[#1f604d] md:text-6xl">
              {data.title}
            </h1>

            <h2 className="mt-4 text-xl font-extrabold leading-snug text-[#c09324] md:text-2xl">
              {data.subtitle}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              {data.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {keywords.slice(0, 10).map((item, index) => {
                const chip = (
                  <span className="inline-flex rounded-full border border-[#e3cd88] bg-white px-4 py-2 text-xs font-extrabold uppercase text-[#1f604d] shadow-sm">
                    {item.label}
                  </span>
                );

                return item.link ? (
                  <Link key={index} href={item.link}>
                    {chip}
                  </Link>
                ) : (
                  <span key={index}>{chip}</span>
                );
              })}
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#e7eadf]">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-[#1f604d]" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.slice(0, 4).map((card, index) => {
              const Icon = iconMap[card.icon] || Sparkles;

              return (
                <Link
                  key={`${card.title}-${index}`}
                  href={card.link || "/products"}
                  className="group rounded-[24px] border border-[#eadba9] bg-white p-5 shadow-[0_18px_50px_rgba(31,96,77,0.10)] transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-[#eef7ed] p-4 text-[#1f604d]">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-lg font-black text-[#11231c]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.description}
                  </p>
                </Link>
              );
            })}

            <div className="rounded-[24px] border border-[#d6bd72] bg-[#1f604d] p-5 text-white shadow-[0_18px_50px_rgba(31,96,77,0.18)]">
              <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-4">
                <LampDesk size={30} />
              </div>

              <h3 className="text-lg font-black">Preparing Catalogue</h3>

              <p className="mt-3 text-sm leading-7 text-white/80">
                Loading premium decor categories, product collections, request
                options and bulk order details.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[26px] border border-[#eadba9] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Home className="text-[#1f604d]" />
              <h3 className="text-xl font-black text-[#11231c]">
                {data.seoHeading}
              </h3>
            </div>

            <p className="mt-5 text-sm leading-8 text-slate-700 md:text-base">
              {data.seoParagraph}
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">
              {data.bottomContent}
            </p>
          </div>

          <div className="rounded-[26px] border border-[#eadba9] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-[#11231c]">
              Why Choose Goga Ji
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {brands.slice(0, 12).map((brand, index) => (
                <span
                  key={`${brand.name}-${index}`}
                  className="rounded-full bg-[#eef7ed] px-3 py-2 text-xs font-extrabold text-[#1f604d]"
                >
                  {brand.name}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Finding elegant home decor products, premium collections, request
              support and reliable delivery options for your order.
            </p>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#fbfaf4] p-4 text-sm font-bold text-[#1f604d]">
              <ShieldCheck size={20} />
              Premium quality decor with trusted sourcing support.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}