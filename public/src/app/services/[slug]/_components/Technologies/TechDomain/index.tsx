import React from "react";
import style from "./index.module.scss";
import { IMAGE_BASE_URL } from "../../../../../../constants";

export const TechDomain = ({
  title,
  technologies,
}: {
  title: string;
  technologies: {
    name: string;
    image: string;
  }[];
}) => {
  return (
    <div className={style.domain}>
      <h3 className={style.domainTitle}>{title}</h3>
      <div className={style.techImgContainer}>
        {technologies.map((tech) => (
          <img
            crossOrigin="anonymous"
            className={style.techLogo}
            src={`${IMAGE_BASE_URL}${tech.image}`}
            alt={`${title} logo`}
          />
        ))}
      </div>
    </div>
  );
};
