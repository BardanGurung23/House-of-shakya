import React, { useEffect, useState } from "react";
import "./blog-details.scss";
import Image from "next/image";
import moment from "moment";
// import { useParams, useRouter } from "next/navigation";
import { IMAGE_BASE_URL, PUBLIC_BACKEND_URL } from "../../../constants";
import { getData } from "../../../utils/apiHandle";
import Link from "next/link";
import MetaData from "../../../components/MetaData";
import PageHeader from "../../../components/PageHeader";

interface BlogData {
  data: {
    title: string;
    date: string;
    author: string;
    description: string;
    blog_attachments: {
      attachment: {
        path: string;
      };
    }[];
  };
}

interface RecentBlog {
  data: {
    blog: {
      id: number;
      title: string;
      date: Date;
      blog_attachments: {
        attachment: {
          path: string;
        };
      }[];
    }[];
  };
}

const RecentBlogComponent = ({ title, date, image, id, slug }) => {
  return (
    <Link href={`/blogs/${slug}`} className="recent-blog-frame-card">
      <Image
        src={`${IMAGE_BASE_URL}${image}`}
        alt="image"
        width="100"
        height="100"
        className="recent-blog-image"
      />
      <div className="recent-blog-content">
        <span className="recent-blog-title">{title}</span>
        <span className="recent-blog-date">
          {moment(date).format("MMMM DD YYYY")}
        </span>
      </div>
    </Link>
  );
};

const BlogDetails = async (context) => {
  const {
    params: { slug },
  } = context;

  const blogRes = await getData(`blog/slug/${slug}`);

  const blog = blogRes.data;

  const latestBlogRes = await getData("blog/list");
  const filteredLatest = latestBlogRes.data.data.filter((b) => true);
  // const filteredLatest = latestBlogRes.data.data.filter(
  //   (b) => b.id === blog.id
  // );

  return (
    <>
      <MetaData
        title={blog.title}
        meta_description={blog.meta_description}
        seo_keywords={blog.meta_keywords}
        image_url={blog.image}
      />
      <PageHeader
        title="Blogs"
        description="Transforming information into inspiration, through our enriching
            blogs."
      />
      <div className="blog-details-main-page d-flex row">
        <div className="redirect-blog col-lg-8 col-md-7 col-sm-12">
          <div className="blog-details-main-frame">
            <div className="blog-details-main-title">{blog.title}</div>
            <div className="blog-details-date-author d-flex">
              <div className="blog-details-date">
                <i className="fa-solid fa-calendar-days"></i>
                {moment(blog.updatedAt).format("YYYY-MM-DD")}
              </div>
              {/* Format date with Moment.js */}
              <div className="blog-details-author">
                <i className="fa-solid fa-mobile-screen"></i> {blog.author}
              </div>
            </div>
            <Image
              src={`${IMAGE_BASE_URL}${blog.image}`}
              width={760}
              height={300}
              alt="BlogImage"
              objectFit="contain"
              className="blog-details-redirect-image"
            />
            <div className="blog-details-description">
              <div className="blog-details-redirect-des">Description</div>
              <div
                className="pt-[1.25rem] pr-[1.125rem] pb-[1.25rem] pl-[1.125rem] blog-details-redirect-p"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>
            <div className="blog-details-description">
              {/* <div className="blog-details-redirect-des">Summary</div> */}
              {/* <p className="blog-details-redirect-p">{data?.data.summary}</p> */}
            </div>
          </div>
        </div>
        {filteredLatest.length > 0 && (
          <div className="recent-blogs col-lg-4 col-md-5 col-sm-12">
            <span className="recent-text">Recent Blogs</span>
            <div className="recent-blog-frame">
              {filteredLatest.map((each) => (
                <RecentBlogComponent
                  title={each?.title}
                  date={each.updatedAt}
                  image={each?.image}
                  id={each.id}
                  slug={each.slug}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
