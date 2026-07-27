
import Link from "next/link";

import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import { getProductImage } from "@/lib/getProductImage";
import ProductImageGallery from "@/components/ProductImageGallery";
import { apiRequest, API_BASE } from "@/lib/api";

import {
  Star,
  Truck,
  ChevronRight,
  Info,
  Download,
  Cpu,
  ShieldCheck,
  Zap,
  Settings2,
  PackageCheck,
  FileText,
} from "lucide-react";

function getImageUrl(url) {
  if (!url) return "https://via.placeholder.com/800x800?text=No+Image";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

async function getProduct(id) {
  try {
    const data = await apiRequest(`/api/products/slug/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });

    if (data?.product) return data.product;
  } catch (error) {
    console.error("Product by slug fetch error:", error);
  }

  try {
    const data = await apiRequest(`/api/products/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });

    return data?.product || null;
  } catch (error) {
    console.error("Product by id fetch error:", error);
    return null;
  }
}

async function getSimilarProducts(product) {
  try {
    const query = new URLSearchParams();
    query.set("limit", "500");

    if (product?.category) {
      query.set("category", product.category);
    }

    const data = await apiRequest(`/api/products?${query.toString()}`, {
      cache: "no-store",
    });

    const items = data?.products || [];

    return items
      .filter(
        (item) =>
          String(item?._id) !== String(product?._id) &&
          String(item?.slug) !== String(product?.slug)
      )

  } catch (error) {
    console.error("Similar products fetch error:", error);
    return [];
  }
}

async function getActiveCoupon() {
  try {
    const data = await apiRequest("/api/coupons/active", {
      cache: "no-store",
    });

    return data?.coupons?.[0] || null;
  } catch (error) {
    console.error("Coupon fetch error:", error);
    return null;
  }
}

function formatCurrency(value) {
  return `₹ ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getStockMeta(product) {
  const qty = Number(product?.stock || 0);

  const isOut =
    product?.isOutOfStock ||
    product?.stockStatus === "out_of_stock" ||
    qty <= 0;

  if (isOut) {
    return {
      label: product?.allowBackorder
        ? "Available on Request"
        : "Currently Out of Stock",
      className: product?.allowBackorder
        ? "bg-[#fff7ed] text-[#c2410c]"
        : "bg-[#fee2e2] text-[#b91c1c]",
      note: product?.allowBackorder
        ? "This component is available through procurement request or backorder."
        : "This component is temporarily unavailable for direct purchase.",
      isOut: true,
    };
  }

  if (qty <= 20 || product?.stockStatus === "low_stock") {
    return {
      label: "Limited stock available",
      className: "bg-[#fff3cd] text-[#7a5200]",
      note: `${qty} unit(s) ready for dispatch.`,
      isOut: false,
    };
  }

  return {
    label: "In stock",
    className: "bg-[#e2f5ea] text-[#067647]",
    note: `${qty} unit(s) available for immediate dispatch.`,
    isOut: false,
  };
}

function getPrimaryImage(product) {
  return (
    product?.thumbnail ||
    product?.images?.find((img) => img?.isPrimary)?.url ||
    product?.images?.[0]?.url ||
    ""
  );
}

function getPerPiecePrice(product) {
  const price = Number(product?.price || 0);
  const moq = Number(product?.moq || 1);
  return moq > 1 ? price / moq : price;
}

function getIncGstPrice(value) {
  return value + value * 0.18;
}

function getBulkPricingRows(product) {
  const basePack = Number(product?.price || 0);
  const perPiece = getPerPiecePrice(product);
  const moq = Number(product?.moq || 1);

  return [
    {
      qty: `${moq} - ${moq * 19}`,
      unitPrice: perPiece,
      packPrice: basePack,
    },
    {
      qty: `${moq * 20} - ${moq * 74}`,
      unitPrice: perPiece * 0.96,
      packPrice: basePack * 0.96,
    },
    {
      qty: `${moq * 75} - ${moq * 299}`,
      unitPrice: perPiece * 0.92,
      packPrice: basePack * 0.92,
    },
    {
      qty: `${moq * 300} - ${moq * 599}`,
      unitPrice: perPiece * 0.88,
      packPrice: basePack * 0.88,
    },
    {
      qty: `${moq * 600}+`,
      unitPrice: perPiece * 0.84,
      packPrice: basePack * 0.84,
    },
  ];
}

function getFeatureCards(product) {
  // ✅ Admin controlled
  if (product?.highlights?.length > 0) {
    return product.highlights
      .filter((item) => item.isActive !== false)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      .map((item) => ({
        title: item.title,
        desc: item.description,
        icon: ShieldCheck,
        iconWrap: "bg-[#eef4ff] text-[#2452c6]",
      }));
  }

  // 🔁 fallback
  return [
    {
      title: "Reliable Quality",
      desc: `${product?.brand || "Industrial"} grade component`,
      icon: ShieldCheck,
      iconWrap: "bg-[#eef4ff] text-[#2452c6]",
    },
    {
      title: "Bulk Ready",
      desc: `MOQ ${product?.moq || 1} pack ordering`,
      icon: PackageCheck,
      iconWrap: "bg-[#ecfdf3] text-[#067647]",
    },
    {
      title: "Fast Dispatch",
      desc: "Quick sourcing & shipment support",
      icon: Truck,
      iconWrap: "bg-[#fff7ed] text-[#c2410c]",
    },
    {
      title: "Technical Use",
      desc: "Ideal for PCB and industrial projects",
      icon: Cpu,
      iconWrap: "bg-[#f5f3ff] text-[#7c3aed]",
    },
  ];
}

function getQuickSpecs(product) {
  const fallbackSpecs = [
    { key: "Brand", value: product?.brand || "Generic" },
    {
      key: "Category",
      value: product?.subCategory || product?.category || "Electronic Component",
    },
    { key: "MOQ", value: `${product?.moq || 1}` },
    { key: "Unit", value: product?.unit || "piece" },
    { key: "Stock", value: `${product?.stock || 0} pcs` },
    {
      key: "Origin",
      value: product?.countryOfOrigin || "India / Imported",
    },
  ];

  if (product?.specifications?.length > 0) {
    return product.specifications.slice(0, 6);
  }

  return fallbackSpecs;
}

function getApplications(product) {
  // ✅ Admin controlled
  if (product?.applications?.length > 0) {
    return product.applications
      .filter((item) => item.isActive !== false)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      .map((item) => item.text)
      .filter(Boolean);
  }

  // 🔁 fallback
  return [
    "Industrial electronics and control systems",
    "PCB assembly and engineering projects",
    "OEM and institutional procurement",
    "Repair, replacement and recurring sourcing",
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams?.id);

  if (!product) {
    return {
      title: "Product Not Found | Goga Ji International",
      description: "Home decor product not found at Goga Ji International.",
    };
  }

  const productName = product?.name || "Home Decor Product";
  const category = product?.subCategory || product?.category || "Home Decor";
  const brand = product?.brand || "Goga Ji International";
  const image = product?.thumbnail || product?.images?.[0]?.url || "/og-image.jpg";
  const imageUrl = image.startsWith("http") ? image : `${API_BASE}${image}`;

  const description =
    product?.shortDescription ||
    product?.description ||
    `Buy ${productName} online in India from Goga Ji International. Premium home decor, planters, vases, pooja decor and decorative accessories supplier.`;

  return {
    title: `${productName} | Premium Home Decor | Goga Ji International`,
    description,
    keywords: [
      productName,
      `${productName} price in India`,
      `${productName} online`,
      `${category} home decor`,
      `${category} supplier India`,
      "Goga Ji International",
      "Premium Home Decor India",
      "Planters and Vases",
      "Pooja Decor",
      "Candle Holders",
      "Decor Accents",
      "Trays and Urlis",
    ],
    alternates: {
      canonical: `https://www.gogajiinternational.com/products/${product?.slug || resolvedParams?.id}`,
    },
    openGraph: {
      title: `${productName} | Goga Ji International`,
      description,
      url: `https://www.gogajiinternational.com/products/${product?.slug || resolvedParams?.id}`,
      siteName: "Goga Ji International",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: productName }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName} | Goga Ji International`,
      description,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams?.id);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(product);

  const activeCoupon = await getActiveCoupon();

  const primaryImage = getPrimaryImage(product);
  const stockMeta = getStockMeta(product);

  const packPriceExGst = Number(product?.price || 0);
  const packPriceIncGst = getIncGstPrice(packPriceExGst);
  const unitPriceExGst = getPerPiecePrice(product);
  const unitPriceIncGst = getIncGstPrice(unitPriceExGst);

  const bulkRows = getBulkPricingRows(product);
  const featureCards = getFeatureCards(product);
  const quickSpecs = getQuickSpecs(product);
  const applications = getApplications(product);

  const specifications =
    product?.specifications?.length > 0
      ? product.specifications
      : [
        { key: "Brand", value: product?.brand || "Generic" },
        {
          key: "Product Type",
          value:
            product?.subCategory ||
            product?.category ||
            "Electronic Component",
        },
        { key: "Unit", value: product?.unit || "piece" },
        {
          key: "Country of Origin",
          value: product?.countryOfOrigin || "India / Imported",
        },
      ];

  const technicalDocs =


    product?.documents?.length > 0
      ? product.documents
      : [
        {
          label: "Product Datasheet",
          url: "#",
          type: "datasheet",
        },
        {
          label: "Technical Overview",
          url: "#",
          type: "document",
        },
      ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product?.name,

    image: [
      primaryImage
        ? primaryImage.startsWith("http")
          ? primaryImage
          : `${API_BASE}${primaryImage}`
        : "/og-image.jpg",
    ],

    description:
      product?.shortDescription ||
      product?.description ||
      `${product?.name} electronic component available online in India.`,

    sku: product?.sku || product?._id,

    mpn: product?.mpn || product?.slug,

    brand: {
      "@type": "Brand",
      name: product?.brand || "Royal Trading Component",
    },

    category:
      product?.subCategory ||
      product?.category ||
      "Electronic Components",

    offers: {
      "@type": "Offer",

      url: `https://www.royalsmd.com/products/${product?.slug || product?._id
        }`,

      priceCurrency: "INR",

      price: Number(product?.price || 0),

      availability:
        stockMeta?.isOut
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",

      itemCondition: "https://schema.org/NewCondition",

      seller: {
        "@type": "Organization",
        name: "Royal Trading Component",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#2F3A3A]">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <Navbar />

      <section className="mx-auto max-w-[1540px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] font-semibold text-[#1F5C4A]">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-medium hover:underline"
          >
            <span className="text-lg">←</span>
            Back to results
          </Link>

          <span className="text-slate-300">|</span>

          <Link href="/" className="hover:underline">
            Home
          </Link>

          <ChevronRight size={16} className="text-slate-400" />
          <Link
            href={`/category/${product?.category || ""}`}
            className="hover:underline"
          >
            {product?.category || "Products"}
          </Link>

          {product?.subCategory ? (
            <>
              <ChevronRight size={16} className="text-slate-400" />
              <span>{product.subCategory}</span>
            </>
          ) : null}
        </div>

        <div className="mb-6 rounded-[24px] border border-[#B38B2D]/20 bg-white px-6 py-6 shadow-md">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-black tracking-[-0.02em] text-[#1F5C4A] md:text-[38px] lg:text-[42px]">
                {product?.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-[#111827]">
             <span>
  <span className="font-bold">Product Code:</span>{" "}
  {product?.sku || product?._id?.slice?.(-6) || "GI-001"}
</span>

<span>
  <span className="font-bold">Brand:</span>{" "}
  <span className="font-semibold text-[#1F5C4A]">
    {product?.brand || "Gogaji International"}
  </span>
</span>

<span>
  <span className="font-bold">Style No.:</span>{" "}
  {product?.mpn || product?.slug || product?.sku || "N/A"}
</span>
              </div>
            </div>

            <div className="text-right text-sm font-semibold text-slate-500">
              Gogaji International 
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_560px]">


          <div className="space-y-6">
            <ProductImageGallery product={product} />

            <section className="rounded-sm bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#FFF8E8] p-2 text-[#B38B2D]">
                  <FileText size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-[22px] font-extrabold text-[#111827]">
                    Product overview
                  </h2>
                  <p className="mt-3 text-[16px] leading-8 text-slate-700">
                    {product?.shortDescription ||
                      product?.description ||
                      "This product is suitable for industrial procurement, replacement requirements, PCB usage and bulk component sourcing. It is listed with pricing, stock visibility and technical support-ready information for faster purchasing decisions."}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {featureCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-sm border border-slate-200 bg-[#fcfcfc] p-4"
                    >
                      <div
                        className={`mb-3 inline-flex rounded-full p-3 ${item.iconWrap}`}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 className="text-[16px] font-bold text-[#111827]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-6 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <h3 className="flex items-center gap-2 text-[18px] font-extrabold text-[#2452c6]">
                    <Settings2 size={18} />
                    Quick specifications
                  </h3>

                  <div className="mt-4 overflow-hidden rounded-sm border border-slate-200">
                    {quickSpecs.map((item, index) => (
                      <div
                        key={`${item?.key}-${index}`}
                        className="grid grid-cols-2 border-t border-slate-200 first:border-t-0"
                      >
                        <div className="bg-[#fafafa] px-4 py-3 text-[15px] font-semibold text-[#111827]">
                          {item?.key}
                        </div>
                        <div className="bg-white px-4 py-3 text-[15px] text-[#111827]">
                          {item?.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-[18px] font-extrabold text-[#2452c6]">
                    <Zap size={18} />
                    Typical applications
                  </h3>

                  <div className="mt-4 rounded-sm border border-slate-200 bg-[#fcfcfc] p-4">
                    <ul className="space-y-3 text-[15px] leading-7 text-slate-700">
                      {applications.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

             
            </section>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-[#B38B2D]/20 bg-white p-6 shadow-md">
              <div className="mb-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#B38B2D]">
                  Premium Home Decor
                </p>

                <h2 className="mt-2 text-[28px] font-black leading-tight text-[#1F5C4A] md:text-[34px]">
                  {product?.name || "Product Name"}
                </h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[30px] font-black text-[#1F5C4A]">
                      {formatCurrency(packPriceExGst)}
                    </span>
                    
                  </div>
                </div>

               


              </div>

              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
                <p className="text-sm font-bold text-green-700">
                  Available Stock: {product?.stock || 0} pcs
                </p>
              </div>

              <div className="mt-5">
                {stockMeta.isOut ? (
                  <div className="rounded-sm border border-red-200 bg-red-50 p-5">
                    <p className="text-[20px] font-extrabold text-red-700">
                      {product?.allowBackorder
                        ? "Available on Request"
                        : "Currently Out of Stock"}
                    </p>

                    <p className="mt-2 text-[15px] leading-7 text-red-700">
                      {product?.allowBackorder
                        ? "This component is not available for instant checkout, but our procurement team can arrange availability, bulk quotation, or alternate compatible parts."
                        : "This component is temporarily unavailable for direct purchase. You can request availability or ask our team for an alternate compatible part."}
                    </p>

                    <Link
                      href={`/request-component?product=${encodeURIComponent(
                        product?.name || ""
                      )}&sku=${encodeURIComponent(product?.sku || "")}`}
                      className="mt-4 inline-flex h-[48px] w-full items-center justify-center bg-red-600 px-5 text-[16px] font-bold text-white transition hover:bg-red-700"
                    >
                      Request Availability
                    </Link>
                  </div>
                ) : (
                  <AddToCartButton
                    productId={product?._id}
                    moq={product?.moq || 1}
                    stock={product?.stock || 0}
                    productName={product?.name || ""}
                    showQuantity={true}
                  />
                )}
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 text-[18px] font-bold text-[#1F5C4A] transition hover:text-[#B38B2D]"
              >
                <Star size={22} />
                Add to parts list
              </button>
              <div className="mt-6 rounded-[18px] border border-[#B38B2D]/30 bg-[#FFF8E8] p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#B38B2D]">
                      Coupon Code
                    </p>

                    <h3 className="mt-1 text-[22px] font-black text-[#1F5C4A]">
                      Save more on {product?.name}
                    </h3>

                    <p className="mt-2 text-[15px] leading-6 text-[#2F3A3A]">
                      {activeCoupon?.description ||
                        "Bulk order ya premium decor purchase par coupon apply kar sakte ho."}
                    </p>
                  </div>

                  <div className="rounded-full border border-[#B38B2D] bg-white px-6 py-3 text-[18px] font-black text-[#1F5C4A] shadow-sm">
                    {activeCoupon?.code || "GOGAJI10"}
                  </div>
                </div>
              </div>


            </div>

            <div className="rounded-[24px] border border-[#B38B2D]/20 bg-white p-6 shadow-md">

              <div

                className={`inline-flex items-center rounded-full px-4 py-2 text-[15px] font-bold ${stockMeta.className}`}

              >

                <span className="mr-2 inline-block h-4 w-4 rounded-full bg-current opacity-90" />

                {stockMeta.label}

              </div>



              <ul className="mt-5 space-y-3 text-[16px] leading-7 text-[#1f2937]">

                <li>• {stockMeta.note}</li>

                <li>• Bulk quantity pricing available on request.</li>

                <li>• Dispatch timelines may vary based on stock and pack size.</li>

              </ul>



              <div className="mt-5 flex items-start gap-3 rounded-sm bg-[#f8fafc] p-3 text-[15px] text-[#065f73]">

                <Info className="mt-0.5 shrink-0" size={18} />

                <p>

                  Stock levels and delivery timelines refer to current wholesale

                  procurement availability.

                </p>

              </div>



              <button

                type="button"

                className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 border-2 border-[#B38B2D] bg-white px-5 text-[18px] font-bold text-[#1F5C4A] transition hover:bg-[#FFF8E8]"

              >

                <Truck size={20} />

                Check delivery dates

              </button>

            </div>

           
          </div>
        </div>

       
      </section>

      <section className="rounded-sm bg-white p-8 shadow-sm mt-8">
        <div className="max-w-none prose prose-lg text-[#172033]">
          <h2 className="mt-12 text-[30px] font-extrabold text-[#1f604d] leading-tight">
            Buy {product?.name} Online in India
          </h2>

          <p>
            {product?.name} is a premium home decor product suitable for modern homes,
            hotels, showrooms, gifting, festive styling and interior decoration.
            Goga Ji International provides elegant decor products with bulk order
            support, reliable sourcing and pan India delivery.
          </p>

          <p>
            Interior designers, retailers, hotels, event planners and home decor buyers
            trust Goga Ji International for premium planters, vases, pooja decor,
            candle holders, trays, urlis and decorative accents.
          </p>

          <h2 className="mt-12 text-[30px] font-extrabold text-[#1f604d] leading-tight">
            Applications of {product?.name}
          </h2>

          <ul>
            <li>Living room decoration</li>
            <li>Bedroom and balcony styling</li>
            <li>Pooja room and mandir decor</li>
            <li>Hotel, cafe and showroom decor</li>
            <li>Festive and wedding decoration</li>
            <li>Corporate and premium gifting</li>
            <li>Interior design projects</li>
            <li>Retail and bulk home decor supply</li>
          </ul>

          <h2 className="mt-12 text-[30px] font-extrabold text-[#1f604d] leading-tight">
            Why Buy from Goga Ji International
          </h2>

          <ul>
            <li>Premium quality home decor products</li>
            <li>Bulk order and B2B supply support</li>
            <li>Elegant designs for modern spaces</li>
            <li>Fast procurement assistance</li>
            <li>Pan India delivery support</li>
            <li>Trusted supplier for retailers and designers</li>
          </ul>
        </div>
      </section>

      <section className="rounded-sm bg-white p-8 shadow-sm mt-8">
        <h2 className="text-[32px] font-extrabold text-[#1f604d]">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-[22px] font-bold text-[#111827]">
              Where to buy {product?.name} online in India?
            </h3>
            <p className="mt-3 text-[17px] leading-8 text-[#374151]">
              You can buy {product?.name} online from Goga Ji International, a premium
              home decor supplier in India.
            </p>
          </div>

          <div>
            <h3 className="text-[22px] font-bold text-[#111827]">
              Is {product?.name} available for bulk orders?
            </h3>
            <p className="mt-3 text-[17px] leading-8 text-[#374151]">
              Yes, Goga Ji International supports bulk orders for retailers, hotels,
              interior designers, event planners and B2B buyers.
            </p>
          </div>

          <div>
            <h3 className="text-[22px] font-bold text-[#111827]">
              Do you deliver across India?
            </h3>
            <p className="mt-3 text-[17px] leading-8 text-[#374151]">
              Yes, pan India delivery support is available for premium home decor
              products and bulk procurement orders.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-sm bg-white p-8 shadow-sm mt-8">
        <h2 className="text-[30px] font-extrabold text-[#1f604d]">
          Explore More Home Decor
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            ["Planters & Vases", "/products?category=planters-vases"],
            ["Pooja & Mandir", "/products?category=pooja-mandir"],
            ["Candle Holders", "/products?category=candle-holders"],
            ["Decor Accents", "/products?category=decor-accents"],
            ["Trays & Urlis", "/products?category=trays-urlis"],
            ["All Home Decor", "/products"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="rounded-full border border-[#d6bd72] px-5 py-3 text-[15px] font-semibold text-[#1f604d] transition hover:bg-[#1f604d] hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}