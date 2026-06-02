import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import WhyUs from "../_components/site/WhyUs";
import CTABanner from "../_components/site/CTABanner";
import Reveal from "../_components/site/Reveal";
import Counter from "../_components/site/Counter";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";
import { getCompanyStats } from "@/utils/companyStats";

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
                  To transform raw land into productive, income-generating
                  assets and provide transparent, secure, and profitable real
                  estate solutions along with collaborations with investors and
                  partners for large-scale developments.
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
                  To become one of Nepal’s most trusted and innovative real
                  estate development companies, creating sustainable assets with
                  long-term economic value.
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
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <p className="text-4xl font-bold text-cream mb-2">
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
