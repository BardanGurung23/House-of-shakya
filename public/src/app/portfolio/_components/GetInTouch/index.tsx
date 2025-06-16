import GITForm from "./GITForm";
import TextContent from "./TextContent";
import "./index.scss";

export default function GetInTouch() {
  return (
    <div className="GIT-container container">
      <h3 className="GIT-heading">Get In Touch</h3>
      <div className="GIT-content">
        <TextContent />
        <GITForm />
      </div>
    </div>
  );
}
