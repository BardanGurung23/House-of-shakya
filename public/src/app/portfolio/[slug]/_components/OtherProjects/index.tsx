import AutoScrollCarousel from "./AutoScrollCarousel";
import style from "./index.module.scss";
import PortfolioCard from "./AutoScrollCarousel/PortfolioCard";
import { getData } from "../../../../../utils/apiHandle";
getData;

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

export default async function OtherProjects({
  currentPortfolioId,
}: {
  currentPortfolioId: number;
}) {
  const data = await getData("portfolio/list");
  const unFiltered = data.data.data;
  const filtered: PortfolioItem[] = unFiltered.filter(
    (portfolio) => portfolio.id != currentPortfolioId
  );

  if (filtered.length == 0) return;

  return (
    <section className={style.section}>
      <div className={style.title}>Other Related Projects</div>
      <div>
        <AutoScrollCarousel slides={filtered} options={{ loop: true }} />
      </div>
    </section>
  );
}
