import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getQuoteDetailByQuoteId,
  publicQuotationForCustomer,
  getQuotationById,
  getProjectById,
} from "../../../../../constants/apiQuotationOfStaff";
import { alert } from "../../../../../components/Alert/Alert";
import { Button } from "antd";

export default function SendQuotationResult({
  projectId,
  quoteId,
  handleReloadContent,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({});
  const [quoteDetail, setQuoteDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchQuotation = async () => {
    try {
      const data = await getQuotationById(id);
      console.log(data);
      if (data && data.result) {
        setQuote(data.result.data);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailByQuoteId(id);

      if (data && data.result) {
        setQuoteDetail(data.result.data);
        //setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuotation();
    fetchQuoteDetail();
  }, [id]);

  const handlePublicProject = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white mx-3 px-4 py-2 rounded",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded",
      },
      buttonsStyling: false,
    });
    setIsLoading(true);
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to send quotation results to customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, send it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      focusConfirm: false,
    });

    if (result.isConfirmed) {
      const data = await publicQuotationForCustomer(id);

      if (data && data.isSuccess) {
        handleReloadContent();
        alert.alertSuccessWithTime(
          "Public Quote detail Successfully!",
          "",
          2000,
          "25",
          () => {}
        );
      } else {
        for (var i = 0; i < data.messages.length; i++) {
          toast.error(data.messages[i]);
          alert.alertSuccessWithTime(
            `${getConfigData.messages[i]}`,
            "",
            2000,
            "25",
            () => {}
          );
        }
      }
    }
  };
  return (
    <button
      onClick={handlePublicProject}
      className="text-white bg-green-600 hover:bg-green-800  font-medium text-sm rounded-lg px-5 py-2.5 text-center my-6 ml-4 "
      loading={isLoading}
    >
      Send Quotation Result
    </button>
  );
}
