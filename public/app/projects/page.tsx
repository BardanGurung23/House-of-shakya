import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import ProjectsBento from "./ProjectsBento";
import Properties from "../_components/Properties";
import CTABanner from "../_components/site/CTABanner";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";
import { mapProject } from "@/utils/propertyMapper";
import { getSeoMetadata } from "@/utils/seo";

const fallbackMetadata: Metadata = {
  title: "Projects & Properties",
  description:
    "Explore Yours Housing's portfolio of premium villas, apartments, and land projects across Pokhara's most desirable neighbourhoods.",
  openGraph: {
    title: "Projects & Properties | Yours Housing Pokhara",
    description:
      "Premium villas, apartments and land in Lakeside, Sedi, Begnas and Sarangkot.",
  },
};

export const generateMetadata = () =>
  getSeoMetadata("projects", fallbackMetadata);

export default async function ProjectsPage() {
  const response = await getData("banner/projects-banner");
  const aboutbanner = response?.data?.bannerItems;
  const banner = Array.isArray(aboutbanner) ? aboutbanner[0] : null;

  const projectResponse = await getData("/projects/list?page=1&limit=999");
  const categoryResponse = await getData("/project-category/list?limit=999");
  const projects = projectResponse?.data?.data;
  const mappedProjects = Array.isArray(projects)
    ? projects.map(mapProject)
    : [];
  const categories = Array.isArray(categoryResponse?.data?.data)
    ? categoryResponse.data.data.map((category: { id: number; name: string }) => ({
        id: category.id,
        name: category.name,
      }))
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        breadcrumb="Home / Projects"
        title={`${banner?.title}`}
        description={`${banner?.subTitle}`}
        imageUrl={`${IMAGE_BASE_URL}${banner?.image}`}
        overlayType={banner?.overlayType}
        overlayColor={banner?.overlayColor}
        overlayOpacity={banner?.overlayOpacity}
        overlayDirection={banner?.overlayDirection}
      />
      <div className="py-10 bg-background max-w-7xl mx-auto px-6 lg:px-8">
        <ProjectsBento projects={mappedProjects} categories={categories} />
      </div>

      <CTABanner />
    </>
  );
}
