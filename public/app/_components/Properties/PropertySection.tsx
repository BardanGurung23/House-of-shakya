"use client";
import { IMAGE_BASE_URL } from "@/constants/index";
import { ArrowRight, Bath, Bed, MapPin, Square } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Reveal from "../site/Reveal";

export type PropertyCard = {
  id: number;
  name: string;
  location: string;
  category: string;
  status: string;
  statusType: string;
  price: string;
  area: string;
  beds: number;
  baths: number;
  image: string;
};

interface PropertiesClientProps {
  properties: PropertyCard[];
  limit?: number;
  showHeader?: boolean;
}

const statusColors: Record<string, string> = {
  ready: "bg-forest/20 text-forest border-forest/30",
  new: "bg-gold/20 text-gold border-gold/30",
  pre: "bg-navy/20 text-navy border-navy/30",
  ongoing: "bg-forest-deep/20 text-forest border-forest-deep/30",
};

export default function PropertiesSection({
  properties,
  limit,
  showHeader = true,
}: PropertiesClientProps) {
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(properties.map((property) => property.category))),
  ];

  const filtered = properties
    .filter((property) => filter === "All" || property.category === filter)
    .slice(0, limit);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {showHeader && (
          <div className="mb-12">
            <Reveal>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 text-forest border border-forest/30 bg-forest/5">
                Properties
              </span>
            </Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep max-w-lg">
                  Browse Available Properties
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                        filter === cat
                          ? "bg-navy-deep text-cream border-navy-deep"
                          : "border-navy/20 text-navy hover:border-navy hover:bg-navy/5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        )}

        {!showHeader && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                  filter === cat
                    ? "bg-navy-deep text-cream border-navy-deep"
                    : "border-navy/20 text-navy hover:border-navy hover:bg-navy/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((prop, i) => (
              <Reveal key={prop.id} delay={i * 0.08}>
                <div className="rounded-xl overflow-hidden hover-lift shadow-card bg-cream group cursor-pointer">
                  <div className="relative h-56 overflow-hidden img-zoom">
                    <img
                      src={`${IMAGE_BASE_URL}${prop.image}`}
                      alt={`${prop.name} - ${prop.category} in ${prop.location}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={600}
                      height={400}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(0.18 0.05 255 / 0.5), transparent 60%)",
                      }}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                          statusColors[prop.statusType] || statusColors.ready
                        }`}
                      >
                        {prop.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-navy-deep/80 text-cream">
                        {prop.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-navy-deep text-base leading-tight mb-1">
                      {prop.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-navy/60 mb-3">
                      <MapPin size={11} />
                      <span>{prop.location}</span>
                    </div>

                    {prop.beds > 0 && (
                      <div className="flex items-center gap-4 text-xs text-navy/60 mb-4">
                        <span className="flex items-center gap-1">
                          <Bed size={11} /> {prop.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={11} /> {prop.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Square size={11} /> {prop.area}
                        </span>
                      </div>
                    )}
                    {prop.beds === 0 && (
                      <div className="flex items-center gap-2 text-xs text-navy/60 mb-4">
                        <Square size={11} /> <span>{prop.area}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-navy/50 mb-0.5">
                          Starting at
                        </p>
                        <p className="font-bold text-forest text-base">
                          {prop.price}
                        </p>
                      </div>
                      <Link
                        href="/contact"
                        className="px-4 py-2 text-xs font-semibold rounded bg-navy-deep text-cream hover:bg-forest transition-all duration-200"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-xl border border-navy/10 bg-cream px-6 py-12 text-center">
              <p className="text-lg font-semibold text-navy-deep">
                No properties
              </p>
            </div>
          </Reveal>
        )}

        {limit && (
          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded border border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-cream transition-all duration-200"
              >
                View All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
