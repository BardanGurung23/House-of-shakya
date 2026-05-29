import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import Services from "../_components/site/Services";
import WhyUs from "../_components/site/WhyUs";
import CTABanner from "../_components/site/CTABanner";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Yours Housing offers real estate development, housing projects, land planning, and investment opportunities across Pokhara, Nepal.",
  openGraph: {
    title: "Services | Yours Housing Pokhara",
    description:
      "From raw land to finished homes — every real estate service you need in Pokhara.",
  },
};

export default async function ServicesPage() {
  const response = await getData("banner/services-banner");
  const aboutbanner = response?.data?.bannerItems;
  const banner = Array.isArray(aboutbanner) ? aboutbanner[0] : null;
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        breadcrumb="Home / Services"
        title={`${banner?.title}`}
        description={`${banner?.subTitle}`}
        imageUrl={`${IMAGE_BASE_URL}${banner?.image}`}
      />
      <Services />
      <WhyUs />
      <CTABanner />
    </>
  );
}
