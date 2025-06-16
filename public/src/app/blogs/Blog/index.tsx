"use client";
import React, { useEffect, useState } from "react";
import { PUBLIC_BACKEND_URL } from "../../../constants";
import CardBlog from "../card";
import Link from "next/link";

const getDataClient = async (path) => {
  const res = await fetch(`${PUBLIC_BACKEND_URL}${path}`);
  return await res.json();
};

export default function Blog() {
  const [blogs, setBlogs] = useState({
    data: [],
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  });
  const [blogCategory, setBlogCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(
    function () {
      async function fetchInit() {
        const data = await getDataClient(
          `blog/list?${
            activeCategory ? `blogCategoryId=${activeCategory}` : ""
          }`
        );
        setBlogs(data.data);
      }
      fetchInit();
    },
    [activeCategory]
  );

  useEffect(function () {
    async function fetchInit() {
      const data = await getDataClient("/blog-category/list");
      setBlogCategory(data.data.data);
    }
    fetchInit();
  }, []);

  return (
    <div className="event-mainn">
      <div className="mobile-nav-view">
        <div className="category-nav  gap-5">
          <div
            className={`mobile-design-nav ${
              null === activeCategory ? "text-bold" : ""
            }`}
            onClick={() => {
              setActiveCategory(null);
            }}
          >
            All
          </div>
          {blogCategory.map((each) => (
            <div
              className={`mobile-design-nav ${
                each.id === activeCategory ? "text-bold" : ""
              }`}
              key={each.id}
              onClick={() => {
                setActiveCategory(each.id);
              }}
            >
              {each.name}
            </div>
          ))}
        </div>
      </div>
      <CardBlog blog={blogs.data} />
      {blogs.data.length !== 0 && (
        <div className="load-more">
          <Link href="/blogs" className="load-more-button">
            LOAD MORE
          </Link>
        </div>
      )}
    </div>
  );
}
