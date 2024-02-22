import React, { useState, useEffect, useContext } from "react";
import { getAllProjects } from "../../../constants/apiHouseProject";
import Navbar from "../../../components/Navbar/Navbar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Footer from "../../../components/Footer/Footer";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import HouseRoofItem from "./HouseRoofItem";
import Search from "../../../components/HouseProjectsComponent/Filter/Search";
import { HouseContext } from "../../../components/HouseProjectsComponent/Filter/HouseContext";
import HouseContextProvider from "../../../components/HouseProjectsComponent/Filter/HouseContext";

import {ImSpinner2} from "react-icons/im"

export default function HouseRoofList() {
  const [houseRoofData, setHouseRoofData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {houses, loadingg} = useContext(HouseContext)

  // if(loadingg){
  //   return (
  //     <ImSpinner2 className="mx-auto animate-spin text-baseGreen text-4xl mt-[200px]"/>
  //   )
  // }

  // if(houses.length < 1) {
  //   return (
  //    <div>Sorry, nothing found</div>
  //   )
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHouseRoof = async () => {
      const data = await getAllProjects();
      if (data && data.result) {
        setHouseRoofData(data.result.data);
        setLoading(false);
      }
    };
    fetchHouseRoof();
  }, []);

  const filteredProjects = houseRoofData.filter(
    (project) => project.sampleProject.projectType === 1
  );
  return (
    <>
   
    <LoadingOverlay loading={loading} />
      <Navbar />
      <Breadcrumb />
      <section className="md:h-full flex items-center text-gray-600 bg-[#f6ffed] ">
        <div className="container  py-24 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold">
              House Roof Projects
            </h1>
          </div>
          <Search/>
          <div className="grid md::grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
            {filteredProjects.map((houseroof) => (
              <div key={houseroof.sampleProject.id}>
                <HouseRoofItem
                  sampleProject={houseroof.sampleProject}
                  staticFile={houseroof.staticFiles}
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
