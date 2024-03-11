import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineProject } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";

import {
  TextEditorBar,
  modules,
  formats,
  MutatingDots,
} from "../../../components";
import { NewFormCreate } from "../../../assets";
import { buttonClick } from "../../../assets/animations";
import { createSampleProject } from "../../../api";
import { vietnameseLocations } from "../../../untils/helper";
import "../../../assets/Styles/Snow.css";

function CreateSampleProject() {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [numOfFloor, setNumOfFloor] = useState("");
  const [constructionArea, setConstructionArea] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [estimatePrice, setEstimatePrice] = useState("");
  const [location, setLocation] = useState("");
  const [functionProject, setFunctionProject] = useState("");
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  const [errorsProject, setErrorsProject] = useState({
    title: "",
    numOfFloor: "",
    constructionArea: "",
    totalArea: "",
    selectedProjectType: "",
    estimatePrice: "",
    location: "",
    functionProject: "",
    content: "",
  });

  const uploadImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      if (selectedImages.length + files.length <= 5) {
        setSelectedImages([...selectedImages, ...files]);
        toast.success("Upload Image Successfully");
      } else {
        toast.error("You can only attach up to 5 images.");
      }
    }
    console.log("selectedImages: ", selectedImages);
  };

  const deleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    toast.success("Delete Image Successfully");
  };

  const submitProject = async () => {
    try {
      setisLoading(true);

      if (!validateProjectForm()) {
        toast.error("Please fill in all required fields correctly.");
        return;
      }

      const formData = new FormData();
      formData.append("Id", "");
      formData.append("NumOfFloor", numOfFloor);
      formData.append("ConstructionArea", constructionArea);
      formData.append("TotalArea", totalArea);
      formData.append("ProjectType", selectedProjectType);
      formData.append("Function", functionProject);
      formData.append("Header", title);
      formData.append("Content", content);
      formData.append("EstimatePrice", estimatePrice);
      formData.append("Location", location);
      formData.append("AccountId", user?.id);

      if (selectedImages) {
        selectedImages.forEach((image) => {
          formData.append(`ImageFiles`, image);
        });
      }

      const response = await createSampleProject(formData);

      if (response) {
        toast.success("Project created successfully");
        navigate("/staff/list-project");
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  //Validate
  const validateProjectForm = () => {
    const newErrors = {
      title: "",
      numOfFloor: "",
      constructionArea: "",
      totalArea: "",
      selectedProjectType: "",
      estimatePrice: "",
      location: "",
      functionProject: "",
      content: "",
    };

    if (!title) {
      newErrors.title = "Title is required.";
    }

    if (!numOfFloor) {
      newErrors.numOfFloor = "Num Of Floor is required.";
    }

    if (!constructionArea) {
      newErrors.constructionArea = "Construction Area is required.";
    }

    if (!totalArea) {
      newErrors.totalArea = "Total Area is required.";
    }

    if (!selectedProjectType) {
      newErrors.selectedProjectType = "Project Type is required.";
    }

    if (!estimatePrice) {
      newErrors.estimatePrice = "Estimate Price is required.";
    }

    if (!location) {
      newErrors.location = "Location is required.";
    }

    if (!functionProject) {
      newErrors.functionProject = "Function is required.";
    }

    if (!content) {
      newErrors.content = "Content is required.";
    }

    // Check if there are any errors
    if (
      newErrors.title ||
      newErrors.numOfFloor ||
      newErrors.constructionArea ||
      newErrors.totalArea ||
      newErrors.selectedProjectType ||
      newErrors.estimatePrice ||
      newErrors.location ||
      newErrors.functionProject ||
      newErrors.content
    ) {
      setErrorsProject(newErrors);
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-col p-8 pb-32 mb-12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      {/* title */}
      <div>
        <div className="flex items-center space-x-2 text-xl">
          <AiOutlineProject />
          <div>Function</div>
          <FaChevronRight />
          <div>House Project Page</div>
          <FaChevronRight />
        </div>
        <div className="text-2xl text-green-400 font-semibold py-4">
          Create Project
        </div>
      </div>

      {/* title  */}
      <div className="pt-12 bg-gray-50 sm:pt-16 border-b pb-[250px] relative">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center max-w-4xl gap-8 mx-auto md:gap-12 md:flex-row">
            <div className="aspect-[4/3] shrink-0 rounded-lg shadow-md overflow-hidden group max-w-xs">
              <img
                src={NewFormCreate}
                alt="img"
                className="object-cover w-full h-full transition-all duration-200 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 text-center md:text-left relative">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Love House Project Create Form
              </h1>
              <div className="mt-2 text-lg font-normal text-gray-600">
                Complete the Lovehouse Civil Project creation form to share
                updates and information, contributing to the vibrant narrative
                of Lovehouse Civil.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 md:justify-start">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Audit Forms
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Create Forms
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Edit Forms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content  */}
      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 -mt-[210px]">
        <div className="max-w-7xl">
          <div className="max-w-2xl p-4 mx-auto bg-white shadow-lg sm:p-6 lg:p-8 rounded-xl ring-1 ring-inset ring-gray-200 isolate">
            <div className="text-sm font-medium text-center text-gray-500 -mt-2 mb-2">
              Template Preview
            </div>
            <div className="open-complete-form mb-4 p-4 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
              <h1 className="mb-4 px-2 font-semibold text-2xl">
                Love House Create Form
              </h1>
              <div>
                <div className="form-description mb-4 text-gray-700 whitespace-pre-wrap px-2">
                  <div>
                    This comprehensive form serves the purpose of crafting
                    informative and engaging project content tailored
                    specifically for Love House, ensuring the delivery of
                    relevant and captivating updates.
                  </div>
                </div>
                <form action="">
                  <div className="relative mb-3">
                    <label className="text-gray-700 font-semibold text-sm">
                      Title
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <div className="flex items-center justify-center gap-3 w-full h-full px-4 py-1 rounded-lg border-gray-300 border bg-white">
                      <input
                        type="text"
                        placeholder="Title"
                        className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    {errorsProject.title && (
                      <div className="text-red-500 text-sm mt-1">
                        {errorsProject.title}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                    <div className="relative mb-3 col-span-1">
                      <label className="text-gray-700 font-semibold text-sm">
                        Num Of Floor
                        <span className="text-red-500 required-dot">*</span>
                      </label>
                      <div className="flex items-center justify-center gap-3 w-full h-12 px-4  rounded-lg border-gray-300 border bg-white">
                        <input
                          type="number"
                          placeholder="Num Of Floor"
                          className="flex-1 w-full h-full outline-none border-none bg-transparent text-text555 text-lg"
                          value={numOfFloor}
                          onChange={(e) => setNumOfFloor(e.target.value)}
                        />
                      </div>
                      {errorsProject.numOfFloor && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.numOfFloor}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-3 col-span-1">
                      <label className="text-gray-700 font-semibold text-sm">
                        Construction Area
                        <span className="text-red-500 required-dot">*</span>
                      </label>
                      <div className="flex items-center justify-center gap-3 w-full h-12 px-4  rounded-lg border-gray-300 border bg-white">
                        <input
                          type="number"
                          placeholder="Area"
                          className="flex-1 w-full h-full outline-none border-none bg-transparent text-text555 text-lg"
                          value={constructionArea}
                          onChange={(e) => setConstructionArea(e.target.value)}
                        />
                      </div>
                      {errorsProject.constructionArea && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.constructionArea}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-3 col-span-1">
                      <label className="text-gray-700 font-semibold text-sm">
                        Total Area
                        <span className="text-red-500 required-dot">*</span>
                      </label>
                      <div className="flex items-center justify-center gap-3 w-full h-12 px-4  rounded-lg border-gray-300 border bg-white">
                        <input
                          type="number"
                          placeholder="Total Area"
                          className="flex-1 w-full h-full outline-none border-none bg-transparent text-text555 text-lg"
                          value={totalArea}
                          onChange={(e) => setTotalArea(e.target.value)}
                        />
                      </div>
                      {errorsProject.totalArea && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.totalArea}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    <div className="relative mb-3 col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Select a ProjectType
                        <span className="text-red-500 required-dot">*</span>
                      </label>
                      <select
                        className="w-full border rounded-md py-2 px-3 mb-3 focus:outline-none focus:ring focus:border-blue-300"
                        value={selectedProjectType}
                        onChange={(e) => setSelectedProjectType(e.target.value)}
                      >
                        <option value="">ProjectType</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </select>
                      {errorsProject.selectedProjectType && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.selectedProjectType}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-3 col-span-1">
                      <label className="text-gray-700 font-semibold text-sm">
                        EstimatePrice
                        <span className="text-red-500 required-dot">*</span>
                      </label>
                      <div className="flex items-center justify-center gap-3 w-full h-12 px-4  rounded-lg border-gray-300 border bg-white">
                        <input
                          type="number"
                          placeholder="Estimate Price"
                          className="flex-1 w-full h-full outline-none border-none bg-transparent text-text555 text-lg"
                          value={estimatePrice}
                          onChange={(e) => setEstimatePrice(e.target.value)}
                        />
                      </div>
                      {errorsProject.estimatePrice && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.estimatePrice}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-3 col-span-1">
                      <label className="text-gray-700 font-semibold text-sm">
                        Location
                        <span className="text-red-500 required-dot">*</span>
                      </label>
                      <select
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="">Location</option>
                        {vietnameseLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      {errorsProject.location && (
                        <div className="text-red-500 text-sm mt-1">
                          {errorsProject.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-3">
                    <label className="text-gray-700 font-semibold text-sm">
                      Function
                      <span className="text-red-500 required-dot">*</span>
                    </label>
                    <div className="flex items-center justify-center gap-3 w-full h-full px-4 py-1 rounded-lg border-gray-300 border bg-white">
                      <input
                        type="text"
                        placeholder="Function"
                        className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
                        value={functionProject}
                        onChange={(e) => setFunctionProject(e.target.value)}
                      />
                    </div>
                    {errorsProject.functionProject && (
                      <div className="text-red-500 text-sm mt-1">
                        {errorsProject.functionProject}
                      </div>
                    )}
                  </div>

                  <div className="relative mb-3">
                    <label className="text-gray-700 font-semibold text-sm">
                      Content
                    </label>
                    <div className="p-3 border rounded-xl w-full max-w-[50.5rem] h-fit border-gray-300 bg-white">
                      <TextEditorBar toolbarId={"t1"} className="" />
                      <ReactQuill
                        theme="snow"
                        placeholder={"Write something awesome..."}
                        modules={modules("t1")}
                        formats={formats}
                        className="max-w-[48.5rem] min-h-[12.5rem] h-[12.5rem] max-h-[12.5rem] overflow-auto"
                        value={content}
                        onChange={(value) => setContent(value)}
                      />
                    </div>
                    {errorsProject.content && (
                      <div className="text-red-500 text-sm mt-1">
                        {errorsProject.content}
                      </div>
                    )}
                  </div>

                  <div className="relative mb-3">
                    <label className="text-gray-700 font-semibold text-sm">
                      Attach Files
                    </label>

                    <div className="grid grid-cols-5 gap-4 mt-3 bg-white text-center">
                      {selectedImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-full h-full overflow-hidden rounded-md"
                        >
                          <motion.img
                            whileHover={{ scale: 1.15 }}
                            src={URL.createObjectURL(image)}
                            className="w-full h-full object-cover"
                            style={{ transform: "none" }} // Apply styles here
                          />

                          <motion.button
                            {...buttonClick}
                            type="button"
                            className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                            onClick={() => deleteImage(index)}
                          >
                            <MdDelete className="-rotate-0" />
                          </motion.button>
                        </div>
                      ))}

                      {[...Array(5 - selectedImages.length)].map((_, index) => (
                        <div
                          key={`upload-placeholder-${index}`}
                          className="relative w-full h-full overflow-hidden rounded-md border-dashed border-2 border-gray-300"
                        >
                          <div className="flex items-center justify-center h-full">
                            <label>
                              <div className="flex flex-col items-center justify-center cursor-pointer">
                                <div className="flex flex-col justify-center items-center cursor-pointer">
                                  <p className="font-bold text-4xl">
                                    <AiOutlineCloudUpload className="-rotate-0" />
                                  </p>
                                  <p className="text-lg text-textColor">
                                    Click to upload an image
                                  </p>
                                </div>
                              </div>
                              <input
                                type="file"
                                name={`upload-image-${index}`}
                                accept="image/*"
                                onChange={(e) => uploadImage(e)}
                                className="w-0 h-0"
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center w-full">
                    <motion.div
                      {...buttonClick}
                      onClick={submitProject}
                      className="px-4 py-2 border rounded-md text-white bg-gray-500 hover:bg-gray-600 font-semibold shadow-md cursor-pointer"
                    >
                      Submit
                    </motion.div>
                  </div>
                </form>
                <div className="text-center w-full mt-2">
                  <Link
                    to={"/home"}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer hover:underline text-xs"
                  >
                    Powered by
                    <span className="font-semibold mx-1">Love House</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-20 pb-12 bg-white sm:pb-16">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto mt-16 space-y-12 sm:mt-16 sm:space-y-16">
              <div className="space-y-5">
                <h2 className="text-gray-400 font-semibold uppercase">
                  Introduction
                </h2>
                <div>
                  This form is designed for reporting Love House incidents. It
                  provides a structured way to collect necessary information
                  regarding any security breaches or incidents that have
                  occurred.
                </div>
                <h2 className="text-gray-400 font-semibold uppercase">
                  Purpose
                </h2>
                <div>
                  This form is designed for reporting Love House incidents. It
                  provides a structured way to collect necessary information
                  regarding any security breaches or incidents that have
                  occurred.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSampleProject;
