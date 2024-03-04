import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import Swal

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Input, Button } from "antd";

import { Modal } from "../../../components";
import { alert } from "../../../components/Alert/Alert";

import {
  getContractProgressById,
  signContract,
} from "../../../constants/apiContract";

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

  const handleButtonClick = async () => {
    try {
      const data = await getContractProgressById(id);
      if (data && data.result) {
        const contractId = data.result.data.contractId;
        setShowModal(true);

        // Open Swal with verificationCode input only
        Swal.fire({
          title: `Verify your Contract`,
          html: `We have sent a code to your Email: </br> ${user?.email}. <br/>
          Please check and enter this code here. <br/> This will close in <b class="time"></b> seconds.
          </br><b>Send another code?</b> <a class="again" style="cursor:pointer; text-decoration: none"></a>`,
          input: "text",
          timer: 180000,
          timerProgressBar: true,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Confirm",
          showLoaderOnConfirm: true,
          didOpen: () => {
            // Fill in contractId and accountId
            document.querySelector("input.swal2-input").value = contractId;
          },
        })
          .then((result) => {
            // Handle Swal result
            if (result.isConfirmed) {
              const verificationCode = result.value;
              handleSubmit({ verificationCode }); // Call handleSubmit with verificationCode
            }
          })
          .catch((err) => {});
      }
    } catch (error) {
      console.error("Error fetching contract details:", error);
    }
  };

  const initialValues = {
    contractId: id,
    verificationCode: "",
  };

  const validationSchema = Yup.object().shape({
    verificationCode: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const formattedData = {
        contractId: values.contractId,
        verificationCode: values.verificationCode,
        accountId: user?.id,
      };

      console.log("Form data submitted:", formattedData);

      await signContract(formattedData);
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
              {() => (
                <Form>
                  <label htmlFor="contractId">Contract ID</label>
                  <Field
                    name="contractId"
                    as={Input}
                    type="text"
                    readOnly
                    hidden
                    className="mb-3"
                  />

                  {/* Remove the verificationCode field */}
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
