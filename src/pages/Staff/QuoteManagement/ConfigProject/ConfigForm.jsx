import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button, Space, message } from "antd";

import { getAllWorker } from "../../../../constants/apiWorker";
import {
  updateProjectConfig,
  getProjectById,
} from "../../../../constants/apiQuotationOfStaff";

import { alert } from "../../../../components/Alert/Alert";

import { projectConfigValidationSchema } from "./validationSchema";
import {
  InputField,
  CurrencyFormatter,
  LoadingOverlay,
} from "../../../../components";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

import { getConstructionConfig } from "../../../../constants/apiConstructionConfig";
import ConstructionConfigForProject from "../../ConstructionConfig/ConstructionConfigForProject";
import ProjectInfo from "./ProjectInfo";

const ConfigForm = ({ projectDetail }) => {
  const [workers, setWorkers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkerCost, setSelectedWorkerCost] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const errorStyle = { color: "red", marginBottom: "20px" };

  const initialValues = {
    id: id,
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
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };
  const fetchData = async () => {
    const data = await getAllWorker();
    setWorkers(data.result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmitSubForm = (values) => {
    console.log("Sub Form Data:", values);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <div className="h-[580px] md:w-1/2 p-4 mb-24 order-2 md:order-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <Formik
          initialValues={initialValues}
          validationSchema={projectConfigValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const formattedData = {
              id: id,
              wallLength: values.wallLength,
              wallHeight: values.wallHeight,
              tiledArea:values.tiledArea,
              estimatedTimeOfCompletion: values.estimatedTimeOfCompletion,
              laborRequests: values.laborRequests.map((request) => ({
                exportLaborCost: request.exportLaborCost,
                quantity: request.quantity,
                workerPriceId: request.workerPriceId,
              })),
            };

            console.log(values);
            setIsLoading(true);
            const getConfigData = await getConstructionConfig({
              constructionType: projectDetail.project.constructionType,
              numOfFloor: projectDetail.project.numOfFloor,
              area: projectDetail.project.area,
              tiledArea: values.tiledArea,
            });
            console.log(getConfigData);

            if (getConfigData.isSuccess && getConfigData.result.data) {
              const result = await updateProjectConfig(formattedData);
              if (result.isSuccess) {
                alert.alertSuccessWithTime(
                  "Create Config Successfully",
                  "",
                  2000,
                  "30",
                  () => {}
                );
                navigate(`/staff/project-detail/${id}`);
              } else {
                for (var i = 0; i < result.messages.length; i++) {
                  toast.error(result.messages[i]);
                }
             
                setSubmitting(false);
              }

            } else {
              for (var i = 0; i < getConfigData.messages.length; i++) {
                toast.error(getConfigData.messages[i]);
              }
              setShowModal(true);
            }
            setIsLoading(false);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              <p className="font-semibold text-l mx-4 pt-6">Properties</p>
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
                Worker Type
              </p>
              <FieldArray name="laborRequests">
                {({ push, remove }) => (
                  <div>
                    {values.laborRequests.map((_, index) => (
                      <div key={index}>
                        <label
                          htmlFor={`laborRequests[${index}].workerPriceId`}
                          className="mr-2 ml-4"
                        ></label>
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
                            Select worker type
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
                                <CurrencyFormatter
                                  amount={selectedWorkerCost}
                                />
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
                          <div className="flex justify-end -mt-5 mb-6 mr-4 text-red-600 hover:text-black cursor-pointer">
                            <RiDeleteBin6Line
                              onClick={() => remove(index)}
                              size={20}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-center mx-4 mb-3">
                      <Button
                        className="w-full"
                        type="primary"
                        ghost
                        onClick={() =>
                          push({
                            exportLaborCost: 0,
                            quantity: 0,
                            workerPriceId: "",
                          })
                        }
                      >
                        + Add Worker
                      </Button>
                    </div>

                  </div>
                )}
              </FieldArray>
              <div className=" flex justify-center mx-4 mb-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500"
                  loading={isLoading}
                >
                  Submit
                </Button>

              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ConstructionConfigForProject
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default ConfigForm;
