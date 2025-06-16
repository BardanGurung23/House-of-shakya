"use client";
import "./index.scss";
import React, { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { IMAGE_BASE_URL } from "../../../../../constants";
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

type PropType = {
  slides: PortfolioItem[];
  options?: EmblaOptionsType;
};

const AutoScrollCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 2000 }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  return (
    <div className="industry">
      <div className="industry__viewport" ref={emblaRef}>
        <div className="industry__container">
          {slides.map((portfolio: PortfolioItem) => (
            <div className="industry__slide" key={portfolio.id}>
              <div className="industry__slide__number">
                <img
                  crossOrigin="anonymous"
                  src={`${IMAGE_BASE_URL}${portfolio.portfolioLogo}`}
                  alt={`${portfolio.title} logo`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
