import { MapPin } from "lucide-react";
import Reveal from "../_components/site/Reveal";
import { IMAGE_BASE_URL } from "@/constants/index";
import { ProjectProps } from "@/utils/propertyMapper";

export type ProjectItem = {
  id: number;
  name: string;
  location: string;
  type: string;
  status: string;
  statusColor: string;
  description: string;
  image: string;
  span?: string;
};

export default function ProjectsBento({ projects }: ProjectProps) {
  const projectList = projects || [];

  if (projectList.length === 0) {
    return (
      <Reveal>
        <div className="rounded-xl border border-navy/10 bg-cream px-6 py-12 text-center">
          <p className="text-lg font-semibold text-navy-deep">No projects</p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid lg:grid-cols-1 gap-5">
      {projectList.map((project, i) => (
        <Reveal key={project.id} delay={i * 0.08}>
          <div
            className="group relative rounded-xl overflow-hidden img-zoom cursor-pointer"
            style={{ height: i === 0 || i === 3 ? "340px" : "300px" }}
          >
            <img
              src={`${IMAGE_BASE_URL}${project.image}`}
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
  );
}
