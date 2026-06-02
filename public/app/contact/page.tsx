import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import ContactForm from "../_components/site/ContactForm";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Yours Housing in Pokhara. Schedule a consultation, enquire about a property, or visit our New Road office.",
  openGraph: {
    title: "Contact Yours Housing | Pokhara Real Estate",
    description:
      "Schedule a consultation with Nepal's premier real estate developer.",
  },
};

export default async function ContactPage() {
  const response = await getData("banner/contact-banner");
  const contactresponse = await getData("company-setting");

  const contactdata = contactresponse?.data;
  const aboutbanner = response?.data?.bannerItems;
  const banner = Array.isArray(aboutbanner) ? aboutbanner[0] : null;
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        breadcrumb="Home / Contact"
        title={`${banner?.title}`}
        description={`${banner?.subTitle}`}
        imageUrl={`${IMAGE_BASE_URL}${banner?.image}`}
        overlayType={banner?.overlayType}
        overlayColor={banner?.overlayColor}
        overlayOpacity={banner?.overlayOpacity}
        overlayDirection={banner?.overlayDirection}
      />
      <ContactForm contact={contactdata} />
    </>
  );
}
