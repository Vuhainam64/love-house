import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { buttonClick } from "../../assets/animations";
import {
  activeAccount,
  sendOTP,
  sendResetPassOTP,
  submitOTPResetPass,
} from "../../api";
import { toast } from "react-toastify";

function PopupSubmitOTP({
  popupEmail,
  setIsLoading,
  forgotMail,
  forgotPassword,
}) {
  const [timer, setTimer] = useState(10);
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const inputRefs = useRef(
    Array(6)
      .fill()
      .map(() => React.createRef())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const otp = inputs.join("");
    if (otp.length === 6) {
      handleVerify();
    }
  }, [inputs]);

  const handleChange = (value, index) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Tự động chuyển focus sang input tiếp theo nếu không phải là xóa
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && inputs[index] === "" && index > 0) {
      // Xóa ký tự ở input trước đó và chuyển focus
      const newInputs = [...inputs];
      newInputs[index - 1] = "";
      setInputs(newInputs);
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const otp = inputs.join("");
    console.log("input otp: ", otp);
    setIsLoading(true);
    if (otp.length === 6) {
      if (forgotPassword) {
        const result = await submitOTPResetPass(
          forgotMail,
          otp,
          forgotPassword
        );
        if (result && result.isSuccess) {
          toast.success("Reset account successfully!");
          window.location.reload();
        } else {
          toast.error("Invalid OTP or failed to verify. Please try again.");
        }
      } else {
        const result = await activeAccount(popupEmail, otp);
        if (result && result.isSuccess) {
          toast.success("Account activated successfully!");
          window.location.reload();
        } else {
          toast.error("Invalid OTP or failed to verify. Please try again.");
        }
      }
      setIsLoading(false);
    } else {
      toast.warn("Please enter a valid 6-digit OTP.");
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      setIsLoading(true);
      try {
        if (forgotPassword) {
          const result = await sendResetPassOTP(forgotMail);
          if (result && result.isSuccess) {
            toast.success("Resend OTP to email successfully");
            setInputs(Array(6).fill(""));
            setTimer(10);
          } else {
            toast.error("Failed to resend OTP. Please try again later.");
          }
        } else {
          const result = await sendOTP(popupEmail);
          if (result && result.isSuccess) {
            toast.success("Resend OTP to email successfully");
            setInputs(Array(6).fill(""));
            setTimer(10);
          } else {
            toast.error("Failed to resend OTP. Please try again later.");
          }
        }
      } catch (error) {
        console.error("Error resending OTP:", error);
        toast.error("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn(
        `Please wait for ${timer} seconds before resending the confirmation code`
      );
    }
  };

  const handlePaste = async (event) => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text");

    if (text.length === 6 && /^[a-zA-Z0-9]*$/.test(text)) {
      const chars = text.split("");
      setInputs(chars);
    } else {
      toast.warn("Please paste a valid 6-digit code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-8 rounded-md">
      <p className="text-3xl font-semibold text-headingColor">
        OTP Verification
      </p>
      <p>Enter the 6 digit verification code recieved on your Email ID</p>

      <div className="flex w-full px-16 py-2 relative items-center justify-between">
        <div className="flex">
          <p>Verification code</p>
          <div className="absolute group bg-slate-500 text-white px-2 ml-2 rounded-full left-44 text-sm">
            <p>i</p>
            <div className="absolute group-hover:block bg-slate-400 bottom-6 left-2 px-2 rounded-md whitespace-nowrap hidden">
              You need to wait until the timer expires to send otp
            </div>
          </div>
          <p className="pl-8 text-baseGreen">{timer}s</p>
        </div>
        <div
          onClick={handleResendOTP}
          className="text-baseOrange font-semibold cursor-pointer"
        >
          Resend OTP
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md">
        {inputs.map((input, index) => (
          <div key={index} className="w-16 h-16 ">
            <input
              key={index}
              ref={inputRefs.current[index]}
              className="w-full h-full flex flex-col items-center justify-center text-center 
              px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white 
              focus:bg-gray-50 focus:ring-1 ring-blue-700"
              maxLength={1}
              value={input}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              onPaste={handlePaste}
            />
          </div>
        ))}
      </div>

      <div className="pt-4 w-full">
        <motion.button
          {...buttonClick}
          onClick={handleVerify}
          className="w-full px-4 py-2 rounded-md bg-[rgba(251,146,60)] cursor-pointer text-white text-xl capitalize hover:bg-[rgba(249,115,22)] transition-all duration-150"
        >
          Verify
        </motion.button>
      </div>

      <div className="w-full py-[1px] bg-slate-300 my-4"></div>

      <div className="flex items-center w-full">
        <p>Having problems?</p>
        <Link to={"/"} className="mx-2 text-baseOrange font-semibold ">
          Know more
        </Link>
      </div>
    </div>
  );
}

export default PopupSubmitOTP;
