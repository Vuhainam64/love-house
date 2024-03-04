import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StaffSidebar, DBHeader, LoadingOverlay } from "../../../components";

import { getAllWorker, getWokerById } from "../../../constants/apiWorker";
import ListWorker from "./ListWorker";

export default function WorkerManagement() {
  const [allWorker, setAllWorker] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const fetchAllWorker = async () => {
    try {
      const data = await getAllWorker();
      if (data && data.result) {
        setAllWorker(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllWorker();
  
  }, [reloadContent]);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex overflow-hidden">
        <StaffSidebar />
        <div className="h-screen overflow-y-auto flex-1">
          <DBHeader />
          <div className="">
            <ListWorker allWorker={allWorker} handleReloadContent={handleReloadContent} fetchAllWorker= {fetchAllWorker}/>
          </div>
        </div>
      </div>
    </>
  );
}
