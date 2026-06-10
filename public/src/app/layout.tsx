import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { IntroOverlay } from "@/components/site/IntroOverlay";
import { SideNav } from "@/components/site/SideNav";

export const metadata: Metadata = {
  title: "House of Shakya — Built Without Chaos | Interior Design Nepal",
  description:
    "Premium interior design and turnkey construction in Nepal. Hospitality, residential and commercial projects delivered on time, where design matches reality.",
  openGraph: {
    title: "House of Shakya — Built Without Chaos",
    description: "Premium interior design and turnkey construction in Nepal.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const ldJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "House of Shakya",
  description: "Premium interior design and turnkey construction studio based in Nepal.",
  address: { "@type": "PostalAddress", addressLocality: "Lalitpur", addressCountry: "NP" },
  areaServed: "Nepal",
  url: "https://houseofshakya.com",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <IntroOverlay />
        <SideNav />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </body>
    </html>
  );
}
