import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lexend_Deca } from "next/font/google";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "../components/BootstrapClient";
import "@fortawesome/fontawesome-free/css/all.css";
import NewFooter from "../components/footernew/newFooter";
import Header from "../components/header";
import GoogleTagManager from "../components/GoogleTagManager";
import { getData } from "../utils/apiHandle";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Tech Nirvana",
  description: "Tech Nirvana-Blogs",
  icons: { icon: "./fav.webp" },
};

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await getData("company-setting");

  return (
    <html lang="en">
      {/* <meta
        property="og:image"
        content="https://technirvana.com.np/techlogo.png"
      /> */}
      <GoogleTagManager ga_id={res.data?.google_analytics} />
      <body className={`${inter.className} ${lexendDeca.className} body-main`}>
        <Header brandingImage={res.data?.brandingImage} />
        {children}
        <NewFooter brandingFooterImage={res.data?.brandingFooterImage} />
        <BootstrapClient />
      </body>
    </html>
  );
}
