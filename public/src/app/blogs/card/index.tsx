"use client";
import React from "react";
import "./card.scss";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL } from "../../../constants";
import moment from "moment";

const CardBlog = ({ blog }) => {
  if (blog.length === 0)
    return (
      <p
        style={{
          margin: "10rem auto",
          width: "fit-content",
        }}
      >
        No blogs found
      </p>
    );
  return (
    <div className="card-main">
      <div className="card-main-div row row-cols-2 row-cols-md-2 row-cols-lg-3">
        {blog &&
          blog.map((each) => (
            <div className="col blog-card">
              <div className="image-div">
                <Image
                  src={`${IMAGE_BASE_URL}${each?.image}`}
                  alt="Image"
                  height={500}
                  width={500}
                  className="blog-image"
                />
              </div>
              <div className="blog-card-frame">
                <div className="blog-card-text">
                  {moment(each.date).format("MMM DD YYYY")}
                </div>
                <div className="blog-div">
                  <div className="blog-card-frame-2">
                    <p className="blog-card-text-2">{each.title}</p>
                    <p className="blog-card-text-3">{each.summary}</p>
                  </div>
                  <Link
                    href={`blogs/${each.slug}`}
                    className="blog-card-button"
                  >
                    <span>Read a full post</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardBlog;
