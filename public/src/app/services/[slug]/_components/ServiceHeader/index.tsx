import React from "react";
import style from "./index.module.scss";
import { BreadCrumb } from "./BreadCrumb";
import { IMAGE_BASE_URL } from "../../../../../constants";

export const ServiceHeader = ({
  name,
  title,
  description,
  img_path,
}: {
  name: string;
  title: string;
  description: string;
  img_path: string;
}) => {
  return (
    <section className={style.sectionContainer}>
      <div className={`${style.sectionWrapper} container`}>
        <div className={style.contentContainer}>
          {/* <BreadCrumb name={name} /> */}
          <div className={style.textContent}>
            <h1 className={style.headerTitle}>{title}</h1>
            <p className={style.headerDescription}>{description}</p>
          </div>
        </div>
        <div className={style.imageContainer}>
          <img
            className={style.serviceImage}
            crossOrigin="anonymous"
            src={`${IMAGE_BASE_URL}${img_path}`}
            alt={`${name} logo`}
          />
        </div>
      </div>
    </section>
  );
};
