"use client";
import "../../../styles/layout.scss";
import "../../../styles/font.scss";
import "../../../styles/colors.scss";
import Link from "next/link";
import "./jobcard.scss";
export default function JobCard({ data }) {
  return (
    <div className="flex-ro justify-around width-full p-4 vacancy-mobile-apply">
      <div className="flex-col vacancy-title-location gap-2">
        <span className="current-vacancy-title">{data.title}</span>
        <span className=" current-vacancy-location">{data.location}</span>
      </div>
      <div className="d-none d-md-block">
        <div className="flex-col">
          <div className="hidden-visibility">hidden</div>
          <div className="current-vacancy-static-text">{data.type}</div>
        </div>
      </div>
      {/* <button> */}
      <div className="vacancy-button-div">
        <Link
          href={`careers/${data.slug}`}
          className="text-white text-decoration-none"
        >
          <span className="current-vacancy-apply">Apply Now</span>
        </Link>
      </div>
      {/* </button> */}
    </div>
  );
}
