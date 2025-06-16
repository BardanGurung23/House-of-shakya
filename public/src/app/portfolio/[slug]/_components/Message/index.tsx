import { IMAGE_BASE_URL } from "../../../../../constants";
import style from "./index.module.scss";
import { RiDoubleQuotesL } from "react-icons/ri";

export default function Message({
  message,
  author,
  designation,
  image,
}: {
  message: string;
  author: string;
  designation: string;
  image: string;
}) {
  return (
    <section className={`${style.section} container`}>
      <div className={style.quoteContainer}>
        <RiDoubleQuotesL />
      </div>
      <div className={`${style.messageContainer}`}>
        <p className={style.message}>{message}</p>
        <div className={`${style.authorContainer}`}>
          <div className={`${style.authorImgContainer}`}>
            <img
              crossOrigin="anonymous"
              src={`${IMAGE_BASE_URL}${image}`}
              alt={`${author} photo`}
            />
          </div>
          <div className={`${style.authorDetailsContainer}`}>
            <span className={`${style.authorName}`}>
              <strong>{author}</strong>
            </span>
            <span className={`${style.authorDesignation}`}>
              <em>{designation}</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
