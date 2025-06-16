"use client";
import "./index.scss";
import React, { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

type PropType = {
  slides: { icon: string; title: string }[];
  options?: EmblaOptionsType;
};

const AutoScrollCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 1500, stopOnInteraction: false }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  return (
    <div className="specialization">
      <div className="specialization__viewport" ref={emblaRef}>
        <div className="specialization__container">
          {slides.map((industry, i, _) => (
            <div className="specialization__slide" key={i}>
              <div className="specialization__slide__number">
                <img
                  className="specialization_icon"
                  src={industry.icon}
                  alt={industry.title}
                />
                <p className="specialization_title">{industry.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="specialization__controls">
        <div className="specialization__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"specialization__dot".concat(
                index === selectedIndex ? " specialization__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
