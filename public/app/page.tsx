import type { Metadata } from "next";
import HeroSection from "./_components/site/HeroSection";
import AboutPreview from "./_components/site/AboutPreview";
import Properties from "./_components/site/Properties";
import ProjectsBento from "./_components/site/ProjectsBento";
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
      <HeroSection />
      <AboutPreview />
      <Properties limit={6} showHeader={true} />
      <ProjectsBento />
      <Services />
      <WhyUs />
      <CTABanner />
    </>
  );
}
