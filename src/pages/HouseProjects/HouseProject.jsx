import React, { useState, useEffect } from "react";
import HouseProjectsBanner from "../../components/Banner/HouseProjectsBanner";
import HouseRoofSection from "../../components/HouseProjectsComponent/HouseRoofSection";
import TownHouseSection from "../../components/HouseProjectsComponent/TownHouseSection";
import { Navbar, Footer } from "../../components";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";



export default function HouseProject() {

  return (
    <>
      <Navbar />
      <HouseProjectsBanner />
      <Breadcrumb />      
      <HouseRoofSection />
      <TownHouseSection />
      <Footer />
    </>
  );
}
