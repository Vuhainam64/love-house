import React from "react";
import {alert} from "../Alert/Alert"

export default function StepperControl({ handleClick, currentStep, steps,isValid, showAlert }) {
  
  const handleNextClick = () => {
    if (showAlert || !isValid) {
      alert.alertFailed("Error", "Please fill in all required fields.", () => {});
    } else {
      handleClick("next");
    }
  };
  return (
    <>
      <div className="container flex justify-around mt-4 mb-8">
        <button
          onClick={() => handleClick()}
          className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
            currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Back
        </button>

        <button
         // onClick={() => handleClick("next")}
         onClick={handleNextClick}
          disabled={!isValid} 
          className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
        >
          {currentStep === steps.length - 1 ? "Confirm" : "Next"}
        </button>
      </div>
    </>
  );
}
