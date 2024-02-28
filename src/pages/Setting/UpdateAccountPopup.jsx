import React, { useState } from "react";
import { toast } from "react-toastify";

import { updateAccount } from "../../api";
import { Logo } from "../../assets";

const UpdateAccountPopup = ({ user, onClose }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const handleUpdate = async () => {
    try {
      const res = await updateAccount(
        user.email,
        firstName,
        lastName,
        phoneNumber
      );

      if (res?.isSuccess) {
        toast.success("Update successful");
        onClose();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 pt-40">
      <div className="relative p-4 mx-auto my-8 bg-white rounded-md max-w-md">
        <div className="flex justify-between">
          <div>
            <img src={Logo} alt="logo" className="h-10" />
          </div>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {/* Your form fields go here */}
          <label className="block mb-2 text-sm text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-primary"
          />

          <label className="block mb-2 text-sm text-gray-600">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-primary"
          />

          <label className="block mb-2 text-sm text-gray-600">
            Phone Number:
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex justify-end p-4 bg-gray-100">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none"
          >
            Update Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccountPopup;
