"use client";
import React from "react";
import "./styles.scss";
import "../../styles/embla.css";
import { PUBLIC_BACKEND_URL } from "../../../constants";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";
import Autoplay from "embla-carousel-autoplay";

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
  service: {
    name: string;
  };
}

async function getData() {
  const data = await fetch(`${PUBLIC_BACKEND_URL}portfolio/list`, {
    cache: "no-store",
  });
  if (data.ok) {
    return data.json();
  } else {
    console.log("error");
  }
}

const CardSlider: React.FC = () => {
  const [data, setData] = React.useState<PortfolioItem[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result.data.data);
    };
    fetchData();
  }, []);

  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <>
      {data && data.length > 0 && (
        <EmblaCarousel content={data} options={OPTIONS} />
      )}
    </>
  );
};

export default CardSlider;
