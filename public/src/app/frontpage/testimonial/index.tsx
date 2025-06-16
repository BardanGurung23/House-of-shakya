"use client";
import React, { useEffect, useState } from "react";
import "./testimonial.scss";
import { PUBLIC_BACKEND_URL } from "../../../constants";
import "../../styles/font.scss";
import "../../styles/layout.scss";
import Carousel from "./Carousel";
import { EmblaOptionsType } from "embla-carousel";
import "./testimonialEmbla.css";
import "../../styles/layout.scss";
import "./carousel.scss";
interface TestimonialAttachment {
  attachments: {
    path: string;
  }[];
}

interface TestimonialData {
  name: string;
  description: string;
  designation: string;
  image: string;
  portfolio: {
    title: string;
  };
}

interface TestimonialResponse {
  data: {
    data: TestimonialData[];
  };
}

async function getData(): Promise<TestimonialResponse | null> {
  try {
    const data = await fetch(`${PUBLIC_BACKEND_URL}testimonial/list`, {
      cache: "no-store",
    });
    if (data.ok) {
      return data.json();
    } else {
      console.error("Error fetching testimonial data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching testimonial data:", error);
    return null;
  }
}

const NewTestimonial: React.FC = () => {
  const [testimonialData, setTestimonialData] = useState<
    TestimonialData[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      if (res && res.data && res.data.data) {
        setTestimonialData(res.data.data);
      }
    };
    fetchData();
  }, []);

  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: "auto",
    loop: true,
    align: "start",
  };

  return (
    <>
      <div className="flex justify-center pt-2">
        <div className="flex py-[3.75rem] md:px-[5rem] gap-[3rem]">
          {/* for heading */}
          <div className="flex-col">
            <div className="flex flex-col items-center gap-[1rem]">
              <span className="what-our-client">What Our Clients Say</span>
              <span className="description-div our-client-description">
                Clients' satisfaction is our top priority. Hear from our valued
                customers about how our innovative solutions and exceptional
                service have made a difference in their businesses.
              </span>{" "}
            </div>
            <div className="flex-row justify-center mt-4 ">
              {testimonialData && testimonialData.length !== 0 && (
                <Carousel slides={testimonialData} options={OPTIONS} />
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTestimonial;
