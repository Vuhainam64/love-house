import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button, Space, message } from "antd";
import axios from "axios";
import * as Yup from "yup";

import { createContractProgress, getContractById } from "../../../../../constants/apiContract";

import { getProjectById } from "../../../../../constants/apiQuotationOfStaff";

import { InputField, CurrencyFormatter } from "../../../../../components";
import { alert } from "../../../../../components/Alert/Alert";



export default function CreateProgressForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectDetail, setProjectDetail] = useState({});

  const [progressItem, setProgressItem] = useState([]);
  const [contract, setContract] = useState({});


  const initialValues = {
    progressDetails: [
      {
        name: "Deposit",
        content: "Deposit",
        price: 0,
        contractId: id,
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    progressDetails: Yup.array().of(
      Yup.object().shape({
        price: Yup.number()
          .required("Required")
          .positive("Must be greater than 0"),
      })
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedData = values.progressDetails.map((detail) => ({
        name: detail.name,
        content: detail.content,
        price: detail.price,
        contractId: id,
      }));

      console.log("Form data submitted:", formattedData);

      const result = await createContractProgress(formattedData);
      resetForm();
      if (result.isSuccess) {
        alert.alertSuccessWithTime(
          "Create List Contract Progress Successfully",
          "",
          2000,
          "25",
          () => { }
        );
      } else {
        for (var i = 0; i < result.messages.length; i++) {
          toast.error(result.messages[i]);
        }
      }
      navigate(`/staff/contract-payment-progress/${id}`);
    } catch (error) {
      alert.alertFailedWithTime(
        "Failed To Create",
        "Please try again",
        2500,
        "25",
        () => { }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fetchContract = async () => {
    try {
      const data = await getContractById(id);

      if (data && data.result) {
        setContract(data.result.data);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching progress detail:", error);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [id]);


  return (
    <>
      <div className="flex justify-between gap-x-10">
        <div className="w-2/3">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <FieldArray name="progressDetails">
                  {({ push, remove }) => (
                    <div>
                      {values.progressDetails.map((material, index) => (
                        <div key={index}>
                          {index === 0 ? (
                            <>
                              <InputField
                                label="ID"
                                name={`progressDetails.${index}.contractId`}
                                type="text"
                                value={values.progressDetails[index].contractId}
                                readOnly
                              />
                            </>
                          ) : null}
                          <>
                            <div className="mb-6 pt-4 mx-4 border-t-2 border-gray-300 font-semibold">
                              No.{index + 1}
                            </div>
                            <InputField
                              label="Name"
                              name={`progressDetails.${index}.name`}
                              type="text"
                              readOnly={index === 0}
                              value={values.progressDetails[index].name}
                            />

                            <InputField
                              label="Description"
                              name={`progressDetails.${index}.content`}
                              type="text"
                              readOnly={index === 0}
                              value={values.progressDetails[index].content}
                            />

                            <InputField
                              label="Price"
                              name={`progressDetails.${index}.price`}
                              type="text"

                            />


                            {index > 0 && (
                              <Button
                                type="default"
                                onClick={() => remove(index)}
                                className="text-white bg-red-500 font-semibold mx-4 mb-12"
                              >
                                Remove
                              </Button>
                            )}
                          </>
                        </div>
                      ))}
                      <Button
                        type="primary"
                        onClick={() => {
                          push({
                            name: "",
                            content: "",
                            price: 0,
                          });
                        }}
                        className="text-white bg-blue-400 font-semibold mx-4"
                      >
                        Add payment installments
                      </Button>
                    </div>
                  )}
                </FieldArray>

                <button
                  type="submit"
                  className="text-white bg-baseGreen hover:bg-green-700 font-semibold mx-4 my-4 px-4 py-1 rounded"
                >
                  Create
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="total w-1/3">
          <div className="flex">Total:
            <p className="text-red-500 font-semibold ml-4">  <CurrencyFormatter amount={contract.total} /></p>
          </div>
          {/* <p>Remaining amounts:</p> */}
        </div>
      </div>
    </>
  );
}
