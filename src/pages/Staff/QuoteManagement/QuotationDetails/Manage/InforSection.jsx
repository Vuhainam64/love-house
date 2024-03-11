import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getQuotationById,
  getProjectById,
} from "../../../../../constants/apiQuotationOfStaff";
import { LoadingOverlay } from "../../../../../components";

import { Tag } from "antd";

export default function InforSection() {
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [projectDetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchQuotation = async () => {
    try {
      const data = await getQuotationById(id);

      if (data && data.result) {
        setQuote(data.result.data);
        //setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  const fetchProjectDetail = async (projectId) => {
    try {
      const data = await getProjectById(projectId);
      if (data && data.result) {
        setProjectDetail(data.result.data);
        setLoading(false);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching house project data:", error);
    }
  };

  useEffect(() => {
    fetchQuotation();
  }, [id]);

  useEffect(() => {
    if (quote?.quotation) {
      fetchProjectDetail(quote?.quotation?.projectId);
    }
  }, [quote?.quotation]);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className=" sticky top-50 detail wrapper mx-auto ">
        <div className="wraps max-w-[970px] mx-auto">
          <div className="tpdetail">
            <div className="grpgh flex flex-wrap mx-[-15px]">
              <div className="leftcol w-full mx-auto ">
                <div className="lldetailpgh ">
                  <div className="theinfo ml-8 ">
                    <ul className="flex justify-between flex-wrap mx-2 ">
                      <li className="flex justify-between w-1/2 px-2">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh4.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Total area: </strong>
                          {projectDetail?.project?.area} m&#178;
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh6.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Tiled area: </strong>
                          {projectDetail?.project?.tiledArea} m&#178;
                        </div>
                      </li>

                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh2.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Wall length: </strong>
                          {projectDetail?.project?.wallLength} m
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh2.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Wall height: </strong>
                          {projectDetail?.project?.wallHeight} m
                        </div>
                      </li>

                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh7.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Number of floors: </strong>
                          {projectDetail?.project?.numOfFloor}
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh1.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Construction Type: </strong>
                          {projectDetail?.project?.constructionType === 0
                            ? <Tag color="gold">Rough</Tag>
                            : <Tag color="cyan">Completed</Tag>}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
