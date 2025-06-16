import React from "react";
import style from "./index.module.scss";
import { Service } from "./Service";
import { getData } from "../../../../utils/apiHandle";

export interface ServiceType {
  id: number;
  title: string;
  img_path: string;
  name: string;
  slug: string;
  description: string;
  seo_title: string;
  seo_author: string;
  seo_keywords: string[];
  seo_og_description: string;
  summary: string;
}

export const ServicesComponent = async () => {
  const res = await getData("service/list");

  const services: ServiceType[] = res?.data?.data;
  return (
    <section className={`${style.servicesSection} container`}>
      {services.map((service, i) => (
        <Service
          key={service.id}
          service={service}
          curve={(i + 1) % 2 === 0 ? "left" : "right"}
        />
      ))}
    </section>
  );
};
