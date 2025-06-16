import React from "react";
import style from "./index.module.scss";
import Point from "./Point";
import Link from "next/link";

const pointContents = [
  {
    heading: "🚀 Innovative Approach",
    subtitle:
      "We embrace modern technologies and creative thinking to build solutions that are both practical and visionary.",
  },
  {
    heading: "👥 Client-Centric Process",
    subtitle:
      "We take time to understand your needs, working closely with you from concept to launch—and beyond.",
  },
  {
    heading: "🔧 Scalable Tech Solutions",
    subtitle:
      "Our systems are built to grow with your business, ensuring long-term value and flexibility.",
  },
  {
    heading: "🌍 Global Vision, Local Expertise",
    subtitle:
      "With deep roots in Nepal and a global mindset, we deliver world-class results with a personal touch.",
  },
];

export const WhyUs = () => {
  return (
    <section className={`${style.sectionContainer} container`}>
      <div className={style.contentLeft}>
        <h4 className={style.title}>Why Choose Tech Nirvana?</h4>
        <div>
          <p className={style.description}>
            At Tech Nirvana, we don’t just build software—we build solutions
            that grow with your business. With a team of passionate engineers,
            designers, and strategists, we combine innovation, functionality,
            and purpose to create technology that drives results. From startups
            to established enterprises, we’ve helped clients transform their
            digital presence and streamline their operations through scalable,
            smart, and beautifully crafted tech. Our process is collaborative,
            our solutions are future-ready, and our commitment is unwavering.
          </p>
          <Link href={"/company"} className={`${style.btn}`}>
            Get Started
          </Link>
        </div>
      </div>
      <div className={style.contentRight}>
        {pointContents.map((point, i) => (
          <Point
            heading={point.heading}
            subtitle={point.subtitle}
            isLastPoint={pointContents.length === i + 1}
          />
        ))}
        <Link href={"#"} className={`${style.btn}`}>
          Get Started
        </Link>
      </div>
    </section>
  );
};
