import style from "./index.module.scss";
import { FaCheck } from "react-icons/fa";

const dataLists = [
  "Brand Identity Reflection",
  "Responsive Design",
  "User- Friendly interface",
  "SEO and Localization",
  "Booking System",
  "Detailed Information Architecture",
];

export default function ProjectRequirementSection({
  title,
  requirements,
}: {
  title: string;
  requirements: string[];
}) {
  requirements =
    typeof requirements === "string" ? JSON.parse(requirements) : requirements;

  return (
    <section className={style.sectionContainer}>
      <div className={`${style.section} container`}>
        <h3 className={style.title}>Key Project Features</h3>
        <p className={style.subtitle}>{title}</p>
        <div className={style.lists}>
          <div className={style.leftContainer}>
            {requirements.map((list, i) => {
              if (i % 2 == 0)
                return (
                  <li key={i}>
                    <span>
                      <FaCheck />
                    </span>
                    <p>{list}</p>
                  </li>
                );
              return null;
            })}
          </div>
          <div className={style.rightContainer}>
            {requirements.map((list, i) => {
              if (i % 2 != 0)
                return (
                  <li key={i}>
                    <span>
                      <FaCheck />
                    </span>
                    <p>{list}</p>
                  </li>
                );
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <ul className={style.lists}>
        <li>
          <span>
            <FaCheck />
          </span>
          <p>Brand Identity Reflection</p>
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          <p>Brand Identisdfsdty Reflection</p>
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          <p>Brand Identitsfsdfsdfy Reflectisdfdfon</p>
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          <p>Brand Identity Reflection</p>
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          <p>Brand Identitsfsdfsdfdsy Reflection</p>
        </li>
        <li>
          <span>
            <FaCheck />
          </span>
          <p>Brand Identity Reflection</p>
        </li>
      </ul> */
}
