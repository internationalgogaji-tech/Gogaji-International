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
    <section className="py-20 bg-white">
      <div className="container-royal">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B38B2D]">
              Why Choose Gogaji
            </p>

            <h2 className="text-4xl font-extrabold leading-tight text-[#1F5C4A] md:text-5xl">
              Elevate Every Space With
              <span className="block text-[#B38B2D]">
                Premium Home Decor
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#5A6464]">
              Gogaji International offers thoughtfully curated home decor
              collections designed to add elegance, warmth and sophistication
              to homes, offices, hotels and commercial spaces.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#5A6464]">
              From decorative vases and planters to gifting collections and
              luxury accents, we help customers create beautiful interiors
              with premium quality products.
            </p>

            <Link
              href="/products"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
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
                className="
                  flex
                  items-center
                  gap-4
                  rounded-[24px]
                  border
                  border-[#B38B2D]/15
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E8F8EE]
                  "
                >
                  <CheckCircle2
                    className="text-[#1F5C4A]"
                    size={22}
                  />
                </div>

                <span className="font-semibold text-[#1F5C4A]">
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