import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <section className="bg-white py-16">
      <div className="container-royal">
        <div
          className="
          grid
          gap-8
          rounded-[36px]
          border
          border-[#B38B2D]/15
          bg-white
          p-8
          shadow-lg
          md:grid-cols-[1fr_auto]
          md:items-center
          md:p-12
        "
        >
          <div>
            <p
              className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#FFF8E8]
              px-4
              py-2
              text-sm
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#B38B2D]
            "
            >
              <Mail size={18} />
              Bulk Orders & Corporate Gifting
            </p>

            <h2 className="text-3xl font-extrabold text-[#1F5C4A] md:text-4xl">
              Looking For Premium
              <span className="block text-[#B38B2D]">
                Home Decor Solutions?
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[#5A6464]">
              Whether you're sourcing luxury decor for your home, hotel,
              office, retail store or corporate gifting requirements,
              Gogaji International offers premium collections with
              wholesale pricing and dedicated customer support.
            </p>
          </div>

          <Link
            href="/request-bom"
            className="
            inline-flex
            items-center
            justify-center
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
              Request Bulk Quote
            </span>

            <ArrowRight
              size={18}
              className="text-white"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}