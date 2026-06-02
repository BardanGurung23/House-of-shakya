import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import WhyUs from "../_components/site/WhyUs";
import CTABanner from "../_components/site/CTABanner";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";
import { getCompanyStats } from "@/utils/companyStats";
import { MissionVision } from "./_components/Mission&Vision";
import { Stats } from "./_components/Stats";
import { OurValues } from "./_components/OurValues";
import { CompanyOverview } from "./_components/CompanyOverview";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Yours Housing — Pokhara's most trusted real estate developer, building premium homes and communities since 2013.",
  openGraph: {
    title: "About Yours Housing | Our Story & Mission",
    description:
      "11 years of building trust, creating homes, and shaping Pokhara's housing landscape.",
  },
};

export default async function AboutPage() {
  const response = await getData("banner/about-banner");
  const aboutbanner = response?.data?.bannerItems;
  const banner = Array.isArray(aboutbanner) ? aboutbanner[0] : null;
  const settingsResponse = await getData("company-setting");
  const stats = getCompanyStats(settingsResponse?.data?.stats);

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        breadcrumb="Home / About"
        eyebrowVariant="white"
        title={`${banner?.title}`}
        description={`${banner?.subTitle}`}
        imageUrl={`${IMAGE_BASE_URL}${banner?.image}`}
        overlayColor={banner?.overlayColor}
        overlayOpacity={banner?.overlayOpacity}
        overlayDirection={banner?.overlayDirection}
      />

      <CompanyOverview />
      {/* Mission & Vision */}
      <MissionVision />
      <Stats stats={stats} />
      <WhyUs />
      <OurValues />
      <CTABanner />
    </>
  );
}
