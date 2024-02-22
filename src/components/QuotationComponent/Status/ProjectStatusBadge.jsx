import React from "react";

const ProjectStatusBadge = ({ projectStatus }) => {
  switch (projectStatus) {
    case 0:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-yellow-300 rounded-lg bg-opacity-50">
          Pending
        </span>
      );
    case 1:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-blue-400 rounded-lg bg-opacity-50">
          Processing
        </span>
      );
    case 2:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-green-400 rounded-lg bg-opacity-50">
          Under Construction
        </span>
      );
    case 3:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-gray-400 rounded-lg bg-opacity-50">
          Complete Construction
        </span>
      );
    default:
      return null;
  }
};

export default ProjectStatusBadge;
