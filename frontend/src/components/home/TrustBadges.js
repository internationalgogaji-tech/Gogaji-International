import {
  ShieldCheck,
  Truck,
  ReceiptText,
  PackageCheck,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Trusted By Thousands",
    text: "Premium home decor products loved by customers across India.",
  },
  {
    icon: PackageCheck,
    title: "Premium Craftsmanship",
    text: "Elegant decor pieces crafted with quality materials and timeless design.",
  },
  {
    icon: Truck,
    title: "Safe Pan India Delivery",
    text: "Secure packaging and reliable shipping for a worry-free experience.",
  },
  {
    icon: ReceiptText,
    title: "Easy Returns",
    text: "Simple return support and customer-first shopping experience.",
  },
];

export default function TrustBadges() {
  return (
   <section className="border-y border-[#E7DDF1] bg-gradient-to-r from-[#4A3656] via-[#6D5A7E] to-[#8F7AA3] text-white">
  <div className="container-royal grid gap-6 py-4 md:grid-cols-4">

    <div className="flex items-center gap-3">
      <ShieldCheck size={32} className="shrink-0" />
      <div>
        <h3 className="text-base font-bold">
          Premium Quality
        </h3>
        <p className="text-xs text-white/80">
          Handpicked luxury home decor.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <PackageCheck size={32} className="shrink-0" />
      <div>
        <h3 className="text-base font-bold">
          Elegant Craftsmanship
        </h3>
        <p className="text-xs text-white/80">
          Designed with timeless beauty.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <Truck size={32} className="shrink-0" />
      <div>
        <h3 className="text-base font-bold">
          Pan India Delivery
        </h3>
        <p className="text-xs text-white/80">
          Safe & secure shipping.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <ReceiptText size={32} className="shrink-0" />
      <div>
        <h3 className="text-base font-bold">
          Easy Returns
        </h3>
        <p className="text-xs text-white/80">
          Hassle-free customer support.
        </p>
      </div>
    </div>

  </div>
</section>
  );
}