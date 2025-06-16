import React from "react";
import "./company.scss";
import { Technologies } from "./_technologies";
import { PUBLIC_BACKEND_URL } from "../../constants";
import MissionVission from "./mission-vision";
import CoreValue from "./corevalue";
import { getMetadata } from "../../utils/getMetadata";
import Link from "next/link";
import { WorkingTechnologies } from "./WorkingTechnologies";
import PageHeader from "../../components/PageHeader";

type Props = {
  param: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};
export interface SeoData {
  title: string;
  description: string;
  author: string;
  keywords: { keywordTitle: string }[];
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
}

export interface Metadata {
  title: string;
  description: string;
  authors: { name: string }[];
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
}

export async function generateMetadata() {
  return await getMetadata("company");
}

const page = () => {
  return (
    <>
      <PageHeader
        title="Company"
        description="We are dedicated to push the boundaries of technology"
      />

      {/* mission vision section */}
      <MissionVission />

      {/* core value section */}
      <CoreValue />

      {/* event section */}
      {/* <Technologies /> */}
      <WorkingTechnologies />

      {/* for call section */}
      <div className="blog-call-main">
        <div className="blog-call-frame">
          <div className="blog-call-text-wrapper">
            <span>
              Every outstanding initiative starts with a fruitful conversation
            </span>
          </div>
          <div className="blog-call">
            <Link
              className="blog-call-button"
              href="https://calendly.com/info-nirvanatechnology/30min?month=2024-04"
            >
              Schedule a discovery call
            </Link>
          </div>
        </div>
        <div className="blog-design-background">
          <img src="callleft.png" alt="" className="blog-call-left" />
          <img src="callright.png" alt="" className="blog-call-right" />
        </div>
      </div>
    </>
  );
};

export default page;
