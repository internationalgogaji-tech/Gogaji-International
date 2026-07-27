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

// Apna actual WhatsApp number country code ke saath.
// +, spaces aur dashes nahi hone chahiye.
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

  // Home page open hone ke thodi der baad popup.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, []);

  // Popup open hone par background scroll band.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // ESC se close.
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      /*
       * Backend enquiry API available ho to is endpoint ko
       * aapke actual endpoint se match kar dena.
       *
       * Example:
       * POST /api/contact/enquiry
       */

      const response = await fetch(`${API_BASE}/api/contact/enquiry`, {
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
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit enquiry.");
      }

      setSuccess(true);
      setForm(INITIAL_FORM);

      window.setTimeout(() => {
        setSuccess(false);
        setOpen(false);
      }, 2200);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      /*
       * API abhi create nahi hui hai to user ka enquiry
       * WhatsApp me ready karke open kar dete hain.
       */
      const text = [
        "Hello Gogaji International,",
        "",
        "I would like to make an enquiry.",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        form.email ? `Email: ${form.email}` : "",
        `Requirement: ${form.requirement}`,
        form.message ? `Message: ${form.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text =
      "Hello Gogaji International, I would like to know more about your home decor collection.";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* =========================
          RIGHT FIXED BUTTONS
      ========================== */}

      <div className="fixed bottom-6 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
        {/* Enquiry / Form button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            group flex h-[56px] items-center gap-3 rounded-full
            border border-[#B38B2D]/40
            bg-[#1F5C4A]
            px-5
            text-sm font-extrabold text-white
            shadow-[0_12px_35px_rgba(31,92,74,0.28)]
            transition-all duration-300
            hover:-translate-y-1
            hover:bg-[#17483A]
            hover:shadow-[0_16px_40px_rgba(31,92,74,0.35)]
          "
          aria-label="Open enquiry form"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <MessageSquare size={19} />
          </span>

          <span className="hidden sm:block">Send Enquiry</span>
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={openWhatsApp}
          className="
            group flex h-[58px] w-[58px] items-center justify-center
            rounded-full border-[3px] border-white
            bg-[#25D366] text-white
            shadow-[0_12px_32px_rgba(37,211,102,0.35)]
            transition-all duration-300
            hover:-translate-y-1 hover:scale-105
          "
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={29} fill="currentColor" />

          <span
            className="
              pointer-events-none absolute right-[70px]
              whitespace-nowrap rounded-lg
              bg-[#163F34] px-3 py-2
              text-xs font-bold text-white
              opacity-0 shadow-lg
              transition
              group-hover:opacity-100
            "
          >
            Chat on WhatsApp
          </span>
        </button>
      </div>

      {/* =========================
          POPUP
      ========================== */}

      {open && (
        <div
          className="
            fixed inset-0 z-[200]
            flex items-center justify-end
            bg-[#0A1F19]/55
            p-3
            backdrop-blur-[3px]
            sm:p-5
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
              max-h-[94vh]
              w-full max-w-[480px]
              overflow-y-auto
              rounded-[28px]
              border border-[#DCC88D]/60
              bg-[#FFFCF5]
              shadow-[0_30px_90px_rgba(0,0,0,0.28)]
            "
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                absolute right-4 top-4 z-20
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-white/25
                bg-white/15
                text-white
                backdrop-blur-md
                transition
                hover:rotate-90 hover:bg-white hover:text-[#1F5C4A]
              "
              aria-label="Close enquiry form"
            >
              <X size={20} />
            </button>

            {/* HEADER */}
            <div className="relative overflow-hidden bg-[#1F5C4A] px-6 pb-7 pt-7 text-white sm:px-8">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[24px] border-white/5" />

              <div className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full border-[24px] border-[#B38B2D]/15" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D9BD6D]/35 bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#F1D990]">
                  <Sparkles size={14} />
                  Gogaji International
                </div>

                <h2 className="max-w-[330px] text-2xl font-black leading-tight sm:text-[28px]">
                  Let&apos;s Style Something Beautiful
                </h2>

                <p className="mt-3 max-w-[370px] text-sm leading-6 text-white/80">
                  Tell us what you&apos;re looking for and our team will
                  assist you with products, bulk orders and gifting.
                </p>
              </div>
            </div>

            {/* FORM */}
            <div className="p-5 sm:p-7">
              {success ? (
                <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5EE] text-[#1F5C4A]">
                    <Send size={28} />
                  </div>

                  <h3 className="mt-5 text-2xl font-black text-[#1F5C4A]">
                    Thank You!
                  </h3>

                  <p className="mt-2 max-w-[300px] text-sm leading-6 text-[#65716C]">
                    Your enquiry has been submitted. Our team will contact you
                    shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-[#253A33]">
                      Your Name <span className="text-[#B38B2D]">*</span>
                    </label>

                    <div className="flex h-[52px] items-center rounded-xl border border-[#D8DED9] bg-white px-4 transition focus-within:border-[#B38B2D] focus-within:ring-2 focus-within:ring-[#B38B2D]/10">
                      <User size={18} className="mr-3 text-[#1F5C4A]" />

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="h-full w-full bg-transparent text-sm text-[#1D2D27] outline-none placeholder:text-[#9AA59F]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-[#253A33]">
                      Email Address
                    </label>

                    <div className="flex h-[52px] items-center rounded-xl border border-[#D8DED9] bg-white px-4 transition focus-within:border-[#B38B2D] focus-within:ring-2 focus-within:ring-[#B38B2D]/10">
                      <Mail size={18} className="mr-3 text-[#1F5C4A]" />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="h-full w-full bg-transparent text-sm text-[#1D2D27] outline-none placeholder:text-[#9AA59F]"
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-[#253A33]">
                      WhatsApp Number{" "}
                      <span className="text-[#B38B2D]">*</span>
                    </label>

                    <div className="flex h-[52px] items-center rounded-xl border border-[#D8DED9] bg-white px-4 transition focus-within:border-[#B38B2D] focus-within:ring-2 focus-within:ring-[#B38B2D]/10">
                      <Phone size={18} className="mr-3 text-[#1F5C4A]" />

                      <span className="mr-2 border-r border-[#E1E6E2] pr-3 text-sm font-bold text-[#253A33]">
                        +91
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        maxLength={10}
                        className="h-full w-full bg-transparent text-sm text-[#1D2D27] outline-none placeholder:text-[#9AA59F]"
                      />
                    </div>
                  </div>

                  {/* Requirement */}
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-[#253A33]">
                      What are you looking for?{" "}
                      <span className="text-[#B38B2D]">*</span>
                    </label>

                    <div className="flex h-[52px] items-center rounded-xl border border-[#D8DED9] bg-white px-4 transition focus-within:border-[#B38B2D]">
                      <Package size={18} className="mr-3 text-[#1F5C4A]" />

                      <select
                        name="requirement"
                        value={form.requirement}
                        onChange={handleChange}
                        className="h-full w-full cursor-pointer bg-transparent text-sm text-[#253A33] outline-none"
                      >
                        <option value="">Select requirement</option>
                        <option value="Home Decor">
                          Home Decor Products
                        </option>
                        <option value="Bulk Order">Bulk Order</option>
                        <option value="Corporate Gifting">
                          Corporate Gifting
                        </option>
                        <option value="Interior Project">
                          Interior Project
                        </option>
                        <option value="Wholesale">
                          Wholesale / Reseller
                        </option>
                        <option value="Product Enquiry">
                          Product Enquiry
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-[#253A33]">
                      Message
                    </label>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about products, quantity or your requirement..."
                      className="
                        w-full resize-none rounded-xl
                        border border-[#D8DED9]
                        bg-white px-4 py-3
                        text-sm text-[#1D2D27]
                        outline-none
                        placeholder:text-[#9AA59F]
                        focus:border-[#B38B2D]
                        focus:ring-2 focus:ring-[#B38B2D]/10
                      "
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      flex h-[54px] w-full items-center justify-center gap-2
                      rounded-xl
                      bg-[#1F5C4A]
                      px-5
                      text-sm font-black text-white
                      shadow-[0_10px_25px_rgba(31,92,74,0.22)]
                      transition
                      hover:bg-[#17483A]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <Send size={18} />

                    {submitting ? "Submitting..." : "Submit Enquiry"}
                  </button>

                  <p className="text-center text-[11px] leading-5 text-[#7C8983]">
                    By submitting, you agree to be contacted by Gogaji
                    International regarding your enquiry.
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