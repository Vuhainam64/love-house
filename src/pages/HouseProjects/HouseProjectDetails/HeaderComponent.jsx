import React from "react";

export default function HeaderComponent({houseProjectDetail}) {

  return (
    <div className="text-3xl lg:text-4xl leading-11 lg:leading-14 uppercase font-bold text-center mt-24 -mb-10 px-10">
    <h1>{houseProjectDetail.sampleProject.header}</h1>
  </div>
  
  );
}
