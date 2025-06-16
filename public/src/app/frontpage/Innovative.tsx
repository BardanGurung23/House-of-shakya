import React from "react";
import "./innovative.scss";
import CardSlider from "./slider/card";

const Innovative = () => {
  return (
    <>
      <div
        className="mb-2 mt-2 innovative-testimonial-color pb-5"
        id="portfolio"
      >
        <div className="portfolio-text ">
          <div className="frame-start mt-5">
            <div className="div">
              <div className="text-wrapper">Our Work</div>
              <div className="text-wrapper-2">
                Transforming Ideas Into Reality
              </div>
            </div>
            <p className="innovative-content">
              Discover how Tech Nirvana's expertise has driven innovation and excellence for our clients across various industries.
            </p>
          </div>
        </div>
        <CardSlider />
      </div>
    </>
  );
};

export default Innovative;
