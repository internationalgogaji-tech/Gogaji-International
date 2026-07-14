"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  PackageCheck,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddressSelector from "@/components/address/AddressSelector";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAddress } from "@/context/AddressContext";
import { API_BASE } from "@/lib/api";
import { toast } from "sonner";

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getImageUrl(url) {
  if (!url) return "https://via.placeholder.com/200x200?text=No+Image";

  if (/^https?:\/\/localhost:5000/i.test(url)) {
    return `${API_BASE}${url.replace(/^https?:\/\/localhost:5000/i, "")}`;
  }

  if (url.startsWith("http")) return url;

  return `${API_BASE}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function CheckoutAddressPage() {
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();
  const { cartItems, cartSummary, cartLoading } = useCart();
  const { selectedAddress } = useAddress();

  useEffect(() => {
    if (!authLoading && !user?.token) {
      router.replace("/");
    }
  }, [authLoading, user?.token, router]);

  const totalQty = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  const handleContinue = () => {
    if (!selectedAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }

    router.push("/checkout/payment");
  };

  if (authLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-[#fcfaf5]">
        <Navbar />
        <div className="py-24 text-center font-semibold text-[#176451]">
          Loading checkout...
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
            Discover premium home decor and add your favourite items to cart.
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
      <Navbar />

      <main className="mx-auto max-w-[1360px] px-4 py-8 lg:px-6 lg:py-12">
        <Link
          href="/checkout/cart"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#176451] transition hover:text-[#bd9226]"
        >
          <ArrowLeft size={18} />
          Back to cart
        </Link>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-[#eadfc8] bg-gradient-to-r from-[#176451] via-[#1b705b] to-[#0f4c3d] px-6 py-8 text-white shadow-[0_18px_45px_rgba(23,100,81,0.18)] md:px-10 md:py-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold tracking-wide">
            <ShieldCheck size={16} />
            SAFE & SECURE CHECKOUT
          </p>

          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Complete Your Order
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#e7f3ed] md:text-base">
            Confirm your delivery address and review your premium home decor
            order before payment.
          </p>
        </section>

        <div className="mt-6 grid overflow-hidden rounded-2xl border border-[#eadfc8] bg-white text-center text-sm font-bold shadow-sm md:grid-cols-3">
          <div className="bg-[#176451] px-4 py-4 text-white">
            1. Delivery Address
          </div>

          <div className="border-t border-[#eadfc8] px-4 py-4 text-[#8b7650] md:border-l md:border-t-0">
            2. Payment
          </div>

          <div className="border-t border-[#eadfc8] px-4 py-4 text-[#8b7650] md:border-l md:border-t-0">
            3. Order Confirmed
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6">
            <section className="rounded-[24px] border border-[#eadfc8] bg-white p-5 shadow-[0_10px_32px_rgba(46,59,50,0.07)] md:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <div className="w-fit rounded-2xl bg-[#e8f2ed] p-4 text-[#176451]">
                  <PackageCheck size={28} />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#bd9226]">
                    Gogaji International
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-[#176451]">
                    Premium Home Decor Checkout
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#66756f]">
                    Your selected decor pieces are reserved. Add a delivery
                    address to continue securely.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#eee3ce] bg-[#fffcf6] p-4">
                  <ShoppingBag size={19} className="text-[#bd9226]" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#8b7650]">
                    Items
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-[#176451]">
                    {totalQty} {totalQty === 1 ? "Item" : "Items"}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eee3ce] bg-[#fffcf6] p-4">
                  <Truck size={19} className="text-[#bd9226]" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#8b7650]">
                    Delivery
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-[#176451]">
                    Pan India
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eee3ce] bg-[#fffcf6] p-4">
                  <ShieldCheck size={19} className="text-[#bd9226]" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#8b7650]">
                    Payment
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-[#176451]">
                    Secure
                  </p>
                </div>
              </div>
            </section>

            <AddressSelector />

            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedAddress}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#bd9226] px-6 text-base font-extrabold text-white shadow-[0_12px_25px_rgba(189,146,38,0.25)] transition hover:bg-[#a87d18] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue to Payment
              <ArrowLeft size={18} className="rotate-180" />
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
                  <span className="text-[#66756f]">Subtotal</span>
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

              <div className="mt-4 max-h-[390px] space-y-4 overflow-y-auto pr-1">
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
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}