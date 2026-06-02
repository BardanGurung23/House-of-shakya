import Reveal from "@/app/_components/site/Reveal";
import { Building2, CalendarDays, Globe2, Handshake } from "lucide-react";

const overviewFacts = [
  {
    icon: CalendarDays,
    label: "Date of Establishment",
    value: "2009/06/09 (2066/02/26 B.S.)",
  },
  {
    icon: Building2,
    label: "Nature of Business",
    value:
      "Real Estate Development, Property Trading, Investment Collaboration",
  },
  {
    icon: Globe2,
    label: "Operational Coverage",
    value: "Nationwide",
  },
  {
    icon: Handshake,
    label: "Business Model",
    value: "Ownership-based, Partnership, Rental, Lease, EMI & Joint Venture",
  },
];

export const CompanyOverview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <Reveal>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 text-forest border border-forest/30 bg-forest/5">
                Company Overview
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep mb-5">
                A Registered Real Estate and Property Development Company
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-navy/60 leading-relaxed">
                Yours Housing Pvt. Ltd. is a professionally registered real
                estate and property development company headquartered in
                Pokhara, Nepal, providing real estate services and investment
                opportunities across the country.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {overviewFacts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 0.08}>
                <div
                  className="h-full rounded-xl border bg-cream p-6 shadow-card"
                  style={{ borderColor: "oklch(0.26 0.07 258 / 0.1)" }}
                >
                  <div
                    className="mb-5 h-10 w-10 rounded-lg flex items-center justify-center"
                    style={{ background: "oklch(0.42 0.09 155 / 0.1)" }}
                  >
                    <fact.icon size={18} className="text-forest" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-2">
                    {fact.label}
                  </p>
                  <p className="text-sm leading-relaxed text-navy-deep">
                    {fact.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.25}>
          <p className="mt-10 max-w-4xl text-base leading-relaxed text-navy/60">
            With over a decade of experience, the company has evolved from
            traditional real estate trading into a multi-domain asset
            development and investment collaboration firm, focusing on high-ROI
            land development, commercial infrastructure, tourism properties, IT
            hubs, and agro-based ventures.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
