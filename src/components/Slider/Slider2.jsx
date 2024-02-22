import React, { useRef, useState, useEffect } from "react";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const imgList = [
  {
    img: banner1,
    name: "item1",
  },
  {
    img: banner2,
    name: "item2",
  },
  {
    img: banner3,
    name: "item3",
  },
];

function Slider2() {
  const swiperRef = useRef(null);

  const sliderLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const sliderRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="slider-container overflow-hidden relative mt-0" >
      <div className="flex items-center justify-center flex-col mt-6 w-full ">
        <Swiper
          ref={swiperRef}
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 1,
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
          className="w-full max-w-[100%] lg:max-w-[80%]"
        >
          {imgList.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.img}
                alt={item.name}
                className="flex-none w-full md:h-[510px] object-cover object-left-top  rounded-tl-[80px]  transition-all duration-100"
                
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider2;
