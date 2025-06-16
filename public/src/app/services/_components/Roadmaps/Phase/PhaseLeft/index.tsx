import React from "react";
import styleBoth from "../bothPhase.module.scss";
import style from "./index.module.scss";

export const PhaseLeft = ({ title, description, iconSrc, SN }) => {
  return (
    <div className={`${styleBoth.phaseContainer} ${style.phaseContainer}`}>
      <div className={styleBoth.phaseTitle}>
        <span className={styleBoth.phaseNumber}>{SN}.</span>
        {title}
      </div>
      <p className={styleBoth.phaseDescription}>{description}</p>
      <div className={`${style.iconContainer} ${styleBoth.iconContainer}`}>
        <img src={iconSrc} alt="requirement analysis logo" />
      </div>
    </div>
  );
};
