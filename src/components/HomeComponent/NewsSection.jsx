import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import BtnViewMore from "../Button/BtnViewMore";
import { getAllNews } from "../../constants/apiNews";

export default function NewsSection() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getAllNews();
      if (data && data.result) {
        const formattedData = data.result.data.map((newsItem) => ({
          ...newsItem,
          date: formatNewsDate(newsItem.date),
        }));
        setNewsData(formattedData);
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
    <div className="flex items-center justify-center flex-col h-screen ">
      <h1 className="font-semibold uppercase text-4xl mb-12">
        LoveHouse's News
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
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg  rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: `url(${news.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-cover bg-black opacity-10 group-hover:opacity-50 " />
              <div className="relative flex flex-col gap-3">
                <h1 className="text-xl lg:text-2xl font-semibold hover:text-white">
                  <NavLink to={`/news/newsDetail/${news.id}`}>
                    {" "}
                    {news.header}
                  </NavLink>
                </h1>
              </div>
              <NavLink to={`/news/newsDetail/${news.id}`}>
                <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
              </NavLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <NavLink to={"/news"}>
        <BtnViewMore />
      </NavLink>
    </div>
  );
}
