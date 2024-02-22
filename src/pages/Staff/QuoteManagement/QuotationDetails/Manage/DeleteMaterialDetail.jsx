import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { alert } from "../../../../../components/Alert/Alert";

import {
  getQuoteDetailByQuoteId,
  deleteQuotationDetailById,
} from "../../../../../constants/apiQuotationOfStaff";

import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteMaterialDetail({ quoteDetail, onDelete }) {
  const { id } = useParams();
  const [reloadContent, setReloadContent] = useState(false);

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailByQuoteId(id);

      if (data && data.result) {
        setReloadContent(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuoteDetail();
  }, [id, reloadContent]);

  const handleDeleteQuoteDetail = async (quoteDetailId) => {
    try {
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
        text: "Do you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
        focusConfirm: false,
      });

      if (result.isConfirmed) {
        await deleteQuotationDetailById(quoteDetailId);
        setReloadContent(true);
        alert.alertSuccessWithTime(
          "Quote detail deleted successfully!",
          "",
          2000,
          "25",
          () => {}
        );
        onDelete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        alert.alertFailedWithTime("Failed to delete", "", 2000, "25", () => {});
      }
    } catch (error) {
      alert.alertFailedWithTime(
        "Failed to delete quote detail. Please try again.",
        "",
        2000,
        "25",
        () => {}
      );
    }
  };
  return (
    <div>
      <RiDeleteBin6Line
        onClick={() => handleDeleteQuoteDetail(quoteDetail.id)}
        style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
      />
    </div>
  );
}
