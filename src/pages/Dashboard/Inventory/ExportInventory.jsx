import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space } from "antd";

import { FaChevronRight } from "react-icons/fa";
import { MdInventory } from "react-icons/md";

import { getAllProjects } from "../../../api";

const ExportInventory = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getAllProjects(2);
      if (res?.isSuccess) {
        setProjects(res.result.data);
      }
    };

    fetchProjects();
  }, []);

  const columns = [
    {
      title: "Number Of Floors",
      dataIndex: "numOfFloor",
      key: "numOfFloor",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Tiled Area",
      dataIndex: "tiledArea",
      key: "tiledArea",
    },
    {
      title: "Wall Length",
      dataIndex: "wallLength",
      key: "wallLength",
    },
    {
      title: "Wall Height",
      dataIndex: "wallHeight",
      key: "wallHeight",
    },
    {
      title: "Name",
      render: (record) =>
        `${record.account.firstName} ${record.account.lastName}`,
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <button
            onClick={() => viewDetailHandler(record.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Detail
          </button>
        </Space>
      ),
    },
  ];

  const viewDetailHandler = (projectID) => {
    navigate(`quotation-detail/${projectID}`);
  };

  return (
    <div className="flex flex-col p-8">
      <div>
        <div className="flex items-center space-x-2 text-xl">
          <MdInventory />
          <div>Import Export</div>
          <FaChevronRight />
          <div>Inventory</div>
          <FaChevronRight />
        </div>
        <div className="text-2xl text-orange-400 font-semibold py-4">
          Export Inventory
        </div>

        {/* Display the Ant Design Table */}
        <Table
          dataSource={projects}
          columns={columns}
          pagination={{ pageSize: 6 }}
        />
      </div>
    </div>
  );
};

export default ExportInventory;
