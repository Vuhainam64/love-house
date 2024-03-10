import React, { useEffect, useState } from "react";
import ConfigForm from "./ConfigForm";
import { DBHeader, LoadingOverlay, StaffSidebar } from "../../../../components";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../../../constants/apiQuotationOfStaff";
import ProjectInfo from "./ProjectInfo";

const ConfigProject2 = () => {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchProjectDetail = async () => {
    let fetchedProjectId = "";
    try {
      if (id) {
        const data = await getProjectById(id);
        if (data && data.result) {
          setProjectDetail(data.result.data);

          setIsLoading(false);
        } else {
          console.error("Invalid data format:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching house project data:", error);
    }
  };
  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <div className="mx-auto px-5 h-screen">
        <h1 className="mt-6 text-2xl font-semibold uppercase text-center ">
          Config Form
        </h1>
        <div className="flex flex-col md:flex-row ">
          <ProjectInfo projectDetail={projectDetail} />
          <ConfigForm projectDetail={projectDetail} />
        </div>
      </div>
    </>
  );
};
export default ConfigProject2;
