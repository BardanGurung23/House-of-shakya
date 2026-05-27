import type { Metadata } from "next";
import HeroSection from "./components/site/HeroSection";
import AboutPreview from "./components/site/AboutPreview";
import Properties from "./components/site/Properties";
import ProjectsBento from "./components/site/ProjectsBento";
import Services from "./components/site/Services";
import WhyUs from "./components/site/WhyUs";
import CTABanner from "./components/site/CTABanner";

export const metadata: Metadata = {
  title: "Yours Housing | Premium Real Estate Development in Pokhara, Nepal",
  description: "Yours Housing — Building trust, creating homes, shaping Nepal's future. Premium villas, apartments and land development in Pokhara.",
  openGraph: {
    title: "Yours Housing | Premium Real Estate in Pokhara",
    description: "Building trust. Creating homes. Shaping Nepal's future of housing.",
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
