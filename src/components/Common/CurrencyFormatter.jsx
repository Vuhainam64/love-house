import React from "react";

const CurrencyFormatter = ({ amount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      
    }).format(amount);
  };

  return <>{formatCurrency(amount)}</>;
};

export default CurrencyFormatter;
