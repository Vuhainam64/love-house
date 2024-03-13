import { useEffect, useState, useRef } from "react";
import { DBHeader, LoadingOverlay, StaffSidebar } from "../../../components";
import {
  deleteConstructionConfig,
  getAllConstructionConfig,
  searchConstructionConfig,
} from "../../../constants/apiConstructionConfig";
import { Button, Input, InputNumber, Select, Space, Table, Tag } from "antd";
import ConstructionConfigForProject from "./ConstructionConfigForProject";
import ConstructionConfigUpdateForm from "./ConstructionConfigUpdateForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import BaseButton from "../../../components/Button/BaseButton";
import { IoIosArrowDropdown } from "react-icons/io";
import { AiOutlineFunnelPlot } from "react-icons/ai";
import Instruction from "../../UserCommon/Instruction/Instruction";

const ConstructionConfigManagement = () => {
  const [constructionConfigList, setConstructionConfigList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [showFilter, setShowFilter] = useState(false); // State để theo dõi trạng thái của phần filter

  const [searchParams, setSearchParams] = useState({
    constructionType: 0,
    numOfFloorMin: 0,
    numOfFloorMax: 0,
    areaMin: 0,
    areaMax: 0,
    tiledAreaMin: 0,
    tiledAreaMax: 0,
  });

  const fetchData = async () => {
    const data = await getAllConstructionConfig();
    if (data.isSuccess) {
      setConstructionConfigList(data.result.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setShowUpdateModal(true);
    setUpdateData(record);
  };
  const handleInputChange = (field, value) => {
    setSearchParams({
      ...searchParams,
      [field]: value,
    });
  };

  const handleSearch = async () => {
    // Handle search logic here, you can use searchParams state
    console.log(searchParams);
    const data = await searchConstructionConfig(searchParams);
    if (data.isSuccess) {
      setConstructionConfigList(data.result.data);
    }
  };
  const handleReset = async () => {
    setSearchParams({
      constructionType: 0,
      numOfFloorMin: 0,
      numOfFloorMax: 0,
      areaMin: 0,
      areaMax: 0,
      tiledAreaMin: 0,
      tiledAreaMax: 0,
    });
    setShowFilter(false);
    fetchData();
  };
  const handleDelete = async (record) => {
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
      text: "Do you want to delete this config?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, I agree",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      focusConfirm: false,
    });

    if (result.isConfirmed) {
      const data = await deleteConstructionConfig(record.id);

      if (data.isSuccess) {
        toast.success("Delete successfully");
        fetchData();
      } else {
        for (var i = 0; i < data.messages.length; i++) {
          toast.error(data.messages[i]);
        }
      }
    }
  };
  const columns = [
    {
      title: "Sand Mixing Ratio (%)",
      dataIndex: "sandMixingRatio",
      key: "sandMixingRatio",
      width: 150,
    },
    {
      title: "Cement Mixing Ratio (%)",
      dataIndex: "cementMixingRatio",
      key: "cementMixingRatio",
      width: 180,
    },
    {
      title: "Stone Mixing Ratio (%)",
      dataIndex: "stoneMixingRatio",
      key: "stoneMixingRatio",
      width: 160,
    },
    {
      title: "Construction Type",
      dataIndex: "constructionType",
      key: "constructionType",
      width: 150,
      render: (text) =>
        text === 0 ? (
          <Tag color="gold">Rough</Tag>
        ) : (
          <Tag color="cyan">Completed</Tag>
        ),
    },
    {
      title: "Number of Floors (Min - Max)",
      dataIndex: "numOfFloorMinMax",
      key: "numOfFloorMinMax",
      width: 150,
      render: (text, record) => (
        <span>{`${record.numOfFloorMin} - ${record.numOfFloorMax}`}</span>
      ),
    },
    {
      title: "Area (Min- Max) (m²)",
      dataIndex: "areaMinMax",
      key: "areaMinMax",
      width: 150,
      render: (text, record) => (
        <span>{`${record.areaMin} - ${record.areaMax}`}</span>
      ),
    },
    {
      title: "Tiled Area (Min-Max) (m²)",
      dataIndex: "tiledAreaMinMax",
      key: "tiledAreaMinMax",
      width: 180,
      render: (text, record) => (
        <span>{`${record.tiledAreaMin} - ${record.tiledAreaMax}`}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      responsive: ["md"],

      render: (text, record) => (
        <div className="-ml-4">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const toggleFilter = () => {
    setShowFilter(!showFilter); // Khi nhấn nút filter, toggle trạng thái hiển thị của phần filter
  };
  const [modalVisible, setModalVisible] = useState(true);

  const handleCreate = (newInput) => {
    // Handle creation of new configuration
    console.log("Creating new configuration with:", newInput);
    setModalVisible(false);
  };
  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="flex flex-col h-screen w-full overflow-y-auto">
        <h1 className="text-2xl font-semibold pb-2 mt-5 uppercase text-center">
          Construction Config
        </h1>

        <div className="flex justify-between mb-4 px-16">
          <div className="flex">
            <Button
              className="bg-baseGreen text-white flex items-center justify-between w-24"
              onClick={toggleFilter}
            >
              Filter <AiOutlineFunnelPlot />
            </Button>
            <Button
              className="bg-baseGreen text-white mx-2"
              onClick={() => setModalVisible(true)}
            >
              Policy
            </Button>
          </div>

          <Button
            className="bg-baseGreen text-white "
            onClick={() => setShowAddModal(true)}
          >
            + Add construction config
          </Button>
        </div>

        {showFilter && (
          <div className="flex flex-col   justify-start items-start mx-16 my-2">
            <div className="flex justify-start items-center space-y-2">
              <Select
                id="constructionType"
                className="w-42"
                value={searchParams.constructionType}
                onChange={(value) =>
                  handleInputChange("constructionType", value)
                }
              >
                <Option value={0}>Rough Construction</Option>
                <Option value={1}>Complete Construction</Option>
              </Select>
            </div>
            <div className="flex justify-start items-center my-2">
              <label className="text-sm">Number of Floors:</label>
              <InputNumber
                className="h-8 w-16"
                value={searchParams.numOfFloorMin}
                onChange={(value) => handleInputChange("numOfFloorMin", value)}
              />
              <span>-</span>
              <InputNumber
                className="h-8 w-16"
                value={searchParams.numOfFloorMax}
                onChange={(value) => handleInputChange("numOfFloorMax", value)}
              />
            </div>
            <div className="flex justify-start items-center my-2">
              <label className="text-sm">Area:</label>
              <InputNumber
                className="w-16"
                value={searchParams.areaMin}
                onChange={(value) => handleInputChange("areaMin", value)}
              />
              <span>-</span>
              <InputNumber
                className=" w-16"
                value={searchParams.areaMax}
                onChange={(value) => handleInputChange("areaMax", value)}
              />
            </div>
            <div className="flex justify-start items-center my-2">
              <label className="text-sm">Tiled Area:</label>
              <InputNumber
                className="h-full w-16"
                value={searchParams.tiledAreaMin}
                onChange={(value) => handleInputChange("tiledAreaMin", value)}
              />
              <span>-</span>
              <InputNumber
                className="h-8 w-16"
                value={searchParams.tiledAreaMax}
                onChange={(value) => handleInputChange("tiledAreaMax", value)}
              />
            </div>
            <div className="flex justify-start items-center my-2">
              <Button
                className="bg-baseGreen text-white"
                type="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                className="bg-baseGreen text-white mx-2"
                type="primary"
                onClick={handleReset}
              >
                Reset Filter
              </Button>
            </div>
          </div>
        )}

        <Table
          dataSource={constructionConfigList}
          columns={columns}
          key={`id`}
          className="overflow-auto"
          scroll={{ x: true }}
        />

        <ConstructionConfigForProject
          setShowModal={setShowAddModal}
          showModal={showAddModal}
          fetchData={fetchData}
        />
        {showUpdateModal && (
          <ConstructionConfigUpdateForm
            setShowModal={setShowUpdateModal}
            showModal={showUpdateModal}
            data={updateData}
            fetchData={fetchData}
          />
        )}
      </div>
      <Instruction
        visible={modalVisible}
        onCreate={handleCreate}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default ConstructionConfigManagement;
