import React from "react";
import { Tag } from 'antd';

const ProjectStatusBadge = ({ projectStatus }) => {

  switch (projectStatus) {
    case 0:
      return (
        <Tag color="orange" >PENDING</Tag>
      );
    case 1:
      return (
        <Tag  color="processing">PROCESSING</Tag>
      );
    case 2:
      return (
         <Tag color="green" >UNDER CONSTRUCTION</Tag>
      );
    case 3:
      return (
        <Tag color="magenta">COMPLETE CONSTRUCTION</Tag>
      );
    default:
      return null;
  }
};

export default ProjectStatusBadge;
