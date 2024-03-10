import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "../../Home/Home";
import { toast } from "react-toastify";

const PaymentNotification = () => {
  const location = useLocation();

  useEffect(() => {
    // Lấy các tham số từ URL
    const searchParams = new URLSearchParams(location.search);
    const vnpResponseCode = searchParams.get("vnp_ResponseCode");
    const partnerCode = searchParams.get("partnerCode");
    const resultCode = searchParams.get("resultCode");
    // Kiểm tra loại thanh toán và hiển thị thông báo phù hợp
    if (vnpResponseCode) {
      // Hiển thị thông báo VNPay
      const vnpOrderInfo = decodeURIComponent(
        searchParams.get("vnp_OrderInfo")
      );
      if (vnpResponseCode === "00") {
        toast.success(
          `Thanh toán VNPay thành công cho  ${vnpOrderInfo}`
        );
      } else {
        toast.error(
          `Thanh toán VNPay thất bại cho đơn hàng: ${vnpOrderInfo}. Vui lòng thanh toán lại`
        );
      }
    } else if (partnerCode === "MOMO") {
      // Hiển thị thông báo Momo
      const orderInfo = decodeURIComponent(searchParams.get("orderInfo"));
      if (resultCode === "0") {
        toast.success(`Thanh toán Momo thành công cho ${orderInfo}`);
      } else {
        toast.error(
          `Thanh toán Momo thất bại đơn hàng: ${orderInfo}. Vui lòng thanh toán lại`
        );
      }
    }
  }, [location]);

  return (
    <>
      <Home></Home>
    </>
  );
};

export default PaymentNotification;
