"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import style from "./embla.module.css";
import { GoDotFill } from "react-icons/go";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE_URL } from "../../../constants";
type PropType = {
  slides: { slug: string; img_path: string; name: string }[];
  options?: EmblaOptionsType;
};

const ServiceScrollCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 2700, stopOnInteraction: false }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const [isPlaying, setIsPlaying] = useState(false);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <div className={style.embla}>
      <div className={style.embla__viewport} ref={emblaRef}>
        <div className={style.embla__container}>
          {slides.map((each, index) => (
            <div className={style.embla__slide} key={index}>
              {/* <div className={style.embla__slide__number}> */}
              <Link
                href={`services/${each.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="col mb-5" key={index}>
                  <div className="card card-animation">
                    <div
                      style={{ justifyContent: "center" }}
                      className="card-body text-center frame"
                    >
                      <Image
                        src={`${IMAGE_BASE_URL}${each.img_path}`}
                        alt="Image"
                        height={500}
                        width={500}
                        className="NAS"
                      />
                      <div className="text-wrapper-2 wrapper">{each.name}</div>
                      {/* <p className="p">{each.summary}</p> */}
                    </div>
                  </div>
                </div>
              </Link>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>

      <div className={style.embla__controls}>
        <div className={style.embla__buttons}>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              >
                <GoDotFill />
              </DotButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceScrollCarousel;
