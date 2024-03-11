import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../components";
import { alert } from "../../../components/Alert/Alert";
import { toast } from "react-toastify";

import { createWorkerPrice } from "../../../constants/apiWorker";

export default function CreateWokerPrice({ onModalClose,fetchAllWorker }) {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const initialValues = {
    positionName: "",
    laborCost: "",
  };

  const validationSchema = Yup.object().shape({
    positionName: Yup.string().required("Required"),
    laborCost: Yup.number().required("Required").positive("Must be positive"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formattedData = {
      positionName: values.positionName,
      laborCost: values.laborCost,
    };

    console.log("Form data submitted:", formattedData);

    const result = await createWorkerPrice(formattedData);
    resetForm();
    if (result.isSuccess) {
      alert.alertSuccessWithTime(
        "Create Worker Price Successfully",
        "",
        2000,
        "30",
        () => {}
      );
      fetchAllWorker
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
          className="bg-baseGreen hover:bg-base3 transition duration-300 ease-in-out text-white text-sm text-center rounded-lg p-2 font-semibold mx-5 mt-6"
        >
         + Create Worker Price
        </button>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Create Worker Price
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <label htmlFor="positionName">Woker Type</label>
                  <Field
                    name="positionName"
                    as={Input}
                    type="text"
                    className="mb-3"
                  />
                  {errors.positionName &&
                    touched.positionName && (
                      <div style={{ color: "red", marginBottom: "12px" }}>
                        {errors.positionName}
                      </div>
                    )}

                  <label htmlFor="laborCost">Average Labor Cost</label>
                  <Field
                    name="laborCost"
                    as={Input}
                    type="number"
                    className="mb-3"
                  />
                  {errors.laborCost && touched.laborCost && (
                    <div style={{ color: "red", marginBottom: "12px" }}>
                      {errors.laborCost}
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
