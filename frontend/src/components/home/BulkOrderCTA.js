import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const points = [
  "Bulk & wholesale order support",
  "Corporate gifting solutions",
  "Hotels, resorts & interior projects",
  "Pan India delivery with GST billing",
];

export default function BulkOrderCTA() {
  return (
    <section className="py-20 bg-[#faf6fd]">
      <div className="container-royal">
        <div className="overflow-hidden rounded-[36px] border border-[#e5d6f3] bg-gradient-to-r from-[#8a5db2] via-[#a67cc7] to-[#c5a6de] p-8 text-white shadow-2xl md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

            {/* LEFT CONTENT */}
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/15 px-5 py-2 text-sm font-bold backdrop-blur">
                ✨ Bulk Orders & Corporate Gifting
              </p>

              <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
                Looking For Premium Home Decor In Bulk?
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/90">
                Gogaji International supplies luxury home decor products,
                decorative vases, artificial floral arrangements, planters,
                pooja essentials, trays, candle holders and elegant gifting
                collections for retailers, hotels, interior designers and
                corporate buyers across India.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">
                Get special wholesale pricing, project-based sourcing and
                dedicated support for bulk procurement requirements.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/request-bom"
                  className="inline-flex items-center gap-2 rounded-full bg-[#5D4475] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#4C3761]"
                >
                  Bulk Decor Inquiry
                </Link>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
                >
                  Explore Collection
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* RIGHT FEATURES */}
            <div className="rounded-[30px] border border-white/20 bg-white/10 p-7 backdrop-blur-lg">
              {points.map((text) => (
                <div
                  key={text}
                  className="mb-5 flex items-center gap-4 last:mb-0"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <CheckCircle2 size={22} />
                  </div>

                  <span className="text-base font-semibold">
                    {text}
                  </span>
                </div>
              ))}

              <div className="mt-8 rounded-2xl bg-white/10 p-5 text-center">
                <h3 className="text-3xl font-extrabold">
                  5000+
                </h3>
                <p className="mt-1 text-sm text-white/90">
                  Premium Decor Products Available
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}