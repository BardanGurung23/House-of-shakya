"use client";
import { Building2, Home, Map, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  {
    icon: Building2,
    title: "Real Estate Development",
    description:
      "End-to-end development of premium residential and commercial real estate — from site acquisition to construction and delivery.",
  },
  {
    icon: Home,
    title: "Housing Projects",
    description:
      "Thoughtfully designed housing communities with world-class amenities, infrastructure, and long-term livability in Pokhara.",
  },
  {
    icon: Map,
    title: "Land Planning",
    description:
      "Expert land subdivision, master planning, and infrastructure development for residential and mixed-use zones.",
  },
  {
    icon: TrendingUp,
    title: "Investment Opportunities",
    description:
      "Structured real estate investment options — from pre-launch entry to completed asset acquisition — backed by transparent documentation.",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <Reveal>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 text-forest border border-forest/30 bg-forest/5">
              What We Do
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep max-w-xl">
              A Full Spectrum of Real Estate Services
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-base text-navy/60 max-w-lg">
              From raw land to finished homes — every stage, handled with
              precision and care.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div
                className="group rounded-xl p-8 border transition-all duration-300 hover:bg-navy-deep hover:border-navy-deep cursor-default hover-lift shadow-card"
                style={{
                  borderColor: "oklch(0.26 0.07 258 / 0.12)",
                  background: "white",
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-forest/20"
                  style={{ background: "oklch(0.42 0.09 155 / 0.1)" }}
                >
                  <service.icon
                    size={20}
                    className="text-forest group-hover:text-forest"
                  />
                </div>
                <h3 className="font-semibold text-navy-deep text-lg mb-3 transition-colors duration-300 group-hover:text-cream">
                  {service.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed transition-colors duration-300 group-hover:text-cream/70">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
