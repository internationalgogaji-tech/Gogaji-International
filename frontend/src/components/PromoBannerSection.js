"use client";

import Link from "next/link";

export default function PromoBannerSection({
  banners = [],
}) {
  if (!banners?.length) return null;

  const count = banners.length;

  let gridClass = "grid-cols-1";

  if (count === 2) {
    gridClass = "md:grid-cols-2";
  }

  if (count === 3) {
    gridClass = "md:grid-cols-3";
  }

  if (count >= 4) {
    gridClass = "md:grid-cols-4";
  }

  return (
    <section className="w-full py-8">
      <div className="w-full">
        <div className={`grid gap-4 ${gridClass}`}>
          {banners.map((banner, index) => (
            <Link
              key={banner._id || index}
              href={banner.buttonLink || "/products"}
              className="block overflow-hidden rounded-3xl"
            >
              <img
                src={banner.desktopImage || banner.image}
                alt={banner.title || "Banner"}
                className="w-full h-auto block"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}