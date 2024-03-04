import { Table } from "antd";
import { useParams } from "react-router-dom";
import { getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";
import { useEffect, useState } from "react";

export default function QuotationDealing({ quotationDealing }) {
  const dataSource = quotationDealing;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      <h1 className="text-xl font-semibold py-5 uppercase pl-5">
        Quotation Dealing Request
      </h1>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        className="mx-5"
      />
    </>
  );
}
