import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";
import { LoadingOverlay } from "../../../../components";
import CreateDealByStaff from "../DealQuotationDetail/CreateDealByStaff";
import DealGrid from "./Grid/DealGrid";
import { Button, Table } from "antd";

export default function DealQuotationSection({ projectDetail }) {
  const [reloadContent, setReloadContent] = useState(false);

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const dataSource = projectDetail.quotationDealings;
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Material Discount",
      dataIndex: "materialDiscount",
      key: "materialDiscount",
    },
    {
      title: "Furniture Discount",
      dataIndex: "furnitureDiscount",
      key: "furnitureDiscount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  return (
    <>
      {projectDetail.quotationDealings?.length > 0 && (
        <>
          <h1 className="text-xl font-semibold uppercase pl-5">
            Quotation Dealing
          </h1>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            className="mx-5"
          />
        </>
      )}
    </>
  );
}
