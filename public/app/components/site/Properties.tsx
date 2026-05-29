"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const properties = [
  {
    id: 1,
    name: "Annapurna Villa A-7",
    location: "Lakeside, Pokhara",
    category: "Villas",
    status: "Ready to move",
    statusType: "ready",
    price: "Rs. 2.8 Cr",
    area: "12 Aana",
    beds: 4,
    baths: 4,
    tag: "Furnished",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=750&fit=crop",
  },
  {
    id: 2,
    name: "Phewa Heights 3BHK",
    location: "Sedi, Pokhara",
    category: "Apartments",
    status: "New launch",
    statusType: "new",
    price: "Rs. 95 Lakh",
    area: "1,450 sqft",
    beds: 3,
    baths: 2,
    tag: "New launch",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=750&fit=crop",
  },
  {
    id: 3,
    name: "Begnas Greens Plot 14",
    location: "Begnas, Pokhara",
    category: "Land",
    status: "Pre-launch",
    statusType: "pre",
    price: "Rs. 40 Lakh",
    area: "4 Aana",
    beds: 0,
    baths: 0,
    tag: "Corner plot",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=750&fit=crop",
  },
  {
    id: 4,
    name: "Sarangkot Ridge Villa",
    location: "Sarangkot, Pokhara",
    category: "Villas",
    status: "Ongoing",
    statusType: "ongoing",
    price: "Rs. 3.5 Cr",
    area: "16 Aana",
    beds: 5,
    baths: 5,
    tag: "Mountain view",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=750&fit=crop",
  },
  {
    id: 5,
    name: "Lakeside Comfort 2BHK",
    location: "Lakeside, Pokhara",
    category: "Apartments",
    status: "Ready to move",
    statusType: "ready",
    price: "Rs. 72 Lakh",
    area: "1,100 sqft",
    beds: 2,
    baths: 2,
    tag: "Furnished",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=750&fit=crop",
  },
  {
    id: 6,
    name: "Begnas Greens Farmland",
    location: "Begnas Lake Road",
    category: "Land",
    status: "Pre-launch",
    statusType: "pre",
    price: "Rs. 28 Lakh",
    area: "8 Aana",
    beds: 0,
    baths: 0,
    tag: "Lake frontage",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=750&fit=crop",
  },
];

const statusColors: Record<string, string> = {
  ready: "bg-forest/20 text-forest border-forest/30",
  new: "bg-gold/20 text-gold border-gold/30",
  pre: "bg-navy/20 text-navy border-navy/30",
  ongoing: "bg-forest-deep/20 text-forest border-forest-deep/30",
};

interface PropertiesProps {
  limit?: number;
  showHeader?: boolean;
}

export default function Properties({
  limit,
  showHeader = true,
}: PropertiesProps) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Villas", "Apartments", "Land"];

  const filtered = properties
    .filter((p) => filter === "All" || p.category === filter)
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
              {/* Filter chips */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((prop, i) => (
            <Reveal key={prop.id} delay={i * 0.08}>
              <div className="rounded-xl overflow-hidden hover-lift shadow-card bg-cream group cursor-pointer">
                {/* Image */}
                <div className="relative h-56 overflow-hidden img-zoom">
                  <img
                    src={prop.image}
                    alt={`${prop.name} - ${prop.category} in ${prop.location}, Pokhara`}
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
                        statusColors[prop.statusType]
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

                {/* Content */}
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
                      <p className="text-xs text-navy/50 mb-0.5">Starting at</p>
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
