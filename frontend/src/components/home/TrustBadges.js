import {
  ShieldCheck,
  Truck,
  ReceiptText,
  PackageCheck,
} from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="border-y border-[#E8D8AE] bg-[#FDFBF5]">
      <div className="container-royal grid gap-6 py-5 md:grid-cols-4">

        {/* Premium Quality */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F5C4A] text-white shadow-lg">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1F5C4A]">
              Premium Quality
            </h3>

            <p className="text-xs text-[#2F3A3A]">
              Handpicked luxury home decor.
            </p>
          </div>
        </div>

        {/* Craftsmanship */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B38B2D] text-white shadow-lg">
            <PackageCheck size={28} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1F5C4A]">
              Elegant Craftsmanship
            </h3>

            <p className="text-xs text-[#2F3A3A]">
              Designed with timeless beauty.
            </p>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg">
            <Truck size={28} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1F5C4A]">
              Pan India Delivery
            </h3>

            <p className="text-xs text-[#2F3A3A]">
              Safe & secure shipping.
            </p>
          </div>
        </div>

        {/* Returns */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#B38B2D] bg-white text-[#B38B2D] shadow-lg">
            <ReceiptText size={28} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1F5C4A]">
              Easy Returns
            </h3>

            <p className="text-xs text-[#2F3A3A]">
              Hassle-free customer support.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}