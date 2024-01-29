import { useState, useContext } from "react";
import { StepperContext } from "../StepperContext";

export default function Detail() {
  const { userData, setUserData } = useContext(StepperContext);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numoffloor" || name === "totalArea"){
      const isValid = /^[1-9]\d*$/.test(value);

      if (!isValid) {
        // Display an error or handle invalid input as needed
        setValidationErrors({
          ...validationErrors,
          [name]: "Please enter a positive number greater than 0.",
        });
        return;
      } else {
        // Clear the error message if the input is valid
        setValidationErrors({
          ...validationErrors,
          [name]: "",
        });
      }
    }

    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Number of floor
        </div>

        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["numoffloor"] || ""}
            name="numoffloor"
            placeholder="Number of floor"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
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
            value={userData["totalArea"] || ""} 
            name="totalArea" 
            placeholder="Total area"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
