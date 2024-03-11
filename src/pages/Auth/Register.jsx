import { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline, MdPassword } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { buttonClick } from "../../assets/animations";
import { createAccount } from "../../api";
import UserAuthInput from "./UserAuthInput";

function Register({ setIsPopup, setPopupEmail, setIsLoading }) {
  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(true);
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value === "true";
    setGender(selectedGender);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(password);
  };

  const isPasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };

    if (!fristName) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must have exactly 10 digits.";
    }

    if (!isPasswordValid(password)) {
      newErrors.password =
        "Password must have at least 8 characters, 1 uppercase letter, and 1 special character.";
    }

    if (!isPasswordMatch(password, ConfirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Kiểm tra xem có lỗi nào không
    if (
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.email ||
      newErrors.phoneNumber ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      setErrors(newErrors);
      return;
    }

    // Nếu không có lỗi, tiến hành đăng ký
    handleSignUp();
  };

  const handleSignUp = async () => {
    if (getEmailValidationStatus) {
      setIsLoading(true);
      try {
        const result = await createAccount(
          email,
          fristName,
          lastName,
          password,
          gender,
          phoneNumber,
          "Admin"
        );
        console.log("Register result: ", result);
        if (result.isSuccess === true) {
          setIsPopup(true);
          setPopupEmail(email);
          toast.success("Registration successful! Please verify email.");
        } else {
          console.error(
            "Registration failed:",
            result ? result.message : "Unknown error"
          );
          toast.error("Registration failed. Please try again.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <p className="text-xl text-textColor -mt-6">Sign Up with following</p>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-full md:w-96">
          {/* frist name  */}
          <div>
            <UserAuthInput
              lable="Frist Name"
              placeHolder="Frist Name"
              isPass={false}
              key="FristName"
              setStateFunction={setFristName}
              Icon={MdOutlineDriveFileRenameOutline}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            {/* Last name  */}
            <UserAuthInput
              lable="Last Name"
              placeHolder="Last Name"
              isPass={false}
              key="LastName"
              setStateFunction={setLastName}
              Icon={MdOutlineDriveFileRenameOutline}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>
        <UserAuthInput
          lable="Email"
          placeHolder="Email"
          isPass={false}
          key="Email"
          setStateFunction={setEmail}
          Icon={FaEnvelope}
          setGetEmailValidationStatus={setGetEmailValidationStatus}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <UserAuthInput
          lable="Phone Number"
          placeHolder="0123456789"
          isPass={false}
          key="PhoneNumber"
          setStateFunction={setPhoneNumber}
          Icon={FaPhone}
          setGetEmailValidationStatus={setGetEmailValidationStatus}
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber}</p>
        )}

        <div className="flex flex-col items-start justify-start gap-1">
          <label className="text-sm text-gray-700">
            Gender<span className="text-red-500 required-dot">*</span>
          </label>
          <select
            className="border border-gray-500 flex items-center justify-center gap-3
            w-full md:w-96 rounded-md px-4 py-3 bg-gray-200 bg-transparent outline-none selection:text-2xl"
            defaultValue="true"
            onChange={handleGenderChange}
          >
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>
        </div>

        <UserAuthInput
          lable="Password"
          placeHolder="Password"
          isPass={true}
          key="Password"
          setStateFunction={setPassword}
          Icon={MdPassword}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <UserAuthInput
          lable="Confirm Password"
          placeHolder="Confirm Password"
          isPass={true}
          key="ConfirmPassword"
          setStateFunction={setConfirmPassword}
          Icon={MdPassword}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}

        <motion.button
          {...buttonClick}
          className="w-full px-4 py-2 rounded-md bg-green-500 cursor-pointer text-white text-xl capitalize
        hover:bg-green-600 transition-all duration-150 mt-4"
          type="submit"
        >
          Sign Up
        </motion.button>
      </form>
    </>
  );
}

export default Register;
