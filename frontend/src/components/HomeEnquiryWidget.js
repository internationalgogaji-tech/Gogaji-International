"use client";

import { useEffect, useState } from "react";
import {
    X,
    MessageCircle,
    Send,
    User,
    Mail,
    Phone,
    Package,
    MessageSquare,
    Sparkles,
} from "lucide-react";

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const WHATSAPP_NUMBER = "917351767928";

const INITIAL_FORM = {
    name: "",
    email: "",
    phone: "",
    requirement: "",
    message: "",
};

export default function HomeEnquiryWidget() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    /* =========================
       LOAD CATEGORIES
    ========================== */
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true);

                const response = await fetch(`${API_BASE}/api/categories`, {
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message || "Unable to load categories"
                    );
                }

                const categoryList = Array.isArray(data)
                    ? data
                    : data?.categories || data?.data || [];

                setCategories(
                    categoryList
                        .filter((category) => category?.isActive !== false)
                        .sort(
                            (a, b) =>
                                Number(a?.order || 0) -
                                Number(b?.order || 0)
                        )
                );
            } catch (error) {
                console.error("Category fetch error:", error);
                setCategories([]);
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    /* =========================
       AUTO OPEN POPUP
    ========================== */
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setOpen(true);
        }, 3500);

        return () => window.clearTimeout(timer);
    }, []);

    /* =========================
       LOCK BACKGROUND SCROLL
    ========================== */
    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    /* =========================
       ESC CLOSE
    ========================== */
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    /* =========================
       FORM CHANGE
    ========================== */
    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* =========================
       FORM SUBMIT
    ========================== */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!form.phone.trim()) {
            alert("Please enter your WhatsApp number.");
            return;
        }

        if (!form.requirement) {
            alert("Please select your requirement.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(
                `${API_BASE}/api/contact/enquiry`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name.trim(),
                        email: form.email.trim(),
                        phone: form.phone.trim(),
                        requirement: form.requirement,
                        message: form.message.trim(),
                        source: "Homepage Enquiry Popup",
                    }),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data?.message || "Unable to submit enquiry."
                );
            }

            setSuccess(true);
            setForm(INITIAL_FORM);

            window.setTimeout(() => {
                setSuccess(false);
                setOpen(false);
            }, 2200);
        } catch (error) {
            console.error("Enquiry submission error:", error);

            const text = [
                "Hello Gogaji International,",
                "",
                "I would like to make an enquiry.",
                `Name: ${form.name}`,
                `Phone: ${form.phone}`,
                form.email ? `Email: ${form.email}` : "",
                `Requirement: ${form.requirement}`,
                form.message
                    ? `Message: ${form.message}`
                    : "",
            ]
                .filter(Boolean)
                .join("\n");

            window.open(
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    text
                )}`,
                "_blank",
                "noopener,noreferrer"
            );
        } finally {
            setSubmitting(false);
        }
    };

    /* =========================
       WHATSAPP
    ========================== */
    const openWhatsApp = () => {
        const text =
            "Hello Gogaji International, I would like to know more about your home decor collection.";

        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                text
            )}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <>
            {/* ======================================
                RIGHT SIDE FLOATING BUTTONS
            ======================================= */}

            <div className="fixed bottom-6 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
                {/* ENQUIRY BUTTON */}
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="
                        group flex h-[52px] items-center gap-2.5
                        rounded-full
                        border border-[#B38B2D]/40
                        bg-[#1F5C4A]
                        px-4
                        text-sm font-extrabold text-white
                        shadow-[0_12px_35px_rgba(31,92,74,0.28)]
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:bg-[#17483A]
                    "
                    aria-label="Open enquiry form"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                        <MessageSquare size={17} />
                    </span>

                    <span className="hidden sm:block">
                        Send Enquiry
                    </span>
                </button>

                {/* WHATSAPP BUTTON */}
                <button
                    type="button"
                    onClick={openWhatsApp}
                    className="
                        group relative
                        flex h-[56px] w-[56px]
                        items-center justify-center
                        rounded-full
                        border-[3px] border-white
                        bg-[#25D366]
                        text-white
                        shadow-[0_12px_32px_rgba(37,211,102,0.35)]
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:scale-105
                    "
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle
                        size={27}
                        fill="currentColor"
                    />

                    <span
                        className="
                            pointer-events-none
                            absolute right-[68px]
                            whitespace-nowrap
                            rounded-lg
                            bg-[#163F34]
                            px-3 py-2
                            text-xs font-bold text-white
                            opacity-0
                            shadow-lg
                            transition
                            group-hover:opacity-100
                        "
                    >
                        Chat on WhatsApp
                    </span>
                </button>
            </div>

            {/* ======================================
                PREMIUM COMPACT POPUP
            ======================================= */}

            {open && (
                <div
                    className="
                        fixed inset-0 z-[200]
                        flex items-center justify-center
                        bg-[#071A15]/55
                        px-3 py-4
                        backdrop-blur-[4px]
                    "
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setOpen(false);
                        }
                    }}
                >
                    <div
                        className="
                            relative
                            w-full
                            max-w-[460px]
                            overflow-hidden
                            rounded-[22px]
                            border border-[#D8C784]
                            bg-[#FFFCF5]
                            shadow-[0_25px_80px_rgba(0,0,0,0.32)]
                        "
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/* CLOSE BUTTON */}

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="
                                absolute right-4 top-4 z-30
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                bg-white
                                text-[#1F5C4A]
                                shadow-[0_5px_18px_rgba(0,0,0,0.16)]
                                transition
                                hover:scale-105
                                hover:bg-[#B38B2D]
                                hover:text-white
                            "
                            aria-label="Close enquiry form"
                        >
                            <X size={19} />
                        </button>

                        {/* ======================================
                            HEADER
                        ======================================= */}

                        <div
                            className="
                                relative overflow-hidden
                                bg-[#1F5C4A]
                                px-6 pb-4 pt-4
                                text-white
                            "
                        >
                            {/* DECORATION */}

                            <div
                                className="
                                    absolute
                                    -right-10 -top-12
                                    h-32 w-32
                                    rounded-full
                                    border-[22px]
                                    border-white/5
                                "
                            />

                            <div
                                className="
                                    absolute
                                    -bottom-20 -left-14
                                    h-36 w-36
                                    rounded-full
                                    border-[22px]
                                    border-[#B38B2D]/15
                                "
                            />

                            <div className="relative pr-10">
                                <div
                                    className="
                                        mb-2
                                        inline-flex items-center gap-1.5
                                        rounded-full
                                        border border-[#D9BD6D]/40
                                        bg-white/10
                                        px-2.5 py-1
                                        text-[9px]
                                        font-black uppercase
                                        tracking-[0.15em]
                                        text-[#F1D990]
                                    "
                                >
                                    <Sparkles size={11} />

                                    Gogaji International
                                </div>

                                <h2
                                    className="
                                        text-[20px]
                                        font-black
                                        leading-[1.15]
                                        tracking-[-0.02em]
                                    "
                                >
                                    Let&apos;s Style Something
                                    Beautiful
                                </h2>

                                <p
                                    className="
                                        mt-1.5
                                        max-w-[350px]
                                        text-[11px]
                                        leading-[17px]
                                        text-white/75
                                    "
                                >
                                    Tell us what you&apos;re looking
                                    for. Our team will assist you with
                                    products, bulk orders and gifting.
                                </p>
                            </div>
                        </div>

                        {/* ======================================
                            FORM AREA
                        ======================================= */}

                        <div className="bg-[#FFFCF5] px-5 pb-4 pt-4">
                            {success ? (
                                /* SUCCESS */

                                <div
                                    className="
                                        flex min-h-[300px]
                                        flex-col
                                        items-center
                                        justify-center
                                        px-5
                                        text-center
                                    "
                                >
                                    <div
                                        className="
                                            flex h-14 w-14
                                            items-center justify-center
                                            rounded-full
                                            bg-[#E8F5EE]
                                            text-[#1F5C4A]
                                        "
                                    >
                                        <Send size={25} />
                                    </div>

                                    <h3 className="mt-4 text-xl font-black text-[#1F5C4A]">
                                        Thank You!
                                    </h3>

                                    <p
                                        className="
                                            mt-2
                                            max-w-[300px]
                                            text-xs
                                            leading-5
                                            text-[#65716C]
                                        "
                                    >
                                        Your enquiry has been
                                        submitted. Our team will
                                        contact you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-3"
                                >
                                    {/* ======================================
                                        NAME + WHATSAPP
                                    ======================================= */}

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {/* NAME */}

                                        <div>
                                            <label
                                                className="
                                                    mb-1 block
                                                    text-[12px]
                                                    font-bold
                                                    text-[#253A33]
                                                "
                                            >
                                                Your Name{" "}
                                                <span className="text-[#B38B2D]">
                                                    *
                                                </span>
                                            </label>

                                            <div
                                                className="
                                                    flex h-[44px]
                                                    items-center
                                                    rounded-[10px]
                                                    border
                                                    border-[#D8DED9]
                                                    bg-white
                                                    px-3
                                                    transition
                                                    focus-within:border-[#B38B2D]
                                                    focus-within:ring-2
                                                    focus-within:ring-[#B38B2D]/10
                                                "
                                            >
                                                <User
                                                    size={16}
                                                    className="mr-2 shrink-0 text-[#1F5C4A]"
                                                />

                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={
                                                        handleChange
                                                    }
                                                    placeholder="Your name"
                                                    autoComplete="name"
                                                    required
                                                    className="
                                                        h-full w-full
                                                        min-w-0
                                                        bg-transparent
                                                        text-[12px]
                                                        text-[#1D2D27]
                                                        outline-none
                                                        placeholder:text-[#9AA59F]
                                                    "
                                                />
                                            </div>
                                        </div>

                                        {/* WHATSAPP */}

                                        <div>
                                            <label
                                                className="
                                                    mb-1 block
                                                    text-[12px]
                                                    font-bold
                                                    text-[#253A33]
                                                "
                                            >
                                                WhatsApp Number{" "}
                                                <span className="text-[#B38B2D]">
                                                    *
                                                </span>
                                            </label>

                                            <div
                                                className="
                                                    flex h-[44px]
                                                    items-center
                                                    rounded-[10px]
                                                    border
                                                    border-[#D8DED9]
                                                    bg-white
                                                    px-3
                                                    transition
                                                    focus-within:border-[#B38B2D]
                                                    focus-within:ring-2
                                                    focus-within:ring-[#B38B2D]/10
                                                "
                                            >
                                                <Phone
                                                    size={15}
                                                    className="mr-2 shrink-0 text-[#1F5C4A]"
                                                />

                                                <span
                                                    className="
                                                        mr-2
                                                        border-r
                                                        border-[#E1E6E2]
                                                        pr-2
                                                        text-[11px]
                                                        font-bold
                                                        text-[#253A33]
                                                    "
                                                >
                                                    +91
                                                </span>

                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={
                                                        handleChange
                                                    }
                                                    placeholder="9876543210"
                                                    maxLength={10}
                                                    inputMode="numeric"
                                                    autoComplete="tel"
                                                    required
                                                    className="
                                                        h-full w-full
                                                        min-w-0
                                                        bg-transparent
                                                        text-[12px]
                                                        text-[#1D2D27]
                                                        outline-none
                                                        placeholder:text-[#9AA59F]
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ======================================
                                        EMAIL
                                    ======================================= */}

                                    <div>
                                        <label
                                            className="
                                                mb-1 block
                                                text-[12px]
                                                font-bold
                                                text-[#253A33]
                                            "
                                        >
                                            Email Address
                                        </label>

                                        <div
                                            className="
                                                flex h-[44px]
                                                items-center
                                                rounded-[10px]
                                                border
                                                border-[#D8DED9]
                                                bg-white
                                                px-3
                                                transition
                                                focus-within:border-[#B38B2D]
                                                focus-within:ring-2
                                                focus-within:ring-[#B38B2D]/10
                                            "
                                        >
                                            <Mail
                                                size={16}
                                                className="mr-2.5 shrink-0 text-[#1F5C4A]"
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                className="
                                                    h-full w-full
                                                    bg-transparent
                                                    text-[12px]
                                                    text-[#1D2D27]
                                                    outline-none
                                                    placeholder:text-[#9AA59F]
                                                "
                                            />
                                        </div>
                                    </div>

                                    {/* ======================================
                                        CATEGORY / REQUIREMENT
                                    ======================================= */}

                                    <div>
                                        <label
                                            className="
                                                mb-1 block
                                                text-[12px]
                                                font-bold
                                                text-[#253A33]
                                            "
                                        >
                                            What are you looking for?{" "}
                                            <span className="text-[#B38B2D]">
                                                *
                                            </span>
                                        </label>

                                        <div
                                            className="
                                                flex h-[44px]
                                                items-center
                                                rounded-[10px]
                                                border
                                                border-[#D8DED9]
                                                bg-white
                                                px-3
                                                transition
                                                focus-within:border-[#B38B2D]
                                                focus-within:ring-2
                                                focus-within:ring-[#B38B2D]/10
                                            "
                                        >
                                            <Package
                                                size={16}
                                                className="mr-2.5 shrink-0 text-[#1F5C4A]"
                                            />

                                            <select
                                                name="requirement"
                                                value={
                                                    form.requirement
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                disabled={
                                                    categoriesLoading
                                                }
                                                required
                                                className="
                                                    h-full w-full
                                                    cursor-pointer
                                                    bg-transparent
                                                    text-[12px]
                                                    font-medium
                                                    text-[#253A33]
                                                    outline-none
                                                    disabled:cursor-wait
                                                    disabled:text-[#8B9691]
                                                "
                                            >
                                                <option value="">
                                                    {categoriesLoading
                                                        ? "Loading categories..."
                                                        : "Select category"}
                                                </option>

                                                {categories.map(
                                                    (category) => (
                                                        <option
                                                            key={
                                                                category._id ||
                                                                category.slug
                                                            }
                                                            value={
                                                                category.name
                                                            }
                                                        >
                                                            {
                                                                category.name
                                                            }
                                                        </option>
                                                    )
                                                )}

                                                <option value="Bulk Order">
                                                    Bulk Order
                                                </option>

                                                <option value="Corporate Gifting">
                                                    Corporate Gifting
                                                </option>

                                                <option value="Wholesale / Reseller">
                                                    Wholesale / Reseller
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* ======================================
                                        MESSAGE
                                    ======================================= */}

                                    <div>
                                        <label
                                            className="
                                                mb-1 block
                                                text-[12px]
                                                font-bold
                                                text-[#253A33]
                                            "
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={2}
                                            placeholder="Products, quantity or your requirement..."
                                            className="
                                                h-[62px]
                                                w-full
                                                resize-none
                                                rounded-[10px]
                                                border
                                                border-[#D8DED9]
                                                bg-white
                                                px-3 py-2.5
                                                text-[12px]
                                                leading-[18px]
                                                text-[#1D2D27]
                                                outline-none
                                                placeholder:text-[#9AA59F]
                                                focus:border-[#B38B2D]
                                                focus:ring-2
                                                focus:ring-[#B38B2D]/10
                                            "
                                        />
                                    </div>

                                    {/* ======================================
                                        SUBMIT
                                    ======================================= */}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="
                                            flex h-[46px]
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-[11px]
                                            bg-[#1F5C4A]
                                            px-5
                                            text-[13px]
                                            font-black
                                            text-white
                                            shadow-[0_9px_22px_rgba(31,92,74,0.22)]
                                            transition-all
                                            hover:-translate-y-[1px]
                                            hover:bg-[#17483A]
                                            hover:shadow-[0_12px_26px_rgba(31,92,74,0.28)]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    >
                                        <Send size={16} />

                                        {submitting
                                            ? "Submitting..."
                                            : "Submit Enquiry"}
                                    </button>

                                    {/* PRIVACY TEXT */}

                                    <p
                                        className="
                                            px-3
                                            text-center
                                            text-[9px]
                                            leading-[14px]
                                            text-[#7C8983]
                                        "
                                    >
                                        By submitting, you agree to
                                        be contacted by Gogaji
                                        International regarding your
                                        enquiry.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}