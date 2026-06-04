import type { Metadata } from "next";
import Link from "next/link";
import {
  Bath,
  BedDouble,
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
import Reveal from "@/app/_components/site/Reveal";
import ListingGallery from "./ListingGallery";

const listing = {
  title: "Villa Mio Is A Newly Constructed Villa In El Madroñal",
  price: "$13,309,106",
  location: "El Madroñal, Benahavís, Spain",
  summary:
    "A composed hillside villa with refined interiors, generous outdoor living, and a calm private setting designed for effortless family life.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85",
      alt: "Contemporary luxury villa exterior",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      alt: "Modern villa bedroom",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      alt: "Luxury villa living room",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      alt: "Open plan interior",
    },
    {
      src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
      alt: "Villa front elevation",
    },
    {
      src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=85",
      alt: "Luxury residential terrace",
    },
  ],
  facts: [
    { label: "Property Type", value: "Villa" },
    { label: "Year Built", value: "2025" },
    { label: "Property Size", value: "5,124 sq.ft" },
    { label: "Status", value: "Available" },
  ],
  specs: [
    { label: "Bedrooms", value: "03", icon: BedDouble },
    { label: "Bathrooms", value: "02", icon: Bath },
    { label: "Area", value: "1,085 sq.ft", icon: Ruler },
    { label: "Parking", value: "02", icon: Car },
  ],
  features: [
    { title: "Terrace", icon: Home },
    { title: "Pool", icon: Waves },
    { title: "Garden Room", icon: Trees },
    { title: "Gym", icon: Dumbbell },
    { title: "Smart Home", icon: Wifi },
    { title: "Fire Pit", icon: Sparkles },
    { title: "Secure Access", icon: ShieldCheck },
    { title: "Lake View", icon: MapPin },
  ],
  nearby: [
    { name: "Mildred Airport", distance: "4.3 km", icon: Car },
    { name: "Westerley Station", distance: "7.8 km", icon: Car },
    { name: "North Banks Market", distance: "2.1 km", icon: Home },
    { name: "Central Park", distance: "1.9 km", icon: Trees },
    { name: "La Cabana Mall", distance: "5.0 km", icon: Home },
    { name: "Riverdale School", distance: "3.4 km", icon: School },
  ],
};

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

export const metadata: Metadata = {
  title: "Enova Villa Listing Detail",
  description: listing.summary,
};

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-navy/10 py-3 text-sm last:border-b-0">
    <span className="text-navy/55">{label}</span>
    <span className="font-semibold text-navy-deep">{value}</span>
  </div>
);

export default function EnovaVillaPage() {
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
          <ListingGallery images={listing.gallery} />
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 lg:grid-cols-[1fr_340px] lg:px-8">
        <div>
          <Reveal>
            <p className="text-2xl font-semibold text-navy-deep md:text-3xl">
              {listing.price}
            </p>
            <h1 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight text-navy-deep md:text-4xl">
              {listing.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-navy/60">
              <MapPin size={16} />
              {listing.location}
            </p>
            <div className="mt-5 flex flex-wrap gap-5 border-b border-navy/10 pb-6 text-sm text-navy/65">
              {listing.specs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <span key={spec.label} className="inline-flex items-center gap-2">
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
                {listing.summary} Villa Mio is arranged around generous living
                spaces, a clear indoor-outdoor relationship, and a refined
                material palette that keeps the home warm without feeling heavy.
              </p>
              <p className="mt-4 text-sm leading-7 text-navy/65">
                The residence balances privacy and openness through layered
                terraces, high ceilings, large glazing, and soft landscaping.
                Every room is planned to support daily living while maintaining
                the quiet elegance expected from a premium hillside property.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                {listing.facts.map((fact) => (
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
                {listing.features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
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
                  <p className="mt-1 text-sm text-navy/55">
                    El Madroñal, Benahavís, 29678, Spain
                  </p>
                </div>
                <button className="rounded-full border border-navy/10 px-4 py-2 text-sm font-semibold hover:border-forest">
                  Request exact location
                </button>
              </div>
              <div className="mt-5 h-72 overflow-hidden rounded-lg border border-navy/10 bg-cream">
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.97 0.012 90), oklch(0.9 0.04 155)), radial-gradient(circle at 25% 30%, oklch(0.42 0.09 155 / 0.3), transparent 18%), radial-gradient(circle at 70% 65%, oklch(0.78 0.12 85 / 0.35), transparent 15%)",
                  }}
                />
              </div>
              <p className="mt-4 text-sm leading-7 text-navy/65">
                The neighborhood offers a balanced mix of privacy, views, and
                convenient access to restaurants, schools, leisure destinations,
                golf clubs, and everyday services.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listing.nearby.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest/10 text-forest">
                        <Icon size={15} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy-deep">
                          {item.name}
                        </p>
                        <p className="text-xs text-navy/50">{item.distance}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=220&q=85"
                  alt="Fernando Collet"
                  className="h-14 w-14 rounded-full object-cover"
                  width={96}
                  height={96}
                />
                <div>
                  <p className="font-semibold text-navy-deep">
                    Fernando Collet
                  </p>
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
                    defaultValue="Hello, I would like to know more about this property."
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
                Call Now
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-lg border border-navy/10 bg-background p-5">
              <h3 className="font-semibold text-navy-deep">Listed by</h3>
              <p className="mt-3 text-sm leading-6 text-navy/60">
                A boutique real estate advisor specializing in premium hillside
                residences and investment-grade villas.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-navy/45">Properties Listed</p>
                  <p className="font-semibold text-navy-deep">884</p>
                </div>
                <div>
                  <p className="text-xs text-navy/45">Agent Since</p>
                  <p className="font-semibold text-navy-deep">2025</p>
                </div>
              </div>
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
              "El Madroñal, Spain property types",
              "Villa exterior architecture",
              "Madrid luxury property resources",
            ].map((title) => (
              <Reveal key={title}>
                <div>
                  <h3 className="font-semibold text-navy-deep">{title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-navy/60">
                    <li className="flex gap-2">
                      <Check size={15} className="mt-0.5 text-forest" />
                      Luxury villas with private outdoor areas
                    </li>
                    <li className="flex gap-2">
                      <Check size={15} className="mt-0.5 text-forest" />
                      Homes close to golf, schools, and city services
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
