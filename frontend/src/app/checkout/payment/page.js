"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Leaf,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAddress } from "@/context/AddressContext";
import { useOrders } from "@/context/OrderContext";
import { API_BASE } from "@/lib/api";
import { toast } from "sonner";

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getImageUrl(url) {
  if (!url) {
    return "https://via.placeholder.com/200x200?text=No+Image";
  }

  if (/^https?:\/\/localhost:5000/i.test(url)) {
    return `${API_BASE}${url.replace(/^https?:\/\/localhost:5000/i, "")}`;
  }

  if (url.startsWith("http")) return url;

  return `${API_BASE}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function CheckoutPaymentPage() {
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();
  const { cartItems, cartSummary, cartLoading, fetchCart } = useCart();
  const { selectedAddress } = useAddress();

  const {
    placeOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
    actionLoading,
  } = useOrders();

  const [form, setForm] = useState({
    paymentMethod: "razorpay",
    note: "",
  });

  useEffect(() => {
    if (!authLoading && !user?.token) {
      router.replace("/");
    }
  }, [authLoading, user?.token, router]);

  useEffect(() => {
    if (!selectedAddress && !authLoading) {
      router.replace("/checkout/address");
    }
  }, [selectedAddress, authLoading, router]);

  const totalQty = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select a delivery address");
        return;
      }

      const orderData = await placeOrder({
        buyer: {
          fullName: selectedAddress.fullName,
          phone: selectedAddress.phone,
          email: user?.email || "",
          companyName: "",
          gstNumber: "",
        },

        shippingAddress: {
          address: selectedAddress.addressLine,
          city: selectedAddress.city,
          state: selectedAddress.state,
          pincode: selectedAddress.pincode,
          country: "India",
        },

        paymentMethod: form.paymentMethod,
        note: form.note,
      });

      if (form.paymentMethod === "cod") {
        await fetchCart();

        toast.success("Order placed successfully");
        router.push(`/checkout/success/${orderData.order._id}`);
        return;
      }

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: orderData.razorpayOrder.amount,
        currency: "INR",
        order_id: orderData.razorpayOrder.id,

        name: "Gogaji International",
        description: "Premium Home Decor Order",

        prefill: {
          name: selectedAddress.fullName,
          email: user?.email || "",
          contact: selectedAddress.phone,
        },

        theme: {
          color: "#176451",
        },

        handler: async function (response) {
          const verifyData = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderData.order._id,
          });

          if (verifyData.success) {
            await fetchCart();

            toast.success("Payment successful");
            router.push(`/checkout/success/${orderData.order._id}`);
          } else {
            toast.error("Payment verification failed");
          }
        },
      });

      razorpay.open();
    } catch (error) {
      toast.error(error.message || "Payment failed");
    }
  };

  if (authLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-[#fcfaf5]">
        <Navbar />
        <div className="py-24 text-center font-semibold text-[#176451]">
          Loading payment...
        </div>
        <Footer />
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div className="min-h-screen bg-[#fcfaf5]">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
          <div className="rounded-full bg-[#e8f2ed] p-6 text-[#176451]">
            <ShoppingBag size={54} />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#176451]">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-[#66756f]">
            Discover elegant home decor and add your favourites to cart.
          </p>

          <Link
            href="/products"
            className="mt-7 rounded-full bg-[#176451] px-7 py-3 font-bold text-white transition hover:bg-[#104b3d]"
          >
            Explore Products
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#26342f]">
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <Navbar />

      <main className="mx-auto max-w-[1360px] px-4 py-8 lg:px-6 lg:py-12">
        <Link
          href="/checkout/address"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#176451] transition hover:text-[#bd9226]"
        >
          <ArrowLeft size={18} />
          Back to address
        </Link>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-[#eadfc8] bg-gradient-to-r from-[#176451] via-[#1b705b] to-[#0f4c3d] px-6 py-8 text-white shadow-[0_18px_45px_rgba(23,100,81,0.18)] md:px-10 md:py-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide">
            <ShieldCheck size={16} />
            SAFE & SECURE PAYMENT
          </p>

          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Complete Your Purchase
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#e7f3ed] md:text-base">
            Choose your payment method and bring premium Gogaji home decor to
            your space.
          </p>
        </section>

        <div className="mt-6 grid overflow-hidden rounded-2xl border border-[#eadfc8] bg-white text-center text-sm font-bold shadow-sm md:grid-cols-3">
          <div className="px-4 py-4 text-[#176451]">
            1. Delivery Address
          </div>

          <div className="border-y border-[#eadfc8] bg-[#176451] px-4 py-4 text-white md:border-x md:border-y-0">
            2. Payment
          </div>

          <div className="px-4 py-4 text-[#8b7650]">
            3. Order Confirmed
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6">
            <section className="rounded-[24px] border border-[#eadfc8] bg-white p-5 shadow-[0_10px_32px_rgba(46,59,50,0.07)] md:p-7">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#e8f2ed] p-3 text-[#176451]">
                  <MapPin size={24} />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#bd9226]">
                    Delivery Address
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-[#176451]">
                    Delivering to {selectedAddress?.fullName}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#66756f]">
                    <b className="text-[#26342f]">{selectedAddress?.phone}</b>
                    <br />
                    {selectedAddress?.addressLine}
                    {selectedAddress?.landmark
                      ? `, ${selectedAddress.landmark}`
                      : ""}
                    , {selectedAddress?.city}, {selectedAddress?.state} -{" "}
                    {selectedAddress?.pincode}
                  </p>

                  <Link
                    href="/checkout/address"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#bd9226] transition hover:text-[#176451]"
                  >
                    Change Address
                    <ArrowLeft size={16} className="rotate-180" />
                  </Link>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#eadfc8] bg-white p-5 shadow-[0_10px_32px_rgba(46,59,50,0.07)] md:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="rounded-2xl bg-[#f7f0df] p-3 text-[#bd9226]">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#bd9226]">
                    Secure Checkout
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-[#176451]">
                    Choose Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-[#66756f]">
                    Your payment information is protected and secure.
                  </p>
                </div>
              </div>

              <PaymentMethodSelector
                value={form.paymentMethod}
                onChange={(method) =>
                  setForm((previous) => ({
                    ...previous,
                    paymentMethod: method,
                  }))
                }
                totalAmount={cartSummary?.grandTotal}
              />
            </section>

            <section className="rounded-[24px] border border-[#eadfc8] bg-white p-5 shadow-[0_10px_32px_rgba(46,59,50,0.07)] md:p-7">
              <label className="text-sm font-extrabold text-[#176451]">
                Special instructions <span className="font-medium text-[#8b7650]">(Optional)</span>
              </label>

              <textarea
                name="note"
                value={form.note}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    note: event.target.value,
                  }))
                }
                rows={4}
                className="mt-3 w-full rounded-2xl border border-[#eadfc8] bg-[#fffcf6] px-4 py-3 text-sm outline-none transition focus:border-[#176451] focus:ring-2 focus:ring-[#176451]/10"
                placeholder="Add any delivery instruction, gift note, colour preference or special request..."
              />
            </section>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={actionLoading}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#bd9226] px-6 text-base font-extrabold text-white shadow-[0_12px_25px_rgba(189,146,38,0.25)] transition hover:bg-[#a87d18] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? "Processing your order..."
                : form.paymentMethod === "cod"
                  ? "Place Cash on Delivery Order"
                  : `Pay ${formatCurrency(cartSummary?.grandTotal)}`}
            </button>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-5 lg:self-start">
            <section className="overflow-hidden rounded-[24px] border border-[#eadfc8] bg-white shadow-[0_10px_32px_rgba(46,59,50,0.07)]">
              <div className="bg-[#176451] px-5 py-4 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d8bb75]">
                  Your Order
                </p>

                <h2 className="mt-1 text-2xl font-extrabold">Order Summary</h2>
              </div>

              <div className="space-y-4 p-5 text-[15px]">
                <div className="flex justify-between gap-4">
                  <span className="text-[#66756f]">{totalQty} items</span>
                  <b>{formatCurrency(cartSummary?.subtotalExGst)}</b>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#66756f]">GST</span>
                  <b>{formatCurrency(cartSummary?.gstTotal)}</b>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#66756f]">Delivery</span>
                  <b>{formatCurrency(cartSummary?.shipping)}</b>
                </div>

                <div className="flex justify-between border-t border-[#eadfc8] pt-4 text-xl font-extrabold text-[#176451]">
                  <span>Total</span>
                  <span>{formatCurrency(cartSummary?.grandTotal)}</span>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#eadfc8] bg-white p-5 shadow-[0_10px_32px_rgba(46,59,50,0.07)]">
              <h3 className="text-lg font-extrabold text-[#176451]">
                Items in your cart
              </h3>

              <div className="mt-4 max-h-[380px] space-y-4 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b border-[#f0e8da] pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="h-[68px] w-[68px] rounded-xl border border-[#eee3ce] bg-[#fffcf6] object-contain p-1"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 font-bold leading-5 text-[#26342f]">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-sm text-[#8b7650]">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 font-extrabold text-[#176451]">
                        {formatCurrency(item.lineSubtotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#d9c99f] bg-[#fffcf6] p-5">
              <div className="space-y-4 text-sm text-[#44534d]">
                <p className="flex gap-3">
                  <ShieldCheck className="shrink-0 text-[#176451]" size={20} />
                  Secure payment through trusted payment partners.
                </p>

                <p className="flex gap-3">
                  <PackageCheck className="shrink-0 text-[#176451]" size={20} />
                  Carefully packed premium home decor products.
                </p>

                <p className="flex gap-3">
                  <Truck className="shrink-0 text-[#176451]" size={20} />
                  Pan India delivery available.
                </p>

                <p className="flex gap-3">
                  <Leaf className="shrink-0 text-[#176451]" size={20} />
                  Curated home decor for elegant living spaces.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}