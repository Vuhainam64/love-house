import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StepperContext } from "../StepperContext";

const DetailAndLandDrawingFile = () => {
  const { userData, setUserData } = React.useContext(StepperContext);
  const formItemLayout = {
    labelCol: { xs: { span: 10 }, sm: { span: 9 } },
    wrapperCol: { xs: { span: 10 }, sm: { span: 8 } },
  };
  const formik = useFormik({
    initialValues: {
      numoffloor: userData.numoffloor || "",
      totalArea: userData.totalArea || "",
      landDrawingFile: null,
    },
    validationSchema: Yup.object({
      numoffloor: Yup.number()
        .typeError("Please enter a number.")
        .positive("Please enter a positive number greater than 0.")
        .integer("Please enter a whole number.")
        .required("This field is required."),
      totalArea: Yup.number()
        .typeError("Please enter a number.")
        .positive("Please enter a positive number greater than 0.")
        .required("This field is required."),
      landDrawingFile: Yup.mixed().required("Please upload a file."),
    }),
    onSubmit: async (values) => {
      // Your logic for form submission goes here
      try {
        const formData = new FormData();
        formData.append("NumOfFloor", values.numoffloor);
        formData.append("Area", values.totalArea);
        formData.append("LandDrawingFile", values.landDrawingFile);
        formData.append("AccountId", accountId); // Make sure to get accountId from somewhere

        const res = await axios.post(`${baseURL}/project/create-project-by-user`, formData, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (res.data) {
          console.log("Project created successfully:", res.data);
        } else {
          console.error("Error creating project.");
        }
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
  });

  const handleFileChange = (e) => {
    const { name, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const selectedFile = files[0];
      formik.setFieldValue(name, selectedFile);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Detail Section */}
      <div className="flex flex-col">
        {/* ... (same as your Detail component) */}
        <div className="w-full mx-2 flex-1">
          {/* ... (same as your Detail component) */}
        </div>
      </div>

      {/* LandDrawingFile Section */}
      <div className="flex flex-col">
        {/* ... (same as your LandDrawingFile component) */}
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Your land drawing file
          </div>

          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              id="landDrawingFile"
              name="landDrawingFile"
              type="file"
              onChange={(e) => {
                handleFileChange(e);
                formik.handleChange(e);
              }}
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.landDrawingFile && formik.errors.landDrawingFile && (
            <div className="text-red-500 text-xs">{formik.errors.landDrawingFile}</div>
          )}
        </div>
      </div>

      {/* Add a submit button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DetailAndLandDrawingFile;
