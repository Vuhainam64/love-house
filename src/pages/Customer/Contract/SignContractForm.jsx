import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../components";
import { alert } from "../../../components/Alert/Alert";

import {
  getContractProgressById,
  resendVerificationCodeByContractId,
  signContract,
} from "../../../constants/apiContract";
import { toast } from "react-toastify";


export default function SignContractForm({ onModalClose, id, projectDetail,fetchData }) {

  const user = useSelector((state) => state?.user?.user);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [contract, setContract] = useState({});
  console.log(projectDetail);
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (projectDetail !== null) {
      fetchContract();
    }
  }, [id]);

  // const handleButtonClick = () => {
  //   setShowModal(true);
  // };
  const handleButtonClick = () => {
    console.log("he", user);
    if (user?.phoneNumber == null || user.phoneNumber == "") {
      // If phone number is empty, show confirmation modal
      Swal.fire({
        title: "Update Phone Number",
        text: "Your phone number is empty. Do you want to update it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // If confirmed, navigate to update account page
          navigate("/customer/account/profile");
        }
      });
    } else {
      // If phone number is not empty, proceed with sign API
      setShowModal(true);
    }
  };
  const initialValues = {
    contractId: id,
    verificationCode: "",
  };

  const validationSchema = Yup.object().shape({
    verificationCode: Yup.string().required("Required"),
  });

  const handleResend = async () => {
    setIsSendLoading(true);
    var result = await resendVerificationCodeByContractId(id);
    try {
      if (result.isSuccess) {
        alert.alertSuccessWithTime(
          "Resend code Successfully",
          "",
          2000,
          "25",
          () => {}
        );
        setIsSendLoading(false);
      } else {
        for (var i = 0; i < result.messages.length; i++) {
          toast.error(result.messages[i]);
        }
      }
    } catch (error) {}
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!user?.phoneNumber) {
      // Handle case when user's phone number is empty
      alert.alertFailedWithTime(
        "Failed To Sign Contract",
        "Please update your phone number first",
        2500,
        "25",
        () => {}

      );
      
      setShowModal(false);
      onModalClose();
      return;
    }
    setIsLoading(true)

    const formattedData = {
      contractId: values.contractId,
      verificationCode: values.verificationCode,
      accountId: user?.id,
    };

    console.log("Form data submitted:", formattedData);

    const result = await signContract(formattedData);
    resetForm();
    if (result.isSuccess) {
      alert.alertSuccessWithTime(
        "Sign Contract Successfully",
        "",
        2000,
        "25",
        () => {}
      );
      fetchData()
    } else {
      for (var i = 0; i < result.messages.length; i++) {
        toast.error(result.messages[i]);
      }
    }

    setIsLoading(false)

    setShowModal(false);
    onModalClose();

    setSubmitting(false);
  };
  console.log(projectDetail);
  return (
    <>
      <Fragment>
        {projectDetail?.contract?.contractStatus === 1 && (
          <button
            onClick={handleButtonClick}
            className="bg-baseOrange text-white rounded-lg p-2 mb-2 font-semibold"
          >
            Sign Contract
          </button>
        )}

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-4 my-auto lg:px-8 text-left  overflow-y-auto max-h-[500px] flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Sign Contract
            </h3>

            <Button
              className="text-white bg-green-600 hover:bg-green-800  "
              style={{ cursor: "pointer" }}
              onClick={() => handleResend()}
              loading={isSendLoading}
            >
              Resend verification code
            </Button>


            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form className="flex flex-col">
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
                    loading={isLoading}
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
