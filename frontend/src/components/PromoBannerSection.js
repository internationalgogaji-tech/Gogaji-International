"use client";

import Link from "next/link";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

function getImageUrl(imagePath) {
  if (!imagePath) return "";

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  if (!API_BASE) {
    console.error(
      "NEXT_PUBLIC_API_URL is missing. Add it in Vercel Environment Variables.",
    );
    return imagePath;
  }

  return `${API_BASE}/${String(imagePath).replace(/^\/+/, "")}`;
}

export default function PromoBannerSection({ banners = [] }) {
  const activeBanners = banners.filter(
    (banner) => banner?.active !== false && banner?.desktopImage,
  );

  if (!activeBanners.length) return null;

  const count = activeBanners.length;

  const gridClass =
    count === 1
      ? "grid-cols-1"
      : count === 2
        ? "grid-cols-1 md:grid-cols-2"
        : count === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="w-full py-0">
      <div className={`grid gap-0 ${gridClass}`}>
        {activeBanners.map((banner, index) => {
          const imageUrl = getImageUrl(
            banner.desktopImage || banner.image,
          );

          return (
            <Link
              key={banner._id || index}
              href={banner.buttonLink || "/products"}
              className="block overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={banner.title || "Gogaji International home decor banner"}
                className="block h-auto w-full object-cover"
                onError={(event) => {
                  console.error("Banner failed to load:", imageUrl);
                  event.currentTarget.style.display = "none";
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}