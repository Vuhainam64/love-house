import React from "react";
import paralax from '../../assets/images/paralax.jpg'; 

function Parallax() {
  return <div className="parallax-section bg-cover bg-no-repeat bg-center h-[340px] mb-24 bg-fixed" style={{ backgroundImage: `url(${paralax})` }}></div>;
}

export default Parallax;
