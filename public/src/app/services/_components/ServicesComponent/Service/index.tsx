import React from "react";
import style from "./index.module.scss";
import Link from "next/link";
import { ServiceType } from "..";
import { IMAGE_BASE_URL } from "../../../../../constants";

export const Service = ({
  curve = "right",
  service,
}: {
  curve?: string;
  service: ServiceType;
}) => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`${style.service} underline-animation-parent`}
      style={{
        borderRadius: curve === "right" ? "0 0 2.25rem 0" : "0 0 0 2.25rem",
        alignSelf: curve === "right" ? "start" : "end",
      }}
    >
      <div className={style.serviceContent}>
        <div className={style.iconContainer}>
          <img
            crossOrigin="anonymous"
            className={style.icon}
            src={`${IMAGE_BASE_URL}${service.img_path}`}
            alt="title-icon"
          />
          <Link
            className={`${style.viewMore} ${style.hover_underline_animation}`}
            href={`/services/${service.slug}`}
          >
            Learn More
          </Link>
        </div>
        <div className={style.textContainer}>
          <h3 className={style.serviceName}>{service.name}</h3>
          <p className={style.serviceDescription}>{service.summary}</p>
        </div>
      </div>
    </Link>
  );
};
