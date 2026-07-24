import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Headphones, House, Truck } from "lucide-react";

const benefits = [
  { label: "Premium\nQuality", icon: Award },
  { label: "Modern\nDesigns", icon: House },
  { label: "Pan India\nDelivery", icon: Truck },
  { label: "Dedicated\nSupport", icon: Headphones },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full overflow-hidden">
      {/* Full-bleed banner: no container, no outer white space, no blur. */}
      <div className="relative isolate h-[620px] w-full overflow-hidden md:h-[650px]">
        <Image
          src="/banner/HomeDecor.png"
          alt="Premium home decor collection by Gogaji International"
          fill
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />

        <div className="relative z-10 flex h-full max-w-[560px] flex-col justify-center px-7 py-10 sm:px-12 md:px-16 lg:px-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#B38B2D] md:text-sm">
            Beautify Your World
          </p>

          <h2 className="font-serif text-4xl font-semibold leading-[1.04] text-[#254431] sm:text-5xl md:text-6xl">
            Premium Home<br />Decor Collection
          </h2>

          <div className="my-5 flex items-center gap-3 text-[#B38B2D]">
            <span className="h-px w-14 bg-[#B38B2D]/60" />
            <span className="text-xl">✦</span>
            <span className="h-px w-14 bg-[#B38B2D]/60" />
          </div>

          <p className="max-w-sm text-base font-medium leading-6 text-[#314637] md:text-lg">
            Elegant designs. Premium quality.<br />Inspired living.
          </p>

          <div className="mt-7 grid max-w-[430px] grid-cols-4">
            {benefits.map(({ label, icon: Icon }, index) => (
              <div key={label} className={`px-2 text-center ${index !== 0 ? "border-l border-[#8b7b51]/25" : ""}`}>
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0e7]/85 text-[#294734]">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <span className="mt-2 block whitespace-pre-line text-[10px] font-bold uppercase leading-3 text-[#294734] md:text-[11px]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-md bg-[#294734] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d3827] hover:shadow-xl"
          >
            Discover More <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
