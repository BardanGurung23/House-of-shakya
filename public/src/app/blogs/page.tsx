import React, { useEffect, useState } from "react";
import "./blog.scss";
import Link from "next/link";
import Blog from "./Blog";
import { getMetadata } from "../../utils/getMetadata";
import PageHeader from "../../components/PageHeader";

interface Blog {
  title?: string;
  author: string;
  date: string;
  summary: string;
  description: string;
}

export async function generateMetadata() {
  return await getMetadata("blogs");
}

const Page: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Blogs"
        description="Transforming information into inspiration, through our enriching
            blogs."
      />
      <Blog />
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

export default Page;
