import React from "react";
import style from "./index.module.scss";
import { PhaseLeft } from "./Phase/PhaseLeft";
import { PhaseRight } from "./Phase/PhaseRight";

const roadmapData = [
  {
    title: "Requirement Analysis",
    description:
      "We conduct a comprehensive analysis of your requirements to establish a solid foundation for your website, ensuring it aligns with your business goals and user needs",
    iconSrc: "/data-analytics.png",
  },
  {
    title: "Planning",
    description:
      "We develop detailed plans and customized strategies to create a clear roadmap for success, ensuring all elements align with your goals and objectives.",
    iconSrc: "/planning.png",
  },
  {
    title: "Design",
    description:
      "In the design phase, we craft UI/UX aligned with your vision using cutting-edge technology, ensuring an exceptional user experience that is both visually appealing and highly functional.",
    iconSrc: "/design.png",
  },
  {
    title: "Development",
    description:
      "We develop detailed plans and customized strategies to create a clear roadmap for success, ensuring all elements align with your goals and objectives.",
    iconSrc: "/development.png",
  },
  {
    title: "System and QA Testing",
    description:
      "We guarantee reliability with thorough system testing and QA, ensuring a robust website and smooth user experience.",
    iconSrc: "/testing.png",
  },
  {
    title: "Deployment",
    description:
      "After finalizing quality checks, we deploy the website to a live environment for full-scale access.",
    iconSrc: "/deployment.png",
  },
  {
    title: "Maintenance & Optimization",
    description:
      "After deployment, we offer continuous maintenance and support to ensure your website performs at its best.",
    iconSrc: "/maintenance.png",
  },
  {
    title: "Analytics & Reporting",
    description:
      "After launch, we provide detailed analytics and reporting to track performance and guide ongoing improvements.",
    iconSrc: "/analytics.png",
  },
];

export const Roadmaps = () => {
  return (
    <section className={`${style.roadmapSection} container`}>
      <div className={style.roadmapTitleContents}>
        <h3 className={style.title}>Roadmap</h3>
        <p className={style.subtitle}>
          Combining high functionality and visual appeal, tailored to meet your
          specific needs.
        </p>
      </div>
      <div className={`${style.phasesContainer} container`}>
        {roadmapData.map((data, i) =>
          i % 2 === 0 ? (
            <PhaseLeft {...data} SN={i + 1} />
          ) : (
            <PhaseRight SN={i + 1} {...data} />
          )
        )}
      </div>
    </section>
  );
};
