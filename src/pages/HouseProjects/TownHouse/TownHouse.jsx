import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProjects } from "../../../constants/apiHouseProject";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import Navbar from "../../../components/Navbar/Navbar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Footer from "../../../components/Footer/Footer";


export default function TownHouse() {
  const [townHouseData, setTownHouseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTownHouse = async () => {
      const data = await getAllProjects();
      if (data && data.result) {
        setTownHouseData(data.result.data);
        setLoading(false);
      }
    };
    fetchTownHouse();
  }, []);

  const filteredProjects = townHouseData.filter(
    (project) => project.sampleProject.projectType === 1 /// NHỚ SỬA LẠI === 0
  );
  return (
    <>
      <LoadingOverlay loading={loading} />
      <Navbar/>
      <Breadcrumb/>
      <section className="md:h-full flex items-center text-gray-600">
        <div className="container px-2 py-24 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl text-gray-700 font-semibold">
              Town House Projects
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {filteredProjects.map((townhouse) => (
              <div
                key={townhouse.sampleProject.id}
                className="p-4 sm:w-1/2 lg:w-1/2"
              >
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-72 md:h-48 w-full object-cover object-center"
                    src={townhouse.staticFiles[1]?.url || ""}
                    alt={townhouse.sampleProject.header}
                  />
                  <div className="p-6 hover:bg-baseOrange hover:text-white transition duration-300 ease-in">
                    <h1 className="text-2xl font-semibold mb-3">
                      <NavLink to={`/town-house-projects/details/${townhouse.sampleProject.id}`}>
                        {townhouse.sampleProject.header.length >= 70
                          ? townhouse.sampleProject.header
                              .substring(0, 50)
                              .trim() + "..."
                          : townhouse.sampleProject.header}
                      </NavLink>
                    </h1>
                    <NavLink
                      to={`/town-house-projects/details/${townhouse.sampleProject.id}`}
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
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
