import React from "react";
import "./mission-vision.scss";

const MissionVission = () => {
  return (
    <>
      <div className="mission-vision-main">
        <div className="mission-main">
          <div className="mission-text">Mission</div>
          <div className="mission-frame">
            <div className="mission-image-div">
              <img
                src="/missionoffice.jpg"
                alt="Mission"
                className="mission-image"
              />
            </div>
            <div className="mission-content">
              <div className="mission-group-text">
                <div className="mission-left">
                  <img src="leftside.png" alt="Left" />
                </div>
                <p className="mission-description">
                  Our mission is to create a research-based IT company that
                  solves global problems through innovative technology
                  solutions.
                </p>
                <div className="mission-right">
                  <img src="rightside.png" alt="Right" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vision-main">
          <div className="vision-text">Vision</div>
          <div className="vision-frame">
            <div className="vision-content">
              <div className="vision-group-text">
                <div className="vision-left">
                  <img src="leftside.png" alt="Left" />
                </div>
                <p className="vision-description">
                  Our vision is to address the world's sustainability challenges
                  and establish ourselves as a renowned tech company globally,
                  proudly representing Nepal.
                </p>
                <div className="vision-right">
                  <img src="rightside.png" alt="Right" />
                </div>
              </div>
            </div>
            <div className="vision-image-div">
              <img
                src="/visionoffice.jpg"
                alt="vision"
                className="vision-image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionVission;
