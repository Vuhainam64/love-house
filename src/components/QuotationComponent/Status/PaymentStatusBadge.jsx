import React from "react";

const PaymentStatusBadge = ({ paymentStatus }) => {
  switch (paymentStatus) {
    case 0:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-yellow-300 rounded-lg bg-opacity-50">
          Pending
        </span>
      );
    case 1:
      return (
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider bg-green-400 rounded-lg bg-opacity-50">
          Succcess
        </span>
      );
   
    
    default:
      return null;
  }
};

export default PaymentStatusBadge;
