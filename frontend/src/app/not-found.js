import Link from "next/link";
import {
  Home,
  Search,
  Package,
  Gift,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "404 Page Not Found | Gogaji International",
  description:
    "The page you are looking for could not be found. Explore premium home decor collections, gifting products and luxury accessories from Gogaji International.",
};

export default function NotFoundPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf6fd] text-[#5d4475]">
      <section className="relative flex min-h-screen items-center justify-center px-4 py-12">

        <div className="absolute left-8 top-12 h-32 w-32 rounded-full border-[14px] border-[#eadcf7]" />
        <div className="absolute right-10 bottom-10 h-44 w-44 rounded-full border-[16px] border-[#eadcf7]" />
        <div className="absolute right-24 top-20 h-8 w-8 rounded-full bg-[#d8c4ec]" />
        <div className="absolute left-1/4 bottom-20 h-5 w-5 rounded-full bg-[#cdb6e3]" />

        <div className="relative z-10 grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">

          {/* Left Card */}
          <div className="relative mx-auto flex h-[380px] w-full max-w-[520px] items-center justify-center">

            <div className="absolute inset-x-8 bottom-8 h-8 rounded-full bg-[#eadcf7] blur-xl" />

            <div className="relative rounded-[34px] border border-[#eadcf7] bg-white p-8 shadow-xl">

              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-2xl bg-[#f4ebfa] p-4 text-[#8a5db2]">
                  <Gift size={42} />
                </div>

                <div className="rounded-2xl bg-[#f4ebfa] p-4 text-[#8a5db2]">
                  <Package size={42} />
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-[#cdb6e3] bg-[#faf6fd] p-6 text-center">

                <Package
                  size={86}
                  className="mx-auto text-[#8a5db2]"
                />

                <h2 className="mt-5 text-2xl font-extrabold text-[#5d4475]">
                  Collection Not Found
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#7b7288]">
                  The page you are looking for may have been moved,
                  removed or is currently unavailable.
                </p>

              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="h-16 rounded-2xl bg-[#faf6fd]" />
                <div className="h-16 rounded-2xl bg-[#f4ebfa]" />
                <div className="h-16 rounded-2xl bg-[#faf6fd]" />
              </div>

            </div>
          </div>

          {/* Right Content */}
          <div className="mx-auto max-w-xl text-center lg:text-left">

            <p className="text-[92px] font-black leading-none tracking-[-0.08em] text-[#8a5db2] md:text-[130px]">
              404
            </p>

            <h1 className="mt-2 text-4xl font-black leading-tight text-[#5d4475] md:text-5xl">
              Page Not Found
            </h1>

            <h2 className="mt-5 text-xl font-bold uppercase tracking-wide text-[#8a5db2] md:text-2xl">
              Looks like this page is missing.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#7b7288]">
              Sorry, we can’t find the page you are searching for.
              Explore our premium home decor collections or
              return to the homepage.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

              <Link
                href="/"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#8a5db2] px-7 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#73469c]"
              >
                <Home size={18} />
                Return Home
              </Link>

              <Link
                href="/products"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#b28ad4] px-7 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#9f73c7]"
              >
                <Search size={18} />
                Browse Collection
              </Link>

            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#8a5db2] hover:underline"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>
    </main>
  );
}