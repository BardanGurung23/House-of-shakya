import { hexToRgba } from "@/utils/color";
import Reveal from "./Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  eyebrowVariant?: "forest" | "gold" | "cream" | "white";
  title: string;
  description?: string;
  breadcrumb?: string;
  imageUrl?: string | null;
  overlayColor?: string | null;
  overlayOpacity?: number | string | null;
  overlayDirection?: string | null;
}

const eyebrowVariants: Record<
  NonNullable<PageHeaderProps["eyebrowVariant"]>,
  string
> = {
  forest: "text-forest border-forest/40 bg-forest/10",
  gold: "text-gold border-gold/40 bg-gold/10",
  cream: "text-cream border-cream/30 bg-cream/10",
  white: "text-white border-white/30 bg-white/10",
};

export default function PageHeader({
  eyebrow,
  eyebrowVariant = "forest",
  title,
  description,
  breadcrumb,
  imageUrl,
  overlayColor,
  overlayOpacity,
  overlayDirection,
}: PageHeaderProps) {
  const bannerOverlayColor = hexToRgba(overlayColor, overlayOpacity);
  const bannerOverlayDirection = overlayDirection?.trim() || "to right";

  return (
    <section
      className="bg-navy-deep pt-28 pb-20 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${bannerOverlayDirection}, ${bannerOverlayColor}, transparent 80%)`,
        }}
      />
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
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-5 border ${eyebrowVariants[eyebrowVariant]}`}
            >
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
