import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Space, Table, Input, notification } from "antd";

import { FaChevronRight } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import { MdInventory } from "react-icons/md";

import {
  createProgressConstructionMaterial,
  getAllApprovedQuotationDetailsByProjectId,
  getRemainQuantityForFulfillment,
} from "../../../api";

const QuotationDetail = () => {
  const id = useParams().id;

  const [quotationDetailsData, setQuotationDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fulfillmentQuantity, setFulfillmentQuantity] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllApprovedQuotationDetailsByProjectId(id);
        const dataWithRemain = await Promise.all(
          response.result.data.map(async (item) => {
            const remain = await getRemainQuantityForFulfillment(item.id);
            return { ...item, remain };
          })
        );
        setQuotationDetailsData(dataWithRemain);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFulfill = (record) => {
    setSelectedItem(record);
  };

  const handleOk = async () => {
    try {
      const result = await createProgressConstructionMaterial(
        selectedItem.id,
        fulfillmentQuantity
      );
      console.log("aaaa: ", selectedItem);
      if (result.isSuccess) {
        notification.success({
          message: "Fulfillment successful",
          description: "Quantity updated successfully.",
        });

        // Refresh the data after successful fulfillment
        const updatedData = await getAllApprovedQuotationDetailsByProjectId(id);
        const dataWithRemain = await Promise.all(
          updatedData.result.data.map(async (item) => {
            const remain = await getRemainQuantityForFulfillment(item.id);
            return { ...item, remain };
          })
        );
        setQuotationDetailsData(dataWithRemain);
      } else {
        notification.error({
          message: "Fulfillment failed",
          description: result.messages[0],
        });
      }
    } catch (error) {
      console.error("Error fulfilling:", error);
    } finally {
      setSelectedItem(null);
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  const renderPopup = () => {
    return (
      selectedItem && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96 border shadow-md">
            <p className="mb-2">Material Name: {selectedItem.material.name}</p>
            <p className="mb-2">Remain: {selectedItem.remain.result.data}</p>
            <Input
              type="number"
              placeholder="Enter fulfillment quantity"
              value={fulfillmentQuantity}
              onChange={(e) => setFulfillmentQuantity(e.target.value)}
              className="mb-2"
            />
            <div className="flex justify-end">
              <button
                onClick={handleOk}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  const columns = [
    {
      title: "No",
      dataIndex: "materialId",
      key: "materialId",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Material Name",
      dataIndex: "material",
      key: "materialName",
      render: (material) => material.name,
    },
    {
      title: "Remain",
      dataIndex: "remain",
      key: "remain",
      render: (remain) => remain.result.data,
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <button
            onClick={() => handleFulfill(record)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            FulFill
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="relative flex flex-col p-8">
      <div className="flex items-center space-x-2 text-xl">
        <MdInventory />
        <div>Import Export</div>
        <FaChevronRight />
        <div>Inventory</div>
        <FaChevronRight />
        <div>Export Inventory</div>
        <FaChevronRight />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl text-green-400 font-semibold py-4">
          Quotation Detail
        </div>
        <Link
          to={"/dashboard/export-inventory"}
          className="inline-flex items-center px-4 py-2 bg-indigo-500 cursor-pointer 
        hover:bg-indigo-600 text-white text-sm font-medium rounded-md space-x-2"
        >
          <div>
            <IoReturnUpBack className="text-xl" />
          </div>
          <div>Export Inventory</div>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={quotationDetailsData.map((item) => ({
          ...item,
          key: item.materialId,
        }))}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      {renderPopup()}
    </div>
  );
};

export default QuotationDetail;
