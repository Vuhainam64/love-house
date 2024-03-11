import React, { useEffect, useState, Fragment } from "react";

import Swal from "sweetalert2";
import { alert } from "../../../components/Alert/Alert";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

import { deleteWorkerPrice } from "../../../constants/apiWorker";

export default function DeleteWorkerPrice({ workerDetail, onDelete ,fetchAllWorker}) {
 
  const handleDeleteWorkerPrice = async () => {

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
       
        const res = await deleteWorkerPrice(workerDetail.id);
        if (res.isSuccess) {
        //  setReloadContent(true);
          alert.alertSuccessWithTime(
            "Worker Price deleted successfully!",
            "",
            2000,
            "25",
            () => {}
          );
          fetchAllWorker
          onDelete();
        } else {
          for (var i = 0; i < result.messages.length; i++) {
            toast.error(result.messages[i]);
          }
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        alert.alertFailedWithTime("Failed to delete", "", 2000, "25", () => {});
      }
    
  };
  return (
    <div>
      <RiDeleteBin6Line
        //onClick={() => handleDeleteWorkerPrice(workerDetail.id)}
        onClick={handleDeleteWorkerPrice}
        style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
      />
    </div>
  );
}
