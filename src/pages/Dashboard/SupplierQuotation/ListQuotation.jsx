import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { FaChevronRight } from "react-icons/fa6";
import { IoPricetagsSharp } from "react-icons/io5";

import {
  deleteSupplierQuotationById,
  getAllSupplierQuotations,
} from "../../../api";
import { MutatingDots, Pagination } from "../../../components";
import { MdDelete, MdOutlineViewInAr } from "react-icons/md";
import ConfirmPopup from "../../../components/Dashboard/ConfirmPopup";

function ListQuotation() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentQuotations, setCurrentQuotations] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllSupplierQuotations(1, 100);
        if (response && response.isSuccess) {
          const formattedQuotations = response.result.data.map((quotation) => ({
            ...quotation,
            supplierPriceQuotation: {
              ...quotation.supplierPriceQuotation,
              date: format(
                new Date(quotation.supplierPriceQuotation.date),
                "dd/MM/yyyy"
              ),
            },
          }));
          setQuotations(formattedQuotations);
        }
      } catch (error) {
        console.error("Error fetching quotations:", error);
        setQuotations([]);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (quotations) {
      const filteredQuotations = quotations.filter((quotation) =>
        String(JSON.stringify(quotation))
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

      setTotalItems(filteredQuotations.length);

      setCurrentQuotations([]);
      const firstItem = currentPage * itemsPerPage - itemsPerPage;
      if (firstItem >= filteredQuotations.length) return;

      const lastIndex = Math.min(
        firstItem + itemsPerPage,
        filteredQuotations.length
      );
      setCurrentQuotations(filteredQuotations.slice(firstItem, lastIndex));
    }
  }, [currentPage, itemsPerPage, quotations, searchTerm]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const chooseItemPerPage = (itemNumber) => {
    setItemsPerPage(itemNumber);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openDeleteConfirmation = (quotationId) => {
    setDeleteConfirmation(quotationId);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const confirmDelete = async () => {
    if (deleteConfirmation) {
      try {
        const response = await deleteSupplierQuotationById(deleteConfirmation);
        if (response && response.isSuccess) {
          // Refresh data or update state after successful deletion
          console.log("Quotation deleted successfully");
        } else {
          console.error("Error deleting quotation");
        }
      } catch (error) {
        console.error("Error deleting quotation:", error);
      } finally {
        closeDeleteConfirmation();
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="flex flex-col p-8 text-gray-900">
          <div>
            <div className="flex items-center space-x-2 text-xl">
              <IoPricetagsSharp />
              <div>Supplier</div>
              <FaChevronRight />
              <div>Price Quotation</div>
              <FaChevronRight />
            </div>
            <div className="text-2xl text-orange-400 font-semibold py-4">
              Quotation List
            </div>
          </div>
          <div className="px-3 py-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="px-2">Search</div>
              <div>
                <input
                  type="text"
                  className="border px-2 py-1"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300 ">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 border-b border-gray-300">Name</th>
                  <th className="py-2 px-4 border-b border-gray-300">Date</th>
                  <th className="py-2 px-4 border-b border-gray-300">MOQ</th>
                  <th className="py-2 px-4 border-b border-gray-300">Price</th>
                  <th className="py-2 px-4 border-b border-gray-300">Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentQuotations.map((quotation, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-100`}
                  >
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      {quotation.supplierPriceQuotation.supplier.supplierName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      {quotation.supplierPriceQuotation.date}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      {quotation.supplierPriceDetails[0].moq}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      {quotation.supplierPriceDetails[0].price}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <MdDelete
                          className="cursor-pointer text-xl hover:text-red-500"
                          onClick={() =>
                            openDeleteConfirmation(
                              quotation.supplierPriceQuotation.id
                            )
                          }
                        />
                        {/* <MdOutlineViewInAr className="cursor-pointer text-xl" /> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full p-5">
            {totalItems && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                paginate={paginate}
                choseItemPerPage={chooseItemPerPage}
              />
            )}
          </div>
        </div>
      )}
      {deleteConfirmation && (
        <ConfirmPopup
          message="Are you sure you want to delete this quotation?"
          onConfirm={confirmDelete}
          onCancel={closeDeleteConfirmation}
        />
      )}
    </>
  );
}

export default ListQuotation;
