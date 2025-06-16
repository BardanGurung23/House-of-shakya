import Link from "next/link";
import "./index.scss";
import { IMAGE_BASE_URL } from "../../../../../constants";

export default function PortfolioCard({
  slug,
  companyName,
  description,
  imgSrc,
}) {
  return (
    <Link href={`/portfolio/${slug}`} className="card-container">
      <div className="card-img-container">
        <img
          crossOrigin="anonymous"
          src={`${IMAGE_BASE_URL}${imgSrc}`}
          alt="royal nepal image"
        />
      </div>
      <div className="content-container">
        <h3 className="portfolio-card-title">{companyName}</h3>
        <p className="portfolio-description">{description}</p>
        {/* <Link href={`/portfolio/${slug}`} className="portfolio-viewmore">
          View more
        </Link> */}
      </div>
    </Link>
  );
}
