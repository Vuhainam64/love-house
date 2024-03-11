import React, { useState, useEffect, useContext } from "react";
import { getAllProjects } from "../../constants/apiHouseProject"
import { LoadingOverlay } from "../../components";
import HouseItem from "./HouseItem";

export default function HouseProjectList() {
    const [houseData, setHouseData] = useState([]);
    const [loading, setLoading] = useState(true);
    //const {houses, loadingg} = useContext(HouseContext)
  
    useEffect(() => {
      window.scrollTo(0, 0);
      const fetchHouse = async () => {
        const data = await getAllProjects();
        if (data && data.result) {
          setHouseData(data.result.data);
          setLoading(false);
        }
      };
      fetchHouse();
    }, []);
  
   
    return (
      <>
     
      <LoadingOverlay loading={loading} />
       
        
        <section className="md:h-full flex items-center text-gray-600 bg-[#f6ffed] ">
          <div className="container  py-24 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold">
                House Projects
              </h1>
            </div>
           
            <div className="grid md::grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
              {houseData.map((house, index) => (
                <div key={house.sampleProject.id}>
                  <HouseItem
                    sampleProject={house.sampleProject}
                    staticFile={house.staticFiles}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      
        
      </>
    );
}

