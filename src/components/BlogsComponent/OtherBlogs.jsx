import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { getAllBlogs } from "../../constants/apiBlog";

export default function OtherBlogs() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getAllBlogs();
        if (data && data.result) {
          const formattedData = data.result.data.map((blog) => ({
            ...blog,
            date: formatBlogDate(blog.date),
          }));
          setBlogData(formattedData);
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
  const firstSixItems = blogData.slice(0, 6);
  return (
    <>
      <div className="container mx-auto px-4 sm:px-0 mb-24">
        <h1 className="font-semibold uppercase text-4xl mt-24 mb-12 text-center">
          Other Blogs
        </h1>
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="max-w-[90%] lg:max-w-[80%]"
        >
          {firstSixItems.map((blog, index) => (
            <SwiperSlide key={index}>
              <div key={blog.id} className="relative group rounded-md">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-72 md:h-48 w-full object-cover object-center"
                    src={blog.imageUrl}
                    alt="blog"
                  />
                  <div className="p-6 h-[315px] hover:bg-baseOrange hover:text-white transition duration-300 ease-in">
                    <h2 className="text-base font-semibold text-orange-300 mb-1">
                      {formatBlogDate(blog.date)}
                    </h2>
                    <h1 className="text-2xl font-semibold mb-3">
                      <NavLink to={`/blog/blogDetail/${blog.id}`}>
                        {blog.header.length >= 50
                          ? blog.header.substring(0, 30).trim() + "..."
                          : blog.header}
                      </NavLink>
                    </h1>

                    <p
                      className="leading-relaxed mb-2"
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(blog.content, 15),
                      }}
                    ></p>

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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
