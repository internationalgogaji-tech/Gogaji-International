import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Gift,
  Heart,
  Home,
  Leaf,
  PackageCheck,
  Palette,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Gem,
  HandHeart,
  HelpCircle,
  Headphones,
  Crown,
  Flower2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_BASE } from "@/lib/api";

/* =========================================================
   API
========================================================= */

async function getAboutPage() {
  try {
    const res = await fetch(`${API_BASE}/api/about-page`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.page || null;
  } catch (error) {
    console.error("About page fetch error:", error);
    return null;
  }
}

/* =========================================================
   IMAGE HELPER
========================================================= */

function getImageUrl(url, fallback = "/banner/new-products/banner-1.png") {
  if (!url) return fallback;

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  if (url.startsWith("/uploads")) {
    return `${API_BASE}${url}`;
  }

  if (url.startsWith("/")) {
    return url;
  }

  return `${API_BASE}/${url}`;
}

/* =========================================================
   DEFAULT CONTENT
   DB content available ho to usko priority milegi.
========================================================= */

const defaults = {
  hero: {
    badge: "Welcome to Gogaji International",
    title: "Thoughtful Decor for Beautiful Living",
    highlight: "Style Every Corner. Celebrate Every Moment.",
    description:
      "Discover a thoughtfully curated world of premium home decor, elegant accents, pooja essentials, planters, vases and gifting collections designed to bring warmth, character and beauty into everyday spaces.",
    image: "/banner/new-products/banner-1.png",
    primaryButtonText: "Explore Collection",
    primaryButtonLink: "/products",
    secondaryButtonText: "Contact Us",
    secondaryButtonLink: "/contact",
  },

  stats: [
    { value: "Premium", label: "Curated Home Decor" },
    { value: "Elegant", label: "Design Collections" },
    { value: "Trusted", label: "Shopping Experience" },
    { value: "Pan India", label: "Delivery Support" },
  ],

  overview: {
    title: "Decor That Makes a Space Feel Like Home",
    description:
      "At Gogaji International, we believe beautiful spaces are created through thoughtful details. Our collections bring together elegant decor, functional accents, meaningful pooja essentials and gifting pieces that help transform ordinary corners into warm and memorable spaces.",
    image: "/banner/new-products/banner-1.png",
  },

  productGroups: [
    {
      title: "Pooja & Mandir Decor",
      description:
        "Elegant pooja essentials and devotional decor designed to bring warmth, grace and serenity to your sacred space.",
    },
    {
      title: "Planters & Vases",
      description:
        "Statement planters, decorative vases and botanical accents for fresh, stylish and beautifully layered interiors.",
    },
    {
      title: "Decor Accents",
      description:
        "Thoughtfully selected accents that add personality, texture and a refined finishing touch to every corner.",
    },
    {
      title: "Table Decor",
      description:
        "Beautiful tabletop pieces created for coffee tables, consoles, dining spaces and everyday styling.",
    },
    {
      title: "Wall Decor",
      description:
        "Decorative wall pieces that create character, visual interest and an elevated look throughout your home.",
    },
    {
      title: "Gifting Collection",
      description:
        "Elegant and meaningful decor gifts for celebrations, festivals, housewarmings and memorable occasions.",
    },
  ],

  capabilities: [
    {
      title: "Thoughtfully Curated",
      description:
        "Every collection is selected with a focus on aesthetics, usability and its ability to complement beautiful modern homes.",
    },
    {
      title: "Premium Styling",
      description:
        "Our decor is chosen to help create sophisticated spaces while remaining warm, inviting and easy to style.",
    },
    {
      title: "Meaningful Gifting",
      description:
        "Discover decorative gifts suitable for festivals, celebrations, housewarmings and thoughtful everyday gestures.",
    },
    {
      title: "Bulk Order Support",
      description:
        "We support bulk requirements for gifting, businesses, events and larger decor requirements.",
    },
    {
      title: "Careful Packaging",
      description:
        "Products are prepared and packed carefully to help them reach customers safely and beautifully.",
    },
    {
      title: "Customer Support",
      description:
        "Our team is available to assist with product selection, orders, bulk enquiries and shopping support.",
    },
  ],

  qualityProcess: [
    {
      title: "Discover",
      description:
        "Explore curated collections designed for beautiful homes, gifting and meaningful spaces.",
    },
    {
      title: "Choose",
      description:
        "Select pieces that complement your personal style, room and occasion.",
    },
    {
      title: "Careful Packing",
      description:
        "Your selected decor is prepared with attention and carefully packed for dispatch.",
    },
    {
      title: "Style Your Space",
      description:
        "Unbox, style and give your home a fresh expression with Gogaji International.",
    },
  ],

  industries: [
    "Modern Homes",
    "Festive Styling",
    "Corporate Gifting",
    "Housewarming Gifts",
    "Interior Styling",
    "Wedding Gifting",
    "Office Decor",
    "Bulk Orders",
  ],

  whyChooseUs: [
    "Curated premium home decor collections",
    "Elegant designs for modern Indian homes",
    "Pooja, gifting and decorative collections",
    "Careful packaging and delivery support",
    "Bulk order and gifting assistance",
    "Customer-focused shopping experience",
  ],

  faq: [
    {
      question: "What products does Gogaji International offer?",
      answer:
        "Gogaji International offers curated home decor including planters, vases, pooja essentials, decorative accents, table decor, wall decor and gifting collections.",
    },
    {
      question: "Can I place a bulk order?",
      answer:
        "Yes. Bulk requirements can be discussed with our team for gifting, events, businesses and larger quantity requirements.",
    },
    {
      question: "Do you offer products suitable for gifting?",
      answer:
        "Yes. Our collections include elegant pieces suitable for housewarmings, festivals, celebrations, corporate gifting and other special occasions.",
    },
    {
      question: "How can I get help choosing a product?",
      answer:
        "You can contact our support team for product information, order assistance, bulk requirements and general shopping help.",
    },
  ],

  cta: {
    title: "Find Something Beautiful for Your Space",
    description:
      "Explore decor designed to add warmth, character and a thoughtful finishing touch to your home.",
    buttonText: "Shop the Collection",
    buttonLink: "/products",
  },
};

/* =========================================================
   HELPERS
========================================================= */

function validArray(value, fallback) {
  return Array.isArray(value) && value.length ? value : fallback;
}

function isOldRoyalText(value) {
  if (!value || typeof value !== "string") return false;

  const text = value.toLowerCase();

  return (
    text.includes("royal component") ||
    text.includes("royal trading") ||
    text.includes("semiconductor") ||
    text.includes("industrial component") ||
    text.includes("electronics department")
  );
}

function safeText(value, fallback) {
  if (!value || isOldRoyalText(value)) return fallback;
  return value;
}

function safeLink(value, fallback) {
  if (!value) return fallback;

  if (
    value.includes("request-component") ||
    value.includes("industrial") ||
    value.includes("component-request")
  ) {
    return fallback;
  }

  return value;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata() {
  const page = await getAboutPage();

  return {
    title:
      !isOldRoyalText(page?.seo?.metaTitle) && page?.seo?.metaTitle
        ? page.seo.metaTitle
        : "About Gogaji International | Premium Home Decor",

    description:
      !isOldRoyalText(page?.seo?.metaDescription) &&
      page?.seo?.metaDescription
        ? page.seo.metaDescription
        : "Discover Gogaji International, a curated home decor destination for elegant accents, planters, vases, pooja essentials and thoughtful gifting collections.",

    keywords:
      Array.isArray(page?.seo?.metaKeywords) &&
      page.seo.metaKeywords.length &&
      !page.seo.metaKeywords.some((item) => isOldRoyalText(item))
        ? page.seo.metaKeywords
        : [
            "Gogaji International",
            "home decor",
            "premium home decor",
            "pooja decor",
            "planters and vases",
            "home accessories",
            "decor gifts",
          ],
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function AboutPage() {
  const page = await getAboutPage();

  const hero = {
    badge: safeText(page?.hero?.badge, defaults.hero.badge),
    title: safeText(page?.hero?.title, defaults.hero.title),
    highlight: safeText(page?.hero?.highlight, defaults.hero.highlight),
    description: safeText(
      page?.hero?.description,
      defaults.hero.description
    ),
    image: page?.hero?.image || defaults.hero.image,

    primaryButtonText: safeText(
      page?.hero?.primaryButtonText,
      defaults.hero.primaryButtonText
    ),

    primaryButtonLink: safeLink(
      page?.hero?.primaryButtonLink,
      defaults.hero.primaryButtonLink
    ),

    secondaryButtonText: safeText(
      page?.hero?.secondaryButtonText,
      defaults.hero.secondaryButtonText
    ),

    secondaryButtonLink: safeLink(
      page?.hero?.secondaryButtonLink,
      defaults.hero.secondaryButtonLink
    ),
  };

  const stats = validArray(page?.stats, defaults.stats).filter(
    (item) =>
      !isOldRoyalText(item?.value) &&
      !isOldRoyalText(item?.label)
  );

  const finalStats = stats.length ? stats : defaults.stats;

  const overview = {
    title: safeText(page?.overview?.title, defaults.overview.title),
    description: safeText(
      page?.overview?.description,
      defaults.overview.description
    ),
    image: page?.overview?.image || defaults.overview.image,
  };

  const productGroupsRaw = validArray(
    page?.productGroups,
    defaults.productGroups
  );

  const productGroups = productGroupsRaw.some(
    (item) =>
      isOldRoyalText(item?.title) ||
      isOldRoyalText(item?.description)
  )
    ? defaults.productGroups
    : productGroupsRaw;

  const capabilitiesRaw = validArray(
    page?.capabilities,
    defaults.capabilities
  );

  const capabilities = capabilitiesRaw.some(
    (item) =>
      isOldRoyalText(item?.title) ||
      isOldRoyalText(item?.description)
  )
    ? defaults.capabilities
    : capabilitiesRaw;

  const processRaw = validArray(
    page?.qualityProcess,
    defaults.qualityProcess
  );

  const qualityProcess = processRaw.some(
    (item) =>
      isOldRoyalText(item?.title) ||
      isOldRoyalText(item?.description)
  )
    ? defaults.qualityProcess
    : processRaw;

  const industriesRaw = validArray(
    page?.industries,
    defaults.industries
  );

  const industries = industriesRaw.some(isOldRoyalText)
    ? defaults.industries
    : industriesRaw;

  const whyRaw = validArray(
    page?.whyChooseUs,
    defaults.whyChooseUs
  );

  const whyChooseUs = whyRaw.some((item) =>
    isOldRoyalText(
      typeof item === "string"
        ? item
        : `${item?.title || ""} ${item?.description || ""}`
    )
  )
    ? defaults.whyChooseUs
    : whyRaw;

  const faqRaw = validArray(page?.faq, defaults.faq);

  const faq = faqRaw.some(
    (item) =>
      isOldRoyalText(item?.question) ||
      isOldRoyalText(item?.answer)
  )
    ? defaults.faq
    : faqRaw;

  const cta = {
    title: safeText(page?.cta?.title, defaults.cta.title),
    description: safeText(
      page?.cta?.description,
      defaults.cta.description
    ),
    buttonText: safeText(
      page?.cta?.buttonText,
      defaults.cta.buttonText
    ),
    buttonLink: safeLink(
      page?.cta?.buttonLink,
      defaults.cta.buttonLink
    ),
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#273C35]">
      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#F8F3E8]">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#DDE9DF]/70 blur-3xl" />

          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#EADDB8]/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B38B2D]/30 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1F5C4A] shadow-sm">
                <Sparkles size={15} className="text-[#B38B2D]" />
                {hero.badge}
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-[#173F34] sm:text-5xl md:text-6xl lg:text-[68px]">
                {hero.title}
              </h1>

              <h2 className="mt-5 max-w-2xl text-xl font-bold leading-snug text-[#B38B2D] md:text-3xl">
                {hero.highlight}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5F6864] md:text-lg">
                {hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={hero.primaryButtonLink}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1F5C4A] px-7 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#17493B]"
                >
                  {hero.primaryButtonText}
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href={hero.secondaryButtonLink}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D9C28A] bg-white px-7 py-4 text-sm font-bold text-[#273C35] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#B38B2D]"
                >
                  <Heart size={18} className="text-[#B38B2D]" />
                  {hero.secondaryButtonText}
                </Link>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="absolute -left-2 -top-4 hidden rounded-2xl border border-[#E8DDBF] bg-white px-5 py-4 shadow-xl md:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF5EF] text-[#1F5C4A]">
                    <Home size={20} />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#B38B2D]">
                      Beautiful Living
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#273C35]">
                      Curated with care
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[34px] border-[6px] border-white bg-[#EEE8DB] shadow-[0_25px_70px_rgba(31,92,74,0.15)]">
                <img
                  src={getImageUrl(
                    hero.image,
                    "/banner/new-products/banner-1.png"
                  )}
                  alt={hero.title}
                  className="h-[400px] w-full object-cover sm:h-[480px] lg:h-[570px]"
                />
              </div>

              <div className="absolute -bottom-5 right-2 hidden max-w-[240px] rounded-2xl bg-[#1F5C4A] p-5 text-white shadow-xl md:block">
                <Sparkles
                  size={20}
                  className="mb-3 text-[#E2BF61]"
                />

                <p className="text-sm font-bold leading-6">
                  Thoughtful details that make every corner feel
                  special.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="relative z-10 mx-auto -mt-4 max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[26px] border border-[#E8DFCC] bg-white shadow-[0_18px_50px_rgba(31,92,74,0.08)] sm:grid-cols-2 lg:grid-cols-4">
            {finalStats.map((item, index) => (
              <div
                key={index}
                className="relative px-6 py-7 text-center lg:py-8"
              >
                {index !== 0 && (
                  <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#E8DFCC] lg:block" />
                )}

                <p className="text-2xl font-black text-[#1F5C4A] md:text-3xl">
                  {item.value}
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8B7441]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            OUR STORY
        ===================================================== */}

        <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div className="relative">
            <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[32px] bg-[#E8D8A8]/35" />

            <div className="relative overflow-hidden rounded-[32px] bg-[#F1ECE2] shadow-lg">
              <img
                src={getImageUrl(
                  overview.image,
                  "/banner/new-products/banner-1.png"
                )}
                alt={overview.title}
                className="h-[440px] w-full object-cover md:h-[580px]"
              />
            </div>
          </div>

          <div className="lg:pl-8">
            <SectionBadge icon={Heart}>
              Our Story
            </SectionBadge>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#173F34] md:text-5xl">
              {overview.title}
            </h2>

            <p className="mt-6 text-base leading-8 text-[#626A66] md:text-lg md:leading-9">
              {overview.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <StoryFeature
                icon={Palette}
                title="Curated Style"
                text="Decor selected to make styling beautiful spaces simpler."
              />

              <StoryFeature
                icon={Gem}
                title="Premium Feel"
                text="Elegant details and refined designs for memorable interiors."
              />

              <StoryFeature
                icon={Heart}
                title="Made for Homes"
                text="Collections designed around warmth, personality and everyday living."
              />

              <StoryFeature
                icon={Gift}
                title="Meaningful Gifting"
                text="Thoughtful pieces for celebrations and special moments."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            PHILOSOPHY
        ===================================================== */}

        <section className="bg-[#1F5C4A] py-20 text-white lg:py-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F1D88E]">
                  <Crown size={15} />
                  Our Philosophy
                </div>

                <h2 className="mt-6 text-3xl font-black leading-tight md:text-5xl">
                  Beautiful spaces begin with thoughtful details.
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-[#DCE9E3] md:text-lg">
                  We bring together decor that feels elegant,
                  welcoming and easy to make your own—from everyday
                  styling to festive celebrations and gifting.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <PhilosophyCard
                  icon={Flower2}
                  title="Beautifully Curated"
                  text="Collections selected to complement contemporary and timeless interiors."
                />

                <PhilosophyCard
                  icon={Leaf}
                  title="Warm & Timeless"
                  text="Pieces that add warmth and character without overwhelming your space."
                />

                <PhilosophyCard
                  icon={HandHeart}
                  title="Thoughtful Choices"
                  text="Decor and gifts selected with real homes and meaningful occasions in mind."
                />

                <PhilosophyCard
                  icon={Star}
                  title="Everyday Elegance"
                  text="Beautiful accents created to elevate everyday corners and special settings."
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            COLLECTIONS
        ===================================================== */}

        <CollectionGrid items={productGroups} />

        {/* =====================================================
            WHY GOGAJI
        ===================================================== */}

        <WhyGogaji items={capabilities} />

        {/* =====================================================
            EXPERIENCE / PROCESS
        ===================================================== */}

        <ExperienceSection items={qualityProcess} />

        {/* =====================================================
            SPACES & OCCASIONS
        ===================================================== */}

        <section className="bg-[#F7F1E5] py-20 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={Home}>
                Made for Every Space
              </SectionBadge>

              <h2 className="mt-5 text-3xl font-black text-[#173F34] md:text-5xl">
                Decor for Homes, Moments & Celebrations
              </h2>

              <p className="mt-5 text-base leading-8 text-[#626A66] md:text-lg">
                From everyday corners to meaningful celebrations,
                discover pieces that make each setting feel a little
                more special.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-[24px] border border-[#E4D7BA] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#B38B2D] hover:shadow-xl"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5ECD7] text-[#B38B2D] transition group-hover:bg-[#1F5C4A] group-hover:text-white">
                    <BadgeCheck size={22} />
                  </span>

                  <p className="mt-5 text-lg font-black text-[#273C35]">
                    {typeof item === "string"
                      ? item
                      : item?.title || item?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY CHOOSE US
        ===================================================== */}

        <section className="bg-[#FFFDF8] py-20 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[36px] bg-[#173F34] shadow-[0_25px_70px_rgba(23,63,52,0.18)]">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative overflow-hidden bg-[#204D40] p-8 md:p-12 lg:p-14">
                  <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F2D986]">
                      <ShieldCheck size={15} />
                      Why Gogaji
                    </div>

                    <h2 className="mt-6 text-3xl font-black leading-tight text-white md:text-5xl">
                      Decor Chosen with Style, Care & Purpose
                    </h2>

                    <p className="mt-6 text-base leading-8 text-[#DDE9E4] md:text-lg">
                      Our goal is simple: make it easier to discover
                      decor that feels special, looks beautiful and
                      belongs naturally in your home.
                    </p>

                    <Link
                      href="/products"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D1A83A] px-7 py-4 text-sm font-black text-[#173F34] transition hover:bg-[#E0BC58]"
                    >
                      Explore Products
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>

                <div className="bg-[#F8F3E8] p-8 md:p-12 lg:p-14">
                  <div className="grid gap-4">
                    {whyChooseUs.map((item, index) => {
                      const text =
                        typeof item === "string"
                          ? item
                          : item?.title ||
                            item?.description ||
                            "";

                      return (
                        <div
                          key={index}
                          className="flex items-start gap-4 rounded-[20px] border border-[#E5D8BB] bg-white p-5"
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F0EA] text-[#1F5C4A]">
                            <CheckCircle2 size={19} />
                          </span>

                          <span className="pt-1 text-sm font-bold leading-6 text-[#45514C] md:text-base">
                            {text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ
        ===================================================== */}

        <FaqSection faq={faq} />

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="bg-[#FFFDF8] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#D1A83A]">
            <div className="relative grid gap-8 px-7 py-12 md:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-16 lg:py-14">
              <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[55px] border-white/10" />

              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#173F34]/70">
                  Bring Beauty Home
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#173F34] md:text-5xl">
                  {cta.title}
                </h2>

                <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[#173F34]/80 md:text-lg">
                  {cta.description}
                </p>
              </div>

              <div className="relative flex lg:justify-end">
                <Link
                  href={cta.buttonLink}
                  className="inline-flex items-center gap-2 rounded-full bg-[#173F34] px-8 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#0F342B]"
                >
                  {cta.buttonText}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionBadge({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#DCCB9D] bg-[#FFF8E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1F5C4A]">
      <Icon size={15} className="text-[#B38B2D]" />
      {children}
    </div>
  );
}

function StoryFeature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[22px] border border-[#E8DFCC] bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF4EF] text-[#1F5C4A]">
        <Icon size={20} />
      </div>

      <h3 className="mt-4 text-base font-black text-[#273C35]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#6B736F]">
        {text}
      </p>
    </div>
  );
}

function PhilosophyCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D1A83A] text-[#173F34]">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-xl font-black text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#DCE8E3]">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   COLLECTION GRID
========================================================= */

function CollectionGrid({ items }) {
  const icons = [
    Flower2,
    Leaf,
    Sparkles,
    Home,
    Palette,
    Gift,
  ];

  return (
    <section className="bg-[#FFFDF8] py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge icon={Sparkles}>
            Signature Collections
          </SectionBadge>

          <h2 className="mt-5 text-3xl font-black leading-tight text-[#173F34] md:text-5xl">
            Beautiful Details for Every Corner
          </h2>

          <p className="mt-5 text-base leading-8 text-[#626A66] md:text-lg">
            Explore collections curated to bring warmth, elegance
            and personality to the spaces you love.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(items || []).map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={index}
                className="group rounded-[28px] border border-[#E8DFCC] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#D3BA76] hover:shadow-[0_20px_50px_rgba(31,92,74,0.10)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F4EDDD] text-[#B38B2D] transition duration-300 group-hover:bg-[#1F5C4A] group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-xl font-black text-[#273C35] md:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#68706C]">
                  {item.description}
                </p>

                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#1F5C4A]"
                >
                  Explore Collection
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHY GOGAJI
========================================================= */

function WhyGogaji({ items }) {
  const icons = [
    Sparkles,
    Gem,
    Gift,
    ShoppingBag,
    PackageCheck,
    Headphones,
  ];

  return (
    <section className="bg-[#F7F1E5] py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionBadge icon={Crown}>
              The Gogaji Experience
            </SectionBadge>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#173F34] md:text-5xl">
              More Than Decor. A Beautiful Way to Live.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#626A66] md:text-lg">
              From discovering the right accent to receiving it at
              your doorstep, we want every part of your Gogaji
              experience to feel thoughtful and effortless.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-[22px] border border-[#E1D2B1] bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1F5C4A] text-white">
                <Heart size={21} />
              </div>

              <div>
                <p className="font-black text-[#273C35]">
                  Curated with care
                </p>

                <p className="mt-1 text-sm text-[#737B77]">
                  For spaces that feel beautifully yours.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {(items || []).map((item, index) => {
              const Icon = icons[index % icons.length];

              return (
                <div
                  key={index}
                  className="rounded-[26px] border border-[#E5D8BB] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-13 w-13 h-[52px] items-center justify-center rounded-full bg-[#EFF5EF] text-[#1F5C4A]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-[#273C35]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#68706C]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE PROCESS
========================================================= */

function ExperienceSection({ items }) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge icon={PackageCheck}>
            From Us to Your Home
          </SectionBadge>

          <h2 className="mt-5 text-3xl font-black text-[#173F34] md:text-5xl">
            A Thoughtful Shopping Experience
          </h2>

          <p className="mt-5 text-base leading-8 text-[#626A66] md:text-lg">
            From discovery to styling, every step is designed to
            make bringing beautiful decor home simple.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-[#DCC99B] lg:block" />

          {(items || []).map((item, index) => (
            <div
              key={index}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-[7px] border-white bg-[#1F5C4A] text-xl font-black text-white shadow-lg">
                {index + 1}
              </div>

              <div className="mt-6 rounded-[24px] border border-[#E8DFCC] bg-[#FFFDF8] p-6">
                <h3 className="text-lg font-black text-[#273C35]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6C746F]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <MiniBenefit
            icon={ShieldCheck}
            title="Thoughtful Selection"
            text="Collections chosen with style and usability in mind."
          />

          <MiniBenefit
            icon={PackageCheck}
            title="Careful Packaging"
            text="Prepared carefully before dispatch."
          />

          <MiniBenefit
            icon={Truck}
            title="Delivery Support"
            text="Shopping support from order to delivery."
          />
        </div>
      </div>
    </section>
  );
}

function MiniBenefit({ icon: Icon, title, text }) {
  return (
    <div className="flex items-center gap-4 rounded-[20px] bg-[#F6F1E7] p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1F5C4A] shadow-sm">
        <Icon size={20} />
      </span>

      <div>
        <p className="font-black text-[#273C35]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#727A76]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FAQ
========================================================= */

function FaqSection({ faq }) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionBadge icon={HelpCircle}>
            Frequently Asked Questions
          </SectionBadge>

          <h2 className="mt-5 text-3xl font-black text-[#173F34] md:text-5xl">
            Everything You May Want to Know
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#626A66]">
            Helpful answers about our collections, gifting and
            shopping with Gogaji International.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {(faq || []).map((item, index) => (
            <div
              key={index}
              className="rounded-[24px] border border-[#E8DFCC] bg-[#FFFDF8] p-6 transition hover:border-[#D3BA76]"
            >
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDF4EF] text-[#1F5C4A]">
                  <Headphones size={19} />
                </span>

                <div>
                  <h3 className="text-base font-black leading-7 text-[#273C35] md:text-lg">
                    {item.question}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#68706C] md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}