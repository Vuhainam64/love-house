import React from "react";
import ConfigForm from "./ConfigForm";
import StaffSidebar from "../../../components/Sidebar/StaffSidebar";

const ConfigProject2 = () => {
  return (
    <>
      <div className="flex">
        <StaffSidebar />
        <div className="flex flex-col items-center justify-center mx-auto">
          <h1 className="my-6 text-4xl">Config Form</h1>
          <div className="">
            <ConfigForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfigProject2;
