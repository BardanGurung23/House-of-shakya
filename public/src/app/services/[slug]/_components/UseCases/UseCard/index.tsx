import React from "react";
import style from "./index.module.scss";
import Icons from "../../../../../../components/Icons";

export const UseCard = ({
  title,
  description,
  img_path,
}: {
  title: string;
  description: string;
  img_path: string;
}) => {
  return (
    <div className={style.card}>
      <div className={style.cardImgContainer}>
        <div className={style.iconLgContainer}>
          <Icons icon={img_path} className="" size={100} />
        </div>
        <div className={style.iconSmContainer}>
          <Icons icon={img_path} className="" size={50} />
        </div>
      </div>
      <div className={style.cardContent}>
        <p className={style.cardTitle}>{title}</p>
        <p className={style.cardDescription}>{description}</p>
      </div>
    </div>
  );
};
