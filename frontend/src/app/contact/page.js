import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_BASE } from "@/lib/api";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  PackageSearch,
  ShieldCheck,
  Truck,
  Headphones,
  Gift,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Heart,
  Home,
  Palette,
} from "lucide-react";

async function getContactPage() {
  try {
    const res = await fetch(`${API_BASE}/api/contact-page`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data?.page || null;
  } catch (error) {
    console.error("Contact page fetch error:", error);
    return null;
  }
}

function getIcon(icon) {
  switch (icon) {
    case "mail":
      return Mail;

    case "whatsapp":
      return MessageCircle;

    case "map":
      return MapPin;

    case "clock":
      return Clock;

    case "truck":
      return Truck;

    case "gift":
      return Gift;

    case "home":
      return Home;

    case "building":
      return Building2;

    case "package":
      return PackageSearch;

    default:
      return Phone;
  }
}

export async function generateMetadata() {
  const page = await getContactPage();

  return {
    title:
      page?.seo?.metaTitle ||
      "Contact Gogaji International | Premium Home Decor & Gifting",

    description:
      page?.seo?.metaDescription ||
      "Contact Gogaji International for premium home decor, planters, vases, pooja decor, gifting, bulk orders, hotel decor, corporate gifting and interior styling enquiries.",

    keywords:
      page?.seo?.metaKeywords || [
        "Gogaji International",
        "Gogaji International contact",
        "premium home decor India",
        "luxury home decor",
        "home decor supplier India",
        "bulk home decor",
        "corporate gifting India",
        "hotel decor supplier",
        "planters and vases",
        "pooja decor",
        "decorative accessories",
      ],
  };
}

function generateLocalBusinessSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",

    name: "Gogaji International",

    url: "https://www.gogajiinternational.com/",

    telephone: page?.phone || "",

    email: page?.email || "",

    address: {
      "@type": "PostalAddress",
      streetAddress: page?.address || "",
      addressCountry: "IN",
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",

        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],

        opens: "10:00",
        closes: "19:00",
      },
    ],

    priceRange: "₹₹",

    areaServed: "India",

    description:
      "Gogaji International offers premium home decor, decorative accessories, planters, vases, pooja decor, gifting collections and bulk decor solutions.",
  };
}

export default async function ContactPage() {
  const page = await getContactPage();

  const localBusinessSchema = generateLocalBusinessSchema(page);

  const cards =
    page?.cards
      ?.filter((card) => card?.isActive)
      ?.sort((a, b) => (a.order || 0) - (b.order || 0)) || [];

  return (
    <div className="min-h-screen bg-[#FFFCF6]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <main>
        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="relative overflow-hidden border-b border-[#E9DFC8] bg-[#FBF7EE]">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border-[70px] border-[#B38B2D]/5" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[440px] w-[440px] rounded-full bg-[#1F5C4A]/5" />

          <div className="relative mx-auto grid max-w-[1500px] gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-24">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B38B2D]/25 bg-[#FFF9EB] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#A77A12]">
                <Sparkles size={15} />

                Contact Gogaji International
              </div>

              <h1 className="mt-6 max-w-[850px] text-[42px] font-black leading-[1.05] tracking-[-0.035em] text-[#173F34] sm:text-[54px] lg:text-[68px]">
                Let&apos;s Make Your
                <span className="block text-[#B38B2D]">
                  Space Beautiful
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#59655F] sm:text-[18px]">
                {page?.heroSubtitle ||
                  "Have a question about our home decor collection, gifting, bulk orders or interior styling? Our team is here to help you find beautiful pieces for homes, offices, hotels and special occasions."}
              </p>

              {/* BUTTONS */}

              <div className="mt-8 flex flex-wrap gap-3">
                {page?.phone && (
                  <a
                    href={`tel:${page.phone}`}
                    className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#1F5C4A] px-7 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(31,92,74,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#17483A]"
                  >
                    <Phone size={18} />

                    Call Us
                  </a>
                )}

                {page?.whatsapp && (
                  <a
                    href={
                      page.whatsapp.startsWith("http")
                        ? page.whatsapp
                        : `https://wa.me/${String(page.whatsapp).replace(
                            /\D/g,
                            ""
                          )}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full border border-[#D9C99F] bg-white px-7 text-sm font-extrabold text-[#1F5C4A] transition duration-300 hover:-translate-y-0.5 hover:border-[#B38B2D] hover:bg-[#FFF9EA]"
                  >
                    <MessageCircle size={18} />

                    WhatsApp Us
                  </a>
                )}
              </div>

              {/* TRUST FEATURES */}

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <MiniFeature
                  icon={Gift}
                  title="Bulk Gifting"
                  text="Beautiful gifting solutions for every occasion."
                />

                <MiniFeature
                  icon={Home}
                  title="Home Styling"
                  text="Decor pieces curated for elegant interiors."
                />

                <MiniFeature
                  icon={Truck}
                  title="Order Support"
                  text="Help with products, orders and delivery."
                />
              </div>
            </div>

            {/* RIGHT CONTACT CARD */}

            <div className="relative">
              <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-[#B38B2D]/10 blur-xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-[#E7DCC3] bg-white shadow-[0_25px_70px_rgba(56,73,65,0.12)]">
                <div className="border-b border-[#EEE5D4] bg-[#1F5C4A] p-7 text-white sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                      <Headphones size={27} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E7D8AC]">
                        We&apos;re here to help
                      </p>

                      <h2 className="mt-1 text-2xl font-black">
                        {page?.supportTitle || "Talk to Our Decor Team"}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/80">
                    {page?.supportDescription ||
                      "From product selection and gifting to bulk decor requirements, our team will help you choose the right products for your space."}
                  </p>
                </div>

                <div className="space-y-3 p-6 sm:p-8">
                  <InfoRow
                    icon={Phone}
                    label="Call Us"
                    value={page?.phone}
                    href={
                      page?.phone
                        ? `tel:${page.phone}`
                        : undefined
                    }
                  />

                  <InfoRow
                    icon={Mail}
                    label="Email"
                    value={page?.email}
                    href={
                      page?.email
                        ? `mailto:${page.email}`
                        : undefined
                    }
                  />

                  <InfoRow
                    icon={MessageCircle}
                    label="WhatsApp"
                    value={page?.whatsapp}
                  />

                  <InfoRow
                    icon={Clock}
                    label="Business Hours"
                    value={page?.businessHours}
                  />

                  <InfoRow
                    icon={MapPin}
                    label="Visit Us"
                    value={page?.address}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CONTACT CARDS FROM DATABASE
        ========================================================= */}

        {cards.length > 0 && (
          <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              eyebrow="Get In Touch"
              title="How Can We Help You?"
              description="Choose the easiest way to connect with our team for product enquiries, orders, gifting and decor assistance."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => {
                const Icon = getIcon(card.icon);

                return (
                  <a
                    key={card._id || card.title}
                    href={card.link || "#"}
                    className="group relative overflow-hidden rounded-[28px] border border-[#E9DFC9] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#D5BE82] hover:shadow-[0_20px_45px_rgba(54,70,62,0.10)]"
                  >
                    <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#FAF4E6]" />

                    <div className="relative">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F7F3] text-[#1F5C4A] transition duration-300 group-hover:bg-[#1F5C4A] group-hover:text-white">
                        <Icon size={25} />
                      </div>

                      <h3 className="text-xl font-black text-[#213B33]">
                        {card.title}
                      </h3>

                      {card.value && (
                        <p className="mt-2 font-bold text-[#B38B2D]">
                          {card.value}
                        </p>
                      )}

                      {card.subText && (
                        <p className="mt-3 text-sm leading-7 text-[#66706C]">
                          {card.subText}
                        </p>
                      )}

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#1F5C4A]">
                        Connect Now

                        <ArrowRight
                          size={16}
                          className="transition group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* =========================================================
            ENQUIRY TYPES
        ========================================================= */}

        <section className="border-y border-[#EEE5D3] bg-white">
          <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <SectionHeading
              eyebrow="Decor Assistance"
              title="Everything You Need, One Conversation Away"
              description="Whether you are decorating your home or sourcing products for a large project, Gogaji International is ready to assist."
            />

            <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <SupportCard
                icon={Home}
                title="Home Decor"
                text="Need help choosing planters, vases, trays, candle holders or decorative accents? Share your requirement with us."
              />

              <SupportCard
                icon={Gift}
                title="Gifting Solutions"
                text="Explore premium gifting for weddings, festivals, housewarmings, corporate occasions and special celebrations."
              />

              <SupportCard
                icon={Building2}
                title="Bulk & Projects"
                text="Connect with us for hotels, offices, restaurants, interior projects, retailers and bulk decor requirements."
              />

              <SupportCard
                icon={Palette}
                title="Product Guidance"
                text="Need help matching decor with your space? Our team can guide you toward suitable collections and styles."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            BULK / BUSINESS SECTION
        ========================================================= */}

        <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="overflow-hidden rounded-[36px] bg-[#1F5C4A] text-white shadow-[0_25px_70px_rgba(31,92,74,0.15)]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative p-8 sm:p-10 lg:p-14">
                <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full border-[40px] border-white/5" />

                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E4CB8B]">
                    Business & Bulk Orders
                  </p>

                  <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    Decorating More
                    <span className="block text-[#E7CB83]">
                      Than One Space?
                    </span>
                  </h2>

                  <p className="mt-6 max-w-xl text-[15px] leading-8 text-white/75">
                    We work with interior designers, hotels, offices,
                    restaurants, retailers, gifting partners and businesses
                    looking for beautiful decor in larger quantities.
                  </p>

                  {page?.email && (
                    <a
                      href={`mailto:${page.email}`}
                      className="mt-8 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#E1C476] px-7 text-sm font-black text-[#173F34] transition hover:bg-[#ECD38E]"
                    >
                      Discuss Your Requirement
                      <ArrowRight size={17} />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <ChecklistItem
                  title="Hotels & Resorts"
                  text="Decor solutions for guest rooms, receptions, dining areas and common spaces."
                />

                <ChecklistItem
                  title="Corporate Gifting"
                  text="Premium gifting options for employees, clients and festive occasions."
                />

                <ChecklistItem
                  title="Interior Projects"
                  text="Curated pieces for residential and commercial interior styling requirements."
                />

                <ChecklistItem
                  title="Retail & Bulk Buying"
                  text="Connect with our team for quantity requirements and product availability."
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            BEFORE CONTACTING
        ========================================================= */}

        <section className="bg-[#F7F1E4]">
          <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B38B2D]">
                  Quick Assistance
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#1F5C4A] sm:text-4xl lg:text-5xl">
                  Help Us Understand
                  <span className="block text-[#B38B2D]">
                    What You&apos;re Looking For
                  </span>
                </h2>

                <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#626D68]">
                  Sharing a few details helps our team understand your
                  requirement and provide faster product, gifting or bulk order
                  assistance.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Product or collection you are interested in",
                  "Required quantity for bulk or gifting orders",
                  "Delivery city or PIN code",
                  "Home, office, hotel or commercial requirement",
                  "Reference image or preferred decor style",
                  "Expected delivery timeline",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[20px] border border-[#E4D7B9] bg-white p-5"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDF5F0] text-[#1F5C4A]">
                      <CheckCircle2 size={17} />
                    </div>

                    <p className="text-sm font-semibold leading-6 text-[#43524C]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            BRAND MESSAGE
        ========================================================= */}

        <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 rounded-[36px] border border-[#E8DDC5] bg-white p-7 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#B38B2D]">
                <Heart size={15} />
                Gogaji International
              </div>

              <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-[#1F5C4A] sm:text-4xl">
                Beautiful Details Make a House Feel Like Home
              </h2>

              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#616C67]">
                At Gogaji International, we believe decor is more than filling
                an empty space. The right planter, vase, tray, candle holder,
                pooja accent or decorative piece adds warmth, personality and
                character to your surroundings.
              </p>

              <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[#616C67]">
                Our collections are created for modern homes, thoughtful
                gifting and elegant spaces. Whether you&apos;re refreshing one
                corner or styling an entire project, our team is ready to help
                you discover products that complement your vision.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <BrandPoint
                number="01"
                title="Curated Decor"
                text="Collections designed around elegant modern living."
              />

              <BrandPoint
                number="02"
                title="Thoughtful Gifting"
                text="Beautiful pieces made for memorable occasions."
              />

              <BrandPoint
                number="03"
                title="Bulk Support"
                text="Solutions for businesses and larger requirements."
              />

              <BrandPoint
                number="04"
                title="Customer Care"
                text="Friendly assistance from enquiry to delivery."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            MAP
        ========================================================= */}

        {page?.mapEmbedUrl ? (
          <section className="mx-auto max-w-[1500px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B38B2D]">
                Find Us
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#1F5C4A] sm:text-4xl">
                Visit Gogaji International
              </h2>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-[#E8DDC5] bg-white p-2 shadow-[0_15px_45px_rgba(60,75,68,0.08)]">
              <iframe
                src={page.mapEmbedUrl}
                title="Gogaji International location"
                className="h-[440px] w-full rounded-[25px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        ) : null}

        {/* =========================================================
            FINAL CTA
        ========================================================= */}

        <section className="border-t border-[#EEE4D1] bg-[#FFF9EE]">
          <div className="mx-auto max-w-[1500px] px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
            <Sparkles
              size={28}
              className="mx-auto text-[#B38B2D]"
            />

            <h2 className="mt-4 text-3xl font-black text-[#1F5C4A] sm:text-4xl">
              Have Something Beautiful in Mind?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#626D68]">
              Tell us what you&apos;re looking for and our team will help you
              explore the right Gogaji International collection.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {page?.phone && (
                <a
                  href={`tel:${page.phone}`}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1F5C4A] px-7 text-sm font-black text-white transition hover:bg-[#17483A]"
                >
                  <Phone size={17} />
                  Contact Us
                </a>
              )}

              {page?.email && (
                <a
                  href={`mailto:${page.email}`}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full border border-[#D9C99F] bg-white px-7 text-sm font-black text-[#1F5C4A] transition hover:bg-[#FFF6E3]"
                >
                  <Mail size={17} />
                  Send Email
                </a>
              )}
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

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B38B2D]">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black leading-tight text-[#1F5C4A] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#66706C]">
          {description}
        </p>
      )}
    </div>
  );
}

function MiniFeature({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="rounded-[22px] border border-[#E9DEC5] bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2F7F3] text-[#1F5C4A]">
        <Icon size={20} />
      </div>

      <h3 className="mt-3 text-sm font-black text-[#27483D]">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-[#737D78]">
        {text}
      </p>
    </div>
  );
}

function SupportCard({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group rounded-[28px] border border-[#E9DFC9] bg-[#FFFCF7] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D6C087] hover:bg-white hover:shadow-[0_18px_40px_rgba(57,74,66,0.08)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF5F1] text-[#1F5C4A] transition group-hover:bg-[#1F5C4A] group-hover:text-white">
        <Icon size={25} />
      </div>

      <h3 className="mt-6 text-xl font-black text-[#263F37]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#68726E]">
        {text}
      </p>
    </div>
  );
}

function ChecklistItem({
  title,
  text,
}) {
  return (
    <div className="bg-white/[0.045] p-7 sm:p-8">
      <CheckCircle2
        size={23}
        className="text-[#E4C87E]"
      />

      <h3 className="mt-5 text-lg font-black">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-white/70">
        {text}
      </p>
    </div>
  );
}

function BrandPoint({
  number,
  title,
  text,
}) {
  return (
    <div className="rounded-[22px] bg-[#F9F5EC] p-5">
      <span className="text-xs font-black tracking-[0.15em] text-[#B38B2D]">
        {number}
      </span>

      <h3 className="mt-3 font-black text-[#24443A]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#6B7570]">
        {text}
      </p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}) {
  if (!value) {
    return null;
  }

  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F3] text-[#1F5C4A]">
        <Icon size={20} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#A1874B]">
          {label}
        </p>

        <p className="mt-1 break-words text-[14px] font-bold leading-6 text-[#314B42]">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex gap-4 rounded-2xl border border-transparent bg-[#FBF8F1] p-4 transition hover:border-[#E3D4AF] hover:bg-[#FFF9EC]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex gap-4 rounded-2xl bg-[#FBF8F1] p-4">
      {content}
    </div>
  );
}