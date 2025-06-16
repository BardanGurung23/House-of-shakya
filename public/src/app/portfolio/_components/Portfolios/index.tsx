import { getData } from "../../../../utils/apiHandle";
import PortfolioCard from "./PortfolioCard";
import "./index.scss";

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

export default async function Portfolios() {
  const data = await getData("portfolio/list");
  const portfolios: PortfolioItem[] = data.data.data;
  return (
    <div className="portfolio-container container">
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          slug={portfolio.slug}
          companyName={portfolio.title}
          imgSrc={
            (typeof portfolio.portfolioImages === "string"
              ? JSON.parse(portfolio.portfolioImages)
              : portfolio.portfolioImages)[0]
          }
          description={portfolio.product_description}
        />
      ))}
    </div>
  );
}
