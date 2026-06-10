import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);

  if (!p) return {};

  return {
    title: `${p.title} — ${p.category} project in ${p.location} | House of Shakya`,
    description: `${p.concept} A ${p.category.toLowerCase()} project in ${p.location} delivered turnkey by House of Shakya.`,
    openGraph: {
      title: `${p.title} — House of Shakya`,
      description: p.concept,
      images: [p.cover],
    },
    twitter: {
      card: "summary_large_image",
      images: [p.cover],
    },
  };
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <section className="relative h-[100svh] overflow-hidden bg-ink">
        <img src={p.cover} alt={p.title} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
        <div className="absolute inset-0 vignette" />
        <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-20">
          <Reveal>
            <div className="eyebrow mb-4">{p.category} · {p.year}</div>
            <h1 className="font-display text-6xl md:text-9xl font-light leading-[0.9] text-balance">{p.title}</h1>
            <div className="mt-6 text-muted-foreground">{p.location}</div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 border-t border-border">
        <div className="container-luxe grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:sticky md:top-32 self-start space-y-8">
            <div>
              <div className="eyebrow mb-2">Type</div>
              <div className="font-display text-2xl">{p.category}</div>
            </div>
            <div>
              <div className="eyebrow mb-2">Location</div>
              <div className="font-display text-2xl">{p.location}</div>
            </div>
            <div>
              <div className="eyebrow mb-2">Year</div>
              <div className="font-display text-2xl">{p.year}</div>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="eyebrow mb-4">Concept</div>
            <p className="font-display text-3xl md:text-4xl font-light leading-snug text-balance">{p.concept}</p>

            <div className="mt-16 grid sm:grid-cols-2 gap-8">
              <div>
                <div className="eyebrow mb-3 text-gold">Problem</div>
                <p className="text-muted-foreground">{p.problem}</p>
              </div>
              <div>
                <div className="eyebrow mb-3 text-gold">Solution</div>
                <p className="text-muted-foreground">{p.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-luxe space-y-6">
          {p.gallery.map((g, i) => (
            <Reveal key={g} delay={i * 0.06}>
              <div className={`relative overflow-hidden bg-muted ${i === 0 ? "aspect-[16/9]" : i === 1 ? "aspect-[4/5] md:w-2/3" : "aspect-[16/9]"}`}>
                <img src={g} alt={`${p.title} — ${i + 1}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-32 bg-ink border-t border-border">
        <div className="container-luxe">
          <div className="eyebrow mb-8">Render vs reality</div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={p.gallery[0]} alt="render" className="absolute inset-0 h-full w-full object-cover grayscale" loading="lazy" />
              <span className="absolute bottom-4 left-4 eyebrow text-white">Render</span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={p.cover} alt="actual" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <span className="absolute bottom-4 left-4 eyebrow text-gold">Built</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-luxe">
          <div className="eyebrow mb-8">Highlights</div>
          <ul className="grid md:grid-cols-3 gap-px bg-border">
            {p.highlights.map((h) => (
              <li key={h} className="bg-background p-10 font-display text-2xl">{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-32 bg-ink border-t border-border">
        <div className="container-luxe flex flex-col md:flex-row items-end justify-between gap-10">
          <div>
            <div className="eyebrow mb-4">Next project</div>
            <Link href={`/projects/${next.slug}`} className="font-display text-5xl md:text-7xl font-light hover:text-gold transition">
              {next.title} →
            </Link>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-foreground text-ink px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold transition">
            Start a similar project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
