"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  ShoppingCart,
  User,
  X,
  ChevronRight,
  ChevronDown,
  Package,
  PackageSearch,
  RotateCcw,
  Heart,
  TicketPercent,
  Phone,
  Info,
  CircleHelp,
  LogOut,
  LayoutDashboard,
  BookOpen,
  FileText,
  Grid3X3,

  Video,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import LoginModal from "@/app/authPage/LoginModel";
import RegisterModal from "@/app/authPage/RegisterModel";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchBar from "@/components/SearchBar";
import { API_BASE } from "@/lib/api";

const fallbackCategories = [
  { name: "Top Picks", slug: "top-picks" },
  {
    name: "Planters & Vases",
    slug: "planters-vases",
    children: [
      { name: "Vases", slug: "vases" },
      { name: "Planters", slug: "planters" },
      { name: "Artificial Plants", slug: "artificial-plants" },
    ],
  },
  {
    name: "Pooja & Mandir Decor",
    slug: "pooja-mandir",
    children: [
      { name: "Pooja Essentials", slug: "pooja-essentials" },
      { name: "Temple Decor", slug: "temple-decor" },
    ],
  },
  {
    name: "Candle Holders",
    slug: "candle-holders",
    children: [
      { name: "Metal Holders", slug: "metal-holders" },
      { name: "Glass Holders", slug: "glass-holders" },
      { name: "Lanterns & Candle Holder", slug: "lanterns-candle-holder" },
    ],
  },
  {
    name: "Trays & Urlis",
    slug: "trays-urlis",
    children: [
      { name: "Trays", slug: "trays" },
      { name: "Urlis", slug: "urlis" },
      { name: "Metal Trays", slug: "metal-trays" },
    ],
  },
  {
    name: "Gifts",
    slug: "gifts",
    children: [
      { name: "Hampers", slug: "hampers" },
      { name: "For Her", slug: "for-her" },
      { name: "For Him", slug: "for-him" },
      { name: "Birthday", slug: "birthday" },
      { name: "Anniversary", slug: "anniversary" },
      { name: "Housewarming", slug: "housewarming" },
      { name: "Everything Under 999", slug: "everything-under-999" },
    ],
  },
  {
    name: "Decor Accents",
    slug: "decor-accents",
    children: [
      { name: "Figurines", slug: "figurines" },
      { name: "Frames", slug: "frames" },
      { name: "Lamps", slug: "lamps" },
      { name: "Wall Decor", slug: "wall-decor" },
    ],
  },
  { name: "Wall Decor", slug: "wall-decor" },
  { name: "Table Decor", slug: "table-decor" },
  { name: "Luxury Home Collection", slug: "luxury-home-collection" },
  { name: "Cake Stand", slug: "cake-stand" },
  { name: "Cosmetic Organizer", slug: "cosmetic-organizer" },
  { name: "Lanterns & Candle Holder", slug: "lanterns-candle-holder" },
  { name: "Pots & Planters", slug: "pots-planters" },
];

const accountMenuItems = [
  { label: "My Orders", href: "/checkout/order", icon: Package },
  {
    label: "Request Component",
    href: "/request-component",
    icon: PackageSearch,
  },
  {
    label: "Track Request",
    href: "/request-component/my-requests",
    icon: PackageSearch,
  },
  { label: "Buy Again", href: "/checkout/order", icon: RotateCcw },
  { label: "My Account", href: "/account", icon: LayoutDashboard },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "My Coupons", href: "/account/coupons", icon: TicketPercent },
  { label: "Contact Us", href: "/contact", icon: Phone },
  { label: "About Us", href: "/about", icon: Info },
  { label: "FAQ", href: "/contact#faq", icon: CircleHelp },
  {
    label: "My Quotations",
    href: "/request-component/my-quotations",
    icon: FileText,
  },
];

function resolveCategoryImage(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${API_BASE}${src}`;
}

function slugifyCategory(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFixedCategorySlug(item) {
  const slug = slugifyCategory(item?.slug);
  const nameSlug = slugifyCategory(item?.name);

  const slugFixMap = {
    "table-decor": "table-decor",
    tabledecor: "table-decor",
    "wall-decor": "wall-decor",
    walldecor: "wall-decor",
    "decor-accents": "decor-accents",
    decoraccents: "decor-accents",
    "trays-urlis": "trays-urlis",
    traysurlis: "trays-urlis",
    traysandurlis: "trays-urlis",
    "luxury-home": "luxury-home-collection",
    luxuryhome: "luxury-home-collection",
    plantersvases: "planters-vases",
    "planters-and-vases": "planters-vases",
    poojamandir: "pooja-mandir",
    "pooja-and-mandir": "pooja-mandir",
    candleholders: "candle-holders",
    "candle-and-holders": "candle-holders",
    "trays-and-urlis": "trays-urlis",
  };

  return slugFixMap[slug] || nameSlug || slug;
}

function formatCategoryName(value = "") {
  const knownNames = {
    plantersvases: "Planters & Vases",
    poojamandir: "Pooja & Mandir Decor",
    "pooja-mandir": "Pooja & Mandir Decor",
    "pooja-mandir-decor": "Pooja & Mandir Decor",
    candleholders: "Candle Holders",
    decoraccents: "Decor Accents",
    traysurlis: "Trays & Urlis",
    seasonaldecor: "Seasonal Decor",
    showpieces: "Showpieces",
  };

  const slug = slugifyCategory(value);
  const compact = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (knownNames[slug]) return knownNames[slug];
  if (knownNames[compact]) return knownNames[compact];

  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getProductImage(product) {
  return (
    product?.thumbnail ||
    product?.images?.find((image) => image?.isPrimary)?.url ||
    product?.images?.[0]?.url ||
    ""
  );
}

function buildProductCategoryItems(products = [], existingSlugs = new Set()) {
  const categoryMap = new Map();

  products.forEach((product) => {
    const rawCategory = String(product?.category || "").trim();
    if (!rawCategory) return;

    const slug = getFixedCategorySlug({ slug: rawCategory });
    if (!slug || existingSlugs.has(slug) || categoryMap.has(slug)) return;

    categoryMap.set(slug, {
      name: formatCategoryName(rawCategory),
      slug,
      image: getProductImage(product),
      iconAlt: `${formatCategoryName(rawCategory)} products`,
      parentSlug: "",
      children: [],
      fromProducts: true,
    });
  });

  return Array.from(categoryMap.values());
}

function getCategoryHref(item) {
  const slug = getFixedCategorySlug(item);

  if (!slug) return "/products";

  if (slug === "top-picks") {
    return "/products?featured=true";
  }

  return `/products?category=${encodeURIComponent(slug)}`;
}

function getChildCategoryHref(parent, child) {
  const parentSlug = getFixedCategorySlug(parent);
  const childSlug = getFixedCategorySlug(child);

  return `/products?category=${encodeURIComponent(
    parentSlug,
  )}&subCategory=${encodeURIComponent(childSlug)}`;
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/gogaji_international?igsh=MTZqZHl5eWkzaXhwcw%3D%3D&utm_source=qr",
    icon: "📸",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1D94PEoY4j/?mibextid=wwXIfr",
    icon: "f",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [categories, setCategories] = useState(fallbackCategories);
  const [isSemiconductorMenuOpen, setIsSemiconductorMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const { user, logout } = useAuth();
  const { cartSummary, cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const accountMenuRef = useRef(null);

  const staticMenuItems = [
    {
      name: "New at GOGAJI",
      href: "/category/new-arrivals",
      children: ["Latest Collection", "Featured Products"],
    },

    {
      name: "Top Picks",
      href: "/category/top-picks",
      children: ["Best Sellers", "Popular Products", "Top Rated"],
    },

    {
      name: "Gifts",
      href: "/category/gifts",
      children: ["Hampers", "For Her", "For Him"],
    },

    {
      name: "Planters & Vases",
      href: "/category/planters-vases",
      children: ["Vases", "Planters", "Artificial Plants"],
    },

    {
      name: "Pooja & Mandir",
      href: "/category/pooja-mandir",
      children: ["Pooja Essentials", "Temple Decor"],
    },

    {
      name: "Candle Holders",
      href: "/category/candle-holders",
      children: ["Metal Holders", "Glass Holders"],
    },

    {
      name: "Decor Accents",
      href: "/category/decor-accents",
      children: ["Figurines", "Frames", "Wall Decor"],
    },

    {
      name: "Trays & Urlis",
      href: "/category/trays-urlis",
      children: ["Decorative Trays", "Brass Urlis"],
    },
  ];

  const visibleCategories = categories.slice(0, 5);
  const allCategories = categories;

  const wishlistCount = (wishlistItems || []).length;

  const cartCount =
    Number(cartSummary?.itemCount || 0) ||
    (cartItems || []).reduce(
      (total, item) => total + Number(item.quantity || item.qty || 1),
      0,
    );

  const userName = useMemo(() => {
    return String(
      user?.name || user?.fullName || user?.email || "My Account",
    ).trim();
  }, [user]);

  const userEmail = useMemo(() => {
    return user?.email ? String(user.email).trim() : "";
  }, [user]);

  const shortUserName = useMemo(() => {
    const name = String(user?.name || user?.fullName || "My Account").trim();
    return name.length > 18 ? `${name.slice(0, 18)}...` : name;
  }, [user]);

  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([
          fetch(`${API_BASE}/api/categories`, {
            cache: "no-store",
          }),
          fetch(`${API_BASE}/api/products?limit=500`, {
            cache: "no-store",
          }),
        ]);

        const categoryData = await categoryRes.json();
        const productData = await productRes.json();

        if (!categoryData?.success) return;

        const list = (categoryData.categories || [])
          .filter((cat) => cat.isActive !== false)
          .sort(
            (a, b) =>
              Number(a.navbarOrder || 0) - Number(b.navbarOrder || 0) ||
              Number(a.order || 0) - Number(b.order || 0),
          );

        const mainCategories = list
          .filter((cat) => !cat.parentSlug)
          .map((main) => {
            const mainSlug = getFixedCategorySlug(main);

            return {
              ...main,
              slug: mainSlug,
              href: `/products?category=${encodeURIComponent(mainSlug)}`,
              children: list
                .filter(
                  (child) =>
                    getFixedCategorySlug({ slug: child.parentSlug }) ===
                    mainSlug,
                )
                .map((child) => ({
                  ...child,
                  slug: getFixedCategorySlug(child),
                  href: getChildCategoryHref(
                    { ...main, slug: mainSlug },
                    child,
                  ),
                })),
            };
          });

        const existingSlugs = new Set(
          mainCategories.map((item) => getFixedCategorySlug(item)),
        );

        const productCategories = buildProductCategoryItems(
          productData?.products || [],
          existingSlugs,
        );

        setCategories([...mainCategories, ...productCategories]);
      } catch (error) {
        console.error("Navbar category fetch error:", error);
      }
    };

    fetchNavbarCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAccountMenuOpen(false);
    setMobileOpen(false);
    logout();
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]">



        <div className="bg-[#1F5C4A] text-white shadow-sm">
          <div className="relative mx-auto w-full max-w-[1500px] px-4 py-3 sm:px-6 lg:px-8">
            {/* Exact center */}
            <p className="w-full text-center text-xs font-bold sm:text-sm">
              <span className="mr-1 text-[#F7D77C]" aria-hidden="true">🚚</span>
              Free Shipping on Bulk Orders Above ₹10,000
            </p>

            {/* Right-side links */}
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 text-xs font-bold sm:right-6 sm:gap-4 sm:text-sm lg:right-8">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={`Visit Gogaji on ${label}`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-base transition hover:bg-white/15"
                >
                  <span className={label === "Facebook" ? "font-black" : ""}>
                    {icon}
                  </span>
                </a>
              ))}

              <span className="hidden h-4 w-px bg-white/35 sm:block" />

              <Link
                href="/client-feed"
                className="inline-flex items-center gap-1.5 transition hover:text-[#F7D77C]"
              >
                <Video size={16} />
                <span className="hidden sm:inline">Client Feed</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 transition hover:text-[#F7D77C]"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-4 lg:py-5">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-2 text-[#4A3656] lg:hidden"
              >
                <Menu size={24} />
              </button>

              <Link href="/" className="flex min-w-0 items-center">
                <div className="relative flex h-[70px] w-[300px] items-center pt-5">
                  <Image
                    src="/GOGAJILOGO1.png"
                    alt="Gogaji International"
                    width={300}
                    height={70}
                    priority
                    className="h-auto object-contain object-left"
                  />
                </div>
              </Link>
            </div>

            <div className="hidden max-w-4xl flex-1 px-6 lg:flex">
              <div
                className="
    relative
    w-full
    rounded-[32px]
    border
    border-[#D1FAE5]
    bg-white
    p-1
    shadow-[0_12px_35px_rgba(22,163,74,0.08)]
    transition-all
    duration-300
    hover:border-[#22C55E]
    hover:shadow-[0_16px_40px_rgba(22,163,74,0.12)]
    focus-within:border-[#22C55E]
    focus-within:ring-4
    focus-within:ring-[#DCFCE7]
    "
              >
                <SearchBar />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-[#0f172a] sm:gap-3">
              {!user?.token ? (
                <button
                  type="button"
                  onClick={() => setIsLoginOpen(true)}
                  className="
      hidden
      sm:flex
      h-[46px]
      items-center
      gap-2
      rounded-full
      border
      border-[#BBF7D0]
      bg-white
      text-[#166534]

      font-semibold
      text-[#4A3656]
      transition-all
      duration-300
      hover:bg-[#F0FDF4]
    "
                >
                  <User size={18} />
                  Sign in
                </button>
              ) : (
                <div className="relative hidden sm:block" ref={accountMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                    className="flex h-[46px] items-center gap-2 rounded-full border border-[#BBF7D0] bg-white px-4 text-sm font-semibold text-[#166534] transition hover:border-[#25D366] hover:bg-[#F0FDF4]"
                  >
                    <User size={18} />
                    <span>{shortUserName}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isAccountMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isAccountMenuOpen ? (
                    <div className="absolute right-0 top-[58px] z-[80] w-[320px] overflow-hidden rounded-[22px] border border-[#BBF7D0] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                      <div className="border-b border-[#DCFCE7] bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] px-6 py-5">
                        <p className="text-[16px] font-bold text-[#0f172a]">
                          Hi, {userName}
                        </p>
                        {userEmail ? (
                          <p className="mt-1 text-sm text-[#15803D]">
                            {userEmail}
                          </p>
                        ) : null}
                      </div>

                      <div className="max-h-[420px] overflow-y-auto py-2">
                        {accountMenuItems.map((item) => {
                          const Icon = item.icon;

                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsAccountMenuOpen(false)}
                              className="flex items-center gap-3 px-6 py-3 text-[15px] font-medium text-[#1F2937] transition hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                            >
                              <Icon size={18} />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="border-t border-[#DCFCE7] px-4 py-3">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2]"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              <Link
  href="/request-products"
className="hidden h-[46px] items-center gap-2 rounded-full border border-[#B38B2D] bg-[#B38B2D] px-5 text-sm font-bold text-white shadow-sm md:flex hover:bg-[#9D7824] transition-all duration-300">
  <PackageSearch size={18} />
  Request Products
</Link>

              <Link
                href="/wishlist"
                className="relative flex h-[46px] items-center justify-center rounded-full border border-[#BBF7D0] bg-white px-4 text-sm font-semibold text-[#166534]"
              >
                <span className="relative inline-flex">
                  <Heart size={18} />
                  {wishlistCount > 0 ? (
                    <span className="absolute -right-3 -top-3 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ef4444] px-1.5 text-[10px] font-bold text-white shadow">
                      {wishlistCount}
                    </span>
                  ) : null}
                </span>
              </Link>

              <Link
                href="/checkout/cart"
                className="relative flex h-[46px] items-center gap-2 rounded-full border border-[#BBF7D0] bg-white px-4 text-sm font-semibold text-[#166534]"
              >
                <span className="relative inline-flex">
                  <ShoppingCart size={18} />
                  {cartCount > 0 ? (
                    <span className="absolute -right-3 -top-3 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ef4444] px-1.5 text-[10px] font-bold leading-none text-white shadow">
                      {cartCount}
                    </span>
                  ) : null}
                </span>
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>

          <nav className="hidden border-t border-[#E5E7EB] bg-white lg:block">
            <div className="mx-auto flex w-full max-w-[1500px] items-center gap-4 px-2 py-3">
              <Link
                href="/blog"
                className="inline-flex h-[54px] shrink-0 items-center gap-2 rounded-2xl border border-[#D8E1EC] bg-white px-5 text-[15px] font-extrabold text-[#1F5C4A] shadow-sm transition hover:border-[#B38B2D] hover:bg-[#FFF8E8]"
              >
                <BookOpen size={17} />
                Blogs
              </Link>

              <div
                className="relative shrink-0"
                onMouseEnter={() => setIsSemiconductorMenuOpen(true)}
                onMouseLeave={() => setIsSemiconductorMenuOpen(false)}
              >
                <button className="inline-flex h-[54px] items-center gap-2 rounded-2xl border border-[#D8E1EC] bg-[#F8FAFC] px-5 text-[15px] font-extrabold text-[#1F5C4A] shadow-sm transition hover:border-[#B38B2D] hover:bg-[#FFF8E8]">
                  <Grid3X3 size={18} />
                  All Categories
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isSemiconductorMenuOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isSemiconductorMenuOpen ? (
                  <div className="absolute left-0 top-[64px] z-[999] w-[min(1120px,calc(100vw-48px))] overflow-hidden rounded-b-2xl border border-[#D7B45B] border-t-4 border-t-[#B38B2D] bg-white shadow-[0_28px_70px_rgba(16,32,51,0.24)]">
                    <div className="flex items-center justify-between bg-gradient-to-r from-[#123E35] via-[#1F5C4A] to-[#2B7861] px-7 py-5">
                      <div>
                        <p className="text-base font-black tracking-[0.08em] text-[#F7D77C]">
                          SHOP BY CATEGORY
                        </p>
                        <p className="mt-1 text-sm font-medium text-white/85">
                          Premium home decor, thoughtfully curated for every space.
                        </p>
                      </div>

                      <Link
                        href="/products"
                        className="rounded-full border border-[#F7D77C]/60 bg-white px-5 py-2.5 text-sm font-extrabold text-[#1F5C4A] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#FFF4D5]"
                      >
                        View all products <span aria-hidden="true">→</span>
                      </Link>
                    </div>

                    <div className="grid max-h-[520px] grid-cols-2 overflow-y-auto p-4 sm:grid-cols-3 lg:grid-cols-5">
                      {allCategories.map((item, index) => {
                        const children = item.children || [];
                        const hasChildren = children.length > 0;
                        const colourThemes = [
                          { accent: "#1F5C4A", soft: "#EEF8F3", hover: "#DDF1E8" },
                          { accent: "#B7791F", soft: "#FFF8E7", hover: "#FFF0C2" },
                          { accent: "#A74B77", soft: "#FDF0F5", hover: "#F9DCE8" },
                          { accent: "#147D8B", soft: "#ECFAFB", hover: "#D7F1F3" },
                          { accent: "#805A9F", soft: "#F6F0FA", hover: "#ECDDFA" },
                        ];
                        const theme = colourThemes[index % colourThemes.length];

                        return (
                          <div
                            key={item._id || item.slug}
                            className="m-1 min-w-0 rounded-xl border border-transparent px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                            style={{ backgroundColor: theme.soft }}
                            onMouseEnter={(event) => {
                              event.currentTarget.style.backgroundColor = theme.hover;
                              event.currentTarget.style.borderColor = `${theme.accent}35`;
                            }}
                            onMouseLeave={(event) => {
                              event.currentTarget.style.backgroundColor = theme.soft;
                              event.currentTarget.style.borderColor = "transparent";
                            }}
                          >
                            <Link
                              href={getCategoryHref(item)}
                              className="group flex items-center gap-1.5 text-[14px] font-black uppercase tracking-[0.025em] transition"
                              style={{ color: theme.accent }}
                            >
                              <span className="truncate">{item.name}</span>
                              <ChevronRight
                                size={14}
                                className="shrink-0 transition-transform group-hover:translate-x-0.5"
                              />
                            </Link>

                            {hasChildren ? (
                              <div className="mt-3 space-y-2">
                                {children.map((child) => (
                                  <Link
                                    key={child._id || child.slug}
                                    href={child.href || getChildCategoryHref(item, child)}
                                    className="block truncate text-[14px] font-semibold leading-5 text-[#334155] transition hover:translate-x-0.5"
                                    onMouseEnter={(event) => {
                                      event.currentTarget.style.color = theme.accent;
                                    }}
                                    onMouseLeave={(event) => {
                                      event.currentTarget.style.color = "#334155";
                                    }}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <Link
                                href={getCategoryHref(item)}
                                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#475569] transition hover:translate-x-0.5"
                                onMouseEnter={(event) => {
                                  event.currentTarget.style.color = theme.accent;
                                }}
                                onMouseLeave={(event) => {
                                  event.currentTarget.style.color = "#475569";
                                }}
                              >
                                Explore collection <ChevronRight size={14} />
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

              </div>

              <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                {visibleCategories.map((item) => {
                  const hasChildren = item.children?.length > 0;
                  const isActive = activeMegaMenu === item.slug;

                  return (
                    <div
                      key={item._id || item.slug}
                      className="group relative shrink-0"
                      onMouseEnter={() => setActiveMegaMenu(item.slug)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <Link
                        href={getCategoryHref(item)}
                        className={`relative inline-flex h-[54px] items-center gap-3 rounded-2xl border px-3.5 pr-4 text-[15px] font-extrabold transition-all duration-200 ${isActive
                          ? "border-[#B38B2D] bg-[#FFF8E8] text-[#1F5C4A] shadow-sm"
                          : "border-[#E5E7EB] bg-[#FCFFFC] text-[#24364B] hover:border-[#B38B2D]/70 hover:bg-[#FFFDF5] hover:text-[#1F5C4A]"
                          }`}
                      >
                        {item.image ? (
                          <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
                            <img
                              src={resolveCategoryImage(item.image)}
                              alt={item.iconAlt || item.name}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </span>
                        ) : null}

                        <span className="max-w-[190px] truncate">
                          {item.name}
                        </span>

                        {hasChildren ? (
                          <span
                            className={`ml-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border transition ${isActive
                              ? "border-[#B38B2D] bg-white text-[#B38B2D]"
                              : "border-[#D8E1EC] bg-white text-[#64748B] group-hover:border-[#B38B2D] group-hover:text-[#B38B2D]"
                              }`}
                            title="Sub categories"
                          >
                            <ChevronDown
                              size={15}
                              className={`transition-transform duration-200 ${isActive ? "rotate-180" : ""
                                }`}
                            />
                          </span>
                        ) : null}
                      </Link>

                      {hasChildren && isActive ? (
                        <div className="absolute left-0 top-[calc(100%+8px)] z-[999] w-[340px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
                          <div className="border-b border-[#EEF2F7] bg-[#FAFBF8] px-5 py-4">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B38B2D]">
                              Explore
                            </p>
                            <p className="mt-1 text-lg font-black text-[#1F5C4A]">
                              {item.name}
                            </p>
                          </div>

                          <div className="max-h-[360px] overflow-y-auto py-2">
                            {item.children.map((child) => (
                              <Link
                                key={child._id || child.slug}
                                href={
                                  child.href ||
                                  getChildCategoryHref(item, child)
                                }
                                className="flex items-center gap-3 px-5 py-3.5 text-[15px] font-bold text-[#26364A] transition hover:bg-[#FFF8E8] hover:text-[#1F5C4A]"
                              >
                                {child.image ? (
                                  <span className="h-11 w-11 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
                                    <img
                                      src={resolveCategoryImage(child.image)}
                                      alt={child.iconAlt || child.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </span>
                                ) : (
                                  <span className="h-2.5 w-2.5 rounded-full bg-[#B38B2D]" />
                                )}

                                <span className="min-w-0 flex-1 truncate">
                                  {child.name}
                                </span>

                                <ChevronRight
                                  size={16}
                                  className="text-[#94A3B8]"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {mobileOpen ? (
          <div
            className="fixed inset-0 z-[60] bg-[#0f172a]/40 backdrop-blur-[2px] lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="h-full w-[86%] max-w-[360px] overflow-y-auto bg-[#FCFAFE] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-[#e6f1f8] bg-gradient-to-r from-[#F8F4FC] to-[#F2EAF8] px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-extrabold text-[#0f172a]">
                      Menu
                    </p>
                    <p className="mt-1 text-xs text-[#6b879b]">
                      Browse categories and account options
                    </p>
                  </div>

                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    type="button"
                    className="rounded-md p-2 text-[#4A3656] transition hover:bg-[#dff2ff]"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-5">
                  <SearchBar mobile onSearchDone={() => setMobileOpen(false)} />
                </div>

                {!user?.token ? (
                  <button
                    type="button"
                    className="mb-5 flex w-full items-center justify-between rounded-xl border border-[#e6f1f8] bg-[#FCFAFE] px-4 py-3 text-left text-sm font-semibold text-[#23435b] transition hover:border-[#b9e6fb] hover:bg-[#f2fbff] hover:text-[#0B2E59]"
                    onClick={() => {
                      setMobileOpen(false);
                      setIsLoginOpen(true);
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <User size={18} />
                      Sign in
                    </span>
                    <ChevronRight size={17} />
                  </button>
                ) : (
                  <div className="mb-5 overflow-hidden rounded-[18px] border border-[#dbe8f5] bg-[#FCFAFE]">
                    <div className="border-b border-[#e8f1f8] bg-gradient-to-r from-[#F8F4FC] to-[#F2EAF8] px-4 py-4">
                      <p className="text-[17px] font-bold text-[#0f172a]">
                        Hi, {userName}
                      </p>
                      {userEmail ? (
                        <p className="mt-1 text-sm text-[#5f7d95]">
                          {userEmail}
                        </p>
                      ) : null}
                    </div>

                    <div className="py-2">
                      {accountMenuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#23435b] transition hover:bg-[#f2fbff] hover:text-[#0B2E59]"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="flex items-center gap-3">
                              <Icon size={17} />
                              {item.label}
                            </span>
                            <ChevronRight size={16} />
                          </Link>
                        );
                      })}

                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#d14c5e] transition hover:bg-[#fff3f5]"
                        onClick={handleLogout}
                      >
                        <span className="flex items-center gap-3">
                          <LogOut size={17} />
                          Logout
                        </span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Link
                    href="/blog"
                    className="flex items-center justify-between rounded-xl border border-[#e6f1f8] bg-[#FCFAFE] px-4 py-3 text-sm font-semibold text-[#23435b] transition hover:border-[#b9e6fb] hover:bg-[#f2fbff] hover:text-[#0B2E59]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      <BookOpen size={17} />
                      Blogs
                    </span>

                    <ChevronRight size={17} />
                  </Link>
                  {categories.map((item) => (
                    <div
                      key={item._id || item.slug}
                      className="overflow-hidden rounded-xl border border-[#e6f1f8] bg-[#FCFAFE]"
                    >
                      <Link
                        href={getCategoryHref(item)}
                        className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#23435b] transition hover:bg-[#f2fbff] hover:text-[#0B2E59]"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{item.name}</span>
                        <ChevronRight size={17} />
                      </Link>

                      {item.children?.length > 0 ? (
                        <div className="border-t border-[#e6f1f8] bg-white/70 px-3 py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child._id || child.slug}
                              href={
                                child.href || getChildCategoryHref(item, child)
                              }
                              className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-[#52677d] transition hover:bg-[#FFF8E8] hover:text-[#1F5C4A]"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span>{child.name}</span>
                              <ChevronRight size={14} />
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <Link
                    href="/request-component"
                    className="flex items-center justify-between rounded-xl border border-[#b9e6fb] bg-[#eaf7ff] px-4 py-3 text-sm font-extrabold text-[#0B2E59] transition hover:border-[#38bdf8] hover:bg-[#dff2ff]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      <PackageSearch size={17} />
                      Request Component
                    </span>
                    <ChevronRight size={17} />
                  </Link>

                  <Link
                    href="/request-component/my-requests"
                    className="flex items-center justify-between rounded-xl border border-[#b9e6fb] bg-[#eaf7ff] px-4 py-3 text-sm font-extrabold text-[#0B2E59] transition hover:border-[#38bdf8] hover:bg-[#dff2ff]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      <PackageSearch size={17} />
                      Track Request
                    </span>
                    <ChevronRight size={17} />
                  </Link>

                  <Link
                    href="/wishlist"
                    className="flex items-center justify-between rounded-xl border border-[#e6f1f8] bg-[#FCFAFE] px-4 py-3 text-sm font-semibold text-[#23435b] transition hover:border-[#b9e6fb] hover:bg-[#f2fbff] hover:text-[#0B2E59]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>
                      Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
                    </span>
                    <ChevronRight size={17} />
                  </Link>

                  <Link
                    href="/checkout/cart"
                    className="flex items-center justify-between rounded-xl border border-[#e6f1f8] bg-[#FCFAFE] px-4 py-3 text-sm font-semibold text-[#23435b] transition hover:border-[#b9e6fb] hover:bg-[#f2fbff] hover:text-[#0B2E59]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>Cart {cartCount > 0 ? `(${cartCount})` : ""}</span>
                    <ChevronRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        openRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        openLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}
