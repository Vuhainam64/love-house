import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { getAllNews } from "../../constants/apiNews";


export default function OtherNews() {
  const [newsData, setNewsData] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      const data = await getAllNews();
      if (data && data.result) {
        setNewsData(data.result.data);
      
      }
    };

    fetchNews();
  }, []);

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

  const firstSixItems = newsData.slice(0, 6);
  return (
    <>
   
      <div className="container mx-auto px-4 sm:px-0  mb-24">
        <h1 className="font-semibold uppercase text-4xl mt-24 mb-12 text-center">
          Other News
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
          {firstSixItems.map((news, index) => (
            <SwiperSlide key={index}>
              <div className="card rounded-md  overflow-hidden relative group">
                <img
                  src={news.imageUrl}
                  alt={news.header}
                  className="w-full h-[330px] transition-all transform group-hover:scale-110"
                />
                <div className="group-hover:bottom-0 transition-all absolute -bottom-20 left-0 text-white p-6 z-20">
                  <h4 className="mb-2 text-sm opacity-80">
                    {formatNewsDate(news.date)}
                  </h4>
                  <h3 className="mb-10 text-2xl">
                    <NavLink to={`/news/newsDetail/${news.id}`}>
                      {news.header.length >= 70
                        ? news.header.substring(0, 50).trim() + "..."
                        : news.header}
                    </NavLink>
                  </h3>
                  <NavLink
                    to={`/news/newsDetail/${news.id}`}
                    className="hover:bg-orange-600 transition-all text-sm inline-flex rounded-md px-4 py-2 text-center border-2 border-orange-600"
                  >
                    Read more
                  </NavLink>
                </div>
                <div className="z-10 h-1/2 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent"></div>
                <a
                  href="#"
                  className="absolute z-0 inset-0 bg-orange-600 opacity-0 group-hover:opacity-80 transition-all"
                ></a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
