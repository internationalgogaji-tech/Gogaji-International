import {
  Hotel,
  Briefcase,
  Palette,
  Store,
} from "lucide-react";

const industries = [
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    text: "Premium decorative vases, planters, floral arrangements and luxury interior accents.",
  },
  {
    icon: Palette,
    title: "Interior Designers",
    text: "Elegant home styling products for residential, commercial and hospitality projects.",
  },
  {
    icon: Store,
    title: "Retail & Resellers",
    text: "Wholesale pricing and bulk inventory support for decor stores and online sellers.",
  },
  {
    icon: Briefcase,
    title: "Corporate Buyers",
    text: "Luxury gifting collections, event decor and corporate procurement solutions.",
  },
];

export default function IndustriesServed() {
  return (
    <section className="py-20 bg-[#faf6fd]">
      <div className="container-royal">

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[#8a5db2]">
            Who We Serve
          </p>

          <h2 className="text-4xl font-extrabold text-[#5d4475] md:text-5xl">
            Trusted By Businesses Across India
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6b7280]">
            Gogaji International supplies premium home decor products to
            hotels, interior designers, retailers, event planners and
            corporate buyers looking for luxury decor and gifting solutions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[30px] border border-[#eadcf7] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f3e8fc] text-[#8a5db2]">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-[#5d4475]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}