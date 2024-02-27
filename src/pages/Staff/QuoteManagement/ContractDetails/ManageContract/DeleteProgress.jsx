import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { alert } from "../../../../../components/Alert/Alert";
import {
  getContractProgressById,
  deleteContractProgressById, // Corrected import
} from "../../../../../constants/apiContract";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteProgress({ contractDetail, onDelete }) {
  const { id } = useParams();
  const [reloadContent, setReloadContent] = useState(false);

  const fetchContractProgress = async () => {
    try {
      const data = await getContractProgressById(id);

      if (data && data.result) {
        setReloadContent(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchContractProgress();
  }, [id, reloadContent]);

  const handleDeleteContractProrgess = async () => {
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
        await deleteContractProgressById(id);
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
      <button className="flex items-center bg-red-500 px-4 py-2 ml-5 rounded text-white">
        <RiDeleteBin6Line
          onClick={() => handleDeleteContractProrgess(contractDetail.id)}
          style={{ cursor: "pointer", marginRight: "10px" }}
        />
        Delete Progresss
      </button>
    </div>
  );
}
