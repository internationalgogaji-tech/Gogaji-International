import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    company: "Interior Designer",
    text: "The quality of decor products from Gogaji International is exceptional. Their premium vases and decorative accents perfectly complement our luxury interior projects.",
  },
  {
    name: "Rahul Mehta",
    company: "Hotel Procurement Manager",
    text: "We regularly source decorative products for our hospitality projects. The designs, packaging and service quality have always exceeded expectations.",
  },
  {
    name: "Neha Kapoor",
    company: "Corporate Buyer",
    text: "Gogaji International provided elegant gifting and decor solutions for our corporate events. The products received excellent feedback from our clients and partners.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#faf6fd]">
      <div className="container-royal">

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#8a5db2]">
            Customer Testimonials
          </p>

          <h2 className="text-4xl font-extrabold text-[#5d4475] md:text-5xl">
            Loved By Customers Across India
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-[#7b7288]">
            Discover why homeowners, interior designers, hotels and corporate
            buyers trust Gogaji International for premium home decor and luxury
            gifting solutions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((item) => (
            <div
              key={item.name}
              className="rounded-[30px] border border-[#eadcf7] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex gap-1 text-[#d4a64a]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-sm leading-8 text-[#6b7280]">
                “{item.text}”
              </p>

              <div className="mt-6 border-t border-[#f0e7f8] pt-5">
                <h3 className="text-lg font-bold text-[#5d4475]">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-[#8a5db2]">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}