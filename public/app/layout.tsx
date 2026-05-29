import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/site/Navbar";
import Footer from "./_components/site/Footer";
import { getData } from "@/utils/apiHandle";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default:
      "Yours Housing | Premium Real Estate Development in Pokhara, Nepal",
    template: "%s | Yours Housing",
  },
  description:
    "Yours Housing — Pokhara's premier real estate developer. Premium villas, apartments, and land development projects across Lakeside, Sedi, Begnas, and Sarangkot.",
  openGraph: {
    title: "Yours Housing | Premium Real Estate Development in Pokhara",
    description:
      "Building trust. Creating homes. Shaping Nepal's future of housing.",
    type: "website",
    locale: "en_NP",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Yours Housing",
  address: {
    "@type": "PostalAddress",
    streetAddress: "New Road",
    addressLocality: "Pokhara",
    postalCode: "33700",
    addressCountry: "NP",
  },
  email: "sales@yourshousing.com",
  telephone: "+977-9869028924",
  areaServed: "Pokhara, Gandaki Province, Nepal",
  url: "https://yourshousing.com",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await getData("company-setting");
  const settingsdata = response?.data;
  console.log("settings", settingsdata);
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer settings={settingsdata} />
      </body>
    </html>
  );
}
