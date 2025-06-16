"use client";
import React, { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import style from "./index.module.scss";
import PortfolioCard from "./PortfolioCard";

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

type SlideType = Array<PortfolioItem>;

type PropType = {
  slides: SlideType;
  options?: EmblaOptionsType;
};

const AutoScrollCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;

  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 2000, stopOnMouseEnter: true }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  return (
    <div className={style.projects}>
      <div className={style.projects__viewport} ref={emblaRef}>
        <div className={style.projects__container}>
          {slides.map((data, index) => (
            <div
              onMouseLeave={toggleAutoplay}
              className={style.projects__slide}
              key={data.id}
            >
              <PortfolioCard {...data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
