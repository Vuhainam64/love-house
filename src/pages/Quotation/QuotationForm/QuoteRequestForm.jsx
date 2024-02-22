import React, { useState, useContext } from "react";
import {  useSelector } from "react-redux";

import { StepperContext } from "../../../components/QuotationComponent/StepperContext";
import Stepper from "../../../components/QuotationComponent/Stepper";
import StepperControl from "../../../components/QuotationComponent/StepperControl";
import Account from "../../../components/QuotationComponent/steps/Account";
import Detail from "../../../components/QuotationComponent/steps/Detail";
import LandDrawingFile from "../../../components/QuotationComponent/steps/LandDrawingFile";
import Final from "../../../components/QuotationComponent/steps/Final";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { quoteRequest } from "../../../constants/apiQuotationOfCustomer";

import {alert } from "../../../components/Alert/Alert"


export default function QuoteRequestForm() {
  const [isValid, setIsValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const user = useSelector((state) => state?.user?.user);

  const customerId = user.id

  const [currentStep, setCurrentStep] = useState(1);
   const [userData, setUserData] = useState({});
   const [finalData, setFinalData] = useState([]);
  const steps = [
    "Customer Information",
    "Request Details",
    "Land Drawing File",
    "Complete",
  ];



  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Detail setIsValid={setIsValid} setShowAlert={setShowAlert} />;
      case 3:
        return <LandDrawingFile />;
      case 4:
        return <Final />;
      default:
    }

   };

  const handleClick = async (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

    if (newStep === steps.length) {
      try {
        const result = await quoteRequest(userData, customerId);
        if (result) {
          console.log("Project created successfully:", result);
        } else {
          console.error("Error creating project.");
        }
      } catch (error) {
        console.error("Error creating project:", error);
      }
    }


  };

  return (
    <>
      <Navbar />
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white mb-12">
        <div className="container horizontal mt-5">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10">
            <StepperContext.Provider
              value={{
                userData,
                setUserData,
                finalData,
                setFinalData,
                isFileSelected,
              setIsFileSelected,
              }}
            >
              {displaySteps(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>

        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            isValid={isValid}
            showAlert={showAlert}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
