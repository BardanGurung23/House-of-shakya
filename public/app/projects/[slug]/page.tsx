import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Check,
  Dumbbell,
  Heart,
  Home,
  MapPin,
  Phone,
  Ruler,
  School,
  Share2,
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
import ListingGallery, { type ListingMedia } from "../enova-villa/ListingGallery";
import { Location } from "./_components/location";

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
  googleMapURL: string;
  address?: string | null;
  description: string;
  overview?: string | null;
  price?: number | string | null;
  status?: string | null;
  size?: string | null;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  parking?: number | string | null;
  view?: string | null;
  yearBuilt?: number | string | null;
  completionDate?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
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
];

const propertyCards = [
  {
    price: "$468,000",
    title: "Greystone Villa",
    beds: "04",
    baths: "03",
    size: "1,506 sq.ft",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=85",
  },
  {
    price: "$225,000",
    title: "Palm Court",
    beds: "03",
    baths: "02",
    size: "1,426 sq.ft",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=85",
  },
  {
    price: "$419,900",
    title: "Hillside Manor",
    beds: "04",
    baths: "02",
    size: "2,009 sq.ft",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=85",
  },
];

const guides = [
  "Belmont Projects Closes Ultra-Prime Sale in Sella Melrose",
  "Menorca: The Mediterranean's Top Luxury Investment",
  "Promora: Five Decades of Madrid Expertise",
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

const getAgentName = (agent?: ProjectAgent | null) => {
  const name = [agent?.firstName, agent?.lastName].filter(Boolean).join(" ");
  return name || agent?.email || "Yours Housing";
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
  const agentName = getAgentName(project.agent);
  const agentImage = project.agent?.imageUrl
    ? `${IMAGE_BASE_URL}${project.agent.imageUrl}`
    : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=220&q=85";
  const facts = [
    { label: "Property Type", value: project.type },
    { label: "Year Built", value: project.yearBuilt || "-" },
    { label: "Property Size", value: project.size || "-" },
    { label: "Status", value: project.status || "-" },
  ];
  const specs = [
    { label: "Bedrooms", value: project.bedrooms || "-", icon: BedDouble },
    { label: "Bathrooms", value: project.bathrooms || "-", icon: Bath },
    { label: "Area", value: project.size || "-", icon: Ruler },
    { label: "Parking", value: project.parking || "-", icon: Car },
  ];
  const features = project.features?.length
    ? project.features.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : [
        { id: 1, title: "Terrace", icon: "terrace" },
        { id: 2, title: "Pool", icon: "pool" },
        { id: 3, title: "Garden Room", icon: "garden" },
        { id: 4, title: "Secure Access", icon: "security" },
      ];
  const nearbyPlaces =
    project.nearbyPlaces?.sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    ) || [];
  const address = project.address || project.location;
  const location = project.location;
  const googleMapURL = project.googleMapURL;

  console.log("map", googleMapURL);
  return (
    <main className="bg-background">
      <section className="border-b border-navy/10 bg-background pt-24">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-navy/55">
            <Link href="/projects" className="hover:text-forest">
              Back to search results
            </Link>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-full border border-navy/10 px-3 py-1.5 hover:border-forest">
                <Share2 size={14} />
                Share
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-navy/10 px-3 py-1.5 hover:border-forest">
                <Heart size={14} />
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Reveal>
          <ListingGallery images={gallery} />
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 lg:grid-cols-[1fr_340px] lg:px-8">
        <div>
          <Reveal>
            <p className="text-2xl font-semibold text-navy-deep md:text-3xl">
              {formatPrice(project.price)}
            </p>
            <h1 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight text-navy-deep md:text-4xl">
              {project.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-navy/60">
              <MapPin size={16} />
              {address}
            </p>
            <div className="mt-5 flex flex-wrap gap-5 border-b border-navy/10 pb-6 text-sm text-navy/65">
              {specs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <span
                    key={spec.label}
                    className="inline-flex items-center gap-2"
                  >
                    <Icon size={16} />
                    {spec.value} {spec.label}
                  </span>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="border-b border-navy/10 py-8">
              <h2 className="text-2xl font-semibold text-navy-deep">
                About the Property
              </h2>
              <p className="mt-4 text-sm leading-7 text-navy/65">
                {project.overview || project.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-navy/65">
                {project.description}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <p className="text-xs text-navy/45">{fact.label}</p>
                    <p className="mt-1 font-semibold text-navy-deep">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.15}>
            <section className="border-b border-navy/10 py-8">
              <h2 className="text-2xl font-semibold text-navy-deep">
                Features
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {features.map((feature) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div
                      key={feature.id || feature.title}
                      className="flex items-center gap-3 text-sm text-navy/70"
                    >
                      <Icon size={16} className="text-forest" />
                      {feature.title}
                    </div>
                  );
                })}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.2}>
            <section className="border-b border-navy/10 py-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-navy-deep">
                    Explore the Area
                  </h2>
                  <p className="mt-1 text-sm text-navy/55">{address}</p>
                </div>
                <button className="rounded-full border border-navy/10 px-4 py-2 text-sm font-semibold hover:border-forest">
                  Request exact location
                </button>
              </div>
              <Location link={googleMapURL} />

              {nearbyPlaces.length > 0 && (
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
              )}
            </section>
          </Reveal>

          <Reveal delay={0.25}>
            <section className="py-8">
              <h2 className="text-2xl font-semibold text-navy-deep">
                Similar Properties Nearby
              </h2>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {propertyCards.map((card) => (
                  <article
                    key={card.title}
                    className="overflow-hidden rounded-lg border border-navy/10 bg-cream"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-44 w-full object-cover"
                      width={500}
                      height={320}
                      loading="lazy"
                    />
                    <div className="p-4">
                      <p className="text-lg font-semibold text-navy-deep">
                        {card.price}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-navy/55">
                        <span>{card.beds} Beds</span>
                        <span>{card.baths} Baths</span>
                        <span>{card.size}</span>
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-navy-deep">
                        {card.title}
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          <Reveal delay={0.1}>
            <div className="rounded-lg border border-navy/10 bg-cream p-5 shadow-card">
              <div className="flex items-center gap-3">
                <img
                  src={agentImage}
                  alt={agentName}
                  className="h-14 w-14 rounded-full object-cover"
                  width={96}
                  height={96}
                />
                <div>
                  <p className="font-semibold text-navy-deep">{agentName}</p>
                  <p className="text-xs text-navy/50">Listing Agent</p>
                </div>
              </div>
              <form className="mt-5 space-y-3">
                {["Full name", "Email address", "Phone"].map((label) => (
                  <label key={label} className="block">
                    <span className="mb-1 block text-xs font-semibold text-navy/50">
                      {label}
                    </span>
                    <input className="w-full rounded border border-navy/10 bg-background px-3 py-2 text-sm outline-none focus:border-forest" />
                  </label>
                ))}
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-navy/50">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    defaultValue={`Hello, I would like to know more about ${project.name}.`}
                    className="w-full resize-none rounded border border-navy/10 bg-background px-3 py-2 text-sm outline-none focus:border-forest"
                  />
                </label>
                <button
                  type="button"
                  className="w-full rounded bg-navy-deep px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest"
                >
                  Send Message
                </button>
              </form>
              <Link
                href="/contact"
                className="mt-3 flex items-center justify-center gap-2 rounded border border-navy/10 px-4 py-3 text-sm font-semibold text-navy-deep hover:border-forest"
              >
                <Phone size={15} />
                {project.agent?.mobileNo || "Call Now"}
              </Link>
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="border-t border-navy/10 bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-semibold text-navy-deep">
              Explore More Homes for Sale
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {[
              `${project.location} property types`,
              `${project.type} architecture`,
              "Real estate buyer resources",
            ].map((title) => (
              <Reveal key={title}>
                <div>
                  <h3 className="font-semibold text-navy-deep">{title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-navy/60">
                    <li className="flex gap-2">
                      <Check size={15} className="mt-0.5 text-forest" />
                      Premium homes with practical outdoor areas
                    </li>
                    <li className="flex gap-2">
                      <Check size={15} className="mt-0.5 text-forest" />
                      Projects close to schools, services, and transport
                    </li>
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-semibold text-navy-deep">
              Related Guides & Stories
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {guides.map((guide, index) => (
              <Reveal key={guide} delay={index * 0.08}>
                <article className="overflow-hidden rounded-lg border border-navy/10 bg-cream">
                  <img
                    src={propertyCards[index]?.image}
                    alt={guide}
                    className="h-44 w-full object-cover"
                    width={600}
                    height={360}
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-navy-deep">{guide}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy/60">
                      Market notes and buyer guidance for premium residential
                      decisions.
                    </p>
                    <p className="mt-4 text-xs font-semibold text-forest">
                      Read post
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
