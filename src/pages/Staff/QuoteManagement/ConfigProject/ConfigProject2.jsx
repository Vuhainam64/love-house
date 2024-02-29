import React from "react";
import ConfigForm from "./ConfigForm";
import { StaffSidebar } from "../../../../components";

const ConfigProject2 = () => {
  return (
    <>
      <div className="flex">
        <StaffSidebar />
        <div className="flex flex-col items-center justify-center mx-auto px-6 w-full">
          <h1 className="my-6 text-4xl">Config Form</h1>
          <div className="w-full mx-auto">
            <ConfigForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfigProject2;
