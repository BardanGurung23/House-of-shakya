import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
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
            Start your project
            <br />
            <em className="text-gold not-italic">consultation.</em>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            We accept a limited number of hospitality and residential commissions each year.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 bg-foreground text-ink px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold transition"
          >
            Begin <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
