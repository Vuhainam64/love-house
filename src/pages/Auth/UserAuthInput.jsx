import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

function UserAuthInput({
  lable,
  placeHolder,
  isPass,
  setStateFunction,
  setGetEmailValidationStatus,
  Icon,
}) {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleTextChange = (e) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);
    if (placeHolder === "Email") {
      const emailRegex = /^[^s@]+@[^\s@]+\.[^\s@]/;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
      setGetEmailValidationStatus(status);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-700 py-2">
        {lable} <span className="text-red-500 required-dot">*</span>
      </label>
      <div
        className={`border border-gray-500 flex items-center justify-center gap-3 w-full ${
          placeHolder === "Frist Name" || placeHolder === "Last Name"
            ? "md:w-44"
            : "md:w-96"
        } rounded-md px-4 py-1 ${
          !isEmailValid &&
          placeHolder === "Email" &&
          value.length > 0 &&
          "border-2 border-red-500"
        }`}
      >
        <Icon className="text-2xl" />
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeHolder}
          className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-lg placeholder-gray-700"
          value={value}
          onChange={handleTextChange}
          autoComplete={isPass ? "current-password" : "off"}
        />

        {isPass && (
          <motion.div
            onClick={() => setShowPass(!showPass)}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            {showPass ? (
              <FaEyeSlash className="text-2xl" />
            ) : (
              <FaEye className="text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UserAuthInput;
