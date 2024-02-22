import React from "react";
import { useField, ErrorMessage } from "formik";
import { Input } from "antd";

const InputField = ({ label, name, type, value, readOnly }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Input
        {...field}
        type={type}
        value={value}
        readOnly={readOnly}
        style={{
          borderColor: meta.touched && meta.error ? "red" : "", 
          marginBottom: "16px",
        }}
      />
      <ErrorMessage name={name} component="div" style={{ color: "red", marginBottom: "20px" }} />
    </div>
  );
};

export default InputField;
