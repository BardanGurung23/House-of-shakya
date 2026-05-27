import { ShieldCheck, LayoutGrid, Briefcase, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    description: "Full legal documentation, clear pricing, and no hidden costs — every transaction is open and traceable.",
  },
  {
    icon: LayoutGrid,
    title: "Structured Development",
    description: "Master-planned communities with proper road networks, utilities, and green spaces — built to last decades.",
  },
  {
    icon: Briefcase,
    title: "Professional Execution",
    description: "Licensed engineers, architects, and project managers delivering consistent quality across every project.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Value",
    description: "Properties that appreciate steadily — thoughtfully positioned in Pokhara's highest-demand corridors.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-navy-deep relative overflow-hidden">
      {/* Radial gradient backdrop */}
      <div className="absolute inset-0 radial-backdrop pointer-events-none opacity-80" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 70% at 70% 60%, oklch(0.42 0.09 155 / 0.1), transparent 70%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-14">
          <Reveal>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 border text-cream/60 border-cream/20">
              Why Choose Us
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold text-cream max-w-lg">
              Built on Four Uncompromising Pillars
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="p-6 rounded-xl border transition-all duration-200 hover:border-forest/40"
                style={{
                  borderColor: "oklch(0.97 0.012 90 / 0.08)",
                  background: "oklch(0.97 0.012 90 / 0.04)"
                }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: "oklch(0.42 0.09 155 / 0.15)" }}>
                  <pillar.icon size={18} className="text-forest" />
                </div>
                <h3 className="font-semibold text-cream text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {pillar.title}
                </h3>
                <p className="text-xs text-cream/55 leading-relaxed">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
