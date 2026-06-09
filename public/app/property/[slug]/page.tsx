import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  Car,
  Check,
  Dumbbell,
  Heart,
  Home,
  MapPin,
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
import { mapProperty, type PropertyCard } from "@/utils/propertyMapper";
import ListingGallery, {
  type ListingMedia,
} from "./_components/ListingGallery";
import { Location } from "@/components/Location";
import PropertyEnquiryCard from "./_components/PropertyEnquiryCard";

type PropertyMedia = {
  id: number;
  image: string;
  type?: string | null;
  caption?: string | null;
  sortOrder?: number | null;
};

type PropertyFeature = {
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

type PropertyAgent = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  imageUrl?: string | null;
};

type ApiPropertyDetail = {
  id: number;
  slug?: string | null;
  name: string;
  location: string;
  googleMapURL?: string | null;
  address?: string | null;
  description?: string | null;
  overview?: string | null;
  price?: number | string | null;
  status?: string | null;
  size?: string | null;
  beds?: number | string | null;
  bath?: number | string | null;
  anna?: number | string | null;
  parking?: number | string | null;
  view?: string | null;
  yearBuilt?: number | string | null;
  completionDate?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  } | null;
  images?: PropertyMedia[];
  features?: PropertyFeature[];
  nearbyPlaces?: NearbyPlace[];
  agent?: PropertyAgent | null;
};

type PropertyDetailPageProps = {
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
  "Premium Properties Close Ultra-Prime Sale in Pokhara",
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

const getAgentName = (agent?: PropertyAgent | null) => {
  const name = [agent?.firstName, agent?.lastName].filter(Boolean).join(" ");
  return name || agent?.email || "Yours Housing";
};

const getProperty = async (slug: string) => {
  const response = await getData(`property/slug/${slug}`);
  if (response?.data) {
    return response.data as ApiPropertyDetail;
  }

  if (/^\d+$/.test(slug)) {
    const idResponse = await getData(`property/${slug}`);
    return (idResponse?.data as ApiPropertyDetail | null) || null;
  }

  return null;
};

const getPropertyRows = async (url: string) => {
  const response = await getData(url);
  return Array.isArray(response?.data?.data) ? response.data.data : [];
};

const getSimilarProperties = async (property: ApiPropertyDetail) => {
  const relatedRows = property.category?.id
    ? await getPropertyRows(
        `property/list?page=1&limit=6&propertyCategoryId=${property.category.id}`
      )
    : [];

  const latestRows =
    relatedRows.length < 4
      ? await getPropertyRows("property/list?page=1&limit=6")
      : [];

  const uniqueProperties = [...relatedRows, ...latestRows].filter(
    (item, index, list) => {
      return (
        item.id !== property.id &&
        list.findIndex((candidate) => candidate.id === item.id) === index
      );
    }
  );

  return uniqueProperties.slice(0, 3).map(mapProperty);
};

const mapGallery = (property: ApiPropertyDetail) => {
  const media = (property.images || [])
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item) => ({
      src: `${IMAGE_BASE_URL}${item.image}`,
      alt: item.caption || `${property.name} image`,
      type:
        item.type === "video" || isVideoPath(item.image)
          ? ("video" as const)
          : ("image" as const),
    }));

  return media.length > 0 ? media : fallbackImages;
};

const getPropertyCardImage = (property: PropertyCard) => {
  if (!property.image) {
    return fallbackImages[0].src;
  }

  if (/^https?:\/\//i.test(property.image)) {
    return property.image;
  }

  return `${IMAGE_BASE_URL}${property.image}`;
};

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return {
      title: "Property Details",
    };
  }

  const gallery = mapGallery(property);
  const previewImage = gallery.find((item) => item.type !== "video");
  const openGraphImages = previewImage ? [previewImage.src] : undefined;
  const description =
    property.overview ||
    property.description ||
    `${property.name} property details`;

  return {
    title: `${property.name} Property Details`,
    description,
    openGraph: {
      title: `${property.name} | Yours Housing`,
      description,
      images: openGraphImages,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  const gallery = mapGallery(property);
  const agentName = getAgentName(property.agent);
  const agentImage = property.agent?.imageUrl
    ? `${IMAGE_BASE_URL}${property.agent.imageUrl}`
    : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=220&q=85";
  const facts = [
    { label: "Property Type", value: property.category?.name || "Property" },
    { label: "Year Built", value: property.yearBuilt || "-" },
    { label: "Property Size", value: property.size || property.anna || "-" },
    { label: "Status", value: property.status || "-" },
  ];
  const specs = [
    { label: "Bedrooms", value: property.beds || "-", icon: BedDouble },
    { label: "Bathrooms", value: property.bath || "-", icon: Bath },
    {
      label: "Area",
      value: property.size || (property.anna ? `${property.anna} Anna` : "-"),
      icon: Ruler,
    },
    { label: "Parking", value: property.parking || "-", icon: Car },
  ];
  const features = property.features?.length
    ? property.features.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : [
        { id: 1, title: "Terrace", icon: "terrace" },
        { id: 2, title: "Pool", icon: "pool" },
        { id: 3, title: "Garden Room", icon: "garden" },
        { id: 4, title: "Secure Access", icon: "security" },
      ];
  const nearbyPlaces =
    property.nearbyPlaces?.sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    ) || [];
  const address = property.address || property.location;
  const googleMapURL = property.googleMapURL;
  const description =
    property.description || "Contact us to learn more about this property.";
  const similarProperties = await getSimilarProperties(property);

  return (
    <main className="bg-background">
      <section className="border-b border-navy/10 bg-background pt-24">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-navy/55">
            <Link href="/properties" className="hover:text-forest">
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
              {formatPrice(property.price)}
            </p>
            <h1 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight text-navy-deep md:text-4xl">
              {property.name}
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
                {property.overview || description}
              </p>
              <p className="mt-4 text-sm leading-7 text-navy/65">
                {description}
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
              {googleMapURL ? (
                <Location link={googleMapURL} />
              ) : (
                <div className="mt-5 rounded-lg border border-navy/10 bg-cream px-5 py-8 text-sm text-navy/55">
                  Map location is not available for this property yet.
                </div>
              )}

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
              {similarProperties.length > 0 ? (
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {similarProperties.map((card) => (
                    <Link
                      href={`/property/${card.slug}`}
                      key={card.id}
                      className="group overflow-hidden rounded-lg border border-navy/10 bg-cream transition-transform duration-200 hover:-translate-y-1"
                    >
                      <div className="h-44 overflow-hidden">
                        <img
                          src={getPropertyCardImage(card)}
                          alt={card.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          width={500}
                          height={320}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-semibold text-navy-deep">
                          {card.price}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-navy/55">
                          {card.beds > 0 && <span>{card.beds} Beds</span>}
                          {card.baths > 0 && <span>{card.baths} Baths</span>}
                          <span>{card.area}</span>
                        </div>
                        <h3 className="mt-3 text-sm font-semibold text-navy-deep group-hover:text-forest">
                          {card.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-xs text-navy/50">
                          <MapPin size={11} />
                          {card.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-lg border border-navy/10 bg-cream px-5 py-8 text-sm text-navy/55">
                  No similar properties available yet.
                </div>
              )}
            </section>
          </Reveal>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          <Reveal delay={0.1}>
            <PropertyEnquiryCard
              propertyId={property.id}
              propertyName={property.name}
              agentName={agentName}
              agentImage={agentImage}
              agentPhone={property.agent?.mobileNo}
              agentEmail={property.agent?.email}
            />
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
              `${property.location} property types`,
              `${property.category?.name || "Property"} guidance`,
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
                      Properties close to schools, services, and transport
                    </li>
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
