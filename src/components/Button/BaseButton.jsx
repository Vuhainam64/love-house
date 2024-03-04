import React, { useState } from "react";
import { Button } from "antd";
import classNames from "classnames";
const BaseButton = ({ type, style, content, loading }) => {
  const [isLoading, setIsLoading] = useState(loading);

  const handleClick = () => {
    setIsLoading(true);
  };
  console.log(type);
  return (
    <>
      <Button
        htmlType={type}
        className={classNames(style)}
        onClick={handleClick}
        loading={isLoading}
      >
        {content}
      </Button>
    </>
  );
};

export default BaseButton;
