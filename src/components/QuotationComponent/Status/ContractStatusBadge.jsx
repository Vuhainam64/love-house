import React from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

const ContractStatusBadge = ({ contractStatus }) => {
  switch (contractStatus) {
    case 0:
      return (
        <Tag icon={<ClockCircleOutlined />} color="warning">
          NEW
        </Tag>
      );
    case 1:
      return (
        <Tag icon={<MinusCircleOutlined />} color="error">
          IN ACTIVE
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          ACTIVE
        </Tag>
      );

    default:
      return null;
  }
};

export default ContractStatusBadge;
