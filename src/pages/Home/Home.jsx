import React from "react";
import { Navbar, Footer, IntroSection, Parallax, NewsSection, ProjectsSection, QuoteSection, WhySection } from "../../components";
import Slider from "../../components/Slider/Slider";

import Slider2 from "../../components/Slider/Slider2";
import Hero from "../../components/Banner/Hero";

function Home() {
  return (
    <>
      
        <Navbar />
        <Hero/>
        {/* <Slider /> */}
        {/* <Slider2 /> */}
        <IntroSection />
        <Parallax />
        <QuoteSection />
        <ProjectsSection />
        <WhySection />
        <NewsSection />

        <Footer />
      
    </>
  );
}

export default Home;
