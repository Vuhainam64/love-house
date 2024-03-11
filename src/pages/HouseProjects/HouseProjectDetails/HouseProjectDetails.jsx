import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetail } from "../../../constants/apiHouseProject"
import { LoadingOverlay, Navbar, Footer } from "../../../components";
import HeaderComponent from "./HeaderComponent";
import ImageDetailSection from "./ImageDetailSection"
import OverviewProjectSection from "./OverviewProjectSection"

export default function HouseProjectDetails() {
    const { id } = useParams();
  const [houseProjectDetail, setHouseProjectDetail] = useState({});
  const [loading, setLoading] = useState(true); 
  const fetchHouseProjectDetail = async () => {
    try {
      const data = await getProjectDetail(id);
      if (data && data.result) {
        setHouseProjectDetail(data.result.data);
        setLoading(false);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching house roof data:", error);
    }
  };

  useEffect(() => {
    fetchHouseProjectDetail();
  }, [id]);

  if (!houseProjectDetail || !houseProjectDetail.staticFiles) {
    return null;
  }
  return (
    <>
    <Navbar />
    <LoadingOverlay loading={loading} />
    <HeaderComponent houseProjectDetail={houseProjectDetail}/>
    <ImageDetailSection houseProjectDetail={houseProjectDetail}/>
    <OverviewProjectSection houseProjectDetail={houseProjectDetail}/>
    {/* <OtherSection /> */}
    <Footer />
  </>
  )
}
