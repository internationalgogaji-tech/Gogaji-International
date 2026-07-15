"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import WishlistToggleButton from "@/components/WishlistToggleButton";

import "swiper/css";
import "swiper/css/navigation";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

function getImageUrl(imagePath) {
    if (!imagePath) return "";

    if (/^https?:\/\//i.test(imagePath)) {
        return imagePath;
    }

    return API_BASE
        ? `${API_BASE}/${String(imagePath).replace(/^\/+/, "")}`
        : imagePath;
}

function formatCurrency(value) {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function HomeDecorInfo() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadHomeDecorInfo() {
            try {
                const response = await fetch(`${API_BASE}/api/home-decor-info`);

                if (!response.ok) {
                    throw new Error("Unable to load trending products");
                }

                const result = await response.json();

                if (active) {
                    setData(result);
                }
            } catch (error) {
                console.error("Home decor section error:", error);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadHomeDecorInfo();

        return () => {
            active = false;
        };
    }, []);

    if (loading || !data?.products?.length) {
        return null;
    }

    const products = data.products.filter((product) => product?.title);

    if (!products.length) {
        return null;
    }

    const handleProductClick = (link) => {
        if (link) {
            window.location.href = link;
        }
    };

    return (
        <section className="relative overflow-hidden bg-[#fffdf8] py-14 md:py-20">
            <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#d5b25f]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#1f6552]/10 blur-3xl" />

            <div className="relative mx-auto max-w-[1800px] px-5 md:px-8">
                <div className="mb-9 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="inline-flex items-center rounded-full border border-[#e5d5ae] bg-[#fff8e8] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#a77b20]">
                            ✦ Curated for your home
                        </span>

                        <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#1f6552] md:text-5xl lg:text-6xl">
                            Trending &{" "}
                            <span className="text-[#bd9228]">New Launches</span>
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#718077] md:text-base">
                            Handpicked decor pieces to bring timeless warmth and elegance to
                            every corner of your home.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start lg:self-auto">
                        <Link
                            href={data.viewAllLink || "/products"}
                            className="inline-flex h-14 items-center justify-center rounded-full bg-[#bd9228] px-7 text-base font-extrabold text-white shadow-[0_10px_24px_rgba(189,146,40,0.28)] transition hover:-translate-y-0.5 hover:bg-[#a97e1f]"
                        >
                            {data.viewAllText || "View All"}
                        </Link>

                        <button
                            type="button"
                            aria-label="Previous products"
                            className="home-decor-prev flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b967] bg-white text-[#1f6552] shadow-sm transition hover:bg-[#f8f0df]"
                        >
                            <ChevronLeft size={26} />
                        </button>

                        <button
                            type="button"
                            aria-label="Next products"
                            className="home-decor-next flex h-14 w-14 items-center justify-center rounded-full bg-[#1f6552] text-white shadow-[0_10px_24px_rgba(31,101,82,0.22)] transition hover:bg-[#174c3f]"
                        >
                            <ChevronRight size={26} />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: ".home-decor-prev",
                        nextEl: ".home-decor-next",
                    }}
                    autoplay={
                        data.autoplay === false
                            ? false
                            : {
                                delay: Number(data.sliderSpeed) || 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }
                    }
                    loop={products.length > 5}
                    spaceBetween={24}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.12,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 22,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1536: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                        },
                    }}
                >
                    {products.map((item, index) => {
                        const productUrl = item.buttonLink || `/product/${item.slug || ""}`;
                        const imageUrl = getImageUrl(item.image);
                        const hoverImageUrl = getImageUrl(item.hoverImage);

                        return (
                            <SwiperSlide key={item.productId || item.sku || index} className="h-auto">
                                <article
                                    onClick={() => handleProductClick(productUrl)}
                                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[26px] border border-[#eee3d0] bg-white shadow-[0_10px_30px_rgba(67,74,58,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#d4b15a] hover:shadow-[0_22px_45px_rgba(58,78,59,0.16)]"
                                >
                                    <div className="relative h-[270px] overflow-hidden bg-[#f7f2e8] md:h-[300px]">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-20"
                                            style={{
                                                backgroundImage:
                                                    "radial-gradient(circle at 20% 15%, #d8bc72 0, transparent 28%), radial-gradient(circle at 80% 90%, #1f6552 0, transparent 30%)",
                                            }}
                                        />

                                        <div
                                            className="absolute right-4 top-4 z-20"
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            <WishlistToggleButton
                                                product={{
                                                    ...item,
                                                    _id: item.productId || item._id,
                                                    slug: item.slug,
                                                    name: item.title,
                                                }}
                                            />
                                        </div>

                                        <span className="absolute left-4 top-4 z-20 rounded-full bg-[#1f6552] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
                                            {item.badge || "New"}
                                        </span>

                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={item.title || "Gogaji home decor product"}
                                                className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${hoverImageUrl
                                                        ? "group-hover:scale-105 group-hover:opacity-0"
                                                        : "group-hover:scale-105"
                                                    }`}
                                                onError={(event) => {
                                                    event.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : null}

                                        {hoverImageUrl ? (
                                            <img
                                                src={hoverImageUrl}
                                                alt={item.title || "Gogaji home decor product"}
                                                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
                                                onError={(event) => {
                                                    event.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : null}
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#a47d27]">
                                            {item.sku ? `SKU: ${item.sku}` : "Premium home decor"}
                                        </p>

                                        <h3 className="mt-3 min-h-[56px] text-[21px] font-extrabold leading-7 text-[#2f3d38] line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <div className="mt-5 flex flex-wrap items-center gap-2">
                                            <span className="text-2xl font-extrabold text-[#1f6552]">
                                                {formatCurrency(item.price)}
                                            </span>

                                            {item.mrp ? (
                                                <span className="text-sm font-semibold text-[#9ba39e] line-through">
                                                    {formatCurrency(item.mrp)}
                                                </span>
                                            ) : null}

                                            {item.discount ? (
                                                <span className="rounded-full bg-[#fff1eb] px-2.5 py-1 text-xs font-extrabold text-[#bd6b4d]">
                                                    {item.discount} OFF
                                                </span>
                                            ) : null}
                                        </div>

                                        <div className="mt-5 space-y-1.5 text-sm font-semibold">
                                            <p className="text-[#23814e]">✓ Ready Stock</p>
                                            <p className="text-[#60756a]">✓ Carefully packed & delivered</p>
                                        </div>

                                        <div className="mt-auto pt-6">
                                            <div className="relative overflow-hidden rounded-2xl bg-[#bd9228] px-4 py-3.5 text-center text-[15px] font-extrabold text-white shadow-[0_8px_18px_rgba(189,146,40,0.24)] transition group-hover:bg-[#a97e1f]">
                                                Add To Cart
                                                <span className="ml-2">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}