"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  MessageCircle,
  UploadCloud,
  Package,
  User,
  MapPin,
  Sparkles,
} from "lucide-react";

const WHATSAPP_NUMBER = "917351767928"; // +91 73517 67928

const emptyItem = {
  productName: "",
  category: "",
  quantity: 1,
};

export default function RequestProductsPage() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([{ ...emptyItem }]);

  const [form, setForm] = useState({
    description: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }]);

  const removeItem = (index) => {
    setItems((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.customerName.trim()) newErrors.customerName = "Name is required";
    if (!form.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.customerPhone.replace(/\D/g, "").slice(-10))) {
      newErrors.customerPhone = "Enter a valid 10-digit phone number";
    }
    if (!form.description.trim())
      newErrors.description = "Please describe your requirement";
    if (!form.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pinCode.trim()) newErrors.pinCode = "PIN code is required";

    const hasEmptyItem = items.some((item) => !item.productName.trim());
    if (hasEmptyItem) newErrors.items = "Please enter at least the product name for every item";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRequest = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    const productLines = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.productName}${
            item.category ? ` (Category: ${item.category})` : ""
          } — Qty: ${item.quantity || 1}`
      )
      .join("\n");

    const addressLine = [
      form.addressLine1,
      form.addressLine2,
      form.city,
      form.state,
      form.pinCode,
    ]
      .filter(Boolean)
      .join(", ");

    const text = [
      "Hello Gogaji International, I would like to request the following products:",
      "",
      "*Products Required:*",
      productLines,
      "",
      form.description ? `*Requirement Details:*\n${form.description}` : null,
      "",
      "*Contact Details:*",
      `Name: ${form.customerName}`,
      form.companyName ? `Company: ${form.companyName}` : null,
      `Phone: ${form.customerPhone}`,
      form.customerEmail ? `Email: ${form.customerEmail}` : null,
      "",
      "*Delivery Address:*",
      addressLine,
      images.length ? `\n(${images.length} product image(s) will be shared separately)` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");

    toast.success("Redirecting you to WhatsApp...");

    setItems([{ ...emptyItem }]);
    setForm({
      description: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      companyName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
    });
    setImages([]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF5]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-[32px] bg-[#1F5C4A] p-8 text-white shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-14 -left-8 h-40 w-40 rounded-full bg-[#B38B2D]/25" />

          <div className="relative mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[#F7D77C]">
            <Sparkles size={16} />
            Bulk &amp; Custom Product Sourcing
          </div>

          <h1 className="relative text-3xl font-black md:text-5xl">
            Can&apos;t Find What You&apos;re Looking For?
          </h1>

          <p className="relative mt-4 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
            Tell us the home decor products you need — vases, planters, pooja
            essentials, candle holders or anything else. Fill the form and
            we&apos;ll get your request instantly on WhatsApp.
          </p>
        </div>

        <form
          onSubmit={submitRequest}
          className="rounded-[28px] border border-[#B38B2D]/20 bg-white p-6 shadow-lg md:p-8"
        >
          {/* Product list */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-black text-[#1F5C4A]">
                <Package size={22} />
                Product Requirements
              </h2>
              <p className="mt-1 text-sm text-[#5A6464]">
                Add all the products you want to enquire about.
              </p>
            </div>

            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1F5C4A] px-4 py-3 text-sm font-black text-white transition hover:bg-[#18493B]"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {errors.items ? (
            <p className="mb-4 text-sm font-semibold text-red-500">{errors.items}</p>
          ) : null}

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#E8D8AE] bg-[#FDFBF5] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-black text-[#1F5C4A]">
                    Product #{index + 1}
                  </p>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#2F3A3A]">
                      Product Name *
                    </label>
                    <input
                      value={item.productName}
                      onChange={(e) =>
                        handleItemChange(index, "productName", e.target.value)
                      }
                      placeholder="e.g. Ceramic Floor Vase"
                      className="w-full rounded-xl border border-[#DCCB9E] bg-white px-4 py-3 outline-none transition focus:border-[#1F5C4A]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#2F3A3A]">
                      Category
                    </label>
                    <input
                      value={item.category}
                      onChange={(e) =>
                        handleItemChange(index, "category", e.target.value)
                      }
                      placeholder="Planters, Vases, Pooja Decor..."
                      className="w-full rounded-xl border border-[#DCCB9E] bg-white px-4 py-3 outline-none transition focus:border-[#1F5C4A]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#2F3A3A]">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="w-full rounded-xl border border-[#DCCB9E] bg-white px-4 py-3 outline-none transition focus:border-[#1F5C4A]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-2xl font-black text-[#1F5C4A]">
              <User size={22} />
              Your Details
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field
                label="Your Name *"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                error={errors.customerName}
              />
              <Field
                label="Email"
                name="customerEmail"
                type="email"
                value={form.customerEmail}
                onChange={handleChange}
              />
              <Field
                label="Phone / WhatsApp *"
                name="customerPhone"
                value={form.customerPhone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                error={errors.customerPhone}
              />
              <Field
                label="Company Name"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="For bulk / B2B orders"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-10 rounded-3xl border border-[#E8D8AE] bg-[#FFF8E8] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-10 w-1 rounded-full bg-[#B38B2D]" />
              <div>
                <h3 className="flex items-center gap-2 text-xl font-black text-[#1F5C4A]">
                  <MapPin size={20} />
                  Delivery Address
                </h3>
                <p className="text-sm text-[#5A6464]">
                  Required so we can quote delivery charges accurately.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field
                  label="Address Line 1 *"
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  placeholder="Building, Street, Area"
                  error={errors.addressLine1}
                  bg="white"
                />
              </div>

              <div className="md:col-span-2">
                <Field
                  label="Address Line 2"
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  placeholder="Landmark, Floor etc."
                  bg="white"
                />
              </div>

              <Field
                label="City *"
                name="city"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
                bg="white"
              />
              <Field
                label="State *"
                name="state"
                value={form.state}
                onChange={handleChange}
                error={errors.state}
                bg="white"
              />
              <Field
                label="PIN Code *"
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                error={errors.pinCode}
                bg="white"
              />
            </div>
          </div>

          {/* Images + description */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-[#2F3A3A]">
                Upload Reference Images (optional)
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#B38B2D] bg-[#FFF8E8] px-4 py-3 text-sm font-semibold text-[#1F5C4A] transition hover:bg-[#FFF3D6]">
                <UploadCloud size={18} />
                {images.length ? `${images.length} image(s) selected` : "Choose images"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => setImages(Array.from(e.target.files || []))}
                />
              </label>
              <p className="mt-2 text-xs text-[#5A6464]">
                Images can&apos;t be attached to WhatsApp automatically — please
                send them in chat after opening WhatsApp.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#2F3A3A]">
                Requirement Details *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Material, finish, size, budget, delivery timeline etc."
                className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-[#1F5C4A] ${
                  errors.description ? "border-red-400" : "border-[#DCCB9E]"
                }`}
              />
              {errors.description ? (
                <p className="mt-1 text-xs font-semibold text-red-500">
                  {errors.description}
                </p>
              ) : null}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-black text-white shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB855] hover:shadow-[0_15px_35px_rgba(37,211,102,0.4)] disabled:opacity-60 sm:w-auto"
            >
              <MessageCircle size={20} />
              {loading ? "Preparing..." : "Submit & Chat on WhatsApp"}
            </button>

            <p className="mt-3 text-xs text-[#5A6464]">
              By submitting, you&apos;ll be redirected to WhatsApp to send your
              product request to our team.
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder, error, bg = "fdf" }) {
  const bgClass = bg === "white" ? "bg-white" : "bg-[#FDFBF5]";

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#2F3A3A]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-[#1F5C4A] ${bgClass} ${
          error ? "border-red-400" : "border-[#DCCB9E]"
        }`}
      />
      {error ? (
        <p className="mt-1 text-xs font-semibold text-red-500">{error}</p>
      ) : null}
    </div>
  );
}