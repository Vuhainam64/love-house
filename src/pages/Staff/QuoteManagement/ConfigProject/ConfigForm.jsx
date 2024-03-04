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
import { InputField, CurrencyFormatter } from "../../../../components";
import { toast } from "react-toastify";
import { getConstructionConfig } from "../../../../constants/apiConstructionConfig";
import ConstructionConfigForProject from "../../ConstructionConfig/ConstructionConfigForProject";

const ConfigForm = () => {
  const [workers, setWorkers] = useState([]);
  const [projectDetail, setProjectDetail] = useState({});
  const [projectId, setProjectId] = useState("");

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

  const fetchProjectDetail = async () => {
    let fetchedProjectId = "";
    try {
      if (id) {
        const data = await getProjectById(id);
        if (data && data.result) {
          setProjectDetail(data.result.data);
          // fetchedProjectId = data.result.data?.project?.id || "";
          // setProjectId(fetchedProjectId);
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
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={projectConfigValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const formattedData = {
            id: id,
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
            console.log(values);
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
                  if (
                    result.messages[i] ===
                    "The config is not existed. Please create construction config "
                  ) {
                  
                  }
                }
              }
            } else {
              for (var i = 0; i < getConfigData.messages.length; i++) {
                toast.error(getConfigData.messages[i]);
                if (
                  getConfigData.messages[i] ===
                  "The config is not existed. Please create construction config "
                ) {
                }
              }
              setShowModal(true);
            }
          } catch (error) {
            console.error("Error updating project config:", error);
          } finally {
            setSubmitting(false);
          }
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

      <ConstructionConfigForProject
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default ConfigForm;
