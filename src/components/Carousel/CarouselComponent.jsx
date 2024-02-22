import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdMaximize } from "react-icons/md";
import main_image from "../../assets/images/main_image.jpg";
import section_two_image from "../../assets/images/section_two_image.jpg";
import bg_why from "../../assets/images/bg_why.jpg";
const responsive = [
  {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
];

export default function CarouselComponent() {


  const CustomDot = ({ onClick, active }) => {
    return (
      <li className={active ? "" : "text-white"} onClick={() => onClick()}>
        <MdMaximize className="text-5xl" />
      </li>
    );
  };

  const images = [
    main_image,
    section_two_image,
    bg_why,
  ];

  return (
    <>
      <Carousel
        
        swipeable={true}
        draggable={false}
        responsive={responsive}
        showDots
        arrows
       
        infinite
        autoPlay={true}
        autoPlaySpeed={200}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        customDot={<CustomDot />}
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt="" className="rounded-2xl" />
          </div>
        ))}
      </Carousel>
    </>
  );
}
