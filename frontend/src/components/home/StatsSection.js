const stats = [
  {
    value: "5000+",
    label: "Luxury Decor Products",
  },
  {
    value: "1000+",
    label: "Happy Customers",
  },
  {
    value: "24/7",
    label: "Customer Support",
  },
  {
    value: "PAN India",
    label: "Delivery Network",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-royal">

        <div
          className="
          grid
          gap-6
          rounded-[40px]
          border
          border-[#B38B2D]/15
          bg-[#FFFDF8]
          p-6
          shadow-sm
          sm:grid-cols-2
          lg:grid-cols-4
          "
        >
          {stats.map((item) => (
            <div
              key={item.label}
              className="
              rounded-[28px]
              border
              border-[#B38B2D]/15
              bg-white
              p-8
              text-center
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
              "
            >
              <h2
                className="
                text-4xl
                font-extrabold
                text-[#B38B2D]
                "
              >
                {item.value}
              </h2>

              <div
                className="
                mx-auto
                mt-4
                h-[3px]
                w-12
                rounded-full
                bg-[#1F5C4A]
                "
              />

              <p
                className="
                mt-4
                text-base
                font-semibold
                text-[#1F5C4A]
                "
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}