"use client";
import style from "./index.module.scss";
import React, { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { IMAGE_BASE_URL } from "../../../../../../constants";
IMAGE_BASE_URL;

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const AutoScrollCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 1000 }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  return (
    <div className={style.industry}>
      <div className={style.industry__viewport} ref={emblaRef}>
        <div className={style.industry__container}>
          {slides.map((imgSrc, index) => (
            <div className={style.industry__slide} key={index}>
              <div className={style.industry__slide__number}>
                <img
                  crossOrigin="anonymous"
                  src={`${IMAGE_BASE_URL}${imgSrc}`}
                  alt="technologies"
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
