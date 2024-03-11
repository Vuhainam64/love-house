import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../../../components";
import { alert } from "../../../../../components/Alert/Alert";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";

import {
  getQuoteDetailByQuoteId,
  updateQuotationDetail,
} from "../../../../../constants/apiQuotationOfStaff";

import { getAllMaterial } from "../../../../../constants/apiMaterial";

export default function FormUpdateMaterialDetail({
  quoteDetail,
  onModalClose,
}) {
  const [showModal, setShowModal] = useState(false);

  const [materials, setMaterials] = useState([]);
  const [materialQuantity, setMaterialQuantity] = useState(0);
  const [existingMaterialIds, setExistingMaterialIds] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const initialValues = {
    id: quoteDetail ? quoteDetail.id : "",
    quantity: quoteDetail ? quoteDetail.quantity : 0,
    quotationId: id,
    materialId: quoteDetail ? quoteDetail.material.id : "",
  };

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formattedData = {
      id: values.id,
      quantity: values.quantity,
      quotationId: id,
      materialId: values.materialId,
    };

    console.log("Form data submitted:", formattedData);

    const result = await updateQuotationDetail(formattedData);
    resetForm();
    if (result.isSuccess) {
      alert.alertSuccessWithTime(
        "Update Material Successfully",
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
        <button onClick={handleButtonClick}>
          <FiEdit
            style={{ cursor: "pointer", marginLeft: "10px", color: "green" }}
          />
        </button>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Update material
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
                    className="mb-4 text-gray-500"
                  />
                  <label htmlFor="id">ID</label>
                  <Field
                    name="id"
                    as={Input}
                    type="text"
                    readOnly
                    className="mb-4 text-gray-500"
                  />

                  <label htmlFor="materialId" className="mr-4 ">
                    Material:
                  </label>
                  <Field
                    as="select"
                    name="materialId"
                    onChange={(e) => {
                      const selectedMaterialId = e.target.value;
                      const selectedMaterial = materials.find(
                        (material) => material.id === selectedMaterialId
                      );
                      setMaterialQuantity(
                        selectedMaterial ? selectedMaterial.quantity : 0
                      );
                      setFieldValue("materialId", selectedMaterialId);
                    }}
                    value={values.materialId}
                    className="mb-4"
                  >
                    <option disabled value="">
                      Select Material
                    </option>

                    {materials.map((material) => (
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

                  <label htmlFor="quantity" className="">
                    Quantity
                  </label>
                  <Field
                    name="quantity"
                    as={Input}
                    type="number"
                    className="mb-4"
                  />
                  {errors.quantity && touched.quantity && (
                    <div style={{ color: "red" }}>{errors.quantity}</div>
                  )}
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="text-white bg-baseGreen font-semibold mx-auto mt-4"
                  >
                    Update
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
