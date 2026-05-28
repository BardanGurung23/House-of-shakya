import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import ContactForm from "../_components/site/ContactForm";

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

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        breadcrumb="Home / Contact"
        title="Let's Start a Conversation"
        description="Whether you're planning to invest, purchase, or simply want to learn more — our team is here to help you navigate the journey."
      />
      <ContactForm />
    </>
  );
}
