import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button, Space, message } from "antd";
import axios from "axios";
import * as Yup from "yup";
import { getAllWorker } from "../../../../constants/apiWorker";
import {
  updateProjectConfig,
  getProjectById,
} from "../../../../constants/apiQuotationOfStaff";

import { alert } from "../../../../components/Alert/Alert"

import { projectConfigValidationSchema } from "./validationSchema";
import { InputField, CurrencyFormatter } from "../../../../components";

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

          alert.alertSuccessWithTime(
            "Create Config Successfully",
            "",
            2000,
            "30",
            () => {}
          );
          navigate("/staff/all-request");
        } catch (error) {
          console.error("Error updating project config:", error);         
          alert.alertFailedWithTime(
            "Failed To Create",
            "Please try again",
            2500,
            "25",
            () => {}
          );
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
          <p className="font-semibold text-l mx-4 border-t-2 border-gray-300 pt-6">Properties</p>
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-x-10">
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
              label="Tiled Area (m²)"
              name="tiledArea"
              type="number"
              error={errors.tiledArea && touched.tiledArea}
            />
          </div>

          <p className="font-semibold text-l mx-4 border-t-2 border-gray-300 pt-6">Mixing Ratio (%)</p>
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-x-10 ">
            <InputField
              label="Sand "
              name="sandMixingRatio"
              type="number"
              error={errors.sandMixingRatio && touched.sandMixingRatio}
            />

            <InputField
              label="Cement"
              name="cementMixingRatio"
              type="number"
              error={errors.cementMixingRatio && touched.cementMixingRatio}
            />

            <InputField
              label="Stone "
              name="stoneMixingRatio"
              type="number"
              error={errors.stoneMixingRatio && touched.stoneMixingRatio}
            />
          </div>

          <p className="font-semibold text-l mx-4 border-t-2 border-gray-300 pt-6">Discount (Optional)</p>
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-x-10">
            <InputField
              label="Raw Material"
              name="rawMaterialDiscount"
              type="number"
              error={errors.rawMaterialDiscount && touched.rawMaterialDiscount}
            />

            <InputField
              label="Furniture"
              name="furnitureDiscount"
              type="number"
              error={errors.furnitureDiscount && touched.furnitureDiscount}
            />

            <InputField
              label="Labor"
              name="laborDiscount"
              type="number"
              error={errors.laborDiscount && touched.laborDiscount}
            />
          </div>

          <InputField
            label="Estimated Time Of Completion (days)"
            name="estimatedTimeOfCompletion"
            type="number"
            error={
              errors.estimatedTimeOfCompletion &&
              touched.estimatedTimeOfCompletion
            }
          />

          <p className="font-semibold text-l mx-4 border-t-2 border-gray-300 pt-6 mb-6">
            Worker for project
          </p>
          <FieldArray name="laborRequests">
            {({ push, remove }) => (
              <div>
                {values.laborRequests.map((_, index) => (
                  <div key={index}>
                    <label
                      htmlFor={`laborRequests[${index}].workerPriceId`}
                      className="mr-2 ml-4"
                    >
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
                          <label className="text-blue-400 ml-4">
                            Worker's Labor Cost:{" "}
                            <CurrencyFormatter amount={selectedWorkerCost} />
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

                    <div className="flex flex-col md:flex-row justify-between">
                      <InputField
                        label="Export Labor Cost"
                        name={`laborRequests[${index}].exportLaborCost`}
                        type="number"
                        error={
                          errors.laborRequests?.[index]?.exportLaborCost &&
                          touched.laborRequests?.[index]?.exportLaborCost
                        }
                      />

                      <InputField
                        label="Quantity"
                        name={`laborRequests[${index}].quantity`}
                        type="number"
                        error={
                          errors.laborRequests?.[index]?.quantity &&
                          touched.laborRequests?.[index]?.quantity
                        }
                      />
                    </div>

                    {index > 0 && (
                      <Button
                        type="primary"
                        className="mb-6 bg-red-700 hover:text-black"
                        onClick={() => remove(index)}
                      >
                        Remove Worker
                      </Button>
                    )}
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

          <Button
            type="primary"
            htmlType="submit"
            className="text-white bg-baseGreen font-semibold mx-auto"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfigForm;