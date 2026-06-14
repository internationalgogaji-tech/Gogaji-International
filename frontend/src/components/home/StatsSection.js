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
    <section className="bg-white py-16">
      <div className="container-royal">
        <div className="grid gap-5 rounded-[40px] border border-[#eadcf7] bg-[#faf6fd] p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-[#f1e7fa] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-4xl font-extrabold text-[#8a5db2]">
                {item.value}
              </h2>

              <p className="mt-3 text-base font-semibold text-[#6b7280]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}