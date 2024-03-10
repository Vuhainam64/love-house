import React, { Children } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white font-semibold place-self-end mb-3"
          onClick={() => onClose()}
        >
         <AiOutlineClose size={20}/>
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
