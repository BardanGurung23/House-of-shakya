import Reveal from "@/app/_components/site/Reveal";

export const MissionVision = () => {
  return (
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
                To transform raw land into productive, income-generating assets
                and provide transparent, secure, and profitable real estate
                solutions along with collaborations with investors and partners
                for large-scale developments.
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
                To become one of Nepal’s most trusted and innovative real estate
                development companies, creating sustainable assets with
                long-term economic value.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
