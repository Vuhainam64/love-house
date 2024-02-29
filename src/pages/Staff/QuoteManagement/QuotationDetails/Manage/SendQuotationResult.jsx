import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {   getQuoteDetailByQuoteId,
    publicQuotationForCustomer,
    getQuotationById,
    getProjectById,} from "../../../../../constants/apiQuotationOfStaff";
import { alert } from "../../../../../components/Alert/Alert";


export default function SendQuotationResult({ projectId, quoteId, handleReloadContent }) {
    const { id } = useParams();
const navigate = useNavigate();
const [quote, setQuote] = useState({});
const [quoteDetail, setQuoteDetail] = useState([]);

const fetchQuotation = async () => {
    try {
      const data = await getQuotationById(id);

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
    try {
      const projectID = quote?.quotation?.projectId
      const projectDetailsResponse = await getProjectById(projectID);

      if (projectDetailsResponse && projectDetailsResponse.result) {
        const projectDetails = projectDetailsResponse.result.data;
       
        const constructionType = projectDetails.constructionType;

        if (constructionType === 1) {
          const quoteDetailsResponse = await getQuoteDetailByQuoteId(id);

          if (quoteDetailsResponse && quoteDetailsResponse.result) {
            const quoteDetails = quoteDetailsResponse.result.data;

            const hasLamp = quoteDetails.some(
              (item) => item.material.name === "Lamp"
            );

            if (!hasLamp) {
              alert.alertFailedWithTime(
                "Failed to send quotation results to customers ",
                "This is a completed project, please add interior materials",
                2000,
                "25",
                () => {}
              );
              return; 
            }
          }
        }
       
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton:
              "bg-green-500 hover:bg-green-600 text-white mx-3 px-4 py-2 rounded",
            cancelButton:
              "bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded",
          },
          buttonsStyling: false,
        });

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

            navigate(`/staff/project-detail/${projectID}`);
          } else {
            alert.alertFailedWithTime(
              "Failed to send quotation results to customers",
              "This is a completed project, please add interior materials",
              2000,
              "25",
              () => {}
            );
          }
        } else {
          alert.alertFailedWithTime("Failed to send quotation results to customers", "", 2000, "25", () => {});
        }
      }
    } catch (error) {
      // Handle error
      alert.alertFailedWithTime("Failed to send quotation results to customers", "", 2000, "25", () => {});
    }
  };
  return (
    <button
    onClick={handlePublicProject}
    className="text-white bg-green-600 hover:bg-green-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center my-6 ml-4 "
  >
    Send Quotation Result
  </button>
  )
}
