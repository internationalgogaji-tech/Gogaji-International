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
    <section className="py-20 bg-white">
      <div className="container-royal">

        {/* Heading */}
        <div className="mb-14 text-center">

          <p
            className="
            mb-4
            inline-flex
            rounded-full
            border
            border-[#B38B2D]/20
            bg-[#FFF8E8]
            px-5
            py-2
            text-sm
            font-bold
            text-[#1F5C4A]
            "
          >
            ✨ Who We Serve
          </p>

          <h2 className="text-4xl font-extrabold md:text-5xl">
            <span className="text-[#1F5C4A]">
              Trusted By Businesses
            </span>{" "}
            <span className="text-[#B38B2D]">
              Across India
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5A6464]">
            Gogaji International supplies premium home decor products
            to hotels, interior designers, retailers, event planners
            and corporate buyers looking for luxury decor and gifting
            solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {industries.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                group
                rounded-[30px]
                border
                border-[#B38B2D]/15
                bg-white
                p-7
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                "
              >
                <div
                  className="
                  mb-5
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#E8F8EE]
                  text-[#1F5C4A]
                  transition-all
                  duration-300
                  group-hover:bg-[#FFF8E8]
                  group-hover:text-[#B38B2D]
                  "
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-[#1F5C4A]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#5A6464]">
                  {item.text}
                </p>

                <div className="mt-5 h-[3px] w-12 rounded-full bg-[#B38B2D]" />
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}