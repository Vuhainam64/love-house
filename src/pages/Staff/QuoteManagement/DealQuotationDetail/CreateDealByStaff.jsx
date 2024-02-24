import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import Modal from "../../../../components/Modal/Modal";
import { alert } from "../../../../components/Alert/Alert";
import {
  createDealByStaff,
  getProjectById,
} from "../../../../constants/apiQuotationOfStaff";

export default function CreateDealByStaff({ onModalClose }) {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState({});
  //const [loading, setLoading] = useState(true);

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectById(id);

      if (data && data.result) {
        setProjectDetail(data.result.data);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  // const initialValues = {
  //   quotationId: projectDetail?.quotations?.[0]?.id,
  //   rawMaterialDiscount: "",
  //   furnitureDiscount: "",
  //   laborDiscount: "",
  // };
  useEffect(() => {
    if (projectDetail.quotations && projectDetail.quotations.length > 0) {
      setInitialValues({
        quotationId: projectDetail.quotations[0].id,
        rawMaterialDiscount: "",
        furnitureDiscount: "",
        laborDiscount: "",
      });
    }
  }, [projectDetail]);

  const [initialValues, setInitialValues] = useState({
    quotationId: "", // Initial value is an empty string, it will be updated in useEffect
    rawMaterialDiscount: "",
    furnitureDiscount: "",
    laborDiscount: "",
  });

  const validationSchema = Yup.object().shape({
    rawMaterialDiscount: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    furnitureDiscount: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    laborDiscount: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedData = {
        quotationId: values.quotationId,
        rawMaterialDiscount: values.rawMaterialDiscount,
        furnitureDiscount: values.furnitureDiscount,
        laborDiscount: values.laborDiscount,
      };

      console.log("Form data submitted:", formattedData);

      await createDealByStaff(formattedData);
      resetForm();
      alert.alertSuccessWithTime(
        "Create Quotation Deal Successfully",
        "",
        2000,
        "30",
        () => {}
      );

      setShowModal(false);
      onModalClose();
    } catch (error) {
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
  };

  return (
    <>
      <Fragment>
        <button
          onClick={handleButtonClick}
          className="bg-baseOrange text-white rounded-lg p-2 mb-2 font-semibold"
        >
          Create Deal Quotation
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

                  <label htmlFor="rawMaterialDiscount">Material Discount</label>
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

                  <label htmlFor="laborDiscount" className="">
                    Labor Discount
                  </label>
                  <Field name="laborDiscount" as={Input} type="number" />
                  {errors.laborDiscount && touched.laborDiscount && (
                    <div style={{ color: "red", marginBottom: "12px" }}>
                      {errors.laborDiscount}
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
