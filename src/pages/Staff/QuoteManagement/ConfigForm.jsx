import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button, Space, message } from "antd";
import axios from "axios";
import * as Yup from "yup";
import { getAllWorker } from "../../../constants/apiWorker";
import {
  updateProjectConfig,
  getProjectById,
} from "../../../constants/apiQuotationOfStaff";

import { projectConfigValidationSchema } from "./validationSchema";
import InputField from "../../../components/StaffComponent/QuoteComponent/InputField";

const ConfigForm = () => {
  const [workers, setWorkers] = useState([]);
  const [projectDetail, setProjectDetail] = useState({});
  const [projectId, setProjectId] = useState("");

  const [selectedWorkerCost, setSelectedWorkerCost] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();


  const errorStyle = { color: "red", marginBottom: "20px" };

  const initialValues = {
    id: projectId || "",
    sandMixingRatio: 0,
    cementMixingRatio: 0,
    stoneMixingRatio: 0,
    rawMaterialDiscount: 0,
    furnitureDiscount: 0,

    laborDiscount: 0,
    tiledArea: 0,
    wallLength: 0,
    wallHeight: 0,
    estimatedTimeOfCompletion: 0,
    laborRequests: [
      {
        exportLaborCost: 0,
        quantity: 0,
        workerPriceId: "",
      },
    ],
  };

  const fetchData = async () => {
    const data = await getAllWorker();
    setWorkers(data.result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchProjectDetail = async () => {
    let fetchedProjectId = "";
    try {
      if (id) {
        const data = await getProjectById(id);
        if (data && data.result) {
          setProjectDetail(data.result.data);
          fetchedProjectId = data.result.data?.project?.id || "";
          setProjectId(fetchedProjectId);
        } else {
          console.error("Invalid data format:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching house project data:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectConfigValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const formattedData = {
          id: projectId,
          sandMixingRatio: values.sandMixingRatio,
          cementMixingRatio: values.cementMixingRatio,
          stoneMixingRatio: values.stoneMixingRatio,
          rawMaterialDiscount: values.rawMaterialDiscount,
          furnitureDiscount: values.furnitureDiscount,
          laborDiscount: values.laborDiscount,
          tiledArea: values.tiledArea,
          wallLength: values.wallLength,
          wallHeight: values.wallHeight,
          estimatedTimeOfCompletion: values.estimatedTimeOfCompletion,
          laborRequests: values.laborRequests.map((request) => ({
            exportLaborCost: request.exportLaborCost,
            quantity: request.quantity,
            workerPriceId: request.workerPriceId,
          })),
        };

        try {
          await updateProjectConfig(formattedData);
          console.log(values);

          message.success("Form submitted successfully!");
          navigate("/staff/all-request");
        } catch (error) {
          console.error("Error updating project config:", error);
          message.error("Failed to submit form. Please try again.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched }) => (
        <Form>
          <InputField
            label="ID"
            name="id"
            type="text"
            value={projectId}
            readOnly
          />

          <InputField
            label="Sand Mixing Ratio (%)"
            name="sandMixingRatio"
            type="number"
            error={errors.sandMixingRatio && touched.sandMixingRatio}
          />

          <InputField
            label="Cement Mixing Ratio (%)"
            name="cementMixingRatio"
            type="number"
            error={errors.cementMixingRatio && touched.cementMixingRatio}
          />

          <InputField
            label="Stone Mixing Ratio (%)"
            name="stoneMixingRatio"
            type="number"
            error={errors.stoneMixingRatio && touched.stoneMixingRatio}
          />

          <InputField
            label="Raw Material Discount (%)"
            name="rawMaterialDiscount"
            type="number"
            error={errors.rawMaterialDiscount && touched.rawMaterialDiscount}
          />

          <InputField
            label="Furniture Discount (%)"
            name="furnitureDiscount"
            type="number"
            error={errors.furnitureDiscount && touched.furnitureDiscount}
          />

          <InputField
            label="Label Discount (%)"
            name="laborDiscount"
            type="number"
            error={errors.laborDiscount && touched.laborDiscount}
          />

          <InputField
            label="Tiled Area (m²)"
            name="tiledArea"
            type="number"
            error={errors.tiledArea && touched.tiledArea}
          />

          <InputField
            label="Wall Length (m)"
            name="wallLength"
            type="number"
            error={errors.wallLength && touched.wallLength}
          />

          <InputField
            label="Wall Height (m)"
            name="wallHeight"
            type="number"
            error={errors.wallHeight && touched.wallHeight}
          />

          <InputField
            label="Estimated Time Of Completion (days)"
            name="estimatedTimeOfCompletion"
            type="number"
            error={
              errors.estimatedTimeOfCompletion &&
              touched.estimatedTimeOfCompletion
            }
          />

          <FieldArray name="laborRequests">
            {({ push, remove }) => (
              <div>
                {values.laborRequests.map((_, index) => (
                  <div key={index}>
                    <label htmlFor={`laborRequests[${index}].workerPriceId`}>
                      Worker
                    </label>
                    <Field
                      as="select"
                      name={`laborRequests[${index}].workerPriceId`}
                      onChange={(e) => {
                        const selectedWorkerId = e.target.value;
                        const selectedWorker = workers.find(
                          (worker) => worker.id === selectedWorkerId
                        );
                        setSelectedWorkerCost(
                          selectedWorker ? selectedWorker.laborCost : 0
                        );

                        values.laborRequests[index].workerPriceId =
                          selectedWorkerId;
                      }}
                      value={values.laborRequests[index].workerPriceId}
                    >
                      <option disabled value="">
                        Select Worker
                      </option>
                      {workers.map((worker) => (
                        <option key={worker.id} value={worker.id}>
                          {worker.positionName}
                        </option>
                      ))}
                    </Field>
                    <div>
                      {selectedWorkerCost > 0 && (
                        <div>
                          <label className="text-blue-400">
                            Worker's Labor Cost: {selectedWorkerCost} VND
                          </label>
                        </div>
                      )}
                    </div>
                    {errors?.laborRequests?.[index]?.workerPriceId &&
                      touched?.laborRequests?.[index]?.workerPriceId && (
                        <div style={errorStyle}>
                          {errors.laborRequests[index].workerPriceId}
                        </div>
                      )}
                    <br />
                    <label htmlFor={`laborRequests[${index}].exportLaborCost`}>
                      Export Labor Cost (must be greater than Worker's Labor Cost)
                    </label>
                    <Field
                      name={`laborRequests[${index}].exportLaborCost`}
                      as={Input}
                      type="number"
                      style={{
                        borderColor:
                          errors?.laborRequests?.[index]?.exportLaborCost &&
                          touched?.laborRequests?.[index]?.exportLaborCost
                            ? "red"
                            : "",
                        marginBottom: "16px",
                      }}
                    />
                    {errors?.laborRequests?.[index]?.exportLaborCost &&
                      touched?.laborRequests?.[index]?.exportLaborCost && (
                        <div style={errorStyle}>
                          {errors.laborRequests[index].exportLaborCost}
                        </div>
                      )}

                    <label htmlFor={`laborRequests[${index}].quantity`}>
                      Quantity
                    </label>
                    <Field
                      name={`laborRequests[${index}].quantity`}
                      as={Input}
                      type="number"
                      style={{
                        borderColor:
                          errors?.laborRequests?.[index]?.quantity &&
                          touched?.laborRequests?.[index]?.quantity
                            ? "red"
                            : "",
                        marginBottom: "16px",
                      }}
                    />
                    {errors?.laborRequests?.[index]?.quantity &&
                      touched?.laborRequests?.[index]?.quantity && (
                        <div style={errorStyle}>
                          {errors.laborRequests[index].quantity}
                        </div>
                      )}

                    <Button  type="primary" className="mb-6 bg-red-700 hover:text-black" onClick={() => remove(index)}>Remove Worker</Button>
                  </div>
                ))}
                <Button
                  className="text-black mb-6 bg-blue-400"
                  type="primary"
                  onClick={() =>
                    push({ exportLaborCost: 0, quantity: 0, workerPriceId: "" })
                  }
                >
                 + Add Worker
                </Button>
              </div>
            )}
          </FieldArray>

          <Button type="primary" htmlType="submit" className="text-white bg-baseGreen font-semibold mx-auto">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfigForm;
