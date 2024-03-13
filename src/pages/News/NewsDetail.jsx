import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNewsDetail } from "../../constants/apiNews";
import OtherNews from "../../components/NewsComponent/OtherNews";

import { FaRegCalendarAlt } from "react-icons/fa";

import { Navbar , Footer, LoadingOverlay} from "../../components";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";


export default function NewsDetail() {
  const [newsDetail, setNewsDetail] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNewsDetail = async () => {
      try {
        const data = await getNewsDetail(id);
        if (data && data.result) {
          const formattedData = {
            ...data.result.data,
            date: formatNewsDate(data.result.data.date),
          };
          setNewsDetail(formattedData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    fetchNewsDetail();
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
      <Navbar />
      <Breadcrumb />
      <div className="news-detail mb-12">
        <div className="mt-35 mb-25 sm:mt-25 sm:mb-15">
          <div className="wrapper max-w-[1200px] px-4 mx-auto">
            <div className="wraps">
              <div className="title text-left animate-delay-200">
                <h1 className="text-4xl font-semibold my-6">
                  {newsDetail.header}
                </h1>
              </div>

              <div className="content">
                <div className="date flex items-center mb-6 ">
                  <FaRegCalendarAlt
                    className="text-baseOrange pb-1"
                    size={20}
                  />
                  <div className="dateall pl-2">{newsDetail.date}</div>
                </div>

                <img
                  src={newsDetail.imageUrl}
                  alt=""
                  className=" w-full  h-[600px] mb-6"
                />

                <div
                  className="para text-justify"
                  dangerouslySetInnerHTML={{ __html: newsDetail.content }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <OtherNews />
      </div>
      <Footer />
    </>
  );
}