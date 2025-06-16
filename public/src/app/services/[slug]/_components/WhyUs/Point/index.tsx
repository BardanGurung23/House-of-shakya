import React from "react";
import style from "./index.module.scss";

interface POINT {
  isLastPoint: boolean;
  heading: string;
  subtitle: string;
}

export default function Point({ isLastPoint, heading, subtitle }: POINT) {
  return (
    <div className={style.choosePoint}>
      <div className={style.icons}>
        <img src="/Vector.png" alt="cube image" />
        <div
          style={isLastPoint ? { backgroundColor: "transparent" } : {}}
          className={style.line}
        ></div>
      </div>
      <div className={style.textContent}>
        <div className={style.heading}>{heading}</div>
        <p className={style.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
