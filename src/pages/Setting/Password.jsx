import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { MdPassword } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa6";

import UserAuthInput from "../Auth/UserAuthInput";
import PopupSubmitOTP from "../Auth/PopupSubmitOTP";
import { BGResetPass } from "../../assets";
import { MutatingDots } from "../../components";
import { sendResetPassOTP } from "../../api";
import { toast } from "react-toastify";

function Password() {
  const user = useSelector((state) => state?.user?.user);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPopup, setIsPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isPasswordValid(password)) {
      toast.error(
        "Password must be at least 8 characters, including special characters and an uppercase letter."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    handleSendOTP();
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const result = await sendResetPassOTP(user.email);
      console.log("sendResetPassOTP result: ", result);
      if (result.isSuccess === true) {
        setIsPopup(true);
        setIsLoading(false);
        toast.success("Send OTP Reset successful! Please verify email.");
      } else {
        console.error(
          "Send OTP Reset failed:",
          result ? result.message : "Unknown error"
        );
        toast.error("Send OTP Reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-between"
    >
      <div className="relative">
        <div className="mb-4">
          <p className="font-semibold text-xl text-gray-900">Password</p>
          <small>Manage your password.</small>
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <label className="text-sm text-gray-700 py-2">Email</label>
          <div
            className={`border border-gray-200 flex items-center justify-center gap-3 w-full rounded-md px-4 py-1`}
          >
            <FaEnvelope className="text-2xl" />
            <input
              type="text"
              className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-lg placeholder-gray-700"
              defaultValue={user.email}
              disabled
              autoComplete="username"
            />
          </div>
        </div>

        {/* password */}
        <UserAuthInput
          lable="Password"
          placeHolder="Password"
          isPass={true}
          key="Password"
          setStateFunction={setPassword}
          Icon={MdPassword}
        />

        {/* confirm password  */}
        <UserAuthInput
          lable="Confirm Password"
          placeHolder="Confirm Password"
          isPass={true}
          key="ConfirmPassword"
          setStateFunction={setConfirmPassword}
          Icon={MdPassword}
        />

        <div className="flex mt-4 justify-between">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center p-2 rounded-xl hover-bg-blue-700 cursor-pointer bg-orange-600"
          >
            <p className="text-xl text-white">Update Password</p>
          </motion.button>
        </div>
      </div>
      <div>
        <img src={BGResetPass} alt="background reset" />
      </div>

      {/* otp popup */}
      {isPopup && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  items-center justify-center w-656 bg-white bg-opacity-90 rounded-xl z-20"
        >
          {/* Pass the necessary props to PopupSubmitOTP */}
          <PopupSubmitOTP
            forgotMail={user.email}
            setIsPopup={setIsPopup}
            forgotPassword={password}
            setIsLoading={setIsLoading}
          />
        </div>
      )}

      {/* loading  */}
      {isLoading && (
        <div className="absolute z-30 bg-white bg-opacity-20 w-full h-full flex items-center justify-center">
          <MutatingDots />
        </div>
      )}
    </form>
  );
}

export default Password;
