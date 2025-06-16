import "./index.scss";

export default function PageHeader() {
  return (
    <div className="page-main">
      <div className="page-frame">
        <div className="page-text">Portfolio</div>
        <p className="page-p">
          Transforming Ideas into Reality : Our Portfolio of Achievements
        </p>
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
