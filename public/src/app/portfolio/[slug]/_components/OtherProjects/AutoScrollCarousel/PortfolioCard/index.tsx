import Link from "next/link";
import style from "./index.module.scss";
import { useRouter } from "next/navigation";
import { IMAGE_BASE_URL } from "../../../../../../../constants";
IMAGE_BASE_URL;

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

export default function PortfolioCard({
  id,
  slug,
  portfolioImages,
  product_description,
  title,
}: PortfolioItem) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/portfolio/${slug}#portfolio-top`);
      }}
      className={`${style.projects__slide} ${style.card_container}`}
    >
      <div className={style.card_img_container}>
        <img
          crossOrigin="anonymous"
          src={`${IMAGE_BASE_URL}${
            (typeof portfolioImages === "string"
              ? JSON.parse(portfolioImages)
              : portfolioImages)[0]
          }`}
          alt="company image"
        />
      </div>
      <div className={style.content_container}>
        <h3 className={style.portfolio_title}>{title}</h3>
        {/* <p className={style.portfolio_description}>{description}</p>
        <Link className={style.portfolio_viewmore} href={`/portfolio/${id}`}>
          View more
        </Link> */}
      </div>
    </div>
  );
}
