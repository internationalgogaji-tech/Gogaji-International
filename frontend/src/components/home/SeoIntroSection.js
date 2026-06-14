import Link from "next/link";
import {
  ArrowRight,
  Home,
  Gift,
  Truck,
  BadgePercent,
} from "lucide-react";

const cards = [
  {
    icon: Home,
    title: "Premium Home Decor",
    text: "Luxury vases, planters, decorative accents and elegant home styling products.",
  },
  {
    icon: Gift,
    title: "Corporate & Bulk Gifting",
    text: "Special pricing for hotels, offices, events, resellers and corporate gifting projects.",
  },
  {
    icon: BadgePercent,
    title: "Wholesale Pricing",
    text: "Best rates for bulk orders with quantity discounts and procurement support.",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    text: "Fast and reliable shipping across India with secure packaging and tracking.",
  },
];

export default function SeoIntroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf6fd] to-white py-20">
      <div className="container-royal">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex rounded-full border border-[#d8c4ec] bg-[#f4ebfa] px-5 py-2 text-sm font-bold text-[#8a5db2]">
              ✨ Luxury Home Decor • B2B Supply • Bulk Orders
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#5d4475] md:text-6xl">
              Premium Home Decor &
              <span className="block text-[#b28ad4]">
                Luxury Living Collection
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#5f6373]">
              Gogaji International offers a curated collection of luxury
              home decor products including decorative vases, artificial
              floral arrangements, planters, pooja decor, trays,
              candle holders and elegant interior accents.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#5f6373]">
              Trusted by retailers, interior designers, event planners,
              hotels and corporate buyers for premium quality decor,
              bulk procurement and wholesale pricing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b28ad4] to-[#8a5db2] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
              >
                Shop Collection
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/request-bom"
                className="inline-flex items-center gap-2 rounded-full border border-[#cdb6e3] bg-white px-8 py-4 text-sm font-bold text-[#8a5db2] shadow-sm transition-all duration-300 hover:bg-[#f7f0fc]"
              >
                Request Bulk Quote
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-[#7a5d93]">
              <span>✓ Premium Quality</span>
              <span>✓ Bulk Orders</span>
              <span>✓ Corporate Gifting</span>
              <span>✓ Fast Shipping</span>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[28px] border border-[#eadcf7] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3e8fc] text-[#8a5db2]">
                    <Icon size={26} />
                  </div>

                  <h2 className="text-xl font-bold text-[#5d4475]">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}