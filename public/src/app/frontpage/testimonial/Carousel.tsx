import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { IMAGE_BASE_URL, Quotation } from "../../../constants";
import "./carousel.scss";
import { DotButton, useDotButton } from "../slider/CarouselDots";
import Autoplay from "embla-carousel-autoplay";
import { GoDotFill } from "react-icons/go";

type PropType = {
  slides: SlidesProps[];
  options?: EmblaOptionsType;
};

interface SlidesProps {
  name: string;
  description: string;
  designation: string;
  image: string;
  portfolio: {
    title: string;
  };
}

interface TestimonialType {
  name: string;
  description: string;
  designation: string;
  image: string;
  portfolio: {
    title: string;
  };
}

function TestimonialCard({
  designation,
  name,
  image,
  description,
  portfolio,
}: TestimonialType) {
  return (
    <div className="flex flex-col p-4 box-shadow gap-4 testimonial-main-carousel">
      <Image src={Quotation} alt="Quotation" />
      <span className="pr-[2rem]  testimonial-client-content">
        {description}
      </span>
      <div className="flex-row gap-2 rounded-full">
        <img
          src={`${IMAGE_BASE_URL}${image}`}
          alt="User Image"
          height={55}
          width={55}
          style={{ objectFit: "cover" }}
          className="rounded-image"
          crossOrigin="anonymous"
        />
        <div className="flex-col justify-center ">
          <span className="testimonial-customer-name">{name}</span>
          <span className="testomonial-customer-designation">
            {`${designation}`}
          </span>
        </div>
      </div>
    </div>
  );
}

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla1">
      <div className="embla__viewport1" ref={emblaRef}>
        <div className="embla__container1">
          {slides.map((each, index) => (
            <div className="embla__slide1 p-4" key={index}>
              <TestimonialCard
                designation={each.designation}
                name={each.name}
                image={each.image}
                description={each.description}
                portfolio={each.portfolio}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls1">
        <div className="embla__dots1">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot1".concat(
                index === selectedIndex ? " embla__dot--selected1" : ""
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

export default Carousel;
