import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Table, Input, Modal, Button } from "antd";

import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaChevronRight } from "react-icons/fa";
import { SiMaterialdesignicons } from "react-icons/si";

import { buttonClick } from "../../../assets/animations";
import { getAllMaterials, deleteMaterialById } from "../../../api";
import { MutatingDots } from "../../../components";
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

  const paginate = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setItemsPerPage(pageSize);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Unit Material",
      dataIndex: "unitMaterial",
      key: "unitMaterial",
      render: (materialType) => {
        return materialType === 0
          ? "KG"
          : materialType === 1
          ? "M3"
          : materialType === 2
          ? "BAR"
          : "ITEM";
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <div className="flex items-center justify-center space-x-4">
          <MdDelete
            className="cursor-pointer text-xl text-red-400 hover:text-red-500"
            onClick={() => openDeleteConfirmation(record.id)}
          />
          <FaRegEdit
            onClick={() => openEditMaterial(record.id)}
            className="cursor-pointer text-xl text-blue-400 hover:text-blue-500"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="flex flex-col p-8 pb-32 mb-12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <div>
            <div className="flex items-center space-x-2 text-xl">
              <SiMaterialdesignicons />
              <div>Import Export</div>
              <FaChevronRight />
              <div>Material</div>
              <FaChevronRight />
            </div>
            <div className="text-2xl text-green-400 font-semibold py-4">
              Material List
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="px-2 font-semibold">Search</div>
              <Input
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
                className="px-4 py-2 border rounded-md text-white bg-green-500 hover:bg-green-600 font-semibold shadow-md cursor-pointer"
              >
                Create Material
              </motion.div>
            </div>
          </div>

          {/* Material Table */}
          <Table
            dataSource={currentMaterials}
            columns={columns}
            rowKey="id"
            pagination={{
              total: totalItems,
              current: currentPage,
              pageSize: itemsPerPage,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              onChange: paginate,
              onShowSizeChange: paginate,
            }}
          />

          {/* Delete Confirmation Modal */}
          {deleteConfirmation && (
            <Modal
              title="Delete Material"
              open={!!deleteConfirmation}
              onCancel={closeDeleteConfirmation}
              footer={[
                <Button key="cancel" onClick={closeDeleteConfirmation}>
                  No
                </Button>,
                <Button
                  key="delete"
                  type="primary"
                  danger
                  onClick={confirmDelete}
                >
                  Yes
                </Button>,
              ]}
            >
              <p className="text-lg font-semibold">
                Are you sure you want to delete this material?
              </p>
            </Modal>
          )}
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
