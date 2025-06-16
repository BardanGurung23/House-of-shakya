import style from "./index.module.scss";

export default function ChallengesAndSolutions({
  challenges,
  solution,
}: {
  challenges: string;
  solution: string;
}) {
  return (
    <section className={`${style.sectionContainer}`}>
      <div className={`${style.section} container`}>
        <div className={style.topicContainer}>
          <div className={style.topicTitle}>Business Requirement</div>
          <p className={style.topicDescription}>{challenges}</p>
        </div>
        <div className={style.topicContainer}>
          <div className={style.topicTitle}>Provided Solution</div>
          <p className={style.topicDescription}>{solution}</p>
        </div>
      </div>
    </section>
  );
}
