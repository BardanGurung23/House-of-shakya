import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import { getData } from "../../../utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";

type PropertyItem = {
  id: number;
  name: string;
  slug: string;
  location?: string | null;
  category?: {
    name?: string | null;
  } | null;
  images?: {
    image?: string | null;
    type?: string | null;
  }[];
};

const isVideoMedia = (media?: { image?: string | null; type?: string | null }) =>
  media?.type === "video" || /\.(mp4|mpeg|mov|webm|ogg)$/i.test(media?.image || "");

export const metadata: Metadata = {
  title: "Projects — House of Shakya | Interior & Construction Portfolio Nepal",
  description:
    "Selected hospitality, residential and commercial projects by House of Shakya — interior design and turnkey construction across Nepal.",
  openGraph: {
    title: "Projects — House of Shakya",
    description: "Selected interior and construction projects across Nepal.",
  },
};

export default async function ProjectsIndex() {
  const response = await getData("property/list");
  const propertydata: PropertyItem[] = response?.data?.data || [];

  return (
    <>
      <section className="pt-40 pb-20 border-b border-border">
        <div className="container-luxe">
          <div className="eyebrow mb-6">
            Index · {propertydata.length} projects
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-light">
            Portfolio.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A selection of recent hospitality, residential and commercial work
            — each delivered turnkey, where design met execution.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
          {propertydata.map((property, i) => {
            const coverMedia = property.images?.find((image) => image.image);

            return (
            <Reveal
              key={property.slug || property.id}
              delay={(i % 2) * 0.1}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <Link href={`/projects/${property.slug}`} className="group block">
                <div
                  className={`relative overflow-hidden bg-muted ${i % 3 === 0 ? "aspect-[21/9]" : "aspect-[4/5]"}`}
                >
                  {coverMedia?.image && isVideoMedia(coverMedia) ? (
                    <video
                      src={`${IMAGE_BASE_URL}${coverMedia.image}`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : coverMedia?.image ? (
                    <img
                      src={`${IMAGE_BASE_URL}${coverMedia.image}`}
                      alt={property.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex items-baseline justify-between mt-5">
                  <div>
                    <div className="font-display text-3xl">{property.name}</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">
                      {property.category?.name || "Property"} ·{" "}
                      {property.location || "Nepal"}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition" />
                </div>
              </Link>
            </Reveal>
          );
          })}
        </div>
      </section>
    </>
  );
}
