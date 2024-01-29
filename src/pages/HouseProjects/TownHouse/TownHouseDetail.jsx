import React from "react";
import HeaderComponent from "../HeaderComponent";
import ImageDetailSection from "../ImageDetailSection";
import OverviewProjectSection from "../OverviewProjectSection";
import OtherSection from "./OtherSection";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

export default function TownHouseDetail() {
  return (
    <>
      <Navbar />
      <HeaderComponent />
      <ImageDetailSection />
      <OverviewProjectSection />
      <OtherSection />
      <Footer />
    </>
  );
}
