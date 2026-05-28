import type { Metadata } from "next";
import PageHeader from "../_components/site/PageHeader";
import ProjectsBento from "../_components/site/ProjectsBento";
import Properties from "../_components/site/Properties";
import CTABanner from "../_components/site/CTABanner";

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

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        breadcrumb="Home / Projects"
        title="Premium Projects Across Pokhara"
        description="Browse our curated portfolio of ongoing, upcoming, and completed developments — each carefully positioned in Pokhara's highest-demand neighbourhoods."
      />
      <ProjectsBento />
      <Properties showHeader={true} />
      <CTABanner />
    </>
  );
}
