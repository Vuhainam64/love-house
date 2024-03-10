import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../../../components";
import { alert } from "../../../../../components/Alert/Alert";

import {
  getQuoteDetailByQuoteId,
  createListQuotationDetail,
} from "../../../../../constants/apiQuotationOfStaff";

import { getAllMaterial } from "../../../../../constants/apiMaterial";

export default function FormCreateMaterialDetail({ onModalClose }) {
  const [showModal, setShowModal] = useState(false);

  const [materials, setMaterials] = useState([]);
  const [materialQuantity, setMaterialQuantity] = useState(0);
  const [existingMaterialIds, setExistingMaterialIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const initialValues = {
    materialDetails: [
      {
        quantity: 0,
        quotationId: id,
        materialId: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    materialDetails: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .required("Required")
          .positive("Must be positive")
          .integer("Must be an integer"),
      })
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formattedData = values.materialDetails.map((detail) => ({
      quantity: detail.quantity,
      quotationId: id,
      materialId: detail.materialId,
    }));
    setIsLoading(true);
    console.log("Form data submitted:", formattedData);

    const data = await createListQuotationDetail(formattedData);
    resetForm();
    if (data.isSuccess) {
      alert.alertSuccessWithTime(
        "Create List Material Successfully",
        "",
        2000,
        "30",
        () => {}
      );
    }

    setIsLoading(false);
    setShowModal(false);
    onModalClose();

    setSubmitting(false);
  };

  const fetchMaterial = async () => {
    try {
      const data = await getAllMaterial();

      if (data && data.result && data.result.data) {
        setMaterials(data.result.data);
      } else {
        console.error("Invalid material data format:", data);
      }
    } catch (error) {
      console.error("Error fetching material data:", error);
    }
  };

  const fetchQuoteDetails = async () => {
    try {
      const quoteDetails = await getQuoteDetailByQuoteId(id);

      if (quoteDetails && quoteDetails.result && quoteDetails.result.data) {
        const existingIds = quoteDetails.result.data.map(
          (detail) => detail.materialId
        );
        setExistingMaterialIds(existingIds);
      } else {
        console.error("Invalid quote details data format:", quoteDetails);
      }
    } catch (error) {
      console.error("Error fetching quote details:", error);
    }
  };

  useEffect(() => {
    fetchMaterial();
    fetchQuoteDetails();
  }, []);

  return (
    <>
      <Fragment>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center"
          onClick={handleButtonClick}
        >
          + Add material
        </button>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Add material
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <FieldArray name="materialDetails">
                    {({ push, remove }) => (
                      <div>
                        {values.materialDetails.map((material, index) => (
                          <div key={index}>
                            {index === 0 ? (
                              <label
                                htmlFor={`materialDetails.${index}.quotationId`}
                                className="mr-4"
                              >
                                Quotation ID
                              </label>
                            ) : null}
                            {index === 0 ? (
                              <Field
                                name={`materialDetails.${index}.quotationId`}
                                as={Input}
                                type="text"
                                readOnly
                              />
                            ) : null}

                            <label
                              htmlFor={`materialDetails.${index}.materialId`}
                              className="mr-4"
                            >
                              Material
                            </label>
                            <Field
                              as="select"
                              name={`materialDetails.${index}.materialId`}
                              onChange={(e) => {
                                const selectedMaterialId = e.target.value;
                                const selectedMaterial = materials.find(
                                  (material) =>
                                    material.id === selectedMaterialId
                                );
                                setMaterialQuantity(
                                  selectedMaterial
                                    ? selectedMaterial.quantity
                                    : 0
                                );
                                setFieldValue(
                                  `materialDetails.${index}.materialId`,
                                  selectedMaterialId
                                );
                              }}
                              value={material.materialId}
                            >
                              <option disabled value="">
                                Select Material
                              </option>

                              {materials
                                .filter(
                                  (material) =>
                                    !existingMaterialIds.includes(material.id)
                                )
                                .map((material) => (
                                  <option key={material.id} value={material.id}>
                                    {material.name}
                                  </option>
                                ))}
                            </Field>

                            <div>
                              {materialQuantity > 0 && (
                                <div>
                                  <label className="text-blue-400">
                                    Quantity in stock: {materialQuantity}
                                  </label>
                                </div>
                              )}
                            </div>

                            <label
                              htmlFor={`materialDetails.${index}.quantity`}
                            >
                              Quantity
                            </label>
                            <Field
                              name={`materialDetails.${index}.quantity`}
                              as={Input}
                              type="number"
                            />
                            {errors.materialDetails?.[index]?.quantity &&
                              touched.materialDetails?.[index]?.quantity && (
                                <div style={{ color: "red" }}>
                                  {errors.materialDetails[index].quantity}
                                </div>
                              )}

                            {index > 0 && (
                              <Button
                                type="default"
                                onClick={() => remove(index)}
                                className="text-white bg-red-500 font-semibold mx-auto mt-2"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="primary"
                          onClick={() =>
                            push({
                              quantity: 0,
                              quotationId: id,
                              materialId: "",
                            })
                          }
                          className="text-white bg-blue-400 font-semibold mx-auto mt-2"
                        >
                          Add Another Material
                        </Button>
                      </div>
                    )}
                  </FieldArray>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="text-white bg-baseGreen font-semibold mx-auto mt-4"
                    loading={isLoading}
                  >
                    Create
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </Fragment>
    </>
  );
}
