import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Reveal from "./Reveal";

const projects = [
  {
    id: 1,
    name: "Annapurna Estates",
    location: "Lakeside, Pokhara",
    type: "Premium Villas",
    status: "Ongoing",
    statusColor: "bg-gold/80 text-navy-deep",
    description:
      "Lakeside luxury living with panoramic Phewa Lake and Annapurna range views.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=600&fit=crop",
    span: "lg:col-span-2",
  },
  {
    id: 2,
    name: "Phewa Heights",
    location: "Sedi, Pokhara",
    type: "Apartments",
    status: "Completed",
    statusColor: "bg-forest/80 text-cream",
    description:
      "Modern mid-rise apartments in the heart of Sedi with world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=700&fit=crop",
    span: "lg:col-span-1",
  },
  {
    id: 3,
    name: "Begnas Greens",
    location: "Begnas, Pokhara",
    type: "Land Parcels",
    status: "Upcoming",
    statusColor: "bg-navy/80 text-cream",
    description:
      "Lakefront plots with full road infrastructure in Begnas's pristine landscape.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=500&fit=crop",
    span: "lg:col-span-1",
  },
  {
    id: 4,
    name: "Sarangkot Ridge",
    location: "Sarangkot, Pokhara",
    type: "Hillside Residences",
    status: "Ongoing",
    statusColor: "bg-gold/80 text-navy-deep",
    description:
      "Exclusive hillside homes with sunrise views over the Himalayas and Phewa Valley.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=500&fit=crop",
    span: "lg:col-span-2",
  },
];

export default function ProjectsBento() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 text-forest border border-forest/30 bg-forest/5">
                Our Projects
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep max-w-lg">
                Landmark Developments Across Pokhara
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-forest transition-colors duration-200 shrink-0"
            >
              All Projects <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08} className={project.span}>
              <div
                className="group relative rounded-xl overflow-hidden img-zoom cursor-pointer"
                style={{ height: i === 0 || i === 3 ? "340px" : "300px" }}
              >
                <img
                  src={project.image}
                  alt={`${project.name} - ${project.type} in ${project.location}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={900}
                  height={500}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.18 0.05 255 / 0.9) 0%, oklch(0.18 0.05 255 / 0.2) 60%, transparent 100%)",
                  }}
                />

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Status badge */}
                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${project.statusColor}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-xs text-cream/60 mb-1 uppercase tracking-widest">
                      {project.type}
                    </p>
                    <h3 className="text-lg md:text-xl font-semibold text-cream mb-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-cream/60 mb-2">
                      <MapPin size={11} />
                      <span>{project.location}</span>
                    </div>
                    <p className="text-xs text-cream/60 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
