import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../components";
import { alert } from "../../../components/Alert/Alert";
import { createQuotationDealRequest } from "../../../constants/apiQuotationOfCustomer";
import { toast } from "react-toastify";

export default function DealForm({ onModalClose, id }) {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const initialValues = {
    quotationId: id,
    materialDiscount: "",
    furnitureDiscount: "",
    laborDiscount: 0,
    description: "",
  };

  const validationSchema = Yup.object().shape({
    materialDiscount: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    furnitureDiscount: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formattedData = {
      quotationId: id,
      materialDiscount: values.materialDiscount,
      furnitureDiscount: values.furnitureDiscount,
      laborDiscount: 0,
      description: values.description,
    };

    console.log("Form data submitted:", formattedData);

    const result = await createQuotationDealRequest(formattedData);
    resetForm();
    if (result.isSuccess) {
      toast.success("Create successfully");
    } else {
      for (var i = 0; i < result.messages.length; i++) {
        toast.error(result.messages[i]);
      }
    }
    setShowModal(false);
    onModalClose();
    setSubmitting(false);
  };

  return (
    <>
      <Fragment>
        <button
          onClick={handleButtonClick}
          className="bg-baseOrange text-white rounded-lg p-2 mb-2 font-semibold"
        >
          Create Deal Request
        </button>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Create Deal Request
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <label htmlFor="quotationId">Quotation ID</label>
                  <Field
                    name="quotationId"
                    as={Input}
                    type="text"
                    readOnly
                    className="mb-3"
                  />

                  <label htmlFor="materialDiscount">Material Discount</label>
                  <Field
                    name="materialDiscount"
                    as={Input}
                    type="number"
                    className="mb-3"
                  />
                  {errors.materialDiscount && touched.materialDiscount && (
                    <div style={{ color: "red", marginBottom: "12px" }}>
                      {errors.materialDiscount}
                    </div>
                  )}

                  <label htmlFor="furnitureDiscount">Furniture Discount</label>
                  <Field
                    name="furnitureDiscount"
                    as={Input}
                    type="number"
                    className="mb-3"
                  />
                  {errors.furnitureDiscount && touched.furnitureDiscount && (
                    <div style={{ color: "red", marginBottom: "12px" }}>
                      {errors.furnitureDiscount}
                    </div>
                  )}

                  {/* <label htmlFor="laborDiscount" className="">
                    Labor Discount
                  </label>
                  <Field name="laborDiscount" as={Input} type="number" />
                  {errors.laborDiscount && touched.laborDiscount && (
                    <div style={{ color: "red", marginBottom: "12px" }}>
                      {errors.laborDiscount}
                    </div>
                  )} */}

                  <label htmlFor="description" className="">
                    Description
                  </label>
                  <Field name="description" as={Input} type="text" />
                  {errors.description && touched.description && (
                    <div style={{ color: "red", marginBottom: "12px" }}>
                      {errors.description}
                    </div>
                  )}

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="text-white bg-baseGreen font-semibold mx-auto mt-4"
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
