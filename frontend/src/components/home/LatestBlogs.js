import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const blogs = [
  {
    title: "How To Style Decorative Vases For Modern Living Spaces",
    desc: "Discover creative ways to decorate your home using premium ceramic, glass and designer vases.",
    href: "/blog/how-to-style-decorative-vases",
  },
  {
    title: "Top Home Decor Trends For Elegant Interiors",
    desc: "Explore the latest luxury decor trends, statement pieces and styling ideas for modern homes.",
    href: "/blog/home-decor-trends",
  },
  {
    title: "Corporate Gifting Ideas With Premium Home Decor",
    desc: "Find thoughtful and elegant gifting solutions perfect for clients, employees and special occasions.",
    href: "/blog/corporate-gifting-home-decor",
  },
];

export default function LatestBlogs() {
  return (
    <section className="py-20 bg-white">
      <div className="container-royal">

        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B38B2D]">
              Home Decor Insights
            </p>

            <h2 className="text-4xl font-extrabold text-[#1F5C4A] md:text-5xl">
              Decor Guides & Inspiration
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-[#5A6464]">
              Explore styling ideas, decor trends and expert tips to create
              elegant living spaces with premium home decor collections.
            </p>
          </div>

          <Link
            href="/blogs"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#B38B2D]
              px-7
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#9D7824]
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <span className="text-white">
              View All Blogs
            </span>

            <ArrowRight
              size={17}
              className="text-white"
            />
          </Link>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.title}
              href={blog.href}
              className="
                group
                rounded-[30px]
                border
                border-[#B38B2D]/15
                bg-white
                p-7
                shadow-sm
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
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#E8F8EE]
                  text-[#1F5C4A]
                "
              >
                <BookOpen size={24} />
              </div>

              <h3
                className="
                  text-xl
                  font-bold
                  leading-snug
                  text-[#1F5C4A]
                  transition-colors
                  duration-300
                  group-hover:text-[#B38B2D]
                "
              >
                {blog.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#5A6464]">
                {blog.desc}
              </p>

              <span
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-[#B38B2D]
                "
              >
                Read Article
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}