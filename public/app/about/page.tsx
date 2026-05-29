import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import WhyUs from "../_components/site/WhyUs";
import CTABanner from "../_components/site/CTABanner";
import Reveal from "../_components/site/Reveal";
import Counter from "../_components/site/Counter";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";

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

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        breadcrumb="Home / About"
        title={`${banner?.title}`}
        description={`${banner?.subTitle}`}
        imageUrl={`${IMAGE_BASE_URL}${banner?.image}`}
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep mb-6">
                  Our Mission
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base text-navy/60 leading-relaxed mb-4">
                  To develop institutional-quality residential properties in
                  Pokhara that provide buyers with lasting value, legal
                  security, and a genuine sense of home — while helping
                  investors participate in Nepal's most promising real estate
                  market.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-base text-navy/60 leading-relaxed">
                  We believe that access to well-planned, properly documented
                  housing is a right — not a privilege. Every project we
                  undertake is guided by that conviction.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep mb-6">
                  Our Vision
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-base text-navy/60 leading-relaxed mb-4">
                  To become Nepal's leading integrated real estate developer —
                  known internationally for quality, transparency, and the
                  creation of communities that endure.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-base text-navy/60 leading-relaxed">
                  Pokhara is one of South Asia's most spectacular and
                  fastest-growing cities. We intend to shape it responsibly —
                  one well-planned development at a time.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 24, suffix: "+", label: "Projects Delivered" },
              { value: 480, suffix: "+", label: "Homes Created" },
              { value: 120, suffix: " Ropani", label: "Land Developed" },
              { value: 11, suffix: " Yrs", label: "Industry Experience" },
            ].map((stat) => (
              <Reveal key={stat.label}>
                <p
                  className="text-4xl font-bold text-cream mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs uppercase tracking-widest text-cream/40">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <CTABanner />
    </>
  );
}
