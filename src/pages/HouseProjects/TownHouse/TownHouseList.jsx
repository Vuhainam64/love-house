import React, { useState, useEffect } from "react";
import { getAllProjects } from "../../../constants/apiHouseProject";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import Navbar from "../../../components/Navbar/Navbar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Footer from "../../../components/Footer/Footer";
import TownHouseItem from "./TownHouseItem";

export default function TownHouseList() {
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
      <Navbar />
      <Breadcrumb />
      <section className="md:h-full flex items-center text-gray-600">
        <div className="container  py-24 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold">
              Town House Projects
            </h1>
          </div>
          <div className="grid md::grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
            {filteredProjects.map((townhouse) => (
              <div key={townhouse.sampleProject.id}>
                <TownHouseItem
                  sampleProject={townhouse.sampleProject}
                  staticFile={townhouse.staticFiles}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
