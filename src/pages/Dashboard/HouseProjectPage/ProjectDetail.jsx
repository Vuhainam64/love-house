import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { AiOutlineProject } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { getProjectById } from "../../../api";
import { MutatingDots } from "../../../components";

const ProjectDetail = () => {
  const { id } = useParams();

  const [isLoading, setisLoading] = useState(false);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      setisLoading(true);
      try {
        const response = await getProjectById(id);

        if (response?.isSuccess) {
          setProjectData(response.result.data);
          console.log("Project Data:", response.result.data);
        } else {
          toast.error("Failed to fetch news details");
        }
        setisLoading(false);
      } catch (error) {
        console.error("Error fetching news details:", error);
        toast.error("An error occurred while fetching news details");
      }
    };

    fetchProjectData();
  }, [id]);

  if (isLoading || !projectData) {
    return (
      <div className="absolute z-30 bg-white bg-opacity-20 w-full h-full flex items-center justify-center">
        <MutatingDots />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 pb-32 mb-12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      {/* title */}
      <div>
        <div className="flex items-center space-x-2 text-xl">
          <AiOutlineProject />
          <div>Project</div>
          <FaChevronRight />
          <div>Project Detail</div>
          <FaChevronRight />
        </div>
        <div className="text-2xl text-green-400 font-semibold py-4">
          Project Management
        </div>
      </div>

      {projectData ? (
        <div className="flex flex-col w-full bg-slate-50 p-4">
          <div className="text-2xl font-semibold text-gray-600">
            {projectData.project.account.firstName}{" "}
            {projectData.project.account.lastName}
          </div>
          <div className="p-2">
            <strong>Create Date:</strong>{" "}
            {format(
              new Date(projectData.project.createDate),
              "HH:mm, dd/MM/yyyy",
              {
                locale: vi,
              }
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProjectDetail;
