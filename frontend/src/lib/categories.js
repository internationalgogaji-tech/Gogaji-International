import {
  Flower2,
  Gift,
  Sparkles,
  Home,
  Flame,
  Image,
  Layers,
  Package,
  Grid3X3,
  Palette,
  LampDesk,
  ShoppingBag,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const img = (name) => `${API_BASE}/uploads/categories/${name}.jpg`;

export const homeDecorSubcategories = [
  {
    name: "Gifts",
    slug: "gifts",
    countText: "Shop gift collections",
    image: img("gifts"),
    description:
      "Premium home decor gifting options for every occasion.",
    children: [
      { name: "Hampers", slug: "hampers", countText: "Gift hampers", image: img("hampers") },
      { name: "For Her", slug: "for-her", countText: "Elegant gifts", image: img("for-her") },
      { name: "For Him", slug: "for-him", countText: "Premium gifts", image: img("for-him") },
      { name: "Birthday", slug: "birthday", countText: "Birthday gifts", image: img("birthday") },
      { name: "Anniversary", slug: "anniversary", countText: "Anniversary gifts", image: img("anniversary") },
      { name: "Housewarming", slug: "housewarming", countText: "Housewarming decor", image: img("housewarming") },
      { name: "Everything Under 999", slug: "everything-under-999", countText: "Budget gifting", image: img("everything-under-999") },
    ],
  },
  {
    name: "Planters & Vases",
    slug: "planters-vases",
    countText: "Shop planters and vases",
    image: img("planters-vases"),
    description:
      "Designer planters, flower vases and decorative greenery for modern interiors.",
    children: [
      { name: "Vases", slug: "vases", countText: "Premium vases", image: img("vases") },
      { name: "Planters", slug: "planters", countText: "Indoor planters", image: img("planters") },
      { name: "Artificial Plants", slug: "artificial-plants", countText: "Decor plants", image: img("artificial-plants") },
    ],
  },
  {
    name: "Pooja & Mandir",
    slug: "pooja-mandir",
    countText: "Shop pooja decor",
    image: img("pooja-mandir"),
    description:
      "Pooja essentials, temple decor and spiritual home styling products.",
    children: [
      { name: "Pooja Essentials", slug: "pooja-essentials", countText: "Pooja items", image: img("pooja-essentials") },
      { name: "Temple Decor", slug: "temple-decor", countText: "Mandir styling", image: img("temple-decor") },
    ],
  },
  {
    name: "Candle Holders",
    slug: "candle-holders",
    countText: "Shop candle holders",
    image: img("candle-holders"),
    description:
      "Decorative candle holders and premium ambience products.",
    children: [
      { name: "Metal Holders", slug: "metal-holders", countText: "Metal candle holders", image: img("metal-holders") },
      { name: "Glass Holders", slug: "glass-holders", countText: "Glass candle holders", image: img("glass-holders") },
      { name: "Lanterns & Candle Holder", slug: "lanterns-candle-holder", countText: "Lantern decor", image: img("lanterns-candle-holder") },
    ],
  },
  {
    name: "Decor Accents",
    slug: "decor-accents",
    countText: "Shop decor accents",
    image: img("decor-accents"),
    description:
      "Decorative accents, figurines, lamps, frames and wall styling pieces.",
    children: [
      { name: "Figurines", slug: "figurines", countText: "Decor figurines", image: img("figurines") },
      { name: "Frames", slug: "frames", countText: "Decor frames", image: img("frames") },
      { name: "Lamps", slug: "lamps", countText: "Decor lamps", image: img("lamps") },
      { name: "Wall Decor", slug: "wall-decor", countText: "Wall styling", image: img("wall-decor") },
    ],
  },
  {
    name: "Trays & Urlis",
    slug: "trays-urlis",
    countText: "Shop trays and urlis",
    image: img("trays-urlis"),
    description:
      "Decorative trays, metal trays, brass urlis and festive table styling products.",
    children: [
      { name: "Trays", slug: "trays", countText: "Decor trays", image: img("trays") },
      { name: "Urlis", slug: "urlis", countText: "Premium urlis", image: img("urlis") },
    ],
  },
];

export const categories = [
  {
    name: "New at GOGAJI",
    slug: "new-at-gogaji",
    href: "/products?category=new-at-gogaji",
    icon: Sparkles,
    description: "Latest arrivals and fresh home decor launches.",
    aliases: ["new-at-gogaji", "new-arrivals", "latest-collection"],
  },
  {
    name: "Top Picks",
    slug: "top-picks",
    href: "/products?category=top-picks",
    icon: ShoppingBag,
    description: "Popular and handpicked decor products.",
    aliases: ["top-picks", "best-sellers", "popular-products"],
  },
  {
    name: "Gifts",
    slug: "gifts",
    href: "/products?category=gifts",
    icon: Gift,
    description: "Premium gifting options for birthdays, anniversaries and housewarming.",
    aliases: ["gifts", "gift", "hampers"],
  },
  {
    name: "Planters & Vases",
    slug: "planters-vases",
    href: "/products?category=planters-vases",
    icon: Flower2,
    description: "Designer planters, flower vases and artificial plants.",
    aliases: ["planters-vases", "plantersvases", "planters", "vases", "pots-planters"],
  },
  {
    name: "Pooja & Mandir",
    slug: "pooja-mandir",
    href: "/products?category=pooja-mandir",
    icon: Home,
    description: "Pooja essentials, mandir decor and spiritual styling.",
    aliases: ["pooja-mandir", "poojamandir", "pooja-essentials", "temple-decor"],
  },
  {
    name: "Candle Holders",
    slug: "candle-holders",
    href: "/products?category=candle-holders",
    icon: Flame,
    description: "Decorative candle holders, lanterns and ambience decor.",
    aliases: ["candle-holders", "candleholders", "lanterns-candle-holder"],
  },
  {
    name: "Decor Accents",
    slug: "decor-accents",
    href: "/products?category=decor-accents",
    icon: Palette,
    description: "Figurines, frames, lamps, wall decor and accent pieces.",
    aliases: ["decor-accents", "decoraccents", "figurines", "frames", "lamps"],
  },
  {
    name: "Trays & Urlis",
    slug: "trays-urlis",
    href: "/products?category=trays-urlis",
    icon: Layers,
    description: "Decorative trays, metal trays and brass urlis.",
    aliases: ["trays-urlis", "traysurlis", "trays", "urlis", "metal-trays"],
  },
  {
    name: "Wall Decor",
    slug: "wall-decor",
    href: "/products?category=wall-decor",
    icon: Image,
    description: "Wall styling pieces, frames and decorative wall accents.",
    aliases: ["wall-decor", "walldecor"],
  },
  {
    name: "Table Decor",
    slug: "table-decor",
    href: "/products?category=table-decor",
    icon: LampDesk,
    description: "Table styling products, accents, trays and centerpieces.",
    aliases: ["table-decor", "tabledecor"],
  },
  {
    name: "Luxury Home Collection",
    slug: "luxury-home-collection",
    href: "/products?category=luxury-home-collection",
    icon: Sparkles,
    description: "Premium luxury decor collection for elegant spaces.",
    aliases: ["luxury-home-collection", "luxury-home-decor", "luxury-decor"],
  },
  {
    name: "Cake Stand",
    slug: "cake-stand",
    href: "/products?category=cake-stand",
    icon: Package,
    description: "Premium cake stands and serving decor.",
    aliases: ["cake-stand", "cakestand"],
  },
  {
    name: "Cosmetic Organizer",
    slug: "cosmetic-organizer",
    href: "/products?category=cosmetic-organizer",
    icon: Grid3X3,
    description: "Stylish organizers for dressing tables and vanity spaces.",
    aliases: ["cosmetic-organizer", "cosmeticorganizer"],
  },
  {
    name: "Lanterns & Candle Holder",
    slug: "lanterns-candle-holder",
    href: "/products?category=lanterns-candle-holder",
    icon: Flame,
    description: "Lanterns and candle holders for warm decorative lighting.",
    aliases: ["lanterns-candle-holder", "lanterns", "candle-holders"],
  },
  {
    name: "Metal Trays",
    slug: "metal-trays",
    href: "/products?category=metal-trays",
    icon: Layers,
    description: "Decorative metal trays for serving and styling.",
    aliases: ["metal-trays", "metaltrays", "trays"],
  },
  {
    name: "Pots & Planters",
    slug: "pots-planters",
    href: "/products?category=pots-planters",
    icon: Flower2,
    description: "Pots, planters and greenery decor for indoor styling.",
    aliases: ["pots-planters", "potsplanters", "planters", "planters-vases"],
  },
];

export function getCategoryBySlug(slug = "") {
  return categories.find((item) => item.slug === slug);
}

export function getCategoryAliases(slug = "") {
  const category = getCategoryBySlug(slug);
  return category?.aliases || [slug];
}

export function normalizeCategoryValue(value = "") {
  return String(value).toLowerCase().trim();
}

export function productMatchesCategory(productCategory = "", slug = "") {
  const aliases = getCategoryAliases(slug).map(normalizeCategoryValue);
  return aliases.includes(normalizeCategoryValue(productCategory));
}

export function getHomeDecorSubcategoryBySlug(slug = "") {
  return homeDecorSubcategories.find((item) => item.slug === slug);
}

export function getHomeDecorChildBySlug(parentSlug = "", childSlug = "") {
  const parent = getHomeDecorSubcategoryBySlug(parentSlug);
  return parent?.children?.find((item) => item.slug === childSlug);
}