import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { SiMaterialdesignicons } from "react-icons/si";

import { buttonClick } from "../../../assets/animations";
import { getAllMaterials, deleteMaterialById } from "../../../api";
import { Pagination, MutatingDots } from "../../../components";
import CreateMaterial from "./CreateMaterial";
import EditMaterial from "./EditMaterial";

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentMaterials, setCurrentMaterials] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllMaterials(1, 100);
        if (response && response.isSuccess) {
          setMaterials(response.result.data);
        }
      } catch (error) {
        toast.error("Error fetching materials:", error);
        setMaterials([]);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (materials) {
      const filteredMaterials = materials.filter(
        (material) =>
          material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (material.materialType === 0 &&
            "kg".includes(searchTerm.toLowerCase())) ||
          (material.materialType === 1 &&
            "m3".includes(searchTerm.toLowerCase())) ||
          (material.materialType === 2 &&
            "bar".includes(searchTerm.toLowerCase())) ||
          (material.materialType === 3 &&
            "item".includes(searchTerm.toLowerCase()))
      );

      setTotalItems(filteredMaterials.length);

      const firstItem = currentPage * itemsPerPage - itemsPerPage;
      const lastIndex = Math.min(
        firstItem + itemsPerPage,
        filteredMaterials.length
      );

      setCurrentMaterials(filteredMaterials.slice(firstItem, lastIndex));
    }
  }, [currentPage, itemsPerPage, materials, searchTerm]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const chooseItemPerPage = (itemNumber) => {
    setItemsPerPage(itemNumber);
    setCurrentPage(1);
  };

  const openDeleteConfirmation = (materialId) => {
    setDeleteConfirmation(materialId);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const updatedMaterials = await getAllMaterials(1, 100);
      if (updatedMaterials && updatedMaterials.isSuccess) {
        setMaterials(updatedMaterials.result.data);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirmation) {
      try {
        const response = await deleteMaterialById(deleteConfirmation);
        if (response && response.isSuccess) {
          // Refresh data or update state after successful deletion
          toast.success("Material deleted successfully");
          refreshData();
        } else {
          toast.error("Error deleting material");
        }
      } catch (error) {
        toast.error("Error deleting material:", error);
      } finally {
        closeDeleteConfirmation();
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openEditMaterial = (materialId) => {
    setSelectedMaterialId(materialId);
    setIsEdit(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="flex flex-col p-8">
          {/* title */}
          <div>
            <div className="flex items-center space-x-2 text-xl">
              <SiMaterialdesignicons />
              <div>Import Export</div>
              <FaChevronRight />
              <div>Material</div>
              <FaChevronRight />
            </div>
            <div className="text-2xl text-orange-400 font-semibold py-4">
              Material List
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="px-2 font-semibold">Search</div>
              <input
                type="text"
                className="border px-2 py-1 w-80"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-wrap space-x-2">
              <motion.div
                {...buttonClick}
                onClick={() => setIsCreate(true)}
                className="px-4 py-2 border rounded-md text-white bg-orange-500 hover:bg-orange-600 font-semibold shadow-md cursor-pointer"
              >
                Create Material
              </motion.div>
            </div>
          </div>

          {/* Material Table */}
          <table className="min-w-full bg-white border border-gray-300 ">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 border-b border-gray-300">Name</th>
                <th className="py-2 px-4 border-b border-gray-300">Type</th>
                <th className="py-2 px-4 border-b border-gray-300">Quantity</th>
                <th className="py-2 px-4 border-b border-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentMaterials.map((material, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-orange-100`}
                >
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    {material.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    {material.materialType === 0
                      ? "KG"
                      : material.materialType === 1
                      ? "M3"
                      : material.materialType === 2
                      ? "BAR"
                      : "ITEM"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    {material.quantity}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <MdDelete
                        className="cursor-pointer text-xl text-red-400 hover:text-red-500"
                        onClick={() => openDeleteConfirmation(material.id)}
                      />
                      <FaRegEdit
                        onClick={() => openEditMaterial(material.id)}
                        className="cursor-pointer text-xl text-blue-400 hover:text-blue-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation Modal */}
          {deleteConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md shadow-md">
                <p className="text-lg font-semibold mb-4">
                  Are you sure you want to delete this material?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Yes
                  </button>
                  <button
                    onClick={closeDeleteConfirmation}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
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

      {/* create material  */}
      {isCreate && (
        <div>
          <CreateMaterial setIsCreate={setIsCreate} refreshData={refreshData} />
        </div>
      )}

      {/* edit material */}
      {isEdit && (
        <div>
          <EditMaterial
            setIsEdit={setIsEdit}
            refreshData={refreshData}
            selectedMaterialId={selectedMaterialId}
          />
        </div>
      )}
    </>
  );
};

export default MaterialList;
