import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import { getData } from "../../../../utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type PropertyMedia = {
  id?: number;
  image?: string | null;
  type?: string | null;
};

type PropertyFeature = {
  id?: number;
  title?: string | null;
  icon?: string | null;
  sortOrder?: number | string | null;
};

type PropertyDetail = {
  id: number;
  name: string;
  slug: string;
  type?: string | null;
  location?: string | null;
  description?: string | null;
  problem?: string | null;
  solution?: string | null;
  size?: string | null;
  parking?: number | null;
  view?: string | null;
  yearBuilt?: number | string | null;
  completionDate?: string | null;
  price?: number | string | null;
  beds?: number | null;
  bath?: number | null;
  anna?: number | string | null;
  status?: string | null;
  category?: {
    name?: string | null;
  } | null;
  images?: PropertyMedia[];
  features?: PropertyFeature[];
};

const getImageUrl = (path?: string | null) =>
  path ? `${IMAGE_BASE_URL}${path}` : "";

const isVideoMedia = (media?: PropertyMedia | string | null) => {
  const path = typeof media === "string" ? media : media?.image;
  const type = typeof media === "string" ? null : media?.type;

  return type === "video" || /\.(mp4|mpeg|mov|webm|ogg)$/i.test(path || "");
};

const getProperty = async (slug: string): Promise<PropertyDetail | null> => {
  const response = await getData(`property/slug/${slug}`);
  return response?.data || null;
};

const getPropertyList = async (): Promise<PropertyDetail[]> => {
  const response = await getData("property/list");
  return response?.data?.data || [];
};

const formatPrice = (price?: number | string | null) => {
  if (price === undefined || price === null || price === "") return null;

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice)) return `${price}`;

  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

const getPropertyMedia = (property: PropertyDetail) =>
  (property.images || [])
    .filter((media) => media.image)
    .map((media) => media);

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) return {};

  const coverMedia = getPropertyMedia(property)[0];
  const cover = getImageUrl(coverMedia?.image);
  const category = property.category?.name || property.type || "Property";
  const location = property.location || "Nepal";
  const description =
    property.description ||
    `${property.name} is a ${category.toLowerCase()} project in ${location}.`;

  return {
    title: `${property.name} — ${category} project in ${location} | House of Shakya`,
    description,
    openGraph: {
      title: `${property.name} — House of Shakya`,
      description,
      images: cover ? [cover] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  const properties = await getPropertyList();
  const idx = properties.findIndex((item) => item.slug === property.slug);
  const next =
    properties.length > 0
      ? properties[(idx >= 0 ? idx + 1 : 0) % properties.length]
      : null;

  const mediaItems = getPropertyMedia(property);
  const imageItems = mediaItems.filter((media) => !isVideoMedia(media));
  const coverMedia = mediaItems[0];
  const coverImage = getImageUrl(coverMedia?.image);
  const category = property.category?.name || property.type || "Property";
  const location = property.location || "Nepal";
  const price = formatPrice(property.price);
  const highlights = (property.features || [])
    .sort((a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0))
    .map((feature) => feature.title)
    .filter(Boolean);

  return (
    <>
      <section className="relative h-[100svh] overflow-hidden bg-ink">
        {coverMedia?.image && isVideoMedia(coverMedia) ? (
          <video
            src={coverImage}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : coverImage ? (
          <img
            src={coverImage}
            alt={property.name}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
        <div className="absolute inset-0 vignette" />
        <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-20">
          <Reveal>
            <div className="eyebrow mb-4">
              {category} · {property.yearBuilt || property.completionDate || "Nepal"}
            </div>
            <h1 className="font-display text-6xl md:text-9xl font-light leading-[0.9] text-balance">
              {property.name}
            </h1>
            <div className="mt-6 text-muted-foreground">{location}</div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 border-t border-border">
        <div className="container-luxe grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:sticky md:top-32 self-start space-y-8">
            <div>
              <div className="eyebrow mb-2">Type</div>
              <div className="font-display text-2xl">{category}</div>
            </div>
            <div>
              <div className="eyebrow mb-2">Location</div>
              <div className="font-display text-2xl">{location}</div>
            </div>
            {property.yearBuilt && (
              <div>
                <div className="eyebrow mb-2">Year</div>
                <div className="font-display text-2xl">{property.yearBuilt}</div>
              </div>
            )}
            {price && (
              <div>
                <div className="eyebrow mb-2">Price</div>
                <div className="font-display text-2xl">{price}</div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-8">
              {property.beds !== null && property.beds !== undefined && (
                <div>
                  <div className="eyebrow mb-2">Beds</div>
                  <div className="font-display text-2xl">{property.beds}</div>
                </div>
              )}
              {property.bath !== null && property.bath !== undefined && (
                <div>
                  <div className="eyebrow mb-2">Bath</div>
                  <div className="font-display text-2xl">{property.bath}</div>
                </div>
              )}
              {property.anna && (
                <div>
                  <div className="eyebrow mb-2">Anna</div>
                  <div className="font-display text-2xl">{property.anna}</div>
                </div>
              )}
              {property.parking !== null && property.parking !== undefined && (
                <div>
                  <div className="eyebrow mb-2">Parking</div>
                  <div className="font-display text-2xl">{property.parking}</div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="eyebrow mb-4">Description</div>
            <p className="font-display text-3xl md:text-4xl font-light leading-snug text-balance">
              {property.description ||
                "A considered House of Shakya project where design and execution move together."}
            </p>

            {(property.problem || property.solution) && (
              <div className="mt-16 grid sm:grid-cols-2 gap-8">
                {property.problem && (
                  <div>
                    <div className="eyebrow mb-3 text-gold">Problem</div>
                    <p className="text-muted-foreground">{property.problem}</p>
                  </div>
                )}
                {property.solution && (
                  <div>
                    <div className="eyebrow mb-3 text-gold">Solution</div>
                    <p className="text-muted-foreground">{property.solution}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {mediaItems.length > 0 && (
        <section className="pb-32">
          <div className="container-luxe space-y-6">
            {mediaItems.map((media, i) => (
              <Reveal key={media.image} delay={i * 0.06}>
                <div
                  className={`relative overflow-hidden bg-muted ${
                    i === 0
                      ? "aspect-[16/9]"
                      : i === 1
                        ? "aspect-[4/5] md:w-2/3"
                        : "aspect-[16/9]"
                  }`}
                >
                  {isVideoMedia(media) ? (
                    <video
                      src={getImageUrl(media.image)}
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={getImageUrl(media.image)}
                      alt={`${property.name} — ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {imageItems.length >= 2 && (
        <section className="py-32 bg-ink border-t border-border">
          <div className="container-luxe">
            <div className="eyebrow mb-8">Render vs reality</div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={getImageUrl(imageItems[1].image)}
                  alt={`${property.name} render`}
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                  loading="lazy"
                />
                <span className="absolute bottom-4 left-4 eyebrow text-white">
                  Render
                </span>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={coverImage}
                  alt={`${property.name} built`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-4 left-4 eyebrow text-gold">
                  Built
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {highlights.length > 0 && (
        <section className="py-32">
          <div className="container-luxe">
            <div className="eyebrow mb-8">Highlights</div>
            <ul className="grid md:grid-cols-3 gap-px bg-border">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="bg-background p-10 font-display text-2xl"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-32 bg-ink border-t border-border">
        <div className="container-luxe flex flex-col md:flex-row items-end justify-between gap-10">
          {next && (
            <div>
              <div className="eyebrow mb-4">Next project</div>
              <Link
                href={`/projects/${next.slug}`}
                className="font-display text-5xl md:text-7xl font-light hover:text-gold transition"
              >
                {next.name} →
              </Link>
            </div>
          )}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-foreground text-ink px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold transition"
          >
            Start a similar project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
