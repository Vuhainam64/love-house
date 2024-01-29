import React from "react";

export default function HouseProjectsBanner() {
  return (
    <div
      className="relative bg-cover bg-no-repeat bg-center pt-28 h-[330px]"
      style={{
        backgroundImage: `url(https://mhomevietnam.vn/vnt_upload/weblink/bgwhy.jpg)`,
      }}
    >
      <div className=" h-[330px]">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-5xl"
          style={{ zIndex: 1000 }}
        >
          CONSTRUCTION & FINISHING
        </div>
      </div>
    </div>
  );
}
