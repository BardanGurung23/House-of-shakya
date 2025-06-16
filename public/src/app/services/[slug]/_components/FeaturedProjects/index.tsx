import React from "react";
import style from "./index.module.scss";
import ProjectCarousel from "./ProjectCarousel";
import { ProjectSlide } from "./ProjectSlide";
import { getData } from "../../../../../utils/apiHandle";
import { PUBLIC_BACKEND_URL } from "../../../../../constants";

interface PortfolioItem {
  id: number;
  title: string;
  summary: string;
  product_description: string;
  core_tech_img: string[];
  portfolioImages: string[];
  introduction: string;
  desktop_view_url: string;
  mobile_view_url: string;
  tablet_view_url: string;
  portfolioLogo: string;
  business_challenges: string;
  slug: string;
  serviceId: number;
}

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const FeatureProjects = async ({ serviceId }: { serviceId: number }) => {
  const data = await getData(`portfolio/list?serviceId=${serviceId}`);

  const portfolios: PortfolioItem[] = data.data.data;
  if (portfolios.length <= 0) return;
  return (
    <section className={`${style.sectionContainer}`}>
      <h2 className={style.sectionTitle}>Our Featured Projects</h2>
      <p className={style.sectionSubtitle}>
        Explore Tech Nirvana's role in driving innovation and delivering
        tailored solutions that empower businesses.
      </p>
      <div className={style.carouselContainer}>
        {portfolios.length > 1 ? (
          <ProjectCarousel slides={portfolios} options={OPTIONS} />
        ) : (
          <ProjectSlide {...portfolios[0]} />
        )}
      </div>
    </section>
  );
};
