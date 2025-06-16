import "./index.scss";

export default function PageHeader() {
  return (
    <div className="page-main">
      <div className="page-frame">
        <div className="page-text">Services </div>
        <p className="page-p">
          Tech Nirvana provides a comprehensive suite of technology services
          designed to drive your business.
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
