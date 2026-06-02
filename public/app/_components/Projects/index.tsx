import { ArrowRight } from "lucide-react";
import Reveal from "../site/Reveal";
import Link from "next/link";
import { getData } from "@/utils/apiHandle";
import ProjectsBento, { ProjectItem } from "./ProjectsBento";

type ApiProject = {
  id: number;
  name: string;
  location: string;
  type: string;
  description: string;
  img?: string | null;
};

const statusColors = [
  "bg-gold/80 text-navy-deep",
  "bg-forest/80 text-cream",
  "bg-navy/80 text-cream",
];

const mapProject = (project: ApiProject, index: number): ProjectItem => ({
  id: project.id,
  name: project.name,
  location: project.location,
  type: project.type,
  status: "Available",
  statusColor: statusColors[index % statusColors.length],
  description: project.description,
  image: project.img || "",
  span: index % 3 === 0 ? "lg:col-span-2" : "lg:col-span-1",
});

async function getProjects() {
  const response = await getData("/projects/list?page=1&limit=4");
  const projects = response?.data?.data;

  return Array.isArray(projects) ? projects.map(mapProject) : [];
}

async function Projects() {
  const projects = await getProjects();
  return (
    <>
      <section className="py-20 bg-background max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 text-forest border border-forest/30 bg-forest/5">
                Our Projects
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep max-w-lg">
                Key Investment Projects
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
        <ProjectsBento projects={projects} />
      </section>
    </>
  );
}

export default Projects;
export { getProjects };
