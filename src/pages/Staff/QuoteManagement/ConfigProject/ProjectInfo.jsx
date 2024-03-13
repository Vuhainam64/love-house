import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import { LoadingOverlay } from "../../../../components";

export default function ProjectInfo({ projectDetail }) {
  const[isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
if(projectDetail !== null){
  setIsLoading(false)
}

  },[projectDetail])
  return (
    <>
    <LoadingOverlay loading={isLoading}/>
    <div className="md:w-1/2 p-4 order-1 md:order-1">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6">
        <img
          src={projectDetail?.project?.landDrawingFileUrl}
          // style={{height:'550px'}}
          alt="Project"
          className="w-full mb-4 rounded-lg shadow-md md:h-96 md:w-9/12	"
        />
        <div className="grid grid-cols-2 gap-x-32 gap-y-6 justify-items-between">
          <div className="flex flex-col">
            <label className="text-gray-600">Area</label>
            <p className="text-black font-semibold">
              {projectDetail?.project?.area} m&#178;
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Number of floors</label>
            <p className="text-black font-semibold">
              {projectDetail?.project?.numOfFloor}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Construction type</label>
            <p className="text-black font-semibold">
              {projectDetail?.project?.constructionType === 1 && (
                <Tag color="cyan">Completed</Tag>
              )}

              {projectDetail?.project?.constructionType === 0 && (
                <Tag color="gold">Rough</Tag>
              )}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Location</label>
            <p className="text-black font-semibold">
              {projectDetail?.project?.addressProject}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
