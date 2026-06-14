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
    <section className="bg-[#faf6fd] py-16">
      <div className="container-royal">

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#8a5db2]">
            Why Choose Gogaji
          </p>

          <h2 className="text-4xl font-extrabold text-[#5d4475] md:text-5xl">
            Premium Decor Solutions
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-[#7b7288]">
            Discover luxury home decor collections designed for elegant living
            spaces, gifting and commercial projects.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {serviceItems.map((item) => (
            <div
              key={item.title}
              className="group rounded-[28px] border border-[#eadcf7] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#f7effd]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[80px] w-[80px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#5d4475]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#7b7288]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}