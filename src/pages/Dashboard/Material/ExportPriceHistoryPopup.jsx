// ExportPriceHistoryPopup.jsx
import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";

const ExportPriceHistoryPopup = ({
  visible,
  onClose,
  materialId,
  exportPrices,
}) => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Filter exportPrices based on materialId
    const filteredData = exportPrices.filter(
      (item) => item.materialId === materialId
    );

    // Sort the filtered data by date
    const sortedData = filteredData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setHistoryData(sortedData);
  }, [materialId, exportPrices]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <Modal
      title="Export Price History"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Table
        columns={columns}
        dataSource={historyData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
};

export default ExportPriceHistoryPopup;
