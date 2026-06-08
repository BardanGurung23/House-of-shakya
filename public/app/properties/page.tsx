import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import WhyUs from "../_components/site/WhyUs";
import CTABanner from "../_components/site/CTABanner";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";
import PropertiesSection from "./_components/PropertySection";
import { mapProperty } from "@/utils/propertyMapper";
import { getSeoMetadata } from "@/utils/seo";

const fallbackMetadata: Metadata = {
  title: "Services",
  description:
    "Yours Housing offers real estate development, housing projects, land planning, and investment opportunities across Pokhara, Nepal.",
  openGraph: {
    title: "Services | Yours Housing Pokhara",
    description:
      "From raw land to finished homes — every real estate service you need in Pokhara.",
  },
};

export const generateMetadata = () =>
  getSeoMetadata("properties", fallbackMetadata);

export default async function ServicesPage() {
  const response = await getData("banner/services-banner");
  const aboutbanner = response?.data?.bannerItems;
  const banner = Array.isArray(aboutbanner) ? aboutbanner[0] : null;
  const propertyResponse = await getData("property/list");
  const properties = propertyResponse?.data?.data;
  const mappedProperties = Array.isArray(properties)
    ? properties.map(mapProperty)
    : [];

  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        breadcrumb="Home / Services"
        title={`${banner?.title}`}
        description={`${banner?.subTitle}`}
        imageUrl={`${IMAGE_BASE_URL}${banner?.image}`}
        overlayType={banner?.overlayType}
        overlayColor={banner?.overlayColor}
        overlayOpacity={banner?.overlayOpacity}
        overlayDirection={banner?.overlayDirection}
      />
      <PropertiesSection showHeader={false} properties={mappedProperties} />
      <WhyUs />
      <CTABanner />
    </>
  );
}
