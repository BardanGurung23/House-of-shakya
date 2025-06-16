import SpecializationCarousel from "./SpecializationCarousel";
import SpecializationText from "./SpecializationText";
import "./index.scss";

export default function OurSpecializations() {
  return (
    <div className="specialization-container">
      <div className="wrapper container">
        <h2 className="specialization-title">
          We specialize in serving the following industries
        </h2>
        <div className="child-container">
          <div className="child-left">
            <SpecializationCarousel />
          </div>
          <div className="child-right">
            <SpecializationText />
          </div>
        </div>
      </div>
    </div>
  );
}
