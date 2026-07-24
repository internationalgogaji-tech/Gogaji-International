import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";

const faqItems = [
  {
    question: "Premium Home Decor Products Online in India",
    answer: (
      <>
        <p>
          Gogaji International offers a carefully curated collection of premium home decor products designed to elevate modern living spaces. From decorative vases and luxury planters to artificial floral arrangements and elegant gifting items, our collection combines style, quality and sophistication.
        </p>
        <p className="mt-4">
          Whether you are decorating your home, office, hotel, retail store or commercial space, our premium decor solutions help create elegant and inspiring interiors.
        </p>
      </>
    ),
  },
  {
    question: "Luxury Decor Collections for Every Space",
    answer: (
      <>
        <p>
          Our collections are designed for homeowners, interior designers, architects, retailers, hospitality businesses and corporate buyers looking for stylish decor and gifting solutions.
        </p>
        <p className="mt-4">
          Explore decorative accessories, table accents, planters, designer vases, floral arrangements and luxury lifestyle products crafted to add beauty and elegance to every environment.
        </p>
      </>
    ),
  },
  {
    question: "Which home decor categories can I explore?",
    answer: (
      <ul className="grid list-disc gap-2 pl-5 sm:grid-cols-2">
        <li>Decorative Vases</li><li>Artificial Flowers</li><li>Luxury Planters</li><li>Home Accessories</li><li>Decor Accents</li><li>Corporate Gifting Products</li><li>Hotel Decor Solutions</li><li>Designer Table Decor</li><li>Premium Lifestyle Products</li><li>Luxury Interior Accessories</li>
      </ul>
    ),
  },
  {
    question: "Wholesale Home Decor and Corporate Gifting",
    answer: (
      <>
        <p>
          Gogaji International supports retailers, interior designers, hotels, event planners and corporate buyers with wholesale pricing and bulk order support.
        </p>
        <p className="mt-4">
          Our premium decor collections are ideal for gifting, hospitality projects, interior styling and commercial spaces across India.
        </p>
      </>
    ),
  },
  {
    question: "What products does Gogaji International offer?",
    answer: <p>We offer decorative vases, artificial flowers, premium planters, luxury gifting products and elegant home decor accessories.</p>,
  },
  {
    question: "Do you provide bulk order support?",
    answer: <p>Yes. We support wholesale orders, interior projects, hotel requirements and corporate gifting.</p>,
  },
  {
    question: "Do you deliver across India?",
    answer: <p>Yes, we offer reliable delivery services across India.</p>,
  },
  {
    question: "Do you work with interior designers?",
    answer: <p>Absolutely. We regularly support interior designers, architects and hospitality projects.</p>,
  },
];

export default function HomeSeoFaq() {
  return (
    <section className="border-t border-[#B38B2D]/15 bg-[#fffdf9] py-14 md:py-20">
      <div className="container-royal">
        <div className="mx-auto max-w-4xl">
          <div className="mb-9 text-center md:mb-11">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#B38B2D]/30 bg-[#fff7e5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1F5C4A]">
              <Sparkles size={15} /> Gogaji International guide
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1F5C4A] md:text-4xl">
              Premium Home Decor: Your Questions Answered
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#5A6464] md:text-base">
              Product categories, wholesale support and decor guidance—open a topic to learn more.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details key={item.question} className="group rounded-2xl border border-[#B38B2D]/20 bg-white shadow-sm transition open:border-[#B38B2D]/45 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left text-base font-bold text-[#1F5C4A] marker:content-none md:px-6 md:text-lg">
                  <span><span className="mr-3 text-sm text-[#B38B2D]">{String(index + 1).padStart(2, "0")}</span>{item.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#B38B2D] transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="border-t border-[#B38B2D]/15 px-5 pb-5 pt-4 text-[15px] leading-7 text-[#5A6464] md:px-6 md:pb-6 md:text-base">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="rounded-full bg-[#B38B2D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9D7824]">Shop Premium Decor</Link>
            <Link href="/contact" className="rounded-full border border-[#B38B2D] px-5 py-2.5 text-sm font-semibold text-[#1F5C4A] transition hover:bg-[#fff7e5]">Contact for Bulk Orders</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
