import FadeCarousel from "./FadeCarousel";
import style from "./index.module.scss";

export default function HeroSection({
  title,
  images,
  portfolioType,
  description,
}: {
  title: string;
  images: string[];
  portfolioType: string;
  description: string;
}) {
  return (
    <section className={`${style.header} container`}>
      <div className={`${style.carouselContainer}`}>
        <FadeCarousel slides={images} options={{ loop: true }} />
      </div>
      <div className={`${style.carouselContent}`}>
        <h2 className={`${style.projectName}`}>{title}</h2>
        <div className={`${style.projectType}`}>-{portfolioType}</div>
        <p className={`${style.projectDescription}`}>{description}</p>
      </div>
    </section>
  );
}
