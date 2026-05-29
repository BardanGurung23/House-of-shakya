import type { Metadata } from "next";
import Hero from "./_components/Hero";
import AboutPreview from "./_components/site/AboutPreview";
import Properties from "./_components/Properties";
import Projects from "./_components/Projects/index";
import Services from "./_components/site/Services";
import WhyUs from "./_components/site/WhyUs";
import CTABanner from "./_components/site/CTABanner";

export const metadata: Metadata = {
  title: "Yours Housing | Premium Real Estate Development in Pokhara, Nepal",
  description:
    "Yours Housing — Building trust, creating homes, shaping Nepal's future. Premium villas, apartments and land development in Pokhara.",
  openGraph: {
    title: "Yours Housing | Premium Real Estate in Pokhara",
    description:
      "Building trust. Creating homes. Shaping Nepal's future of housing.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Properties limit={6} showHeader={true} />
      <Projects />
      <Services />
      <WhyUs />
      <CTABanner />
    </>
  );
}
