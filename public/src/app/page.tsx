"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/site/Reveal";

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="https://cdn.coverr.co/videos/coverr-an-empty-luxury-room-7715/1080p.mp4"
        poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
      <div className="absolute inset-0 vignette" />
      <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="eyebrow mb-6">Interior Design · Turnkey Construction · Nepal</div>
          <h1 className="font-display text-[14vw] md:text-[8vw] leading-[0.9] font-light text-balance">
            Built without<br /><em className="text-gold not-italic">chaos.</em>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground">
            A studio for clients who expect the finished space to look exactly like the
            drawing — delivered on time, without excuses.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-foreground text-ink px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold transition-colors"
            >
              Start a consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/projects" className="text-xs uppercase tracking-[0.3em] border-b border-border pb-1 hover:border-gold hover:text-gold transition">
              See our work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = projects.slice(0, 6);
  return (
    <section className="bg-background py-32">
      <div className="container-luxe">
        <Reveal className="flex items-end justify-between mb-16">
          <div>
            <div className="eyebrow mb-4">Selected works · 2023—2024</div>
            <h2 className="font-display text-5xl md:text-7xl font-light">Where design<br />meets execution.</h2>
          </div>
          <Link href="/projects" className="hidden md:inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] hover:text-gold">
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {featured.map((p, i) => {
            const span = i % 5 === 0 ? "md:col-span-8" : i % 5 === 1 ? "md:col-span-4" : i % 5 === 2 ? "md:col-span-4" : i % 5 === 3 ? "md:col-span-4" : "md:col-span-4";
            const tall = i === 0 || i === 4;
            return (
              <Reveal key={p.slug} delay={i * 0.06} className={span}>
                <Link href={`/projects/${p.slug}`} className="group block">
                  <div className={`relative overflow-hidden bg-muted ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-700" />
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white">
                        View project <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between mt-4">
                    <div>
                      <div className="font-display text-2xl">{p.title}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                        {p.category} · {p.location}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const lines = [
    { kicker: "01", h: "Design that matches execution.", p: "Every drawing has a plan to become real. We protect that intent through every trade." },
    { kicker: "02", h: "Professional coordination.", p: "One studio, one PM, one accountable team. No blame ping-pong between contractors." },
    { kicker: "03", h: "Delivered on time, every time.", p: "Critical path planning, weekly walkthroughs, locked material library — chaos engineered out." },
  ];
  return (
    <section className="bg-ink py-32 border-t border-border">
      <div className="container-luxe grid md:grid-cols-3 gap-16">
        {lines.map((l, i) => (
          <Reveal key={l.kicker} delay={i * 0.1}>
            <div className="font-mono text-xs text-gold mb-6">— {l.kicker}</div>
            <h3 className="font-display text-3xl md:text-4xl font-light text-balance">{l.h}</h3>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">{l.p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "I", t: "Consultation", d: "We listen, walk the site, scope the brief and lock the budget envelope." },
    { n: "II", t: "Design", d: "Concept, materials, drawings, 3D — signed off before a single nail." },
    { n: "III", t: "Execution", d: "Single point accountability. Weekly walkthroughs. Live snag log." },
    { n: "IV", t: "Delivery", d: "Handover with documentation, defect-free, ready to live or trade." },
  ];
  return (
    <section className="bg-background py-32 border-t border-border">
      <div className="container-luxe">
        <Reveal className="mb-20 max-w-2xl">
          <div className="eyebrow mb-4">The process</div>
          <h2 className="font-display text-5xl md:text-6xl font-light">Four phases.<br />Zero surprises.</h2>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-px bg-border">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="bg-background p-10 min-h-[260px] flex flex-col justify-between">
              <div className="font-display text-5xl text-gold">{s.n}</div>
              <div>
                <div className="font-display text-2xl mb-2">{s.t}</div>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative bg-ink py-40 overflow-hidden border-t border-border">
      <img
        src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="lazy"
      />
      <div className="absolute inset-0 vignette" />
      <div className="container-luxe relative z-10 text-center max-w-3xl mx-auto">
        <Reveal>
          <div className="eyebrow mb-6">Now booking · 2025—2026</div>
          <h2 className="font-display text-5xl md:text-7xl font-light text-balance">
            Start your project<br /><em className="text-gold not-italic">consultation.</em>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            We accept a limited number of hospitality and residential commissions each year.
          </p>
          <Link href="/contact" className="mt-10 inline-flex items-center gap-3 bg-foreground text-ink px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold transition">
            Begin <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Manifesto />
      <Process />
      <CTA />
    </>
  );
}
