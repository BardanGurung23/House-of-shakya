import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/site/Reveal";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 6);
  return (
    <section className="bg-background py-32">
      <div className="container-luxe">
        <Reveal className="flex items-end justify-between mb-16">
          <div>
            <div className="eyebrow mb-4">Selected works · 2023—2024</div>
            <h2 className="font-display text-5xl md:text-7xl font-light">
              Where design
              <br />
              meets execution.
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] hover:text-gold"
          >
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {featured.map((p, i) => {
            const span =
              i % 5 === 0
                ? "md:col-span-8"
                : i % 5 === 1
                  ? "md:col-span-4"
                  : i % 5 === 2
                    ? "md:col-span-4"
                    : i % 5 === 3
                      ? "md:col-span-4"
                      : "md:col-span-4";
            const tall = i === 0 || i === 4;
            return (
              <Reveal key={p.slug} delay={i * 0.06} className={span}>
                <Link href={`/projects/${p.slug}`} className="group block">
                  <div
                    className={`relative overflow-hidden bg-muted ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}
                  >
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
