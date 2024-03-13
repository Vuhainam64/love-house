import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../../components";
import { alert } from "../../../../components/Alert/Alert";
import {
  createDealByStaff,
  getProjectById,
} from "../../../../constants/apiQuotationOfStaff";
import { toast } from "react-toastify";

export default function CreateDealByStaff({ onModalClose, quotationId }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(true);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const initialValues = {
    quotationId: quotationId,
    rawMaterialDiscount: "",
    furnitureDiscount: "",
    laborDiscount: 0,
  };

  const validationSchema = Yup.object().shape({
    rawMaterialDiscount: Yup.number()
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
      quotationId: values.quotationId,
      rawMaterialDiscount: values.rawMaterialDiscount,
      furnitureDiscount: values.furnitureDiscount,
      laborDiscount: values.laborDiscount,
    };

    console.log("Form data submitted:", formattedData);

    const result = await createDealByStaff(formattedData);
    resetForm();
    if (result.isSuccess) {
      alert.alertSuccessWithTime(
        "Create Quotation Deal Successfully",
        "",
        2000,
        "30",
        () => {}
      );
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
          className="bg-baseOrange text-white rounded-lg p-2 mb-2 font-semibold mx-2 w-40"
        >
          Create Deal Quotation
        </button>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 text-center uppercase">
              Create Deal Request
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <label htmlFor="rawMaterialDiscount">Material Discount (%)</label>
                  <Field
                    name="rawMaterialDiscount"
                    as={Input}
                    type="number"
                    className="mb-3"
                  />
                  {errors.rawMaterialDiscount &&
                    touched.rawMaterialDiscount && (
                      <div style={{ color: "red", marginBottom: "12px" }}>
                        {errors.rawMaterialDiscount}
                      </div>
                    )}

                  <label htmlFor="furnitureDiscount">Furniture Discount (%)</label>
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
                  <div className="text-right">
                    <button
                      htmlType="submit"
                      className="text-white bg-baseGreen hover:bg-base3 font-semibold mx-auto  py-2 px-4 rounded"
                    >
                      Create
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </Fragment>
    </>
  );
}
