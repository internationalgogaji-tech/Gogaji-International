"use client";

import Link from "next/link";
import { API_BASE } from "@/lib/api";

const getImageUrl = (value = "") => {
  if (!value) return "";

  const image = String(value)
    .replace(/\/uploads\/uploads\//g, "/uploads/")
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .trim();

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  if (!API_BASE) {
    return image;
  }

  return `${API_BASE.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
};

const getBannerHref = (value = "") => {
  const href = String(value || "").trim();

  if (!href || href === "#") {
    return "/products";
  }

  return href;
};

export default function PromoBannerSection({
  banners = [],
}) {
  if (!banners?.length) return null;

  const count = banners.length;

  let gridClass = "grid-cols-1";

  if (count === 2) {
    gridClass = "md:grid-cols-2";
  } else if (count === 3) {
    gridClass = "md:grid-cols-3";
  } else if (count >= 4) {
    gridClass = "md:grid-cols-4";
  }

  return (
    <section className="w-full py-8">
      <div className="w-full">
        <div className={`grid gap-4 ${gridClass}`}>
          {banners.map((banner, index) => {
            const desktopImage = getImageUrl(
              banner.desktopImage || banner.image
            );

            const mobileImage = getImageUrl(
              banner.mobileImage ||
              banner.desktopImage ||
              banner.image
            );

            if (!desktopImage) {
              return null;
            }

            return (
              <Link
                key={banner._id || index}
                href={getBannerHref(banner.buttonLink)}
                className="block overflow-hidden rounded-3xl"
              >
                <picture>
                  {mobileImage && (
                    <source
                      media="(max-width: 767px)"
                      srcSet={mobileImage}
                    />
                  )}

                  <img
                    src={desktopImage}
                    alt={banner.title || "Banner"}
                    className="block h-auto w-full"
                    loading="lazy"
                    onError={(event) => {
                      console.error(
                        "PROMO BANNER IMAGE FAILED:",
                        event.currentTarget.currentSrc ||
                        event.currentTarget.src,
                        banner
                      );
                    }}
                  />
                </picture>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}