import React, { useState} from "react";
import { motion } from "framer-motion";

export default function ImageDetailSection({houseProjectDetail}) {
 
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  
    const handleNext = () => {
      setPositionIndexes((prevIndexes) =>
        prevIndexes.map((prevIndex) => (prevIndex + 1) % 5)
      );
    };
  
    const handleBack = () => {
      setPositionIndexes((prevIndexes) =>
        prevIndexes.map((prevIndex) => (prevIndex + 4) % 5)
      );
    };
  
    const positions = ["center", "left1", "left", "right", "right1"];
  
    const imageVariants = {
      center: { x: "0%", scale: 1, zIndex: 5 },
      left1: { x: "-50%", scale: 0.7, zIndex: 4 },
      left: { x: "-90%", scale: 0.5, zIndex: 1 },
      right: { x: "90%", scale: 0.5, zIndex: 1 },
      right1: { x: "50%", scale: 0.7, zIndex: 4 },
    };
  return (
    <>
    
    <div className="flex items-center flex-col justify-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] my-4 lg:my-24">
        {houseProjectDetail.staticFiles.map((image, index) => (
          <motion.img
            key={image.id}
            src={image.url}
            alt={houseProjectDetail.sampleProject.id}
            className="rounded-[12px]"
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: "70%", position: "absolute" }}
          />
        ))}
        <div className="flex flex-row gap-3 md:mt-80 sm:mt-2">
          <button
            className="text-black mt-[400px] bg-baseOrange rounded-md py-2 px-4"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="text-black mt-[400px] bg-baseOrange rounded-md py-2 px-4 mx-6"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
    
  )
}

