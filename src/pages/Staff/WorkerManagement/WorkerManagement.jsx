import React, { useEffect, useState } from "react";
import { LoadingOverlay } from "../../../components";

import { getAllWorker } from "../../../constants/apiWorker";
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

      <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <ListWorker
          allWorker={allWorker}
          handleReloadContent={handleReloadContent}
          fetchAllWorker={fetchAllWorker}
        />
      </div>
    </>
  );
}
