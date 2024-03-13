import { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { quoteRequest } from "../../../constants/apiQuotationOfCustomer";

import { MdDelete } from "react-icons/md";

import { LuUpload } from "react-icons/lu";
import { alert } from "../../../components/Alert/Alert";
import { Button } from "antd";

export default function QuotationForm() {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");
  const [constructionType, setConstructionType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [address, setAddress] = useState("");
  const [progress, setProgress] = useState(null);

  const [isLoading, setisLoading] = useState(false);

  const [errorsProject, setErrorsProject] = useState({
    floor: "",
    area: "",
    constructionType: "",
    selectedImage: "",
    address: "",
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setErrorsProject({ ...errorsProject, selectedImage: "" });
    }
    alert.alertSuccessWithTime(
      "Upload Image Successfully",
      "",
      2000,
      "30",
      () => {}
    );
  };

  const deleteImage = () => {
    setSelectedImage(null);
    alert.alertSuccessWithTime(
      "Delete Image Successfully",
      "",
      2000,
      "30",
      () => {}
    );
  };

  const submitRequest = async (e) => {
    e.preventDefault();

    //   setisLoading(true);

    if (!validateProjectForm()) {
      return;
    }
    const formData = {
      numOfFloor: floor,
      area: area,
      landDrawingFileUrl: selectedImage ? selectedImage : null,
      constructionType: constructionType,
      address: address,
    };
    setisLoading(true);
    const response = await quoteRequest(formData, user?.id);
    console.log("Form Data:", formData);

    if (response.isSuccess) {
      alert.alertSuccessWithTime(
        "Request quotation created successfully",
        "",
        2000,
        "30",
        () => {}
      );
      setisLoading(false);
      navigate("/customer/my-request");
    } else {
      alert.alertFailedWithTime(
        "Failed to create request",
        "Please try again",
        2500,
        "25",
        () => {}
      );
      setisLoading(false);
    }
  };

  const validateProjectForm = () => {
    const newErrors = {
      floor: "",
      area: "",
      constructionType: "",
      selectedImage: "",
      address: "",
    };

    if (!floor) {
      newErrors.floor = "Floor is required!";
    }

    if (!area) {
      newErrors.area = "Area is required!";
    } else if (parseInt(area) < 12) {
      newErrors.area = "Area must be greater than or equal to 12m²";
    }

    if (!constructionType) {
      newErrors.constructionType = "Construction Type is required!";
    }
    if (!selectedImage) {
      newErrors.selectedImage = "Please select an image!";
    }
    if (!address) {
      newErrors.address = "Address is required!";
    }

    if (
      newErrors.floor ||
      newErrors.area ||
      newErrors.constructionType ||
      newErrors.selectedImage ||
      newErrors.address
    ) {
      setErrorsProject(newErrors);
      const firstErrorKey = Object.keys(newErrors).find(
        (key) => newErrors[key]
      );
      const firstErrorElement = document.querySelector(
        `[name=${firstErrorKey}]`
      );

      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return false;
    }

    return true;
  };

  return (
    <>
      <section className="pb-8 mt-24">
        <div className="container px-4 mx-auto">
          <div className="w-full px-4">
            <div className="px-8 md:px-16 pt-6 pb-8 bg-gray-50 shadow border-2 border-gray-200 rounded-xl">
              <h1 className="mb-10 text-center text-4xl font-semibold">
                Request for Quote
              </h1>
              <div className="max-w-xl mx-auto">
                <form onSubmit={(e) => submitRequest(e, formData)}>
                  <div className="flex flex-wrap -mx-4 -mb-10">
                    <div className="w-full md:w-1/2 px-4 mb-10">
                      <div className="relative w-full h-14 py-4 px-3 border border-gray-400  focus-within:border-green-500 rounded-lg">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-500 px-1 bg-white ">
                          Number of floor
                        </span>
                        <input
                          type="number"
                          name="numOfFloor"
                          className="block w-full outline-none bg-transparent placeholder-gray-50 font-semibold"
                          value={floor}
                          onChange={(e) => {
                            setFloor(e.target.value);
                            setErrorsProject({
                              ...errorsProject,
                              floor: "",
                            });
                          }}
                        />
                      </div>
                      {errorsProject.floor && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.floor}
                        </div>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 px-4 mb-10">
                      <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-green-500 rounded-lg">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-500 px-1  bg-white ">
                          Total area (m²)
                        </span>
                        <input
                          type="text"
                          name="area"
                          className="block w-full outline-none bg-transparent  placeholder-gray-50 font-semibold"
                          value={area}
                          onChange={(e) => {
                            setArea(e.target.value);
                            setErrorsProject({
                              ...errorsProject,
                              area: "",
                            });
                          }}
                        />
                      </div>
                      {errorsProject.area && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.area}
                        </div>
                      )}
                    </div>

                    <div className="w-full  px-4 mb-10">
                      <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-green-500 rounded-lg">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-500 px-1  bg-white ">
                          Address
                        </span>
                        <input
                          type="text"
                          name="address"
                          className="block w-full outline-none bg-transparent  placeholder-gray-50 font-semibold"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            setErrorsProject({
                              ...errorsProject,
                              address: "",
                            });
                          }}
                        />
                      </div>
                      {errorsProject.address && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.address}
                        </div>
                      )}
                    </div>

                    <div className="w-full px-4 mb-10">
                      <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-green-500 rounded-lg">
                        <label
                          htmlFor="constructionType"
                          className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-500 px-1  bg-white "
                        >
                          Construction type
                        </label>
                        <select
                          value={constructionType}
                          name="constructionType"
                          onChange={(e) => {
                            setConstructionType(e.target.value);
                            setErrorsProject({
                              ...errorsProject,
                              constructionType: "",
                            });
                          }}
                          className="block w-full outline-none bg-transparent placeholder-gray-50 "
                        >
                          <option value="" disabled>
                            -- Select construction type --
                          </option>
                          <option value="0">Rough construction</option>
                          <option value="1">Completed construction</option>
                        </select>
                      </div>
                      {errorsProject.constructionType && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.constructionType}
                        </div>
                      )}
                    </div>

                    <div className="w-full px-4 mb-10">
                      <>
                        {!selectedImage ? (
                          <>
                            <label>
                              <div className="flex flex-wrap sm:flex-nowrap">
                                <div className="w-full py-8 px-4 text-center border-dashed border border-gray-400 rounded-lg">
                                  <div className="relative group h-14 w-14 mx-auto mb-4">
                                    <div className="flex items-center justify-center h-14 w-14  rounded-full cursor-pointer">
                                      <LuUpload
                                        size={32}
                                        className="-rotate-0"
                                      />
                                    </div>
                                    <input
                                      type="file"
                                      name="landDrawingFileUrl"
                                      onChange={uploadImage}
                                      className=" w-0 h-0"
                                    />
                                  </div>

                                  <p className="font-semibold leading-normal mb-1 text-textColor">
                                    Click to upload an image
                                  </p>
                                </div>
                              </div>
                            </label>
                          </>
                        ) : (
                          <>
                            <div className="relative w-full h-full overflow-hidden rounded-md">
                              <motion.img
                                // whileHover={{ scale: 1.15 }}
                                src={URL.createObjectURL(selectedImage)}
                                className=" w-full h-full object-cover"
                              />

                              <motion.button
                                type="button"
                                className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                onClick={deleteImage}
                              >
                                <MdDelete className="-rotate-0" />
                              </motion.button>
                            </div>
                          </>
                        )}
                      </>
                      {errorsProject.selectedImage && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.selectedImage}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 text-right">
                    <Button
                      className="inline-block  px-4  text-xs text-center font-semibold leading-6 text-white bg-baseGreen hover:bg-green-600 rounded-lg transition duration-200"
                      onClick={submitRequest}
                      loading={isLoading}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
