import type { Metadata } from "next";
import Hero from "./_components/Hero";
import AboutPreview from "./_components/site/AboutPreview";
import Properties from "./_components/Properties";
import Projects from "./_components/Projects/index";
import Services from "./_components/site/Services";
import WhyUs from "./_components/site/WhyUs";
import CTABanner from "./_components/site/CTABanner";
import { getData } from "@/utils/apiHandle";
import { getCompanyStats } from "@/utils/companyStats";
import { getSeoMetadata } from "@/utils/seo";

const fallbackMetadata: Metadata = {
  title: "Yours Housing | Premium Real Estate Development in Pokhara, Nepal",
  description:
    "Yours Housing — Building trust, creating homes, shaping Nepal's future. Premium villas, apartments and land development in Pokhara.",
  openGraph: {
    title: "Yours Housing | Premium Real Estate in Pokhara",
    description:
      "Building trust. Creating homes. Shaping Nepal's future of housing.",
  },
};

export const generateMetadata = () => getSeoMetadata("home", fallbackMetadata);

export default async function HomePage() {
  const settingsResponse = await getData("company-setting");
  const stats = getCompanyStats(settingsResponse?.data?.stats);

  return (
    <>
      <Hero />
      <AboutPreview stats={stats} />
      <Properties limit={6} showHeader={true} />
      <Projects />
      <Services />
      <WhyUs />
      <CTABanner />
    </>
  );
}
