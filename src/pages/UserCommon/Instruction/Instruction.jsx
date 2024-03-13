import React, { useState } from "react";
import { Modal, Button, Table } from "antd";

const Instruction = ({ visible, onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    existing: {
      NumOfFloor: "1-5",
      Area: "1-50",
      TiledArea: "1-50",
    },
    newInput: {
      NumOfFloor: "2-5 (overlapping)(Invalid)",
      Area: "1-50 (identical)(Valid)",
      TiledArea: "1-50 (contained by)(Invalid)",
    },
  });

  const isInputValid = (existing, newInput) => {
    const existingRange = existing.split('-').map(Number);
    const newRange = newInput.split('-').map(Number);
  
    // Check for overlap, containment, or being contained within
    const overlap = (newRange[0] >= existingRange[0] && newRange[0] <= existingRange[1]) ||
                    (newRange[1] >= existingRange[0] && newRange[1] <= existingRange[1]);
    const containment = newRange[0] <= existingRange[0] && newRange[1] >= existingRange[1];
    const beingContained = newRange[0] >= existingRange[0] && newRange[1] <= existingRange[1];
  
    return !(overlap || containment || beingContained);
  };
  
  
  

  const columns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
      width: "50%",
    },
    {
      title: "Existing",
      dataIndex: "existing",
      key: "existing",
    },
    {
      title: "New input",
      dataIndex: "newInput",
      key: "newInput",
      render: (_, record) =>
        record.inputType === "valid" ? (
          <span style={{ color: "green" }}>
            {formData.newInput[record.key]}
          </span>
        ) : (
          <span style={{ color: "red" }}>{formData.newInput[record.key]}</span>
        ),
    },
  ];

  const data = [
    {
      key: "NumOfFloor",
      label: "Num Of Floor",
      existing: "1-5",
      newInput: formData.newInput.NumOfFloor,
      inputType: isInputValid(
        formData.existing.NumOfFloor,
        formData.newInput.NumOfFloor
      )
        ? "valid"
        : "invalid",
    },
    {
      key: "Area",
      label: "Area",
      existing: "1-50",
      newInput: formData.newInput.Area,
      inputType: "valid"
       
    },
    {
      key: "TiledArea",
      label: "Tiled Area",
      existing: "1-50",
      newInput: formData.newInput.TiledArea,
      inputType: isInputValid(
        formData.existing.TiledArea,
        formData.newInput.TiledArea
      )
        ? "valid"
        : "invalid",
    },
  ];

  return (
    <Modal
      visible={visible}
      title="Construction Configuration Creation Policy"
      okText="Create"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" className="bg-baseGreen text-white w-24" onClick={onCreate}>
          OK
        </Button>,
      ]}
    >
      <p>
        A valid configuration range must either match an existing range of its
        type or remain independent, avoiding overlap, containment, or being
        contained within any range of the same range type.
      </p>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Modal>
  );
};

export default Instruction;
