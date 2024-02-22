import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import IntroSection from "../../components/HomeComponent/IntroSection";
import Parallax from "../../components/HomeComponent/Parallax";
import NewsSection from "../../components/HomeComponent/NewsSection";
import ProjectsSection from "../../components/HomeComponent/ProjectsSection";
import QuoteSection from "../../components/HomeComponent/QuoteSection";
import WhySection from "../../components/HomeComponent/WhySection";
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
