import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import Services from "../_components/site/Services";
import WhyUs from "../_components/site/WhyUs";
import CTABanner from "../_components/site/CTABanner";

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

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        breadcrumb="Home / Services"
        title="End-to-End Real Estate Services in Pokhara"
        description="From site acquisition and master planning to construction and investment advisory — Yours Housing delivers the full spectrum of real estate services under one roof."
      />
      <Services />
      <WhyUs />
      <CTABanner />
    </>
  );
}
