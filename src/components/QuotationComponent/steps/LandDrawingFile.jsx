import { useContext, useState } from "react";
import { StepperContext } from "../StepperContext";

export default function LandDrawingFile() {
  const { userData, setUserData , isFileSelected, setIsFileSelected} = useContext(StepperContext);
  const [imagePreview, setImagePreview] = useState(null);
  

  const handleChange = (e) => {
    const { name, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const selectedImage = files[0];

      // Update userData to store the image file
      setUserData({ ...userData, [name]: selectedImage });

      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(selectedImage);
      setImagePreview(previewURL);

      setIsFileSelected(true);
    }else {
      // Set the validation status to false if no file is selected
      setIsFileSelected(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Your land drawing file
        </div>

        <div className={`bg-white my-2 p-1 flex border border-gray-200 rounded ${!isFileSelected ? "border-red-500" : ""}`}>
          <input
            onChange={handleChange}
            name="landDrawingFileUrl" 
            type="file"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {!isFileSelected && (
        <p className="text-red-500 text-sm mt-1">Please select a file.</p>
      )}

        {imagePreview && (
          <div className="mt-2">
            <p className="font-bold text-sm">Preview your file:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full h-auto mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
