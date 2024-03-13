import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllBlogs } from "../../constants/apiBlog";

import { Navbar, Footer, LoadingOverlay } from "../../components";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";


export default function Blog() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const data = await getAllBlogs();
        if (data && data.result) {
          const formattedData = data.result.data.map((blog) => ({
            ...blog,
            date: formatBlogDate(blog.date),
          }));
          setBlogData(formattedData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlog();
  }, []);

  const formatBlogDate = (dateString) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }

    const truncatedContent = content.split(" ").slice(0, maxLength).join(" ");

    return `${truncatedContent}...`;
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <Navbar />
      <Breadcrumb />
      <section className="md:h-full flex items-center text-gray-600">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl text-gray-700 font-semibold">
              Our Blogs
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {blogData.map((blog) => (
              <div key={blog.id} className="p-4 sm:w-1/2 lg:w-1/3 w-[360px]">
                <div className="h-full  border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-[240px] md:h-48 w-full object-cover object-center"
                    src={blog.imageUrl}
                    alt="blog"
                  />
                  <div className="p-6 h-[315px] hover:bg-baseOrange hover:text-white transition duration-300 ease-in">
                    <h2 className="text-base font-semibold text-orange-300 mb-1">
                      {formatBlogDate(blog.date)}
                    </h2>
                    <h1 className="text-2xl font-semibold mb-3">
                      <NavLink to={`/blog/blogDetail/${blog.id}`}>
                        {blog.header.length >= 70
                          ? blog.header.substring(0, 50).trim() + "..."
                          : blog.header}
                      </NavLink>
                    </h1>

                    <div className="flex items-center flex-wrap ">
                      <NavLink
                        to={`/blog/blogDetail/${blog.id}`}
                        className="text-indigo-300 hover:text-neutral-600 inline-flex items-center md:mb-2 lg:mb-0"
                      >
                        Read More
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </NavLink>
                      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 ">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        1.2K
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
