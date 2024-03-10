import React from "react";
import CreateProgressForm from "./CreateProgressForm";
import { StaffSidebar } from "../../../../../components";

export default function CreateProgress() {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-center justify-center mx-auto px-24 w-full">
          <h1 className="my-6 text-4xl">Create Payment Progress</h1>
          <div className="w-full mx-auto">
            <CreateProgressForm />
          </div>
        </div>
      </div>
    </>
  );
}
