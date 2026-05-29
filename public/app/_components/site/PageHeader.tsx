import Reveal from "./Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: string;
  imageUrl?: string | null;
}
export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  imageUrl,
}: PageHeaderProps) {
  return (
    <section
      className="bg-navy-deep pt-28 pb-20 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      <div className="absolute inset-0 bg-navy-deep/75 pointer-events-none" />
      {/* Radial backdrop */}
      <div className="absolute inset-0 radial-backdrop pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, oklch(0.42 0.09 155 / 0.08), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {breadcrumb && (
          <Reveal>
            <p
              className="text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: "var(--gold)" }}
            >
              {breadcrumb}
            </p>
          </Reveal>
        )}
        {eyebrow && (
          <Reveal delay={0.05}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-5 text-forest border border-forest/40 bg-forest/10">
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-cream max-w-2xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.2}>
            <p className="mt-5 text-base md:text-lg leading-relaxed opacity-70 max-w-xl text-cream">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
