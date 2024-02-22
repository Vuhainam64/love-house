import React from "react";

const CurrencyFormatter = ({ amount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return <>{formatCurrency(amount)}</>;
};

export default CurrencyFormatter;
