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
  { name: "New Arrivals", slug: "new-arrivals" },
  { name: "Top Picks", slug: "top-picks" },
  { name: "Gifts", slug: "gifts" },
  { name: "Pooja & Mandir", slug: "pooja-mandir" },
  { name: "Decor Accents", slug: "decor-accents" },
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

function getCategoryHref(item) {
  if (item?.href) return item.href;

  return `/products?category=semiconductors&subCategory=${encodeURIComponent(
    item?.slug || "",
  )}`;
}

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
      name: "New at BEHOMA",
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

  const visibleCategories = [];
  const allSemiconductorCategories = categories;

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
        const res = await fetch(`${API_BASE}/api/categories`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) return;

        const semiconductorSubCategories = (data.categories || [])
          .filter((cat) => cat.isActive !== false)
          .filter((cat) => cat.showInNavbar !== false)
          .filter((cat) => cat.parentSlug === "semiconductors")
          .sort(
            (a, b) =>
              Number(a.navbarOrder || 0) - Number(b.navbarOrder || 0) ||
              Number(a.order || 0) - Number(b.order || 0),
          )
          .map((cat) => ({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            href: `/products?category=semiconductors&subCategory=${encodeURIComponent(
              cat.slug,
            )}`,
          }))
          .filter((cat) => cat.name && cat.slug);

        if (semiconductorSubCategories.length > 0) {
          setCategories(semiconductorSubCategories);
        }
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
        <div className="bg-[#DCFCE7] text-[#166534] px-4 py-3 text-center text-sm font-semibold">
          🚚 Free Shipping on Bulk Orders Above ₹10,000
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
                    className="flex h-[46px] items-center gap-2 rounded-full border border-[#BBF7D0] bg-white px-4 text-sm font-semibold text-[#166534] transition hover:border-[#25D366] hover:bg-[#F0FDF4]"                  >
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
                          <p cclassName="mt-1 text-sm text-[#15803D]">
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
                              className="flex items-center gap-3 px-6 py-3 text-[15px] font-medium text-[#1F2937] transition hover:bg-[#F0FDF4] hover:text-[#16A34A]"                            >
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
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2]"                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              <div className="hidden h-[46px] items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-5 text-sm font-bold text-white shadow-sm md:flex hover:bg-[#1FB857] transition-all">
                <PackageSearch size={18} />
                Request Products
              </div>

              <div className="hidden h-[46px] items-center gap-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-5 text-sm font-bold text-[#166534] shadow-sm md:flex hover:bg-[#DCFCE7] transition-all">
                <PackageSearch size={18} />
                Track Request
              </div>

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

          <nav className="hidden border-t border-[#E5E7EB] py-3 lg:block">
            <div className="flex items-center gap-2 whitespace-nowrap xl:gap-3">
              <Link
                href="/blog"
                className="group relative inline-flex shrink-0 items-center rounded-full px-4 py-2.5 text-[15px] font-extrabold text-[#1F2937] transition-all duration-200 hover:bg-[#F0FDF4] hover:text-[#0B2E59]]"
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Blogs
                </span>

                <span className="absolute inset-x-4 bottom-[4px] h-[2px] scale-x-0 rounded-full bg-[#25D366] transition-transform duration-200 group-hover:scale-x-100" />
              </Link>

              {/* BEHOMA STYLE MENUS */}

              {staticMenuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(item.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={item.href}
                    className="
  group
  relative
  block
  px-4
  py-2.5
  text-[15px]
  font-semibold
  text-[#1F2937]
  transition-all
  duration-300
  hover:text-[#16A34A]  
  "
                  >
                    <span className="flex items-center gap-1">
                      {item.name}
                      <ChevronDown size={14} />
                    </span>

                    <span
                      className="
    absolute
    bottom-0
    left-4
    h-[2px]
    w-0
    bg-[#25D366]  
    transition-all
    duration-300
    group-hover:w-[70%]
    "
                    />
                  </Link>

                  {activeMegaMenu === item.name && (
                    <div
                      className="
absolute
left-0
top-full
z-[999]
mt-3
min-w-[320px]
rounded-[20px]
bg-white
border
border-[#BBF7D0]
shadow-[0_20px_50px_rgba(0,0,0,0.12)]
overflow-hidden

        "
                    >
                      <div className="py-4">
                        {item.children.map((child) => (
                          <Link
                            key={child}
                            href="#"
                            className="
              flex
              items-center
              justify-between
              px-6
              py-3
              text-[15px]
              font-medium
              text-[#4A3656]
              hover:bg-[#F0FDF4]
              "
                          >
                            {child}
                            <ChevronRight size={16} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
                    <Link
                      key={item._id || item.slug}
                      href={getCategoryHref(item)}
                      className="flex items-center justify-between rounded-xl border border-[#e6f1f8] bg-[#FCFAFE] px-4 py-3 text-sm font-semibold text-[#23435b] transition hover:border-[#b9e6fb] hover:bg-[#f2fbff] hover:text-[#0B2E59]"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={17} />
                    </Link>
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
