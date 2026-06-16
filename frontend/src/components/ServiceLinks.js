"use client";

const serviceItems = [
  {
    title: "Premium Decor",
    description: "Luxury vases, planters and elegant home styling products",
    image: "/service-icons/ezbill.png",
  },
  {
    title: "Corporate Gifting",
    description: "Exclusive gifting collections for businesses and events",
    image: "/service-icons/ezbuy.png",
  },
  {
    title: "Bulk Orders",
    description: "Special wholesale pricing for large quantity purchases",
    image: "/service-icons/ezreview.png",
  },
  {
    title: "Interior Projects",
    description: "Decor solutions for hotels, offices and interior designers",
    image: "/service-icons/QuoteRequest.jpeg",
  },
  {
    title: "Pan India Delivery",
    description: "Reliable shipping with secure packaging across India",
    image: "/service-icons/ordrstatus.webp",
  },
];

export default function ServiceLinks() {
  return (
    <section className="bg-white py-20">
      <div className="container-royal">

        {/* Heading */}
        <div className="mb-14 text-center">

          <div
            className="
            inline-flex
            items-center
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
            ✨ Why Choose Gogaji
          </div>

          <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">
            <span className="text-[#1F5C4A]">
              Premium Decor
            </span>{" "}
            <span className="text-[#B38B2D]">
              Solutions
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#5A6464]">
            Discover luxury home decor collections designed for elegant
            living spaces, gifting solutions, hospitality projects
            and wholesale procurement requirements.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

          {serviceItems.map((item) => (
            <div
              key={item.title}
              className="
              group
              rounded-[28px]
              border
              border-[#B38B2D]/15
              bg-white
              p-6
              text-center
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
              "
            >
              <div
                className="
                mx-auto
                flex
                h-[120px]
                w-[120px]
                items-center
                justify-center
                rounded-full
                bg-[#E8F8EE]
                transition-all
                duration-300
                group-hover:bg-[#FFF8E8]
                "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                  h-[80px]
                  w-[80px]
                  object-contain
                  transition-all
                  duration-300
                  group-hover:scale-110
                  "
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#1F5C4A]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#5A6464]">
                {item.description}
              </p>

              <div className="mx-auto mt-5 h-[3px] w-12 rounded-full bg-[#B38B2D]" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}