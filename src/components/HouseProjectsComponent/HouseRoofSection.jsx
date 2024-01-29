import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import BtnViewMore from "../Button/BtnViewMore";
import { getAllProjects } from "../../constants/apiHouseProject";
import LoadingOverlay from "../Loading/LoadingOverlay";

export default function HouseRoofSection() {
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

  const firstSixItems = filteredProjects.slice(0, 6);
  return (
    <>
     <LoadingOverlay loading={loading} />
      <div className=" mx-auto px-4 sm:px-0 mb-24">
        <h1 className="font-semibold uppercase text-4xl my-12 text-center">
          House Roof
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
          {firstSixItems.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="card rounded-md  overflow-hidden relative group">
                <img
                  src={project.staticFiles[1]?.url || ""}
                  alt={project.sampleProject.header}
                  className="w-full h-[330px] transition-all transform group-hover:scale-110"
                />
                <div className="group-hover:bottom-0 transition-all absolute -bottom-20 left-0 text-white p-6 z-20">
                  <h3 className="mb-10 text-2xl">
                    <NavLink
                      to={`/house-roof-projects/details/${project.sampleProject.id}`}
                    >
                      {project.sampleProject.header &&
                        (project.sampleProject.header.length >= 70
                          ? project.sampleProject.header
                              .substring(0, 50)
                              .trim() + "..."
                          : project.sampleProject.header)}
                    </NavLink>
                  </h3>
                  <NavLink
                    to={`/house-roof-projects/details/${project.sampleProject.id}`}
                    className="hover:bg-orange-600 transition-all text-sm inline-flex rounded-md px-4 py-2 text-center border-2 border-orange-600"
                  >
                    View details
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

        <NavLink to="/house-roof-projects" className="flex justify-center">
          <BtnViewMore />
        </NavLink>
      </div>
    </>
  );
}
