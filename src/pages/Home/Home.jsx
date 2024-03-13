import React from "react";
import { Navbar, Footer, IntroSection, Parallax, ProjectsSection } from "../../components";

import Hero from "../../components/Banner/Hero";
import OtherNews from "../../components/NewsComponent/OtherNews"

function Home() {
  return (
    <>
     
        <Navbar />
        <Hero/>+
        <ProjectsSection/>
        <Parallax />
        <OtherNews/>

        <Footer />
      
    </>
  );
}

export default Home;
