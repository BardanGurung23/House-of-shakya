import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Car,
  Check,
  Dumbbell,
  Home,
  MapPin,
  Ruler,
  School,
  ShieldCheck,
  Sparkles,
  Trees,
  Waves,
  Wifi,
} from "lucide-react";
import * as MaterialIcons from "react-icons/md";
import type { IconType } from "react-icons";
import Reveal from "@/app/_components/site/Reveal";
import { IMAGE_BASE_URL } from "@/constants";
import { getData } from "@/utils/apiHandle";
import { isVideoPath } from "@/utils/media";
import ListingGallery, {
  type ListingMedia,
} from "../enova-villa/ListingGallery";

type ProjectMedia = {
  id: number;
  image: string;
  type?: string | null;
  caption?: string | null;
  sortOrder?: number | null;
};

type ProjectFeature = {
  id: number;
  title: string;
  icon?: string | null;
  sortOrder?: number | null;
};

type NearbyPlace = {
  id: number;
  name: string;
  type?: string | null;
  distance?: string | null;
  sortOrder?: number | null;
};

type ProjectAgent = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  imageUrl?: string | null;
};

type ApiProjectDetail = {
  id: number;
  slug?: string | null;
  name: string;
  type: string;
  location: string;
  googleMapURL?: string | null;
  address?: string | null;
  description: string;
  overview?: string | null;
  bannerMedia?: string | null;
  bannerMediaType?: "image" | "video" | string | null;
  price?: number | string | null;
  status?: string | null;
  size?: string | null;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  parking?: number | string | null;
  view?: string | null;
  yearBuilt?: number | string | null;
  completionDate?: string | null;
  images?: ProjectMedia[];
  features?: ProjectFeature[];
  nearbyPlaces?: NearbyPlace[];
  agent?: ProjectAgent | null;
};

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BannerMedia = {
  url: string;
  type: "image" | "video";
  alt: string;
};

const fallbackImages: ListingMedia[] = [
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85",
    alt: "Contemporary luxury villa exterior",
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern villa bedroom",
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    alt: "Luxury villa living room",
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    alt: "Open-plan interior",
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
];

const iconMap = {
  car: Car,
  garden: Trees,
  gym: Dumbbell,
  home: Home,
  pool: Waves,
  school: School,
  security: ShieldCheck,
  smart: Wifi,
  terrace: Home,
  view: MapPin,
};

const getIcon = (key?: string | null) => {
  const normalized = key?.toLowerCase().trim() || "";
  const materialIcon = key
    ? MaterialIcons[key as keyof typeof MaterialIcons]
    : null;

  if (materialIcon) {
    return materialIcon as IconType;
  }

  return iconMap[normalized as keyof typeof iconMap] || Sparkles;
};

const formatPrice = (price?: number | string | null) => {
  if (price === null || price === undefined || price === "") {
    return "Price on request";
  }

  return `Rs. ${price}`;
};

const getProject = async (slug: string) => {
  const response = await getData(`projects/slug/${slug}`);
  if (response?.data) {
    return response.data as ApiProjectDetail;
  }

  if (/^\d+$/.test(slug)) {
    const idResponse = await getData(`projects/${slug}`);
    return (idResponse?.data as ApiProjectDetail | null) || null;
  }

  return null;
};

const mapGallery = (project: ApiProjectDetail) => {
  const media = (project.images || [])
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item) => ({
      src: `${IMAGE_BASE_URL}${item.image}`,
      alt: item.caption || `${project.name} image`,
      type:
        item.type === "video" || isVideoPath(item.image)
          ? ("video" as const)
          : ("image" as const),
    }));

  return media.length > 0 ? media : fallbackImages;
};

const getHeroMedia = (project: ApiProjectDetail): BannerMedia => {
  if (project.bannerMedia) {
    return {
      url: /^https?:\/\//i.test(project.bannerMedia)
        ? project.bannerMedia
        : `${IMAGE_BASE_URL}${project.bannerMedia}`,
      type:
        project.bannerMediaType === "video" || isVideoPath(project.bannerMedia)
          ? "video"
          : "image",
      alt: `${project.name} banner`,
    };
  }

  const gallery = mapGallery(project);
  const hero = gallery[0] || fallbackImages[0];

  return {
    url: hero.src,
    type: hero.type === "video" || isVideoPath(hero.src) ? "video" : "image",
    alt: hero.alt || project.name,
  };
};

const isBannerVideo = (media: BannerMedia) => {
  return media.type === "video" || isVideoPath(media.url);
};

const HeroBanner = ({
  project,
  media,
}: {
  project: ApiProjectDetail;
  media: BannerMedia;
}) => {
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream/75 hover:text-cream"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-sm text-cream/75">
            <MapPin size={16} />
            {project.address || project.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Details",
    };
  }

  const gallery = mapGallery(project);
  const previewImage = gallery.find((item) => item.type !== "video");
  const openGraphImages = previewImage ? [previewImage.src] : undefined;

  return {
    title: `${project.name} Project Details`,
    description: project.overview || project.description,
    openGraph: {
      title: `${project.name} | Yours Housing`,
      description: project.overview || project.description,
      images: openGraphImages,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const gallery = mapGallery(project);
  const heroMedia = getHeroMedia(project);
  const details = [
    { label: "Bedrooms", value: project.bedrooms || "-", icon: BedDouble },
    { label: "Bathrooms", value: project.bathrooms || "-", icon: Bath },
    { label: "Area", value: project.size || "-", icon: Ruler },
    { label: "Parking", value: project.parking || "-", icon: Car },
  ];
  const facts = [
    { label: "Project Type", value: project.type || "-" },
    { label: "Status", value: project.status || "-" },
    { label: "Completion", value: project.completionDate || "-" },
    { label: "View", value: project.view || "-" },
  ];
  const features = project.features?.length
    ? project.features.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : [];
  const nearbyPlaces =
    project.nearbyPlaces?.sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    ) || [];

  return (
    <main className="bg-background">
      <HeroBanner project={project} media={heroMedia} />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <Reveal>
            <p className="text-2xl font-semibold text-forest">
              {formatPrice(project.price)}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-navy-deep">
              Details
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-navy/65">
              {project.overview || project.description}
            </p>
            {project.overview && (
              <p className="mt-4 max-w-3xl text-sm leading-7 text-navy/65">
                {project.description}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {details.map((item) => {
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

          {features.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-navy-deep">
                  Project Highlights
                </h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => {
                    const Icon = getIcon(feature.icon);
                    return (
                      <div
                        key={feature.id || feature.title}
                        className="flex items-start gap-3 text-sm leading-6 text-navy/65"
                      >
                        <Icon className="mt-1 text-forest" size={16} />
                        {feature.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}

          {nearbyPlaces.length > 0 && (
            <Reveal delay={0.2}>
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-navy-deep">
                  Nearby Places
                </h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {nearbyPlaces.map((item) => {
                    const Icon = getIcon(item.type);
                    return (
                      <div key={item.id} className="flex items-start gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest/10 text-forest">
                          <Icon size={15} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-navy-deep">
                            {item.name}
                          </p>
                          <p className="text-xs text-navy/50">
                            {item.distance || item.type}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.2}>
          <aside className="rounded-lg border border-navy/10 bg-cream p-5 shadow-card lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold text-navy-deep">
              Project Facts
            </h3>
            <div className="mt-4 divide-y divide-navy/10">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-4 py-3 text-sm"
                >
                  <span className="text-navy/50">{fact.label}</span>
                  <span className="text-right font-semibold text-navy-deep">
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
            <ListingGallery images={gallery} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
