import React, { useRef, useState, useEffect } from "react";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

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

function Slider() {
  const elementRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const scrollAmount = screenWidth - 110;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      if (elementRef.current) {
        let newScrollLeft = elementRef.current.scrollLeft + scrollAmount;
        if (
          newScrollLeft >=
          elementRef.current.scrollWidth - elementRef.current.clientWidth
        ) {
          // Reset to start if we've reached the end
          elementRef.current.scrollLeft = 0;
        } else {
          elementRef.current.scrollLeft = newScrollLeft;
        }
      }
    }, 3000); // Adjust time interval as needed
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [scrollAmount]);

  const sliderRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += scrollAmount;
    }
  };

  const sliderLeft = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= scrollAmount;
    }
  };

  return (
    <div className="slider-container w-full overflow-hidden">
      <HiChevronLeft
        className="hidden md:block text-dark text-[30px] absolute left-0 z-10 mx-8 mt-[255px] cursor-pointer"
        onClick={sliderLeft}
      />
      <HiChevronRight
        className="hidden md:block text-dark text-[30px] absolute right-0 z-10 mx-8 mt-[255px] cursor-pointer"
        onClick={sliderRight}
      />

      <div
        className="flex overflow-x-auto px-16 py-4 scrollbar-none scroll-smooth"
        ref={elementRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {imgList.map((item, index) => (
          <img
            src={item.img}
            alt={item.name}
            key={index}
            className="flex-none w-full md:h-[510px] object-cover object-left-top mr-5 rounded-md transition-all duration-100"
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
