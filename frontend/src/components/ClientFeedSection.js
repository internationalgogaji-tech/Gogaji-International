"use client";

import Link from "next/link";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Play,
    X,
    Volume2,
    VolumeX,
} from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { useEffect, useRef, useState } from "react";
import { API_BASE } from "@/lib/api";

const absoluteUrl = (url = "") => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${API_BASE}${url}`;
};

const productImage = (product) =>
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    "/placeholder-product.jpg";

const getPrice = (product) =>
    product?.salePrice ||
    product?.discountPrice ||
    product?.price ||
    product?.mrp ||
    0;

const getMrp = (product) => product?.mrp || 0;

/* ==============================
   FEED CARD
================================ */

function FeedCard({ item, onOpen }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        video.muted = true;

        video.play().catch(() => { });
    }, []);

    return (
        <article className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <button
                type="button"
                onClick={() => onOpen(item)}
                className="relative block aspect-[3/5] w-full overflow-hidden bg-[#EEF3EF] text-left"
            >
                <video
                    ref={videoRef}
                    src={absoluteUrl(item.videoUrl)}
                    poster={
                        item.posterUrl
                            ? absoluteUrl(item.posterUrl)
                            : undefined
                    }
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    className="pointer-events-none h-full w-full object-cover"
                />

                <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
                    <Play size={17} fill="currentColor" />
                </span>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 pb-4 pt-16">
                    <p className="line-clamp-2 text-sm font-bold text-white">
                        {item.title}
                    </p>
                </div>
            </button>

            <button
                type="button"
                onClick={() => onOpen(item)}
                className="flex w-full items-center gap-3 p-3 text-left"
            >
                <img
                    src={absoluteUrl(productImage(item.product))}
                    alt={item.product?.name || item.title}
                    className="h-11 w-11 rounded-lg border object-cover"
                />

                <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-[#1F2937]">
                        {item.product?.name || item.title}
                    </span>

                    <span className="block text-sm font-black text-[#1F5C4A]">
                        ₹{getPrice(item.product) || "—"}
                    </span>
                </span>
            </button>
        </article>
    );
}

/* ==============================
   NESTASIA STYLE MODAL
================================ */

function FeedModal({ item, onClose }) {
    const videoRef = useRef(null);

    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);


    useEffect(() => {
        document.body.style.overflow = "hidden";

        const video = videoRef.current;

        if (video) {
            video.muted = true;

            video.play().catch(() => {
                setPlaying(false);
            });
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    if (!item) return null;

    const product = item.product;

    const getCategorySlug = (product) => {
        const category = product?.category;

        if (!category) return "";

        // category populated object hai
        if (typeof category === "object") {
            return category.slug || "";
        }

        // category already slug string hai
        return category;
    };

    const categorySlug = getCategorySlug(product);

    const productHref = categorySlug
        ? `/products?category=${encodeURIComponent(categorySlug)}`
        : "/products";

    const price = getPrice(product);
    const mrp = getMrp(product);

    const togglePlay = async () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
                setPlaying(true);
            } catch {
                setPlaying(false);
            }
        } else {
            video.pause();
            setPlaying(false);
        }
    };

    const toggleSound = (event) => {
        event.stopPropagation();

        const video = videoRef.current;

        if (!video) return;

        video.muted = !video.muted;

        setMuted(video.muted);
    };



    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-[2px] sm:p-6"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="relative flex h-[90vh] w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* CLOSE */}

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1F2937] shadow-lg transition hover:scale-105"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <div className="grid h-full w-full md:grid-cols-[55%_45%]">

                    {/* ======================
              LEFT VIDEO
          ====================== */}

                    <div
                        className="relative h-[48vh] cursor-pointer overflow-hidden bg-black md:h-full"
                        onClick={togglePlay}
                    >
                        <video
                            ref={videoRef}
                            src={absoluteUrl(item.videoUrl)}
                            poster={
                                item.posterUrl
                                    ? absoluteUrl(item.posterUrl)
                                    : undefined
                            }
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            className="h-full w-full object-cover"
                        />

                        {!playing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white">
                                    <Play
                                        size={28}
                                        fill="currentColor"
                                    />
                                </span>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={toggleSound}
                            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
                        >
                            {muted ? (
                                <VolumeX size={20} />
                            ) : (
                                <Volume2 size={20} />
                            )}
                        </button>
                    </div>

                    {/* ======================
              RIGHT PRODUCT
          ====================== */}

                    <div className="flex min-h-0 flex-col bg-white">

                        <div className="flex-1 overflow-y-auto p-6 sm:p-8">

                            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B38B2D]">
                                Shop the look
                            </p>

                            <h2 className="mt-3 text-2xl font-black text-[#1F2937]">
                                {product?.name || item.title}
                            </h2>

                            {item.caption && (
                                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                                    {item.caption}
                                </p>
                            )}

                            {/* PRICE */}

                            <div className="mt-5 flex items-center gap-3">
                                <span className="text-2xl font-black text-[#1F5C4A]">
                                    ₹{price || "—"}
                                </span>

                                {mrp && Number(mrp) > Number(price) ? (
                                    <span className="text-base text-slate-400 line-through">
                                        ₹{mrp}
                                    </span>
                                ) : null}
                            </div>

                            <div className="my-6 h-px bg-slate-200" />

                            <p className="mb-3 text-sm font-bold text-[#52677D]">
                                Selected Product
                            </p>

                            {/* SELECTED PRODUCT */}

                            <Link
                                href={productHref}
                                className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] p-3 transition hover:border-[#B38B2D]"
                            >
                                <img
                                    src={absoluteUrl(productImage(product))}
                                    alt={product?.name || item.title}
                                    className="h-24 w-24 rounded-xl object-cover"
                                />

                                <div className="min-w-0">
                                    <p className="line-clamp-2 font-bold text-[#1F2937]">
                                        {product?.name || item.title}
                                    </p>

                                    <p className="mt-2 text-lg font-black text-[#1F5C4A]">
                                        ₹{price || "—"}
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* ======================
                BOTTOM BUTTONS
            ====================== */}

                        <div className="border-t bg-white p-4">
                            <div className="grid grid-cols-2 gap-3">

                                <Link
                                    href={productHref}
                                    className="flex h-12 items-center justify-center rounded-xl border-2 border-[#B38B2D] text-sm font-extrabold text-[#8A6B24] transition hover:bg-[#FFF8E8]"
                                >
                                    View Product
                                </Link>

                                <div className="[&>button]:!h-12 [&>button]:!w-full [&>button]:!rounded-xl [&>button]:!border-0 [&>button]:!bg-[#1F5C4A] [&>button]:!px-4 [&>button]:!text-sm [&>button]:!font-extrabold [&>button]:!text-white [&>button]:!shadow-none hover:[&>button]:!bg-[#17483A]">
                                    <AddToCartButton
                                        productId={product?._id}
                                        quantity={1}
                                        moq={product?.moq || 1}
                                        stock={product?.stock || 0}
                                        productName={product?.name || item.title || ""}
                                        showQuantity={false}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

/* ==============================
   CLIENT FEED SECTION
================================ */

export default function ClientFeedSection({
    limit = 20,
    compact = false,
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedItem, setSelectedItem] =
        useState(null);

    const sliderRef = useRef(null);

    const slideFeed = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.firstElementChild;
        if (!card) return;

        const gap = 20;
        const cardWidth = card.getBoundingClientRect().width;

        slider.scrollBy({
            left:
                direction === "right"
                    ? cardWidth + gap
                    : -(cardWidth + gap),
            behavior: "smooth",
        });
    };

    useEffect(() => {
        fetch(
            `${API_BASE}/api/client-feed?limit=${limit}`,
            {
                cache: "no-store",
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Unable to load client feed."
                    );
                }

                return response.json();
            })
            .then((data) => {
                setItems(data?.items || []);
            })
            .catch((error) => {
                console.error(
                    "Client feed error:",
                    error
                );

                setItems([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [limit]);

    /*
     * IMPORTANT:
     * Actual existing cart implementation
     * yahan connect hogi.
     */


    if (!loading && !items.length) {
        return null;
    }

    return (
        <>
            <section
                className={
                    compact
                        ? "bg-white py-10"
                        : "bg-[#FAFCFA] py-14 sm:py-20"
                }
            >
                <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

                    {/* HEADER */}

                    <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B38B2D]">
                                Real spaces, real style
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-[#1F5C4A] sm:text-4xl">
                                Shop the Feed
                            </h2>

                            <p className="mt-2 max-w-xl text-sm text-[#52677D] sm:text-base">
                                See how Gogaji products look in our clients’ homes.
                            </p>
                        </div>

                        <Link
                            href="/client-feed"
                            className="hidden items-center gap-2 text-sm font-extrabold text-[#1F5C4A] hover:text-[#B38B2D] sm:inline-flex"
                        >
                            View all
                            <ArrowRight size={17} />
                        </Link>
                    </div>



                    {/* VIDEO SLIDER */}

                    <div className="relative">

                        {/* LEFT ARROW */}
                        <button
                            type="button"
                            onClick={() => slideFeed("left")}
                            aria-label="Previous videos"
                            className="absolute left-0 top-[42%] z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1F5C4A] shadow-lg transition hover:scale-105 hover:bg-[#FFF8E8] lg:flex"
                        >
                            <ChevronLeft size={25} />
                        </button>

                        {/* SLIDER */}
                        <div
                            ref={sliderRef}
                            className="
            flex
            snap-x
            snap-mandatory
            gap-5
            overflow-x-auto
            scroll-smooth
            pb-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
        "
                        >
                            {loading
                                ? Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="
                        aspect-[3/5]
                        w-[82%]
                        shrink-0
                        animate-pulse
                        rounded-2xl
                        bg-[#E9F1EC]
                        sm:w-[calc((100%-20px)/2)]
                        lg:w-[calc((100%-40px)/3)]
                        xl:w-[calc((100%-80px)/5)]
                    "
                                    />
                                ))
                                : items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="
                        w-[82%]
                        shrink-0
                        snap-start
                        sm:w-[calc((100%-20px)/2)]
                        lg:w-[calc((100%-40px)/3)]
                        xl:w-[calc((100%-80px)/5)]
                    "
                                    >
                                        <FeedCard
                                            item={item}
                                            onOpen={setSelectedItem}
                                        />
                                    </div>
                                ))}
                        </div>

                        {/* RIGHT ARROW */}
                        <button
                            type="button"
                            onClick={() => slideFeed("right")}
                            aria-label="Next videos"
                            className="absolute right-0 top-[42%] z-20 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1F5C4A] shadow-lg transition hover:scale-105 hover:bg-[#FFF8E8] lg:flex"
                        >
                            <ChevronRight size={25} />
                        </button>

                    </div>

                    <Link
                        href="/client-feed"
                        className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#1F5C4A] sm:hidden"
                    >
                        View all feed
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>

            {/* MODAL */}

            {selectedItem && (
                <FeedModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </>
    );
}