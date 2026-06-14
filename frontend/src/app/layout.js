import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { OrderProvider } from "@/context/OrderContext";
import { AddressProvider } from "@/context/AddressContext";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChatProvider } from "@/context/ChatContext";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  metadataBase: new URL("https://www.gogajiinternational.com"),

  title: {
    default:
      "Gogaji International | Premium Home Decor & Luxury Gifting Collection",
    template: "%s | Gogaji International",
  },

  description:
    "Shop premium home decor products, decorative vases, luxury planters, artificial flowers, gifting collections and elegant interior accessories from Gogaji International.",

  keywords: [
    "home decor products",
    "premium home decor",
    "luxury home decor",
    "decorative vases",
    "artificial flowers",
    "luxury planters",
    "decor accessories",
    "home styling products",
    "corporate gifting",
    "luxury gifting items",
    "hotel decor products",
    "interior decor accessories",
    "premium lifestyle products",
    "home decoration online",
    "decor products India",
    "Gogaji International",
  ],

  authors: [{ name: "Gogaji International" }],

  creator: "Gogaji International",

  publisher: "Gogaji International",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.gogajiinternational.com",
  },

  openGraph: {
    title:
      "Gogaji International | Premium Home Decor & Luxury Living",

    description:
      "Discover luxury home decor collections, decorative accessories, premium gifting products and elegant interior styling solutions.",

    url: "https://www.gogajiinternational.com",

    siteName: "Gogaji International",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gogaji International",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Gogaji International | Premium Home Decor Collection",

    description:
      "Shop decorative vases, planters, artificial flowers, luxury gifting products and premium home decor online.",

    images: ["/og-image.jpg"],
  },

  category: "Home Decor",
};

export default function RootLayout({ children }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <OrderProvider>
                  <AddressProvider>
                    <ChatProvider>

                    {children}
                    <Toaster position="top-right" richColors />
                        </ChatProvider>

                  </AddressProvider>
                </OrderProvider>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
        <GoogleAnalytics gaId="G-8JQQ1462E2" />
      </body>
    </html>
  );
}