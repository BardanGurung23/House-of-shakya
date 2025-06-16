import React from "react";
import style from "./index.module.scss";
import Link from "next/link";
import { IMAGE_BASE_URL } from "../../../../../../constants";

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

export const ProjectSlide = (portfolio: PortfolioItem) => {
  return (
    <div className={style.projectContainer}>
      <div className={style.textContent}>
        <h3 className={style.projectTitle}>{portfolio.title}</h3>
        <img
          className={style.secImg}
          crossOrigin="anonymous"
          src={`${IMAGE_BASE_URL}${portfolio.portfolioLogo}`}
          alt={`${portfolio.title} logo`}
        />
        <p className={style.projectDescription}>
          {portfolio.product_description}
        </p>
        <div className={style.linkContainer}>
          <Link
            className={style.visitSite}
            href={`/portfolio/${portfolio.slug}`}
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className={style.imgContainer}>
        <img
          src={`${IMAGE_BASE_URL}${portfolio.portfolioLogo}`}
          crossOrigin="anonymous"
          alt={`${portfolio.title} logo`}
        />
      </div>
    </div>
  );
};
