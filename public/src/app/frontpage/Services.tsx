"use client";
import React from "react";
import "./services.scss";
import Image from "next/image";
import { IMAGE_BASE_URL, PUBLIC_BACKEND_URL } from "../../constants";
import Link from "next/link";
import ServiceScrollCarousel from "./ServiceScrollCarousel/ServiceScrollCarousel";
import { EmblaOptionsType } from "embla-carousel";

interface ServiceAttachment {
  path: string;
}

interface ServiceData {
  id: number;
  name: string;
  description: string;
  img_path: string;
  slug: string;
  seo_title: string;
  seo_author: string;
  seo_keywords: string[];
  seo_og_title: string;
  seo_og_description: string;
  summary: string;
}

interface ResponseData {
  data: {
    data: ServiceData[];
  };
}

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

async function getData(): Promise<ResponseData | undefined> {
  try {
    const response = await fetch(`${PUBLIC_BACKEND_URL}service/list`, {
      cache: "no-store",
    });
    if (response.ok) {
      return response.json();
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

const Services: React.FC = () => {
  const [responseData, setResponseData] = React.useState<
    ResponseData | undefined
  >(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setResponseData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {responseData &&
        responseData.data &&
        responseData.data.data &&
        responseData.data.data.length !== 0 && (
          <div>
            <div className="services m-5">
              <div className="service-text-info">
                <p className="text-wrapper">Our Expertise</p>
                <p className="text-wrapper-2">
                  Tech Nirvana provides a comprehensive suite of technology
                  services designed to drive your business.
                </p>
              </div>

              {/* <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4 justify-content-center mx-3 mx-md-auto mx-lg-auto desktop-view"> */}
            </div>
            <div className="desktop-view" style={{ width: "98vw" }}>
              <ServiceScrollCarousel
                slides={responseData.data.data}
                options={{ loop: true }}
              />
            </div>

            {/* mobile view */}
            <div className="service-mobile">
              <div id="carouselExample" className="carousel slide mobile-view">
                <div className="carousel-inner">
                  {responseData.data.data.map((each, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <div className="mb-5">
                        <div className="card">
                          <div className="card-body text-center frame">
                            <Image
                              src={`${IMAGE_BASE_URL}${each.img_path}`}
                              alt="Image"
                              height={500}
                              width={500}
                              className="NAS"
                            />
                            <div className="text-wrapper-2 wrapper">
                              {each.name}
                            </div>
                            {/* <p className="p">{each.summary}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev service-previous"
                    aria-hidden="true"
                  ></span>
                  {/* <span className="visually-hidden">Previous</span> */}
                  <img
                    src="/service-left.png"
                    alt="left"
                    className=" service-previous"
                  />
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next service-next"
                    aria-hidden="true"
                  ></span>
                  {/* <span className="visually-hidden">Next</span> */}
                  <img
                    src="/service-right.png"
                    alt="right"
                    className="service-next"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Services;
