"use client";
import React, { useState } from "react";
import "./index.scss";
import { Button } from "react-bootstrap";

const imageData = [
  {
    category: "Web Development",
    image: "react.png",
    link: "https://reactjs.org/",
  },
  {
    category: "Web Development",
    image: "next.png",
    link: "https://nextjs.org/",
  },
  {
    category: "Web Development",
    image: "nodejs.png",
    link: "https://nodejs.org/en/",
  },
  {
    category: "Web Development",
    image: "postgress.png",
    link: "https://www.postgresql.org/",
  },
  {
    category: "Web Development",
    image: "mysql.png",
    link: "https://www.mysql.com/",
  },
  // { category: "Web Development", image: "aws.png",link:"https://aws.amazon.com/" },
  // { category: "Web Development", image: "digitalocean.png",link:"https://www.digitalocean.com" },
  // { category: "Web Development", image: "linux.png",link:"https://www.linux.org/" },

  {
    category: "Mobile App Development",
    image: "reactnative.png",
    link: "https://reactnative.dev/",
  },
  {
    category: "Mobile App Development",
    image: "flutter.png",
    link: "https://flutter.dev",
  },
  {
    category: "Mobile App Development",
    image: "nodejs.png",
    link: "https://nodejs.org/en/",
  },
  {
    category: "Mobile App Development",
    image: "firebase.png",
    link: "https://firebase.google.com/",
  },
  // { category: "Mobile App Development", image: "vscode.png",link:"https://code.visualstudio.com/" },
  {
    category: "Mobile App Development",
    image: "xcode.png",
    link: "https://developer.apple.com/xcode/",
  },
  // { category: "Mobile App Development", image: "appstore.png",link:"https://www.apple.com/app-store/" },
  // { category: "Mobile App Development", image: "playstore.png",link:"https://play.google.com/" },

  {
    category: "Digital Marketing",
    image: "googleanalytics.png",
    link: "https://www.google.com/analytics/",
  },
  { category: "Digital Marketing", image: "metaanalytics.png", link: "" },
  { category: "Digital Marketing", image: "GTMetrix.png" },
  { category: "Digital Marketing", image: "pixel.png" },
  { category: "Digital Marketing", image: "brevo.png" },
  { category: "Digital Marketing", image: "google_my_business.png" },
  { category: "Digital Marketing", image: "zapier.png" },

  { category: "UI/UX Design", image: "figma.png" },
  { category: "UI/UX Design", image: "miro.png" },
  // { category: "UI/UX Design", image: "Sketch.png" },
  { category: "UI/UX Design", image: "photoshop.png" },
  { category: "UI/UX Design", image: "Illustrator.png" },
  { category: "UI/UX Design", image: "lucid_chart.png" },

  { category: "AI & Automation", image: "opencv.png" },
  { category: "AI & Automation", image: "tensorflow.png" },
  { category: "AI & Automation", image: "scikitlearn.png" },
  { category: "AI & Automation", image: "python.png" },
  // { category: "AI & Automation", image: "aws.png" },
  // { category: "AI & Automation", image: "google-cloud.png" },
  // { category: "AI & Automation", image: "postgress.png" },
  // { category: "AI & Automation", image: "mongodb.png" },

  { category: "Blockchain & Security", image: "react.png" },
  // { category: "Blockchain & Security", image: "next.png" },
  { category: "Blockchain & Security", image: "rust.png" },
  { category: "Blockchain & Security", image: "solidity.png" },
  // { category: "Blockchain & Security", image: "polygon.png" },
  { category: "Blockchain & Security", image: "Solana.png" },
  { category: "Blockchain & Security", image: "Ethereum.png" },
];

const filterImage = (category: string) => {
  const filteredImage = imageData.filter((item) => item.category === category);
  return filteredImage;
};

export const WorkingTechnologies = () => {
  const [selectedCategory, setSelectedCategory] = useState("UI/UX Design");

  // const filteredImages = selectedCategory === "UI/UX Design" ? imageData : imageData.filter(item => item.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="tech-stack-section">
        <div className="tech-text">Technologies we Worked with</div>
        <div className="company-mobile-nav-view ">
          <div className="comapny-category d-flex flex-row gap-5 ">
            <Button
              variant="link"
              className={
                selectedCategory === "UI/UX Design"
                  ? "company-design-nav active text-black fw-bold"
                  : "company-design-nav"
              }
              onClick={() => handleCategoryChange("UI/UX Design")}
            >
              UI/UX Design
            </Button>
            <Button
              variant="link"
              className={
                selectedCategory === "Web Development"
                  ? "company-design-nav active text-black fw-bold"
                  : "company-design-nav"
              }
              onClick={() => handleCategoryChange("Web Development")}
            >
              Web Development
            </Button>
            <Button
              variant="link"
              className={
                selectedCategory === "Mobile App Development"
                  ? "company-design-nav active text-black fw-bold"
                  : "company-design-nav"
              }
              onClick={() => handleCategoryChange("Mobile App Development")}
            >
              Mobile App Development
            </Button>
            <Button
              variant="link"
              className={
                selectedCategory === "Digital Marketing"
                  ? "company-design-nav active text-black fw-bold"
                  : "company-design-nav"
              }
              onClick={() => handleCategoryChange("Digital Marketing")}
            >
              Digital Marketing
            </Button>
            <Button
              variant="link"
              className={
                selectedCategory === "AI & Automation"
                  ? "company-design-nav active text-black fw-bold"
                  : "company-design-nav"
              }
              onClick={() => handleCategoryChange("AI & Automation")}
            >
              AI & Automation
            </Button>
            <Button
              variant="link"
              className={
                selectedCategory === "Blockchain & Security"
                  ? "company-design-nav active text-black fw-bold"
                  : "company-design-nav"
              }
              onClick={() => handleCategoryChange("Blockchain & Security")}
            >
              Blockchain & Security
            </Button>
          </div>
        </div>

        <div className="tech-frame-2 d-flex justify-content-center m">
          {filterImage(selectedCategory).map((item, index) => (
            <img
              key={index}
              src={`/${item.image}`}
              alt={item.category}
              className="tech-image"
            />
          ))}
        </div>
      </div>
    </>
  );
};
