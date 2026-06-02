import Reveal from "@/app/_components/site/Reveal";
import {
  BadgeCheck,
  Handshake,
  Leaf,
  Scale,
  ShieldCheck,
  Target,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity First",
    points: [
      "Transparent paperwork and ownership records",
      "Clear commitments before every transaction",
    ],
  },
  {
    icon: Scale,
    title: "Legal Confidence",
    points: [
      "Verified land documentation",
      "Compliance-led planning and development",
    ],
  },
  {
    icon: Target,
    title: "Purposeful Development",
    points: [
      "Projects designed for practical long-term use",
      "Infrastructure decisions made before sales promises",
    ],
  },
  {
    icon: Handshake,
    title: "Partnership Mindset",
    points: [
      "Reliable communication with buyers and investors",
      "Collaborative approach with landowners and partners",
    ],
  },
  {
    icon: Leaf,
    title: "Responsible Growth",
    points: [
      "Respect for local communities and surroundings",
      "Development choices that protect future value",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Quality Execution",
    points: [
      "Professional teams across planning and delivery",
      "Consistent standards across every project phase",
    ],
  },
];

export const OurValues = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <Reveal>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 text-forest border border-forest/30 bg-forest/5">
              Our Core Values
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep max-w-2xl">
              Principles That Guide Every Project and Partnership
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <div
                className="h-full rounded-xl border bg-cream p-6 shadow-card"
                style={{ borderColor: "oklch(0.26 0.07 258 / 0.1)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="h-11 w-11 shrink-0 rounded-lg flex items-center justify-center"
                    style={{ background: "oklch(0.42 0.09 155 / 0.1)" }}
                  >
                    <value.icon size={19} className="text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-deep text-base mb-3">
                      {value.title}
                    </h3>
                    <ul className="space-y-2">
                      {value.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2 text-sm leading-relaxed text-navy/60"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
