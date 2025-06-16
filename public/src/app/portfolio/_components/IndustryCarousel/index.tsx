import AutoScrollCarousel from "./AutoScrollCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./index.scss";
import { getData } from "../../../../utils/apiHandle";

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

const OPTIONS: EmblaOptionsType = { loop: true };

export default async function IndustryCarousel() {
  const data = await getData("portfolio/list");

  const portfolios = data.data.data;

  if (portfolios.length == 0) return;

  return (
    <div className="industry-container container">
      <p className="industry-title-text">Working With These Industry Leaders</p>
      <div className="industry-carousel-container">
        <AutoScrollCarousel slides={portfolios} options={OPTIONS} />
      </div>
    </div>
  );
}
