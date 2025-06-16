import MetaData from "../../../components/MetaData";
import NotFound from "../../../components/NotFound";
import { getData } from "../../../utils/apiHandle";
import ChallengesAndSolutions from "./_components/ChallengesAndSolutions";
import HeroSection from "./_components/HeroSection";
import Introduction from "./_components/Introduction";
import Message from "./_components/Message";
import OtherProjects from "./_components/OtherProjects";
import ProjectRequirementSection from "./_components/ProjectRequirementSection";
import SnapShot from "./_components/SnapShot";
import TechUsedSection from "./_components/TechUsedSection";
import AutoScrollCarousel from "./_components/TechUsedSection/AutoScrollCarousel";
import "./index.scss";

interface TestimonialData {
  name: string;
  description: string;
  designation: string;
  image: string;
}

interface PortfolioType {
  id: number;
  title: string;
  summary: null;
  product_description: string;
  core_tech_img: string[];
  portfolioImages: string[];
  introduction: string;
  desktop_view_url: string;
  mobile_view_url: string;
  tablet_view_url: string;
  portfolioLogo: string;
  business_challenges: string;
  seo_description: string;
  seo_keywords: string[];
  solutions: string;
  slug: string;
  serviceId: number;
  projectUrl: string | null;
  service: {
    name: string;
  };
  testimonial: TestimonialData;
  projectRequirement: {
    title: string;
    requirements: string[];
  };
}

export default async function page(context) {
  const {
    params: { slug },
  } = context;

  const res = await getData(`portfolio/${slug}`);
  if (!res.success) return <NotFound />;
  const portfolio: PortfolioType = res.data;
  return (
    <>
      <MetaData
        title={portfolio.title}
        meta_description={portfolio.seo_description}
        seo_keywords={portfolio.seo_keywords}
        image_url={
          (typeof portfolio.portfolioImages === "string"
            ? JSON.parse(portfolio.portfolioImages)
            : portfolio.portfolioImages)[0]
        }
      />
      <main id="portfolio-top" className="portfolio-detail-main">
        <HeroSection
          title={portfolio.title}
          description={portfolio.product_description}
          images={
            typeof portfolio.portfolioImages === "string"
              ? JSON.parse(portfolio.portfolioImages)
              : portfolio.portfolioImages
          }
          portfolioType={portfolio.service.name}
        />
        <TechUsedSection>
          <AutoScrollCarousel
            slides={
              typeof portfolio.core_tech_img === "string"
                ? JSON.parse(portfolio.core_tech_img)
                : portfolio.core_tech_img
            }
            options={{ loop: true, duration: 30 }}
          />
        </TechUsedSection>
        <Introduction introduction={portfolio.introduction} />
        <SnapShot
          desktopUrl={portfolio.desktop_view_url}
          projectUrl={portfolio.projectUrl}
        />
        <ProjectRequirementSection
          title={portfolio.projectRequirement.title}
          requirements={portfolio.projectRequirement.requirements}
        />
        <ChallengesAndSolutions
          challenges={portfolio.business_challenges}
          solution={portfolio.solutions}
        />
        {portfolio.testimonial && (
          <Message
            message={portfolio.testimonial.description}
            author={portfolio.testimonial.name}
            designation={portfolio.testimonial.designation}
            image={portfolio.testimonial.image}
          />
        )}
      </main>
      <OtherProjects currentPortfolioId={portfolio.id} />
    </>
  );
}
