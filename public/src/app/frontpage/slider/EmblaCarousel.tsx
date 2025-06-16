"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "../../styles/font.scss";
import ClassNames from "embla-carousel-class-names";
import "../../styles/layout.scss";
import "./styles.scss";
import { IMAGE_BASE_URL } from "../../../constants";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { GoDotFill } from "react-icons/go";
import { DotButton, useDotButton } from "./CarouselDots";
import "./slider.scss";
import Link from "next/link";

interface ContentProps {
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
  service: {
    name: string;
  };
}
type PropType = {
  content: ContentProps[];
  options?: EmblaOptionsType;
};

const PortfolioCard = ({ each }: { each: ContentProps }) => {
  return (
    <>
      {/* desktop */}
      <div className="d-none d-lg-block">
        <div className="flex-col items-center padding box-shadow bg-white gap-3 height-half">
          <div className="flex-col items-center gap-2">
            <span className="portfolio-title">{each.title}</span>
            <span className="portfolio-project-type ">{each.service.name}</span>
          </div>
          <div className="flex-row justify-between">
            <p className="description-widt portfolio-description flex justify-center items-center p-5">
              <span className="line-clamp">{each.product_description}</span>
            </p>
            <Image
              src={`${IMAGE_BASE_URL}${each.portfolioLogo}`}
              alt="Portfolio logo"
              height={200}
              width={200}
            />
          </div>
          <Link href={`/portfolio/${each.slug}`} className="portfolio-button">
            <span>Learn More</span>
          </Link>
        </div>
      </div>

      {/* mobile */}
      <div className="d-block d-lg-none height-half">
        <div className="flex-col items-center p-4 box-shadow bg-white gap-3 height-half">
          <div className="flex-col items-center gap-2">
            <span className="portfolio-title">{each.title}</span>
            <span className="mobile-description-default-font ">
              {each.service.name}
            </span>
          </div>
          <div className="flex-col items-center">
            <Image
              src={`${IMAGE_BASE_URL}${each.portfolioLogo}`}
              alt="Portfolio logo"
              height={100}
              width={100}
            />
            {/* <p className=" flex justify-center items-center mt-4">
              <span className="line-clamp-3">{each.description}</span>
            </p> */}
            <Link
              href={`/portfolio/${each.slug}`}
              className="portfolio-button mt-3"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, content } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    ClassNames(),
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {content.map((each, index) => (
            <div className="embla__slide embla__class-names" key={index}>
              <PortfolioCard each={each} />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : "",
              )}
            >
              <GoDotFill />
            </DotButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
