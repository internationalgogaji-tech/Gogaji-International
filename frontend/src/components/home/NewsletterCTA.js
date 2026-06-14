import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <section className="bg-[#faf6fd] py-16">
      <div className="container-royal">
        <div className="grid gap-8 rounded-[36px] border border-[#eadcf7] bg-white p-8 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-12">

          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#8a5db2]">
              <Mail size={18} />
              Bulk Orders & Corporate Gifting
            </p>

            <h2 className="text-3xl font-extrabold text-[#5d4475] md:text-4xl">
              Looking For Premium Home Decor Solutions?
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[#7b7288]">
              Whether you're sourcing luxury decor for your home, hotel,
              office, retail store or corporate gifting requirements,
              Gogaji International offers premium collections with
              wholesale pricing and dedicated customer support.
            </p>
          </div>

          <Link
            href="/request-bom"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8a5db2] to-[#b28ad4] px-8 py-4 text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105"
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