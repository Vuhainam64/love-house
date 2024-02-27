import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogDetail } from "../../constants/apiBlog";

import { FaRegCalendarAlt } from "react-icons/fa";

import OtherBlogs from "../../components/BlogsComponent/OtherBlogs";
import { Navbar, Footer, LoadingOverlay } from "../../components";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";


export default function BlogDetail() {
  const [blogDetail, setBlogDetail] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogDetail = async () => {
      try {
        const data = await getBlogDetail(id);
        if (data && data.result) {
          const formattedData = {
            ...data.result.data,
            date: formatNewsDate(data.result.data.date),
          };
          setBlogDetail(formattedData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  const formatNewsDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <>
    <LoadingOverlay loading={loading} />
    <Navbar/>
    <Breadcrumb/>
      <div className="blogs-detail mb-12">
        <div className="mt-35 mb-25 sm:mt-25 sm:mb-15">
          <div className="wrapper max-w-[1200px] px-4 mx-auto">
            <div className="wraps">
              <div className="title text-left animate-delay-200">
                <h1 className="text-4xl font-semibold my-6">
                  {blogDetail.header}
                </h1>
              </div>

              <div className="content">
                <div className="date flex items-center mb-6 ">
                  <FaRegCalendarAlt
                    className="text-baseOrange pb-1"
                    size={20}
                  />
                  <div className="dateall pl-2">{blogDetail.date}</div>
                </div>

                <img
                  src={blogDetail.imageUrl}
                  alt=""
                  className=" w-full  h-[600px] mb-6"
                />

                <div
                  className="para text-justify"
                  dangerouslySetInnerHTML={{ __html: blogDetail.content }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <OtherBlogs />
      </div>
      <Footer/>
    </>
  );
}
