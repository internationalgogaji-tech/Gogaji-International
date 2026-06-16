import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const points = [
  "Bulk & Wholesale Order Support",
  "Corporate Gifting Solutions",
  "Hotels, Resorts & Interior Projects",
  "Pan India Delivery With GST Billing",
];

export default function BulkOrderCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container-royal">

        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-[#B38B2D]/20 bg-[#FFF8E8] px-5 py-2 text-sm font-bold text-[#1F5C4A]">
            ✨ Bulk Orders & Corporate Gifting
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold">
            <span className="text-[#1F5C4A]">
              Looking For Premium
            </span>
            <br />
            <span className="text-[#B38B2D]">
              Home Decor In Bulk?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-[#5A6464]">
            Gogaji International supplies luxury home decor products,
            decorative vases, artificial floral arrangements, planters,
            pooja essentials, trays, candle holders and elegant gifting
            collections for retailers, hotels, interior designers and
            corporate buyers across India.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">

          {/* Left Card */}
          <div
            className="
            rounded-[32px]
            border
            border-[#B38B2D]/15
            bg-white
            p-8
            shadow-lg
            "
          >
            <h3 className="text-3xl font-extrabold text-[#1F5C4A]">
              Bulk Procurement &
              <span className="block text-[#B38B2D]">
                Corporate Solutions
              </span>
            </h3>

            <p className="mt-5 text-[#5A6464] leading-8">
              Get special wholesale pricing, project-based sourcing,
              hospitality decor solutions and dedicated support for
              large volume procurement requirements.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

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
                "
              >
                Bulk Decor Inquiry
              </Link>

              <Link
                href="/products"
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#1F5C4A]
                bg-white
                px-8
                py-4
                text-sm
                font-bold
                text-[#1F5C4A]
                transition-all
                duration-300
                hover:bg-[#E8F8EE]
                "
              >
                Explore Collection
                <ArrowRight size={18} />
              </Link>

            </div>
          </div>

          {/* Right Card */}
          <div
            className="
            rounded-[32px]
            border
            border-[#B38B2D]/15
            bg-white
            p-8
            shadow-lg
            "
          >
            {points.map((text) => (
              <div
                key={text}
                className="mb-5 flex items-center gap-4 last:mb-0"
              >
                <div
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E8F8EE]
                  text-[#1F5C4A]
                  "
                >
                  <CheckCircle2 size={22} />
                </div>

                <span className="font-semibold text-[#2F3A3A]">
                  {text}
                </span>
              </div>
            ))}

            <div
              className="
              mt-8
              rounded-[24px]
              bg-[#FFF8E8]
              border
              border-[#B38B2D]/20
              p-6
              text-center
              "
            >
              <h3 className="text-4xl font-extrabold text-[#B38B2D]">
                5000+
              </h3>

              <p className="mt-2 text-sm text-[#1F5C4A] font-medium">
                Premium Decor Products Available
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}