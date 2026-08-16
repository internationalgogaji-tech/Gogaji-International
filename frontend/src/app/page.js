import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySlider from "@/components/CategorySlider";

import HomeDecorInfo from "@/components/home/HomeDecorInfo";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServiceLinks from "@/components/ServiceLinks";
// import BrandStrip from "@/components/BrandStrip";
import Footer from "@/components/Footer";
import HomepageBuilderRenderer from "@/components/HomepageBuilderRenderer";
import TrustBadges from "@/components/home/TrustBadges";
// 
// import BulkOrderCTA from "@/components/home/BulkOrderCTA";

import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
// import LatestBlogs from "@/components/home/LatestBlogs";
// import NewsletterCTA from "@/components/home/NewsletterCTA";
import HomeSeoFaq from "@/components/HomeSeoFaq";

import PromoBannerSection from "@/components/PromoBannerSection";
import { getPromoBanners } from "@/lib/promoBannerApi";
import SignatureCategoryCircles from "@/components/SignatureCategoryCircles";
import ClientFeedSection from "@/components/ClientFeedSection";
import HomeEnquiryWidget from "@/components/HomeEnquiryWidget";


export const metadata = {
  title:
    "Gogaji International | Premium Home Decor, Luxury Gifts & Decorative Accessories",

  description:
    "Shop premium home decor products, decorative vases, planters, artificial flowers, luxury gifting collections and elegant interior accessories from Gogaji International.",

  keywords: [
    "home decor products",
    "luxury home decor",
    "decorative vases",
    "artificial flowers",
    "premium planters",
    "corporate gifting",
    "luxury gifting products",
    "interior decoration",
    "home accessories",
    "decor items online India",
    "Gogaji International",
  ],

  alternates: {
    canonical: "https://www.gogajiinternational.com",
  },

  openGraph: {
    title:
      "Gogaji International | Premium Home Decor & Luxury Living",

    description:
      "Discover luxury home decor collections, decorative accessories and premium gifting solutions.",

    url: "https://www.gogajiinternational.com",

    siteName: "Gogaji International",

    images: [
      {
        url: "https://www.gogajiinternational.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gogaji International",
      },
    ],

    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: "Gogaji International",

  url: "https://www.gogajiinternational.com",

  logo: "https://www.gogajiinternational.com/logo.png",

  description:
    "Gogaji International is a premium home decor and luxury gifting brand offering decorative accessories, vases, planters and elegant lifestyle products.",

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-XXXXXXXXXX",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: "Gogaji International",

  url: "https://www.gogajiinternational.com",

  potentialAction: {
    "@type": "SearchAction",

    target:
      "https://www.gogajiinternational.com/products?keyword={search_term_string}",

    "query-input": "required name=search_term_string",
  },
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",
      name: "What products does Gogaji International offer?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Gogaji International offers decorative vases, planters, artificial flowers, gifting products and premium home decor accessories.",
      },
    },

    {
      "@type": "Question",
      name: "Do you provide bulk orders and corporate gifting?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes, we provide wholesale pricing, corporate gifting solutions and bulk order support.",
      },
    },

    {
      "@type": "Question",
      name: "Do you deliver across India?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes, Gogaji International offers reliable Pan India delivery.",
      },
    },

    {
      "@type": "Question",
      name: "Can interior designers source products from Gogaji International?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes, we work with interior designers, hotels, retailers and corporate buyers.",
      },
    },
  ],
};

export default async function HomePage() {

  const afterHero =
    await getPromoBanners("afterHero");

  const afterCategories =
    await getPromoBanners("afterCategories");

  const afterProducts =
    await getPromoBanners("afterProducts");

  const beforeFooter =
    await getPromoBanners("beforeFooter");

  const afterTrendingProducts =
    await getPromoBanners("afterTrendingProducts");

  return (
<div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Navbar />
      <Hero />
      <TrustBadges />
      <PromoBannerSection
        banners={afterHero}
      />


      <h1 className="sr-only">
        Premium Home Decor Products, Decorative Vases, Luxury Gifts &
        Interior Accessories | Gogaji International
      </h1>

      <CategorySlider />

      <PromoBannerSection
        banners={afterCategories}
      />


      <HomeDecorInfo />

      <HomepageBuilderRenderer />

      <FeaturedProducts />

      <SignatureCategoryCircles />

      <PromoBannerSection
        banners={afterTrendingProducts}
      />

      <PromoBannerSection
        banners={afterProducts}
      />

<ClientFeedSection limit={20} />



      
      {/* <BulkOrderCTA /> */}
      <WhyChooseUs />
     
      <ServiceLinks />
      {/* <BrandStrip /> */}
      <StatsSection />
      <Testimonials />
      {/* <LatestBlogs /> */}
      
      {/* <NewsletterCTA /> */}

     {/* <section className="bg-white border-t border-[#B38B2D]/15 py-16">
  <div className="container-royal">
  <div className="max-w-7xl mx-auto prose prose-lg max-w-none text-[#5A6464]">

<h2 className="text-[38px] font-extrabold text-[#1F5C4A] leading-tight">
          Premium Home Decor Products Online In India
      </h2>

      <p>
        Gogaji International offers a carefully curated collection of
        premium home decor products designed to elevate modern living
        spaces. From decorative vases and luxury planters to
        artificial floral arrangements and elegant gifting items,
        our collection combines style, quality and sophistication.
      </p>

      <p>
        Whether you are decorating your home, office, hotel,
        retail store or commercial space, our premium decor
        solutions help create elegant and inspiring interiors.
      </p>

      <h2 className="mt-12 text-[32px] font-extrabold text-[#1F5C4A] leading-tight">
        Luxury Decor Collections For Every Space
      </h2>

      <p>
        Our collections are designed for homeowners,
        interior designers, architects, retailers,
        hospitality businesses and corporate buyers
        looking for stylish decor and gifting solutions.
      </p>

      <p>
        Explore decorative accessories, table accents,
        planters, designer vases, floral arrangements
        and luxury lifestyle products crafted to add
        beauty and elegance to every environment.
      </p>

      <h3 className="mt-8 text-[26px] font-bold text-[#1F5C4A]">
        Popular Home Decor Categories
      </h3>

      <ul>
        <li>Decorative Vases</li>
        <li>Artificial Flowers</li>
        <li>Luxury Planters</li>
        <li>Home Accessories</li>
        <li>Decor Accents</li>
        <li>Corporate Gifting Products</li>
        <li>Hotel Decor Solutions</li>
        <li>Designer Table Decor</li>
        <li>Premium Lifestyle Products</li>
        <li>Luxury Interior Accessories</li>
      </ul>

      <h2 className="mt-12 text-[32px] font-extrabold text-[#1F5C4A] leading-tight">
        Wholesale Home Decor & Corporate Gifting
      </h2>

      <p>
        Gogaji International supports retailers,
        interior designers, hotels, event planners
        and corporate buyers with wholesale pricing
        and bulk order support.
      </p>

      <p>
        Our premium decor collections are ideal for
        gifting, hospitality projects, interior styling
        and commercial spaces across India.
      </p>

    </div>
  </div>
</section>

      <section className="bg-white py-14 border-t border-[#B38B2D]/20">
  <div className="container-royal">

    <h2 className="text-[34px] font-extrabold text-[#1F5C4A]">
      Frequently Asked Questions
    </h2>

    <div className="mt-10 space-y-8">

      <div>
        <h3 className="text-[24px] font-bold text-[#1F5C4A]">
          What products does Gogaji International offer?
        </h3>

        <p className="mt-3 text-[17px] leading-8 text-[#5A6464]">
          We offer decorative vases, artificial flowers,
          premium planters, luxury gifting products and
          elegant home decor accessories.
        </p>
      </div>

      <div>
        <h3 className="text-[24px] font-bold text-[#1F5C4A]">
          Do you provide bulk order support?
        </h3>

        <p className="mt-3 text-[17px] leading-8 text-[#5A6464]">
          Yes. We support wholesale orders, interior
          projects, hotel requirements and corporate gifting.
        </p>
      </div>

      <div>
        <h3 className="text-[24px] font-bold text-[#1F5C4A]">
          Do you deliver across India?
        </h3>

        <p className="mt-3 text-[17px] leading-8 text-[#5A6464]">
          Yes, we offer reliable delivery services
          across India.
        </p>
      </div>

      <div>
        <h3 className="text-[24px] font-bold text-[#1F5C4A]">
          Do you work with interior designers?
        </h3>

        <p className="mt-3 text-[17px] leading-8 text-[#5A6464]">
          Absolutely. We regularly support interior
          designers, architects and hospitality projects.
        </p>
      </div>

    </div>
  </div>
</section>

<section className="bg-white py-14 border-t border-[#B38B2D]/15">
  <div className="container-royal">

    <h2 className="text-[32px] font-extrabold text-[#1F5C4A]">
      Explore Home Decor Collections
    </h2>

    <div className="mt-8 flex flex-wrap gap-4">

      <a
        href="/products"
className="
rounded-full
bg-[#B38B2D]
border
border-[#B38B2D]
px-6
py-3
text-[16px]
font-semibold
!text-white
no-underline
shadow-sm
transition-all
duration-300
hover:!text-white
hover:bg-[#9D7824]
hover:border-[#9D7824]
hover:shadow-lg
">
          Premium Home Decor
      </a>

      <a
        href="/products"
className="
rounded-full
bg-[#B38B2D]
border
border-[#B38B2D]
px-6
py-3
text-[16px]
font-semibold
!text-white
no-underline
shadow-sm
transition-all
duration-300
hover:!text-white
hover:bg-[#9D7824]
hover:border-[#9D7824]
hover:shadow-lg
"
>        Decorative Vases
      </a>

      <a
        href="/products"
className="
rounded-full
bg-[#B38B2D]
border
border-[#B38B2D]
px-6
py-3
text-[16px]
font-semibold
!text-white
no-underline
shadow-sm
transition-all
duration-300
hover:!text-white
hover:bg-[#9D7824]
hover:border-[#9D7824]
hover:shadow-lg
">
          Artificial Flowers
      </a>

      <a
        href="/products"
className="
rounded-full
bg-[#B38B2D]
border
border-[#B38B2D]
px-6
py-3
text-[16px]
font-semibold
!text-white
no-underline
shadow-sm
transition-all
duration-300
hover:!text-white
hover:bg-[#9D7824]
hover:border-[#9D7824]
hover:shadow-lg
">    Luxury Planters
      </a>

      <a
        href="/contact"
className="
rounded-full
bg-[#B38B2D]
border
border-[#B38B2D]
px-6
py-3
text-[16px]
font-semibold
!text-white
no-underline
shadow-sm
transition-all
duration-300
hover:!text-white
hover:bg-[#9D7824]
hover:border-[#9D7824]
hover:shadow-lg
">
          Contact Us
      </a>

    </div>

  </div>
</section> */}

<HomeSeoFaq />
      <PromoBannerSection
        banners={beforeFooter}
      />
      <HomeEnquiryWidget />

      <Footer />
    </div>
  );
}
