import Link from "next/link";
import Reveal from "./Reveal";

export default function CTABanner() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "var(--gradient-brand)" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--cream) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <Reveal>
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-6 border border-cream/30 text-cream/80">
            Get in Touch
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-cream leading-tight">
            Planning to invest, build <br /> or relocate ?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-base md:text-lg opacity-75 text-cream max-w-xl mx-auto">
            Our team of experts will guide you through every step — from site
            selection to handover.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 text-sm font-semibold rounded bg-cream text-navy-deep hover:bg-gold transition-all duration-200"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3.5 text-sm font-semibold rounded border border-cream/40 text-cream hover:border-cream hover:bg-cream/10 transition-all duration-200"
            >
              View Our Projects
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
