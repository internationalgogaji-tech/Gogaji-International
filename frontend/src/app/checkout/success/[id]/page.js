"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  CreditCard,
  Flower2,
  Gem,
  Home,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useOrders } from "@/context/OrderContext";

const formatCurrency = (value) =>
  `₹ ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatPaymentMethod = (method) => {
  if (!method) return "Payment confirmation pending";

  return String(method)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getAddressText = (order) => {
  const address = order?.shippingAddress || order?.address || {};

  return [
    address.address,
    address.addressLine,
    address.addressLine2,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
};

export default function CheckoutSuccessPage() {
  const { id } = useParams();
  const { fetchOrderById } = useOrders();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadOrder = async () => {
      try {
        if (!id) return;

        const data = await fetchOrderById(id);

        if (active) {
          setOrder(data?.order || data || null);
        }
      } catch (error) {
        console.error("Order success fetch error:", error);

        if (active) {
          setOrder(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      active = false;
    };
  }, [id, fetchOrderById]);

  const buyerName =
    order?.buyer?.fullName ||
    order?.user?.name ||
    order?.userInfo?.name ||
    "Valued Customer";

  const buyerPhone =
    order?.buyer?.phone || order?.user?.phone || order?.userInfo?.phone || "";

  const buyerEmail =
    order?.buyer?.email || order?.user?.email || order?.userInfo?.email || "";

  const companyName = order?.buyer?.companyName || "";

  const orderNumber =
    order?.orderNumber || order?.orderId || order?._id || id || "Loading...";

  const orderStatus = order?.orderStatus || order?.status || "Order Placed";

  const paymentMethod =
    order?.payment?.method || order?.paymentMethod || "";

  const totalAmount =
    order?.pricing?.totalAmount ||
    order?.pricing?.grandTotal ||
    order?.totalAmount ||
    order?.grandTotal ||
    0;

  const addressText = getAddressText(order);

  const orderItems = useMemo(() => {
    return order?.items || order?.products || [];
  }, [order]);

  const nextSteps = [
    [
      "Order review",
      "We are carefully checking your selected decor pieces.",
    ],
    [
      "Quality packing",
      "Each item is prepared with secure, thoughtful packaging.",
    ],
    [
      "Delivery update",
      "You will receive an update as soon as your order is dispatched.",
    ],
  ];

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#173f35] selection:bg-[#d7b15b]/40">
      <Navbar />

      <main className="mx-auto max-w-[1240px] px-4 py-8 md:px-6 md:py-12">
        <section className="overflow-hidden rounded-[30px] border border-[#e8dcc4] bg-[#fffdf9] shadow-[0_20px_60px_rgba(41,74,59,0.10)]">
          <div className="relative overflow-hidden border-b border-[#eadfc9] bg-[#f4eee3] px-5 py-10 text-center md:px-12 md:py-14">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#d7b15b]/15" />
            <div className="absolute -bottom-36 -right-20 h-80 w-80 rounded-full bg-[#236553]/10" />

            <Flower2
              className="absolute left-[8%] top-10 hidden text-[#b88d2b]/25 md:block"
              size={52}
            />
            <Sparkles
              className="absolute right-[10%] top-16 hidden text-[#b88d2b]/35 md:block"
              size={40}
            />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-[#fffaf0] bg-[#1f6552] shadow-[0_12px_30px_rgba(31,101,82,0.25)]">
              <Check size={42} strokeWidth={3} className="text-white" />
            </div>

            <p className="relative mt-5 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-[#af8123]">
              <Sparkles size={15} />
              Gogaji International
            </p>

            <h1 className="relative mt-3 font-serif text-[36px] font-bold leading-tight text-[#1f5445] md:text-[52px]">
              Your home is about to glow.
            </h1>

            <p className="relative mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#617269] md:text-[18px]">
              Thank you for choosing Gogaji International. Your decor order has
              been received and our team will soon begin preparing it with care.
            </p>

            <div className="relative mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3 md:gap-5">
              {[
                [
                  ReceiptText,
                  "Order number",
                  loading ? "Loading..." : orderNumber,
                ],
                [
                  PackageCheck,
                  "Order status",
                  loading ? "Loading..." : orderStatus,
                ],
                [
                  CreditCard,
                  "Total paid",
                  loading ? "Loading..." : formatCurrency(totalAmount),
                ],
              ].map(([Icon, label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#e8dcc4] bg-[#fffdf9]/95 px-4 py-5 shadow-sm"
                >
                  <Icon className="mx-auto text-[#b88d2b]" size={25} />

                  <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#7c8377]">
                    {label}
                  </p>

                  <p className="mt-2 break-words text-[16px] font-extrabold text-[#173f35]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[#eadfc9] bg-[#fffdf9] p-5 md:p-6">
                <SectionTitle
                  icon={Home}
                  eyebrow="Delivery details"
                  title="Bringing beauty to your doorstep"
                />

                {loading ? (
                  <p className="mt-5 text-[#6d7c73]">
                    Loading delivery details...
                  </p>
                ) : order ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <InfoCard icon={Gem} label="Ordered by">
                      <p className="font-bold text-[#173f35]">{buyerName}</p>

                      {companyName ? (
                        <p className="mt-1 text-sm text-[#6d7c73]">
                          {companyName}
                        </p>
                      ) : null}
                    </InfoCard>

                    <InfoCard icon={Phone} label="Contact">
                      <p>{buyerPhone || "Phone not available"}</p>

                      <p className="mt-1 flex items-center gap-1.5">
                        <Mail size={14} />
                        {buyerEmail || "Email not available"}
                      </p>
                    </InfoCard>

                    <InfoCard
                      icon={MapPin}
                      label="Delivery address"
                      className="md:col-span-2"
                    >
                      <p className="leading-6">
                        {addressText || "Address details not available"}
                      </p>
                    </InfoCard>
                  </div>
                ) : (
                  <p className="mt-5 text-[#b74d3d]">
                    We could not load your order details. Please try again
                    shortly.
                  </p>
                )}
              </section>

              <section className="rounded-2xl border border-[#eadfc9] bg-[#f8f4eb] p-5 md:p-6">
                <SectionTitle
                  icon={Sparkles}
                  eyebrow="A little journey"
                  title="What happens next?"
                />

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {nextSteps.map(([title, description], index) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-[#e7dbc4] bg-[#fffdf9] p-5"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f6552] text-sm font-extrabold text-white">
                        0{index + 1}
                      </span>

                      <h3 className="mt-4 font-bold text-[#173f35]">
                        {title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-[#6d7c73]">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[#eadfc9] bg-[#fffdf9] p-5 md:p-6">
                <SectionTitle
                  icon={ShoppingBag}
                  eyebrow="Your selection"
                  title="Pieces chosen for your space"
                />

                {loading ? (
                  <p className="mt-5 text-[#6d7c73]">Loading items...</p>
                ) : orderItems.length ? (
                  <div className="mt-5 divide-y divide-[#eee3d1] rounded-2xl border border-[#eee3d1] px-4">
                    {orderItems.slice(0, 4).map((item, index) => {
                      const name =
                        item.name ||
                        item.productName ||
                        item.title ||
                        item.product?.name ||
                        "Home decor piece";

                      const qty = item.quantity || item.qty || 1;

                      const price =
                        item.lineSubtotal ||
                        item.total ||
                        item.price ||
                        item.sellingPrice ||
                        0;

                      return (
                        <div
                          key={item._id || item.id || index}
                          className="flex items-center justify-between gap-4 py-4"
                        >
                          <div className="min-w-0">
                            <p className="line-clamp-2 font-bold text-[#173f35]">
                              {name}
                            </p>

                            <p className="mt-1 text-sm text-[#78857d]">
                              Quantity: {qty}
                            </p>
                          </div>

                          <p className="shrink-0 font-extrabold text-[#1f6552]">
                            {formatCurrency(price)}
                          </p>
                        </div>
                      );
                    })}

                    {orderItems.length > 4 ? (
                      <p className="py-3 text-sm font-semibold text-[#8a6a25]">
                        + {orderItems.length - 4} more beautiful piece(s)
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-5 text-[#6d7c73]">
                    Your item details will appear on the order details page.
                  </p>
                )}
              </section>
            </div>

            <aside className="space-y-5">
              <section className="rounded-2xl border border-[#d7c49b] bg-[#1f6552] p-6 text-white shadow-[0_12px_28px_rgba(31,101,82,0.18)]">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#ecd28d]">
                  Order summary
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold">
                  A thoughtful choice
                </h2>

                <div className="mt-6 space-y-4 text-sm text-[#e4f0e9]">
                  <SummaryRow
                    label="Payment"
                    value={formatPaymentMethod(paymentMethod)}
                  />

                  <SummaryRow
                    label="Status"
                    value={loading ? "Loading..." : orderStatus}
                  />

                  <div className="flex items-end justify-between gap-4 border-t border-white/20 pt-4">
                    <span className="font-bold">Grand total</span>

                    <b className="text-xl text-[#ffe5a0]">
                      {loading ? "Loading..." : formatCurrency(totalAmount)}
                    </b>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[#eadfc9] bg-[#fffaf0] p-5">
                <ShieldCheck className="text-[#b88d2b]" size={27} />

                <h3 className="mt-3 text-lg font-extrabold text-[#173f35]">
                  Gogaji Care Promise
                </h3>

                <ul className="mt-3 space-y-2.5 text-sm leading-6 text-[#68776e]">
                  <li>• Quality-checked home decor</li>
                  <li>• Secure, careful packaging</li>
                  <li>• Dedicated support for your order</li>
                </ul>
              </section>

              <div className="grid gap-3">
                <Link
                  href={`/checkout/order/${id}`}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#b98b26] px-5 font-extrabold text-white transition hover:bg-[#9f741b]"
                >
                  View order details
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/checkout/order"
                  className="inline-flex h-[52px] items-center justify-center rounded-xl border border-[#1f6552] bg-white px-5 font-extrabold text-[#1f6552] transition hover:bg-[#f2f8f4]"
                >
                  My orders
                </Link>

                <Link
                  href="/products"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl px-5 font-extrabold text-[#52655b] transition hover:bg-[#f8f4eb]"
                >
                  <ShoppingBag size={18} />
                  Continue shopping
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-xl bg-[#e5efe9] p-2.5 text-[#1f6552]">
        <Icon size={22} />
      </span>

      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#b88d2b]">
          {eyebrow}
        </p>

        <h2 className="mt-0.5 text-xl font-extrabold text-[#173f35]">
          {title}
        </h2>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, className = "", children }) {
  return (
    <div
      className={`rounded-xl border border-[#eee3d1] bg-[#fffefa] p-4 text-sm text-[#6d7c73] ${className}`}
    >
      <p className="mb-2 flex items-center gap-2 font-bold text-[#173f35]">
        <Icon size={17} className="text-[#b88d2b]" />
        {label}
      </p>

      {children}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <b className="max-w-[58%] text-right text-white">{value}</b>
    </div>
  );
}