import React from "react";

import OtherSection from "./OtherSection";
import ImageDetailSection from "../ImageDetailSection";
import OverviewProjectSection from "../OverviewProjectSection";
import HeaderComponent from "../HeaderComponent";
import { Navbar, Footer} from "../../../components";


export default function HouseRoofDetail() {
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
