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
   <section className="relative overflow-hidden bg-white py-20">
      <div className="container-royal">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex rounded-full border border-[#B38B2D]/30 bg-[#FFF8E8] px-5 py-2 text-sm font-bold text-[#1F5C4A]">
              ✨ Luxury Home Decor • B2B Supply • Bulk Orders
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              <span className="text-[#1F5C4A]">
                Premium Home Decor &
              </span>

              <span className="block text-[#B38B2D]">
                Luxury Living Collection
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#2F3A3A]">
              Gogaji International offers a curated collection of luxury
              home decor products including decorative vases, artificial
              floral arrangements, planters, pooja decor, trays,
              candle holders and elegant interior accents.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#2F3A3A]">
              Trusted by retailers, interior designers, event planners,
              hotels and corporate buyers for premium quality decor,
              bulk procurement and wholesale pricing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#38C172]
                px-8
                py-4
                text-sm
                font-bold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:bg-[#2FB865]
                hover:-translate-y-1
                "
              >
                Shop Collection
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/request-bom"
                className="
  inline-flex
  items-center
  justify-center
  rounded-full
  bg-[#B38B2D]
  px-8
  py-4
  text-sm
  font-bold
  text-white
  shadow-lg
  transition-all
  duration-300
  hover:bg-[#9D7824]
  hover:-translate-y-1
  hover:shadow-xl
  "
              >
                <span className="text-white">
                  Request Bulk Quote
                </span>
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-[#1F5C4A]">
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
                  className="
                  group
                  rounded-[28px]
                  border
                  border-[#B38B2D]/15
                  bg-white
                  p-7
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  "
                >
                  <div className="
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#E8F8EE]
                    text-[#1F5C4A]
                  ">
                    <Icon size={26} />
                  </div>

                  <h2 className="text-xl font-bold text-[#1F5C4A]">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#5A6464]">
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