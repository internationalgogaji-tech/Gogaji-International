"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HomeDecorInfo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API}/api/home-decor-info`)
            .then((res) => res.json())
            .then(setData);
    }, []);

    if (!data) return null;

    return (
        <section className="py-20 bg-[#faf6fd]">
            <div className="max-w-[1800px] mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold text-[#0f172a]">
                        <span className="text-[#8a5db2]">
                            {data.sectionTitle?.split("&")[0] || "Trending"}
                        </span>{" "}
                        <span className="font-medium">
                            {data.sectionTitle?.split("&")[1] || "New Launches"}
                        </span>
                    </h2>

                    <div className="flex gap-4">
                        <Link
                            href={data.viewAllLink || "/products"}
                            className="
px-6
py-3
rounded-full
font-semibold
text-white
bg-gradient-to-r
from-[#8a5db2]
to-[#b28ad4]
hover:from-[#73469c]
hover:to-[#9f73c7]
transition-all
duration-300
shadow-lg
"
                        >
                            {data.viewAllText || "View All"}
                        </Link>

                        <button className="decor-prev w-16 h-16 bg-[#f4ebfa] text-[#8a5db2] flex items-center justify-center">
                            <ChevronLeft />
                        </button>

                        <button className="decor-next w-16 h-16 bg-[#8a5db2] text-white flex items-center justify-center">
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[
                        Navigation,
                        Autoplay,
                    ]}
                    navigation={{
                        prevEl: ".decor-prev",
                        nextEl: ".decor-next",
                    }}

                    autoplay={{
                        delay: data.sliderSpeed || 3000,
                        disableOnInteraction: false,
                    }}

                    loop={true}
                    spaceBetween={30}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                >
                    {data.products?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="
group
bg-white
rounded-none
overflow-hidden
transition-all
duration-300
">
                                <div className="relative h-[320px] lg:h-[360px] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="
        absolute inset-0
        w-full h-full
        object-contain
        bg-white p-4
        transition-opacity
        duration-500
        group-hover:opacity-0
        "
                                    />

                                    {item.hoverImage && (
                                        <img
                                            src={item.hoverImage}
                                            alt={item.title}
                                            className="
            absolute inset-0
            w-full h-full
            object-contain
            bg-white p-4
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
            "
                                        />
                                    )}
                                </div>

                                {item.badge && (
                                    <div className="flex justify-center mt-4">
                                        <span className="bg-[#8a5db2] text-white text-xs px-3 py-1 uppercase">
                                            {item.badge}
                                        </span>
                                    </div>
                                )}

                                <h3 className="text-center text-base font-semibold mt-3 px-2 line-clamp-2 min-h-[48px]">{item.title}</h3>

                                <div className="flex justify-center gap-2 mt-2">
                                    <span className="font-bold text-lg text-[#8a5db2]">₹{item.price}</span>

                                    <span className="line-through text-gray-400">
                                        ₹{item.mrp}
                                    </span>

                                    <span className="text-[#b28ad4]">{item.discount}</span>
                                </div>

                              <Link
  href={item.buttonLink || "#"}
  className="
block
w-full
text-center
py-3
mt-4
rounded-full
font-semibold
!text-white
bg-gradient-to-r
from-[#8a5db2]
to-[#b28ad4]
hover:from-[#73469c]
hover:to-[#9f73c7]
transition-all
duration-300
shadow-lg
"
>
  <span className="!text-white">
    {item.buttonText || "Add To Cart"}
  </span>
</Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
