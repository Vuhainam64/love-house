import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../components";
import { alert } from "../../../components/Alert/Alert";

import { getContractProgressById, signContract } from "../../../constants/apiContract";




export default function SignContractForm({ onModalClose }) {
  const user = useSelector((state) => state?.user?.user);

  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState({});

  const fetchContract = async () => {
    try {
      const data = await getContractProgressById(id);

      if (data && data.result) {
        setContract(data.result.data);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [id]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  
const initialValues = {
  contractId: id,
  verificationCode: "",
  
};

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required("Required")
});
 

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedData = {
        contractId: values.contractId,
        verificationCode: values.verificationCode,
        accountId: user?.id
      };

      console.log("Form data submitted:", formattedData);

      await signContract(formattedData);
      resetForm();
      alert.alertSuccessWithTime(
        "Sign Contract Successfully",
        "",
        2000,
        "30",
        () => {}
      );

      setShowModal(false);
      onModalClose();
    } catch (error) {
      alert.alertFailedWithTime(
        "Failed To Sign Contract",
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
          Sign Contract
        </button>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Sign Contract
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <label htmlFor="contractId">Contract ID</label>
                  <Field
                    name="contractId"
                    as={Input}
                    type="text"
                    readOnly
                    className="mb-3"
                  />

                  <label htmlFor="verificationCode">Verify code</label>
                  <Field
                    name="verificationCode"
                    as={Input}
                    type="text"
                    className="mb-3"
                  />
                  {errors.verificationCode && touched.verificationCode && (
                    <div style={{ color: "red", marginBottom: "12px" }}>
                      {errors.verificationCode}
                    </div>
                  )}

                 

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="text-white bg-baseGreen font-semibold mx-auto mt-4"
                  >
                    Sign
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
