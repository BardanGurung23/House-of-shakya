import "./index.scss";

export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="page-main">
      <div className="page-frame">
        <div className="page-text">{title}</div>
        <p className="page-p">{description}</p>
      </div>
      <div className="design-baclground-main">
        <img src="/designleft.png" alt="" className="page-design-left" />
        <img
          src="/design-right.png"
          alt="Element"
          className="page-design-right"
        />
      </div>
    </div>
  );
}
