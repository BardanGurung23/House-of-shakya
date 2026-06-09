import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  Check,
  MapPin,
  Ruler,
} from "lucide-react";
import Reveal from "@/app/_components/site/Reveal";
import { isVideoPath } from "@/utils/media";
import ListingGallery, {
  type ListingMedia,
} from "../enova-villa/ListingGallery";

type BannerMedia = {
  url: string;
  type: "image" | "video";
  alt: string;
};

const project = {
  eyebrow: "Project Details",
  title: "Sundar Heights Residence",
  location: "Sarangkot, Pokhara",
  price: "Rs. 3.8 Cr",
  summary:
    "A hillside residential project shaped around open views, calm interiors, and practical everyday comfort.",
  banner: {
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    type: "image",
    alt: "Sundar Heights Residence exterior",
  } satisfies BannerMedia,
  details: [
    { label: "Bedrooms", value: "04", icon: BedDouble },
    { label: "Bathrooms", value: "03", icon: Bath },
    { label: "Area", value: "2,400 sq.ft", icon: Ruler },
    { label: "Parking", value: "02", icon: Car },
  ],
  facts: [
    { label: "Project Type", value: "Premium Villa" },
    { label: "Status", value: "On Going" },
    { label: "Completion", value: "2027" },
    { label: "View", value: "Lake & Mountain" },
  ],
  highlights: [
    "Wide frontage with private driveway and garden approach",
    "Open-plan living connected to a covered outdoor terrace",
    "Large glazing positioned for natural light and mountain views",
    "Dedicated parking, storage, and service access",
  ],
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      alt: "Modern bedroom interior",
      type: "image",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      alt: "Luxury living room",
      type: "image",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      alt: "Open-plan dining area",
      type: "image",
    },
    {
      src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
      alt: "Villa front elevation",
      type: "image",
    },
    {
      src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=85",
      alt: "Residential terrace",
      type: "image",
    },
  ] satisfies ListingMedia[],
};

export const metadata: Metadata = {
  title: `${project.title} | Project Details`,
  description: project.summary,
};

const isBannerVideo = (media: BannerMedia) => {
  return media.type === "video" || isVideoPath(media.url);
};

const HeroBanner = ({ media }: { media: BannerMedia }) => {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-navy-deep pt-24 text-cream">
      {isBannerVideo(media) ? (
        <video
          src={media.url}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={media.url}
          alt={media.alt}
          className="absolute inset-0 h-full w-full object-cover"
          width={1800}
          height={1100}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.18 0.05 255 / 0.92) 0%, oklch(0.18 0.05 255 / 0.45) 55%, oklch(0.18 0.05 255 / 0.18) 100%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[calc(78vh-6rem)] max-w-7xl flex-col justify-end px-6 pb-12 lg:px-8">
        <Reveal>
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-cream/75 hover:text-cream"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
          <span className="inline-block rounded-full border border-cream/25 bg-cream/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cream/80">
            {project.eyebrow}
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-sm text-cream/75">
            <MapPin size={16} />
            {project.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default function StaticProjectBannerDetailPage() {
  return (
    <main className="bg-background">
      <HeroBanner media={project.banner} />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <Reveal>
            <p className="text-2xl font-semibold text-forest">
              {project.price}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-navy-deep">
              Details
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-navy/65">
              {project.summary} Designed as a quiet residential address, the
              project combines strong architectural lines with warm materials,
              usable terraces, and a layout that keeps privacy and views in
              balance.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.details.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-lg border border-navy/10 bg-cream p-4"
                  >
                    <Icon className="text-forest" size={18} />
                    <p className="mt-4 text-xs text-navy/45">{item.label}</p>
                    <p className="mt-1 font-semibold text-navy-deep">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-navy-deep">
                Project Highlights
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-navy/65"
                  >
                    <Check className="mt-1 text-forest" size={16} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <aside className="rounded-lg border border-navy/10 bg-cream p-5 shadow-card lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold text-navy-deep">
              Project Facts
            </h3>
            <div className="mt-4 divide-y divide-navy/10">
              {project.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-navy/50">{fact.label}</span>
                  <span className="font-semibold text-navy-deep">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded bg-navy-deep px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest"
            >
              Enquire Now
            </Link>
          </aside>
        </Reveal>
      </section>

      <section className="border-t border-navy/10 bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <span className="inline-block rounded-full border border-forest/30 bg-forest/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-forest">
              Gallery
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-navy-deep">
              Visual Walkthrough
            </h2>
          </Reveal>
          <div className="mt-8">
            <Reveal delay={0.1}>
              <ListingGallery images={project.gallery} />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
