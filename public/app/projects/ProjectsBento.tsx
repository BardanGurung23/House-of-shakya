"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import Reveal from "../_components/site/Reveal";
import { IMAGE_BASE_URL } from "@/constants/index";
import { ProjectItem } from "@/utils/propertyMapper";

export type ProjectCategoryOption = {
  id: number;
  name: string;
};

type ProjectsBentoProps = {
  projects?: ProjectItem[];
  categories?: ProjectCategoryOption[];
};

const getImageUrl = (image?: string) => {
  if (!image) {
    return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85";
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${IMAGE_BASE_URL}${image}`;
};

export default function ProjectsBento({
  projects,
  categories = [],
}: ProjectsBentoProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const projectList = projects || [];
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projectList;
    }

    return projectList.filter(
      (project) => String(project.categoryId) === activeCategory,
    );
  }, [activeCategory, projectList]);

  return (
    <section className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-5 border-b border-navy/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-forest">
              Project Portfolio
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-navy-deep md:text-4xl">
              Explore projects by category
            </h2>
          </div>

          <label className="w-full md:w-72">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy/45">
              Filter Category
            </span>
            <select
              value={activeCategory}
              onChange={(event) => setActiveCategory(event.target.value)}
              className="w-full rounded border border-navy/15 bg-cream px-4 py-3 text-sm font-semibold text-navy-deep outline-none transition-colors focus:border-forest"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Reveal>

      {projectList.length === 0 ? (
        <Reveal>
          <div className="rounded-lg border border-navy/10 bg-cream px-6 py-12 text-center">
            <p className="text-lg font-semibold text-navy-deep">No projects</p>
          </div>
        </Reveal>
      ) : filteredProjects.length === 0 ? (
        <Reveal>
          <div className="rounded-lg border border-navy/10 bg-cream px-6 py-12 text-center">
            <p className="text-lg font-semibold text-navy-deep">
              No projects in this category
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-lg border border-navy/10 bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={getImageUrl(project.image)}
                    alt={`${project.name} - ${project.type} in ${project.location}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={900}
                    height={675}
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-navy-deep backdrop-blur">
                    {project.category || project.type}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest">
                        <Building2 size={13} />
                        {project.status}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-navy-deep group-hover:text-forest">
                        {project.name}
                      </h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy/10 text-navy-deep transition-colors group-hover:border-forest group-hover:text-forest">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                  <p className="mt-3 flex items-center gap-2 text-sm text-navy/55">
                    <MapPin size={15} />
                    {project.location}
                  </p>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-navy/60">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
