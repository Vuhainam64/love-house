import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import moment from "moment";

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

    // Add No column to the sorted data
    const dataWithNo = sortedData.map((item, index) => ({
      ...item,
      No: index + 1,
    }));

    setHistoryData(dataWithNo);
  }, [materialId, exportPrices]);

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
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
