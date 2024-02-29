import React from "react";
import { useField, ErrorMessage } from "formik";
import { Input } from "antd";

const InputField = ({ label, name, type, value, readOnly }) => {
  const [field, meta] = useField(name);

  return (
    <div className="w-full px-4 mb-10">
      <div className="relative w-full h-10 py-2 px-3 border border-gray-400  focus-within:border-green-500 rounded-lg">
        <label
          htmlFor={name}
          className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-500 px-1  bg-white "
        >
          {label}
        </label>
        <input
          {...field}
          type={type}
          value={value !== undefined && value !== "0" ? value : field.value}
          readOnly={readOnly}
          style={{
            borderColor: meta.touched && meta.error ? "red" : "",
            marginBottom: "16px",
          }}
          className="block w-full outline-none bg-transparent  placeholder-gray-50 "
        />
      </div>

      <ErrorMessage
        name={name}
        component="div"
        style={{ color: "red", marginBottom: "20px" }}
      />
    </div>
  );
};

export default InputField;
