import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import ProjectsBento from "../_components/Projects/ProjectsBento";
import Projects, { getProjects } from "../_components/Projects";
import Properties from "../_components/Properties";
import CTABanner from "../_components/site/CTABanner";
import { getData } from "@/utils/apiHandle";
import { IMAGE_BASE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Projects & Properties",
  description:
    "Explore Yours Housing's portfolio of premium villas, apartments, and land projects across Pokhara's most desirable neighbourhoods.",
  openGraph: {
    title: "Projects & Properties | Yours Housing Pokhara",
    description:
      "Premium villas, apartments and land in Lakeside, Sedi, Begnas and Sarangkot.",
  },
};

export default async function ProjectsPage() {
  const response = await getData("banner/projects-banner");
  const aboutbanner = response?.data?.bannerItems;
  const banner = Array.isArray(aboutbanner) ? aboutbanner[0] : null;

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        breadcrumb="Home / Projects"
        title={`${banner?.title}`}
        description={`${banner?.subTitle}`}
        imageUrl={`${IMAGE_BASE_URL}${banner?.image}`}
      />
      <Projects />
      <Properties showHeader={true} />
      <CTABanner />
    </>
  );
}
