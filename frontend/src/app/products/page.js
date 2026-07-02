import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import InfiniteProducts from "@/components/InfiniteProducts";
import ImageSearchResults from "@/components/ImageSearchResults";
import { apiRequest, API_BASE } from "@/lib/api";

async function getProducts(searchParams) {
  try {
    const query = new URLSearchParams();
    query.set("limit", "20");

    const normalizeCategorySlug = (value) => {
      if (!value) return "";

      const normalized = String(value)
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const map = {
        decoraccents: "decor-accents",
        "decor-accents": "decor-accents",
        plantersvases: "planters-vases",
        "planters-vases": "planters-vases",
        "planters-and-vases": "planters-vases",
        poojamandir: "pooja-mandir",
        "pooja-mandir": "pooja-mandir",
        "pooja-and-mandir": "pooja-mandir",
        candleholders: "candle-holders",
        "candle-holders": "candle-holders",
        "candle-and-holders": "candle-holders",
        traysurlis: "trays-urlis",
        "trays-urlis": "trays-urlis",
        "trays-and-urlis": "trays-urlis",
        tabledecor: "table-decor",
        "table-decor": "table-decor",
        walldecor: "wall-decor",
        "wall-decor": "wall-decor",
        luxuryhome: "luxury-home-collection",
        "luxury-home": "luxury-home-collection",
        "luxury-home-collection": "luxury-home-collection",
        potsplanters: "pots-planters",
        "pots-planters": "pots-planters",
        cakestand: "cake-stand",
        "cake-stand": "cake-stand",
        cosmeticorganizer: "cosmetic-organizer",
        "cosmetic-organizer": "cosmetic-organizer",
        "lanterns-candle-holder": "lanterns-candle-holder",
      };

      return map[normalized] || normalized;
    };

    if (searchParams?.category) {
      query.set("category", normalizeCategorySlug(searchParams.category));
    }

    const normalizeSubCategory = (sub) => {
      if (!sub) return "";

      const normalized = normalizeCategorySlug(sub);

      const map = {
        vases: "vases",
        planters: "planters",
        "artificial-plants": "artificial-plants",
        "pooja-essentials": "pooja-essentials",
        "temple-decor": "temple-decor",
        "metal-holders": "metal-holders",
        "glass-holders": "glass-holders",
        "lanterns-candle-holder": "lanterns-candle-holder",
        figurines: "figurines",
        frames: "frames",
        lamps: "lamps",
        "wall-decor": "wall-decor",
        trays: "trays",
        urlis: "urlis",
        "metal-trays": "metal-trays",
        hampers: "hampers",
        "for-her": "for-her",
        "for-him": "for-him",
        birthday: "birthday",
        anniversary: "anniversary",
        housewarming: "housewarming",
        "everything-under-999": "everything-under-999",

        // Amplifier
        amplifiermodules: "op-amps",
        "amplifier-modules": "op-amps",
        amplifierscomparators: "op-amps",
        "amplifiers-comparators": "op-amps",
        audioamplifierics: "op-amps",
        "audio-amplifier-ics": "op-amps",
        opamps: "op-amps",
        "op-amps": "op-amps",

        // Wireless
        bluetooth: "communication-wireless-module-ics",
        "bluetooth-modules": "communication-wireless-module-ics",
        wifimodules: "communication-wireless-module-ics",
        "wifi-modules": "communication-wireless-module-ics",
        "communication-wireless-module-ics": "communication-wireless-module-ics",

        // Sensors
        sensorics: "sensor-ics",
        "sensor-ics": "sensor-ics",
        lightsensorics: "sensor-ics",
        "light-sensor-ics": "sensor-ics",

        // Other common semiconductor groups
        dataconverters: "data-converters",
        "data-converters": "data-converters",
        discretesemiconductors: "discrete-semiconductors",
        "discrete-semiconductors": "discrete-semiconductors",
        interfaceics: "interface-ics",
        "interface-ics": "interface-ics",
        logicics: "logic-ics",
        "logic-ics": "logic-ics",
        memorychips: "memory-chips",
        "memory-chips": "memory-chips",
        powermanagementics: "power-management-ics",
        "power-management-ics": "power-management-ics",
        processorsmicrocontrollers: "processors-microcontrollers",
        "processors-microcontrollers": "processors-microcontrollers",
        programmablelogicics: "programmable-logic-ics",
        "programmable-logic-ics": "programmable-logic-ics",
      };

      return map[normalized] || normalized;
    };

    if (searchParams?.subCategory) {
      const finalSubCategory = normalizeSubCategory(searchParams.subCategory);
      query.set("subCategory", finalSubCategory);
    }

    if (searchParams?.featured) {
      query.set("featured", searchParams.featured);
    }

    if (searchParams?.keyword) {
      query.set("keyword", searchParams.keyword);
    }

    query.set(
  "page",
  String(searchParams?.page || 1)
);

    const data = await apiRequest(`/api/products?${query.toString()}`, {
      cache: "no-store",
    });

    return {
  products: data?.products || [],
  pages: data?.pages || 1,
  currentPage: data?.page || 1,
};
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }
}


function getCategoryImage(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE}${src}`;
}

async function getCategories() {
  try {
    const data = await apiRequest("/api/categories", {
      cache: "no-store",
    });

    return data?.categories || [];
  } catch (error) {
    console.error("Categories fetch error:", error);
    return [];
  }
}

function slugifyCategory(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFixedCategorySlug(value = "") {
  const slug = slugifyCategory(value);

  const slugFixMap = {
    decoraccents: "decor-accents",
    "decor-accents": "decor-accents",
    plantersvases: "planters-vases",
    "planters-vases": "planters-vases",
    "planters-and-vases": "planters-vases",
    poojamandir: "pooja-mandir",
    "pooja-mandir": "pooja-mandir",
    "pooja-and-mandir": "pooja-mandir",
    "pooja-mandir-decor": "pooja-mandir",
    candleholders: "candle-holders",
    "candle-holders": "candle-holders",
    "candle-and-holders": "candle-holders",
    traysurlis: "trays-urlis",
    "trays-urlis": "trays-urlis",
    "trays-and-urlis": "trays-urlis",
    tabledecor: "table-decor",
    "table-decor": "table-decor",
    walldecor: "wall-decor",
    "wall-decor": "wall-decor",
    luxuryhome: "luxury-home-collection",
    "luxury-home": "luxury-home-collection",
    "luxury-home-collection": "luxury-home-collection",
    potsplanters: "pots-planters",
    "pots-planters": "pots-planters",
    cakestand: "cake-stand",
    "cake-stand": "cake-stand",
    cosmeticorganizer: "cosmetic-organizer",
    "cosmetic-organizer": "cosmetic-organizer",
    seasonaldecor: "seasonal-decor",
    showpieces: "showpieces",
  };

  return slugFixMap[slug] || slug;
}

function formatCategoryName(value = "") {
  const knownNames = {
    plantersvases: "Planters & Vases",
    "planters-vases": "Planters & Vases",
    poojamandir: "Pooja & Mandir Decor",
    "pooja-mandir": "Pooja & Mandir Decor",
    candleholders: "Candle Holders",
    "candle-holders": "Candle Holders",
    decoraccents: "Decor Accents",
    "decor-accents": "Decor Accents",
    traysurlis: "Trays & Urlis",
    "trays-urlis": "Trays & Urlis",
    tabledecor: "Table Decor",
    "table-decor": "Table Decor",
    walldecor: "Wall Decor",
    "wall-decor": "Wall Decor",
    luxuryhome: "Luxury Home Collection",
    "luxury-home-collection": "Luxury Home Collection",
    seasonaldecor: "Seasonal Decor",
    "seasonal-decor": "Seasonal Decor",
    showpieces: "Showpieces",
  };

  const slug = slugifyCategory(value);
  const compact = String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  if (knownNames[slug]) return knownNames[slug];
  if (knownNames[compact]) return knownNames[compact];

  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getProductCategories() {
  try {
    const data = await apiRequest("/api/products?limit=500", {
      cache: "no-store",
    });

    const map = new Map();

    (data?.products || []).forEach((product) => {
      const rawCategory = String(product?.category || "").trim();
      if (!rawCategory) return;

      const slug = getFixedCategorySlug(rawCategory);
      if (!slug || map.has(slug)) return;

      map.set(slug, {
        name: formatCategoryName(rawCategory),
        slug,
        parentSlug: "",
        fromProducts: true,
      });
    });

    return Array.from(map.values());
  } catch (error) {
    console.error("Product categories fetch error:", error);
    return [];
  }
}

function mergeCategoryLists(categoryList = [], productCategoryList = []) {
  const map = new Map();

  categoryList
    .filter((item) => !item.parentSlug)
    .forEach((item) => {
      const slug = getFixedCategorySlug(item?.slug || item?.name);
      if (!slug || map.has(slug)) return;

      map.set(slug, {
        ...item,
        slug,
      });
    });

  productCategoryList.forEach((item) => {
    const slug = getFixedCategorySlug(item?.slug || item?.name);
    if (!slug || map.has(slug)) return;

    map.set(slug, {
      ...item,
      slug,
    });
  });

  return Array.from(map.values());
}

async function getCategoryBySlugFromApi(slug) {
  if (!slug) return null;

  try {
    const data = await apiRequest(`/api/categories/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });

    return data?.category || null;
  } catch (error) {
    console.error("Category fetch error:", error);
    return null;
  }
}
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const keyword = resolvedSearchParams?.keyword || "";
  const category = resolvedSearchParams?.category || "";
  const subCategory = resolvedSearchParams?.subCategory || "";

  const title = keyword
    ? `${keyword} Electronic Components Online India | Royal Trading Component`
    : category
      ? `${category} Components Supplier India | Royal Trading Component`
      : "Electronic Components Online India | IC Supplier Delhi | Royal Trading Component";

  const description = keyword
    ? `Buy ${keyword} electronic components online in India from Royal Trading Component. Wholesale semiconductor and industrial electronics supplier in Delhi India.`
    : category
      ? `Buy ${category} electronic components online in India with bulk procurement support, GST invoice and fast delivery.`
      : "Buy electronic components, semiconductors, ICs, displays, modules and industrial electronics online in India from Royal Trading Component.";

  const currentUrl =
    keyword
      ? `https://www.royalsmd.com/products?keyword=${keyword}`
      : category
        ? `https://www.royalsmd.com/products?category=${category}`
        : "https://www.royalsmd.com/products";

  return {
    title,

    description,

    keywords: [
      "Electronic Components India",
      "IC Supplier Delhi",
      "Semiconductor Supplier India",
      "Electronic Parts Store",
      "Wholesale Electronics India",
      "Industrial Electronics Supplier",
      "PCB Components India",
      "Electronic Components Online",
      "Buy IC Online India",
      "Royal Trading Component",
      keyword,
      category,
      subCategory,
    ],

    alternates: {
      canonical: currentUrl,
    },

    openGraph: {
      title,

      description,

      url: currentUrl,

      siteName: "Royal Trading Component",

      images: [
        {
          url: "https://www.royalsmd.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Royal Trading Component",
        },
      ],

      locale: "en_IN",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: ["https://www.royalsmd.com/og-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductsPage({ searchParams }) {

  const resolvedSearchParams = await searchParams;

const currentPage = Number(
  resolvedSearchParams?.page || 1
);
  const data = await getProducts(resolvedSearchParams);

const products = data.products || [];

const totalPages = data.pages || 1;

  const keyword = resolvedSearchParams?.keyword || "";
  const isImageSearch =
  resolvedSearchParams?.imageSearch === "true";

    const [apiCategories, productCategories] = await Promise.all([
      getCategories(),
      getProductCategories(),
    ]);

    const allCategories = mergeCategoryLists(apiCategories, productCategories);

  const selectedCategory = resolvedSearchParams?.category
    ? await getCategoryBySlugFromApi(resolvedSearchParams.category)
    : null;

  const fallbackCategoryName = resolvedSearchParams?.category
    ? formatCategoryName(resolvedSearchParams.category)
    : "";

  const pageTitle = keyword
    ? `Search Results for "${keyword}"`
    : selectedCategory
      ? `${selectedCategory.name} Products`
      : fallbackCategoryName
        ? `${fallbackCategoryName} Products`
      : "All Products";

  const pageDescription = keyword
    ? `Showing matching industrial, electrical and electronic components for "${keyword}".`
    : selectedCategory
      ? selectedCategory.description
      : fallbackCategoryName
        ? `Explore ${fallbackCategoryName.toLowerCase()} products.`
      : "Explore industrial, electrical and electronic products.";

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      <section className="section-padding">
        <div className="container-royal">
          <div className="mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="heading-section">{pageTitle}</h1>

                <p className="section-subtitle">{pageDescription}</p>

                {keyword ? (
                  <p className="mt-3 text-sm font-semibold text-[#0f6cbd]">
                    {products.length} product(s) found
                  </p>
                ) : null}
              </div>

              {keyword ? (
                <Link
                  href="/products"
                  className="rounded-full border border-[#cfe5f5] bg-white px-5 py-3 text-sm font-bold text-[#0f3d67] transition hover:border-[#38bdf8] hover:bg-[#f2fbff]"
                >
                  Clear Search
                </Link>
              ) : null}
            </div>
          </div>

                {selectedCategory?.image ? (
            <div className="mb-8 overflow-hidden rounded-2xl border border-[#d6bd72]/50 bg-white shadow-sm">
              <img
                src={getCategoryImage(selectedCategory.image)}
                alt={selectedCategory.iconAlt || selectedCategory.name}
                className="h-[260px] w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-extrabold text-[#1f604d]">
                  {selectedCategory.name}
                </h2>

                {selectedCategory.description ? (
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {selectedCategory.description}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {!keyword && !resolvedSearchParams?.category ? (
            <div className="mb-8 flex flex-wrap gap-3">
              {allCategories
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products?category=${encodeURIComponent(item.slug)}`}
                    className="rounded-full border border-[#d6bd72] bg-white px-4 py-2 text-sm font-semibold text-[#1f604d] transition hover:bg-[#1f604d] hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          ) : null}

       

         {isImageSearch ? (
  <ImageSearchResults />

) : products.length > 0 ? (

  <InfiniteProducts
    initialProducts={products}
    currentPage={currentPage}
    totalPages={totalPages}
    category={resolvedSearchParams?.category || ""}
    subCategory={resolvedSearchParams?.subCategory || ""}
    keyword={resolvedSearchParams?.keyword || ""}
  />


    
  
) : (
  <div className="card-royal p-10 text-center">
    <h2 className="text-2xl font-extrabold text-[#102033]">
      No products found
    </h2>

    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
      We could not find products matching your search. Try another
      keyword like IC, sensor, cable, switchgear, MOSFET or brand name.
    </p>

    <Link
      href="/products"
      className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
    >
      View All Products
    </Link>
  </div>
)}
        </div>
      </section>

  <section className="bg-white border-t border-[#e5e7eb] py-14">
  <div className="container-royal">
    <div className="max-w-7xl mx-auto prose prose-lg max-w-none text-[#172033]">
      <h2 className="text-[34px] font-extrabold text-[#1f604d] leading-tight">
        Buy Premium Home Decor Online in India
      </h2>

      <p>
        Goga Ji International is a premium home decor supplier in India
        offering elegant planters, flower vases, pooja and mandir items,
        candle holders, trays, urlis, table decor and decorative accents
        for modern homes, hotels, interior designers, retailers and bulk
        buyers.
      </p>

      <p>
        Our online home decor store provides stylish and quality decor
        products with fast procurement support, wholesale pricing, bulk
        order assistance and pan India delivery for homes and businesses.
      </p>

      <h2 className="mt-12 text-[30px] font-extrabold text-[#1f604d] leading-tight">
        Trusted Home Decor Supplier in India
      </h2>

      <p>
        Goga Ji International supplies home decor products for retailers,
        interior projects, gifting suppliers, event decorators, hotels,
        showrooms and customers across Delhi NCR and all major cities in
        India.
      </p>

      <p>
        Businesses trust us for premium decor sourcing, elegant product
        collections, reliable availability and smooth procurement support
        for bulk home decor requirements.
      </p>

      <h2 className="mt-12 text-[30px] font-extrabold text-[#1f604d] leading-tight">
        Popular Home Decor Categories
      </h2>

      <ul>
        <li>Planters & Vases</li>
        <li>Pooja & Mandir Decor</li>
        <li>Candle Holders</li>
        <li>Decor Accents</li>
        <li>Trays & Urlis</li>
        <li>Table Decor</li>
        <li>Flower Vases</li>
        <li>Luxury Home Accessories</li>
        <li>Gift Decor Items</li>
        <li>Modern Living Room Decor</li>
      </ul>

      <h3 className="mt-8 text-[24px] font-bold text-[#1f604d]">
        Premium Decor for Homes, Hotels and Interior Projects
      </h3>

      <p>
        Our decor products are suitable for living rooms, bedrooms,
        balconies, pooja rooms, hotels, cafes, offices, showrooms,
        festive styling, gifting, interior design projects and modern
        decorative spaces.
      </p>

      <h2 className="mt-12 text-[30px] font-extrabold text-[#1f604d] leading-tight">
        Wholesale Home Decor Supplier
      </h2>

      <p>
        Goga Ji International supports retailers, resellers, interior
        designers, event planners and procurement teams with bulk home
        decor sourcing, wholesale pricing and fast product request support.
      </p>

      <p>
        Our collection includes premium planters, designer vases, candle
        holders, pooja accessories, trays, urlis, decorative accents and
        luxury home styling products.
      </p>
    </div>
  </div>
</section>

<section className="rounded-sm bg-white p-8 shadow-sm mt-8">
  <h2 className="text-[32px] font-extrabold text-[#1f604d]">
    Frequently Asked Questions
  </h2>

  <div className="mt-8 space-y-6">
    <div>
      <h3 className="text-[22px] font-bold text-[#111827]">
        Where to buy premium home decor online in India?
      </h3>

      <p className="mt-3 text-[17px] leading-8 text-[#374151]">
        You can buy premium home decor online from Goga Ji International,
        a trusted supplier of planters, vases, candle holders, pooja decor,
        trays, urlis and decorative accessories in India.
      </p>
    </div>

    <div>
      <h3 className="text-[22px] font-bold text-[#111827]">
        Do you provide bulk home decor supply?
      </h3>

      <p className="mt-3 text-[17px] leading-8 text-[#374151]">
        Yes, Goga Ji International supports bulk home decor orders for
        retailers, interior designers, hotels, event planners, gifting
        suppliers and B2B buyers.
      </p>
    </div>

    <div>
      <h3 className="text-[22px] font-bold text-[#111827]">
        Which home decor products are available?
      </h3>

      <p className="mt-3 text-[17px] leading-8 text-[#374151]">
        We offer planters, flower vases, pooja and mandir decor, candle
        holders, trays, urlis, table decor, luxury accessories and modern
        decorative accents.
      </p>
    </div>

    <div>
      <h3 className="text-[22px] font-bold text-[#111827]">
        Do you deliver home decor products across India?
      </h3>

      <p className="mt-3 text-[17px] leading-8 text-[#374151]">
        Yes, pan India delivery support is available for home decor
        products, premium collections and bulk procurement orders.
      </p>
    </div>
  </div>
</section>

<section className="rounded-sm bg-white p-8 shadow-sm mt-8">
  <h2 className="text-[30px] font-extrabold text-[#1f604d]">
    Explore Home Decor Categories
  </h2>

  <div className="mt-6 flex flex-wrap gap-3">
    {allCategories.map((item) => (
      <Link
        key={item.slug}
        href={`/products?category=${encodeURIComponent(item.slug)}`}
        className="rounded-full border border-[#d6bd72] px-5 py-3 text-[15px] font-semibold text-[#1f604d] transition hover:bg-[#1f604d] hover:text-white"
      >
        {item.name}
      </Link>
    ))}

    <Link
      href="/products"
      className="rounded-full border border-[#d6bd72] px-5 py-3 text-[15px] font-semibold text-[#1f604d] transition hover:bg-[#1f604d] hover:text-white"
    >
      View All Home Decor
    </Link>
  </div>
</section>

      <Footer />
    </div>
  );
}
