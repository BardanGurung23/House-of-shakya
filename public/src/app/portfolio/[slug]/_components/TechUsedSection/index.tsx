import AutoScrollCarousel from "./AutoScrollCarousel";
import style from "./index.module.scss";

export default function TechUsedSection({ children }) {
  return (
    <section className={`${style.section}`}>
      <div className={`${style.title}`}>Core Technologies</div>
      <div className={`${style.carouselContainer}`}>{children}</div>
    </section>
  );
}
