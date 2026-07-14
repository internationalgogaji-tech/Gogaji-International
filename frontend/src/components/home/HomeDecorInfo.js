"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import WishlistToggleButton from "@/components/WishlistToggleButton";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

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

    if (!API) {
        return image;
    }

    return `${API.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
};

const getProductHref = (item = {}) => {
    if (item.buttonLink) return item.buttonLink;

    if (item.slug) return `/products/${item.slug}`;

    const id = item.productId || item._id || item.id;
    if (id) return `/products/${id}`;

    return "/products";
};

export default function HomeDecorInfo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API}/api/home-decor-info`)
            .then((res) => res.json())
            .then(setData);
    }, []);

    if (!data) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1800px] mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl lg:text-5xl font-extrabold">
                        <span className="text-[#1F5C4A]">
                            {data.sectionTitle?.split("&")[0] || "Luxury"}
                        </span>{" "}
                        <span className="text-[#B38B2D]">
                            {data.sectionTitle?.split("&")[1] || "Collections"}
                        </span>
                    </h2>

                    <div className="flex gap-4">
                        <Link
                            href={data.viewAllLink || "/products"}
                            className="
px-7
py-3
rounded-full
font-semibold
text-white
bg-[#B38B2D]
hover:bg-[#9A7624]
transition-all
duration-300
shadow-lg
"
                        >
                            {data.viewAllText || "View All"}
                        </Link>

                        <button className="decor-prev w-16 h-16 rounded-full border border-[#B38B2D] bg-white text-[#1F5C4A] flex items-center justify-center shadow-md">
                            <ChevronLeft />
                        </button>

                        <button className="decor-next w-16 h-16 rounded-full bg-[#1F5C4A] text-white flex items-center justify-center shadow-md">
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
                    {data.products?.map((item, index) => {

                        console.log(
                            "HOME DECOR PRODUCT =",
                            JSON.stringify({
                                productId: item.productId,
                                _id: item._id,
                                slug: item.slug,
                                title: item.title,
                                buttonLink: item.buttonLink,
                            })
                        );

                        console.log("WISHLIST PRODUCT =", {
                            productId: item.productId,
                            _id: item._id,
                            title: item.title,
                        });

                        return (


                            <SwiperSlide key={index}>
                                <div className="
group
bg-white
rounded-[24px]
overflow-hidden
border
border-[#B38B2D]/20
shadow-md
hover:shadow-xl
transition-all
duration-300
h-[520px]
flex
flex-col
">
                                    <div className="relative h-[260px] overflow-hidden bg-[#F8F6F2]">

                                        <div
                                            className="absolute top-4 right-4 z-20"
                                            onClick={(e) => e.stopPropagation()}
                                        >


                                            <WishlistToggleButton
                                                product={{
                                                    ...item,
                                                    _id: item.productId,
                                                    id: item.productId,
                                                    slug: item.slug,
                                                    name: item.title,
                                                    thumbnail: item.image,
                                                    price: item.price,
                                                    mrp: item.mrp,
                                                }}
                                            />
                                        </div>
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            className="
    w-full
    h-full
    object-cover
    object-center
    transition-all
    duration-700
    group-hover:scale-105
    group-hover:opacity-0
  "
                                        />

                                        {item.hoverImage && (
                                            <img
                                                src={getImageUrl(item.hoverImage)}
                                                alt={item.title}
                                                className="
    absolute inset-0
    w-full
    h-full
    object-cover
    object-center
    opacity-0
    transition-all
    duration-700
    group-hover:opacity-100
    group-hover:scale-105
  "
                                            />
                                        )}

                                    </div>

                                    {item.badge && (
                                        <div className="flex justify-center mt-4">
                                            <span className="bg-[#1F5C4A] text-white text-xs px-3 py-1 uppercase rounded-full">
                                                {item.badge}
                                            </span>
                                        </div>
                                    )}

                                    <h3 className="text-center text-[18px] font-bold text-[#2F3A3A] mt-4 px-4 line-clamp-2 h-[60px]">{item.title}</h3>

                                    <div className="flex justify-center gap-2 mt-2">
                                        <span className="font-bold text-lg text-[#1F5C4A]">₹{item.price}</span>

                                        <span className="line-through text-gray-400">
                                            ₹{item.mrp}
                                        </span>

                                        <span className="text-[#B38B2D] font-semibold">{item.discount}</span>
                                    </div>


                                    <Link
                                        href={getProductHref(item)}
                                        className="
block
w-full
text-center
py-4
mt-auto
rounded-full
font-bold
text-white
bg-[#B38B2D]
hover:bg-[#9D7824]
transition-all
duration-300
shadow-[0_10px_25px_rgba(179,139,45,0.35)]
hover:shadow-[0_15px_35px_rgba(179,139,45,0.45)]
hover:-translate-y-1
"
                                    >
                                        <span className="text-white">
                                            {item.buttonText || "Add To Cart"}
                                        </span>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
