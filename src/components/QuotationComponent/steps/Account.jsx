import { useContext } from "react";
import { StepperContext } from "../StepperContext";
import { useSelector } from 'react-redux';

export default function Account() {
  const { userData,setUserData } = useContext(StepperContext);
 
  const user = useSelector((state) => state?.user?.user);

  const customerId = user.id
  console.log("ID ở đây nè:", customerId);

  const customerName = user.firstName

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          Customer name
        </div>

        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            readOnly
            value={customerName || ""}           
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      {/* <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {" "}
          Account ID
        </div>

        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            readOnly
            value={customerId || ""}
            name="accountid"
            
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div> */}
    </div>
  );
}
