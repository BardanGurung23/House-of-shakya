import React from "react";
import style from "./index.module.scss";
import { TechDomain } from "./TechDomain";

export default function Technologies({
  serviceName,
  techStacks,
}: {
  serviceName: string;
  techStacks: {
    title: string;
    technologies: {
      name: string;
      image: string;
    }[];
  }[];
}) {
  return (
    <section className={style.sectionBGWrapper}>
      <div className={`${style.sectionContainer} container`}>
        <h2 className={style.title}>Technologies we work with {serviceName}</h2>
        <div className={style.techDomainContainer}>
          {techStacks.reverse().map((domain) => (
            <TechDomain {...domain} />
          ))}
        </div>
      </div>
    </section>
  );
}
