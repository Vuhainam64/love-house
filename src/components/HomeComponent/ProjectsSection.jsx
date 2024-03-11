import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { RxArrowRight } from "react-icons/rx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import BtnViewMore from "../Button/BtnViewMore";
import { getAllProjects } from "../../constants/apiProject";

function ProjectsSection() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      if (data && data.result) {
        setProjectData(data.result.data);
      }
    };

    fetchProjects();
  }, []);

  const firstEightItems = projectData.slice(0, 8);

  // Check if projectData exists and is not an empty array
  if (!projectData || projectData.length === 0) {
    return null; // Or display a loading state or message
  }

  const slideItems = [firstEightItems.slice(0, 4), firstEightItems.slice(4, 8)];

  return (
    <div className="h-[600px] flex flex-col md:flex-row gap-5 items-center justify-center pt-28 mt-12 mb-36 lg:mb-24">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold uppercase">
          finished construction projects<span className="text-red-500">.</span>
        </h1>

        <p className=" text-[16px] max-w-[400px] text-neutral-500 leading-7 items-center text-justify pt-4 flex flex-col justify-center">
          Summary of LOVEHOUSE's completed construction projects. Our portfolio
          reflects a commitment to excellence, showcasing a harmonious blend of
          modern design and sustainable practices.
        </p>
        <NavLink to={"/houseProject"}>
          <BtnViewMore />
        </NavLink>
      </div>
      <div className="w-[70%] md:w-[40%]">
        <Swiper
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
        >
          {slideItems.map((firstEightItems, slideIndex) => (
            <SwiperSlide key={slideIndex} className="mb-14">
              <div className="grid grid-cols-2 gap-4 px-10">
                {firstEightItems.map((project, index) => (
                  <div className="relative group" key={index}>
                    {project.staticFiles &&
                      project.staticFiles.length > 1 &&
                      project.staticFiles[1].url && (
                        <>
                          <img
                            src={project.staticFiles[0].url}
                            alt="purple image"
                            className="rounded-md h-[240px] w-[240px] object-cover"
                          />
                          <div className="cursor-pointer absolute inset-0 bg-gradient-to-r max-w-[240px] rounded-md from-purple-800 via-pink-500 to-purple-800 opacity-0 group-hover:opacity-70" />
                          <div className="absolute text-white inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                            <NavLink
                              to={`/house-projects/details/${project.sampleProject.id}`}
                            >
                              View Project
                            </NavLink>
                            <RxArrowRight className="ml-2 w-[24px] h-[24px]" />
                          </div>
                        </>
                      )}
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProjectsSection;
