import { useState } from "react";
import { Modal } from "../../../components";
import { getUrlVnpay, getUrlMomo } from "../../../constants/apiPayment";
import { toast } from "react-toastify";
export default function PaymentModal({ onModalClose, paymentId }) {
  const [showModal, setShowModal] = useState(false);
  const handlePayment = async (paymentMethod) => {
    console.log("Chọn phương thức thanh toán:", paymentMethod);

    if (paymentMethod === "VNPAY") {
      const result = await getUrlVnpay(paymentId);
      if (result.isSuccess) {
        window.location.href = result.result.data;
      } else {
        for (var i = 0; i < result.messages.length; i++) {
          toast.error(result.messages[i]);
        }
      }
    } else if (paymentMethod === "MoMo") {
      const result = await getUrlMomo(paymentId);
      if (result.isSuccess) {
        window.location.href = result.result.data;
      } else {
        for (var i = 0; i < result.messages.length; i++) {
          toast.error(result.messages[i]);
        }
      }
    }

    setShowModal(false);
    if (onModalClose) {
      onModalClose(paymentMethod);
    }
  };
  const handleButtonClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <button onClick={handleButtonClick}>Payment</button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col my-3 mx-2">
          <h2 className="text-lg font-semibold mb-4">
            Please select payment method
          </h2>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out my-2"
            onClick={() => handlePayment("VNPAY")}
          >
            VNPAY
          </button>
          <button
            className="py-2 px-4 bg-pink-600 text-white rounded-md shadow-md hover:bg-pink-800 transition duration-300 ease-in-out my-2"
            onClick={() => handlePayment("MoMo")}
          >
            MoMo
          </button>
        </div>
      </Modal>
    </>
  );
}
