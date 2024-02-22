import { useState, useContext, useEffect } from "react";
import { StepperContext } from "../StepperContext";
import { alert } from "../../Alert/Alert";

export default function Detail({ setIsValid, setShowAlert  }) {
  const { userData, setUserData } = useContext(StepperContext);



  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "numOfFloor" || name === "area") {
      const isValidInput = /^[1-9]\d*$/.test(value);
  
      if (!isValidInput) {
        alert.alertFailed(
          "Error",
          "Please enter a positive number greater than 0.",
          
          () => {}
        );
  
        setIsValid(false);
        return;
      } else {
       
        if (name === "numOfFloor" && parseInt(value) >= 50) {
         
          alert.alertFailed(
            "Error",
            "Number of floors must be less than 50.",
            () => {}
          );
  
          setIsValid(false);
          return;
        }
  
       
  
        setIsValid(true);
      }
    }
  
    setUserData({ ...userData, [name]: value });
  };
  
  useEffect(() => {
    // Check if any required field is empty
    const requiredFields = ["numOfFloor", "area", "constructionType"];
    const isAnyEmpty = requiredFields.some((field) => !userData[field]);

    setIsValid(!isAnyEmpty);
    if (isAnyEmpty) {
      setShowAlert(true);
    } else {
      setShowAlert(false); // Clear alert when all required fields are filled or not yet attempted
    }
  }, [userData, setIsValid, setShowAlert]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Number of floor
        </div>

        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["numOfFloor"] || ""}
            name="numOfFloor"
            placeholder="Number of floor"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required  
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Total Area (m²)
        </div>

        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["area"] || ""}
            name="area"
            placeholder="Total area"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required  
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Construction type
        </div>

        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <select
            onChange={handleChange}
            value={userData["constructionType"] || ""}
            name="constructionType"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            required  
          >
            <option value="" disabled>
              -- Select construction type --
            </option>
            <option value="0">Rough construction</option>
            <option value="1">Completed construction</option>
          </select>
        </div>
      </div>
    </div>
  );
}
