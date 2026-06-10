import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects — House of Shakya | Interior & Construction Portfolio Nepal",
  description:
    "Selected hospitality, residential and commercial projects by House of Shakya — interior design and turnkey construction across Nepal.",
  openGraph: {
    title: "Projects — House of Shakya",
    description: "Selected interior and construction projects across Nepal.",
  },
};

export default function ProjectsIndex() {
  return (
    <>
      <section className="pt-40 pb-20 border-b border-border">
        <div className="container-luxe">
          <div className="eyebrow mb-6">Index · {projects.length} projects</div>
          <h1 className="font-display text-6xl md:text-8xl font-light">Portfolio.</h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A selection of recent hospitality, residential and commercial work — each
            delivered turnkey, where design met execution.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1} className={i % 3 === 0 ? "md:col-span-2" : ""}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className={`relative overflow-hidden bg-muted ${i % 3 === 0 ? "aspect-[21/9]" : "aspect-[4/5]"}`}>
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between mt-5">
                  <div>
                    <div className="font-display text-3xl">{p.title}</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">
                      {p.category} · {p.location}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
