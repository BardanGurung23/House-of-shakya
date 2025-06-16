import React from "react";
import style from "./index.module.scss";
import { UseCard } from "./UseCard";

export const UseCases = ({
  useCases,
  serviceName,
}: {
  serviceName: string;
  useCases: {
    title: string;
    description: string;
    img_path: string;
  }[];
}) => {
  return (
    <section className={`${style.sectionContainer} container`}>
      <h2 className={style.title}>Key Use Cases for {serviceName}</h2>
      <div className={style.usesContainer}>
        {useCases.map(
          (useCase: {
            title: string;
            description: string;
            img_path: string;
          }) => (
            <UseCard {...useCase} />
          ),
        )}
      </div>
    </section>
  );
};
