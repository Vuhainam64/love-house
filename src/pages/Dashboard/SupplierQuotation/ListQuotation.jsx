import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Input, Table, Space, Pagination as AntPagination } from "antd";

import { FaChevronRight } from "react-icons/fa6";
import { IoPricetagsSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import {
  deleteSupplierQuotationById,
  getAllSupplierQuotations,
} from "../../../api";
import { MutatingDots } from "../../../components";
import ConfirmPopup from "../../../components/Dashboard/ConfirmPopup";

const { Column } = Table;

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
                <Input
                  type="text"
                  className="border px-2 py-1"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <Table
              dataSource={currentQuotations}
              pagination={false}
              rowKey={(record, index) =>
                `${record.supplierPriceQuotation.id}-${index}`
              }
            >
              <Column
                title="Name"
                dataIndex={[
                  "supplierPriceQuotation",
                  "supplier",
                  "supplierName",
                ]}
                key="supplierName"
              />
              <Column
                title="Date"
                dataIndex={["supplierPriceQuotation", "date"]}
                key="date"
              />
              <Column
                title="MOQ"
                dataIndex={["supplierPriceDetails", 0, "moq"]}
                key="moq"
              />
              <Column
                title="Price"
                dataIndex={["supplierPriceDetails", 0, "price"]}
                key="price"
              />
              <Column
                title="Edit"
                key="edit"
                render={(text, record) => (
                  <Space size="middle">
                    <MdDelete
                      className="cursor-pointer text-xl hover:text-red-500"
                      onClick={() =>
                        openDeleteConfirmation(record.supplierPriceQuotation.id)
                      }
                    />
                  </Space>
                )}
              />
            </Table>
          </div>
          <div className="w-full p-5">
            {totalItems && (
              <AntPagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={totalItems}
                onChange={paginate}
                showSizeChanger
                onShowSizeChange={chooseItemPerPage}
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
