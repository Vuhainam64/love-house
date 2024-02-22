import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { getAllProjects } from "../../../constants/apiHouseProject";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";

export default function OtherSection() {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getAllProjects();
      if (data && data.result) {
        setProjectData(data.result.data);
        setLoading(false);
      }
    };
    fetchProject();
  }, []);

  const filteredProjects = projectData.filter(
    (project) => project.sampleProject.projectType === 1
  );

  const firstSixItems = filteredProjects.slice(0, 5);
  return (
    <>
    <LoadingOverlay loading={loading} />
      <div className=" mx-auto px-4 sm:px-0 mb-24">
        <h1 className="font-semibold text-4xl mt-24 mb-12 text-center">
          Other Projects
        </h1>

        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 2,
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
          {firstSixItems.map((project, index) => (
            <SwiperSlide key={index}>
              <div key={project.sampleProject.id} className="p-4">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden mb-12">
                  <img
                    className="lg:h-72 md:h-48 w-full object-cover object-center"
                    src={project.staticFiles[1]?.url || ""}
                    alt={project.sampleProject.header}
                  />
                  <div className="p-6 hover:bg-baseGreen hover:text-white transition duration-300 ease-in">
                    <h1 className="text-2xl font-semibold mb-3">
                      <NavLink
                        to={`/house-roof-projects/details/${project.sampleProject.id}`}
                      >
                        {project.sampleProject.header.length >= 70
                          ? project.sampleProject.header
                              .substring(0, 50)
                              .trim() + "..."
                          : project.sampleProject.header}
                      </NavLink>
                    </h1>
                    <NavLink
                      to={`/house-roof-projects/details/${project.sampleProject.id}`}
                      className="text-indigo-300 hover:text-neutral-600 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      View Details
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
