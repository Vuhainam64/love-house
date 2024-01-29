import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { HiOutlineKey } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import UserAuthInput from "./UserAuthInput";
import { sendResetPassOTP } from "../../api";
import { MdPassword } from "react-icons/md";

function ResetPassword({
  setIsForgot,
  setIsLoading,
  setIsPopup,
  setForgotMail,
  setForgotPassword,
}) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSendOTP();
  };

  const handleSendOTP = async () => {
    if (!email || !newPassword) {
      toast.error("Please enter both email and new password.");
      return;
    }

    // Kiểm tra mật khẩu
    if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      toast.error(
        "Please check the new password. It should be at least 8 characters long and include at least one uppercase letter and one special character."
      );
      return;
    }

    if (getEmailValidationStatus) {
      setIsLoading(true);
      try {
        const result = await sendResetPassOTP(email);
        console.log("sendResetPassOTP result: ", result);
        if (result.isSuccess === true) {
          setForgotMail(email);
          setForgotPassword(newPassword);
          setIsLoading(false);
          setIsForgot(false);
          setIsPopup(true);
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
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsForgot(false)}
          className="text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="sm:flex sm:flex-col sm:items-start">
        <div className="flex w-full justify-center mb-4">
          <div className="w-14 h-14 rounded-full flex justify-center items-center bg-orange-100 text-orange-600">
            <HiOutlineKey className="text-2xl" />
          </div>
        </div>
        <div className="mt-3 text-center sm:mt-0 w-full">
          <div className="text-2xl font-semibold text-center text-gray-900">
            Forgot password?
          </div>
        </div>
        <div className="mt-2 w-full">
          <div className="text-center text-base">
            No worries, we'll send you reset instructions.
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            {/* email */}
            <UserAuthInput
              lable="Email"
              placeHolder="Email"
              isPass={false}
              key="Email"
              setStateFunction={setEmail}
              Icon={FaEnvelope}
              setGetEmailValidationStatus={setGetEmailValidationStatus}
            />
            {/* password */}
            <UserAuthInput
              lable="New Password"
              placeHolder="Password"
              isPass={true}
              key="Password"
              setStateFunction={setNewPassword}
              Icon={MdPassword}
            />
            <div className="w-full mt-2">
              <div
                onClick={handleSendOTP}
                className="w-full my-3 py-2 px-4 bg-orange-400 hover:bg-orange-500 text-white text-center text-base font-medium rounded-lg cursor-pointer"
              >
                <span className="no-underline mx-auto">Reset password</span>
              </div>
            </div>
            <div className="w-full text-center ">
              <div
                onClick={() => setIsForgot(false)}
                className="text-xs hover:underline text-gray-500 sm:text-sm hover:text-gray-700 cursor-pointer flex items-center justify-center mt-4 -mb-4"
              >
                <IoArrowBackOutline className="text-xl mr-2" />
                Back to page
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
