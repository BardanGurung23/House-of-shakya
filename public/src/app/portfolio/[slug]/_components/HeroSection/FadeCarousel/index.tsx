"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import style from "./index.module.scss";
import { IMAGE_BASE_URL } from "../../../../../../constants";
type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const FadeCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Fade(),
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  return (
    <div className={style.embla}>
      <div className={style.embla__viewport} ref={emblaRef}>
        <div className={style.embla__container}>
          {slides.map((imgSrc, index) => (
            <div className={style.embla__slide} key={index}>
              <img
                crossOrigin="anonymous"
                className={style.embla__slide__img}
                src={`${IMAGE_BASE_URL}${imgSrc}`}
                alt="Company Image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FadeCarousel;
