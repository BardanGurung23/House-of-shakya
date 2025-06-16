import style from "./index.module.scss";

export default function Introduction({
  introduction,
}: {
  introduction: string;
}) {
  return (
    <section className={`${style.section} container`}>
      <h3 className={style.title}>Introduction</h3>
      <p className={style.description}>{introduction}</p>
    </section>
  );
}
