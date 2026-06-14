import { API_BASE } from "@/lib/api";
import PromoBannerSection from "./PromoBannerSection";

async function getBanners(position) {
  const res = await fetch(
    `${API_BASE}/api/promo-banners/position/${position}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.banners || [];
}

export default async function PromoBannerRenderer({
  position,
}) {
  const banners = await getBanners(position);

  if (!banners.length) return null;

  return (
    <PromoBannerSection
      banners={banners}
    />
  );
}