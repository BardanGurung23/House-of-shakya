import Link from "next/link";
import { IMAGE_BASE_URL } from "../../../../../constants";
import FadeCarousel from "./FadeCarousel";
import style from "./index.module.scss";
import { DesktopSlide, MobileSlide, TabletSlide } from "./Slides";

const OPTIONS = { loop: true, duration: 30 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function SnapShot({
  desktopUrl,
  projectUrl,
}: {
  desktopUrl: string;
  projectUrl: string | null;
}) {
  return (
    <>
      <section className={`${style.section}`}>
        <img
          className={style.placeHolder}
          src="/imac-final.webp"
          alt="product snapshot"
        />
        <img
          crossOrigin="anonymous"
          className={`${style.productImg}`}
          src={`${IMAGE_BASE_URL}${desktopUrl}`}
          alt="laptop demo image"
        />
        {/* <MobileSlide />
        <DesktopSlide />
        <TabletSlide /> */}
      </section>
      {projectUrl && (
        <Link href={projectUrl} target="_blank" className={style.btn}>
          Visit Project Site
        </Link>
      )}
    </>
  );
}
