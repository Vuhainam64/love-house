import React from "react";

const ContractStatusBadge = ({ contractStatus }) => {
  switch (contractStatus) {
    case 0:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-yellow-300 rounded-lg bg-opacity-50">
          New
        </span>
      );
    case 1:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-gray-400 rounded-lg bg-opacity-50">
          In active
        </span>
      );
    case 2:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-blue-400 rounded-lg bg-opacity-50">
         Active
        </span>
      );
    
    default:
      return null;
  }
};

export default ContractStatusBadge;
