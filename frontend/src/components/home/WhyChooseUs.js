import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const points = [
  "Premium quality home decor products",
  "Elegant designs for modern interiors",
  "Bulk & wholesale order support",
  "Corporate gifting solutions",
  "Pan India delivery network",
  "Trusted by homeowners & businesses",
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#faf6fd]">
      <div className="container-royal">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#8a5db2]">
              Why Choose Gogaji
            </p>

            <h2 className="text-4xl font-extrabold leading-tight text-[#5d4475] md:text-5xl">
              Elevate Every Space With Premium Home Decor.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#7b7288]">
              Gogaji International offers thoughtfully curated home decor
              collections designed to add elegance, warmth and sophistication
              to homes, offices, hotels and commercial spaces.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#7b7288]">
              From decorative vases and planters to gifting collections and
              luxury accents, we help customers create beautiful interiors
              with premium quality products.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8a5db2] to-[#b28ad4] px-8 py-4 text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-white">
                Explore Collection
              </span>

              <ArrowRight
                size={18}
                className="text-white"
              />
            </Link>
          </div>

          {/* RIGHT FEATURES */}
          <div className="grid gap-5 sm:grid-cols-2">
            {points.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-[24px] border border-[#eadcf7] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CheckCircle2
                  className="shrink-0 text-[#8a5db2]"
                  size={22}
                />

                <span className="font-semibold text-[#5d4475]">
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}