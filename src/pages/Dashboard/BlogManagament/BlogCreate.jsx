import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

import { MdDelete } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaChevronRight, FaBlog } from "react-icons/fa6";

import {
  TextEditorBar,
  modules,
  formats,
  MutatingDots,
} from "../../../components";
import { NewFormCreate } from "../../../assets";
import { buttonClick } from "../../../assets/animations";
import { createBlog } from "../../../api";
import "../../../assets/Styles/Snow.css";

function BlogCreate() {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [errorsProject, setErrorsProject] = useState({
    title: "",
    content: "",
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
    toast.success("Upload Image Successfully");
  };

  const deleteImage = () => {
    setSelectedImage(null);
    toast.success("Delete Image Successfully");
  };

  const submitBlog = async () => {
    try {
      setisLoading(true);

      if (!validateProjectForm()) {
        toast.error("Please fill in all required fields correctly.");
        return;
      }

      const formData = new FormData();
      formData.append("ID", "");
      formData.append("Header", title);
      formData.append("Content", content);
      formData.append("AccountId", user?.id);

      if (selectedImage) {
        formData.append("ImageUrl", selectedImage);
      }

      const response = await createBlog(formData);

      if (response) {
        toast.success("Blog created successfully");
        navigate("/staff/list-blog");
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  //Validate
  const validateProjectForm = () => {
    const newErrors = {
      title: "",
      content: "",
    };

    if (!title) {
      newErrors.title = "Title is required.";
    }

    if (!content) {
      newErrors.content = "Content is required.";
    }

    // Check if there are any errors
    if (newErrors.title || newErrors.content) {
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
          <FaBlog />
          <div>Function</div>
          <FaChevronRight />
          <div>Blog Managament</div>
          <FaChevronRight />
        </div>
        <div className="text-2xl text-green-400 font-semibold py-4">
          Create Blog
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
                Love House Blog Create Form
              </h1>
              <div className="mt-2 text-lg font-normal text-gray-600">
                Complete the Lovehouse Civil Blog creation form to share updates
                and information, contributing to the vibrant narrative of
                Lovehouse Civil.
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
                    informative and engaging blog content tailored specifically
                    for Love House, ensuring the delivery of relevant and
                    captivating updates.
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

                    <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                      {isLoading ? (
                        <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
                          <MutatingDots />
                          {Math.round(progress > 0) && (
                            <div className=" w-full flex flex-col items-center justify-center gap-2">
                              <div className="flex justify-between w-full">
                                <span className="text-base font-medium text-textColor">
                                  Progress
                                </span>
                                <span className="text-sm font-medium text-textColor">
                                  {Math.round(progress) > 0 && (
                                    <>{`${Math.round(progress)}%`}</>
                                  )}
                                </span>
                              </div>

                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                  style={{
                                    width: `${Math.round(progress)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          {!selectedImage ? (
                            <>
                              <label>
                                <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
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
                                  name="upload-image"
                                  accept="image/*"
                                  onChange={uploadImage}
                                  className=" w-0 h-0"
                                />
                              </label>
                            </>
                          ) : (
                            <>
                              <div className="relative w-full h-full overflow-hidden rounded-md">
                                <motion.img
                                  whileHover={{ scale: 1.15 }}
                                  src={URL.createObjectURL(selectedImage)}
                                  className=" w-full h-full object-cover"
                                />

                                <motion.button
                                  {...buttonClick}
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
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center w-full">
                    <motion.div
                      {...buttonClick}
                      onClick={submitBlog}
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

export default BlogCreate;
