import { useState } from "react";
import { motion } from "framer-motion";

export default function Fridge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-40 h-72 bg-gray-300 border-8 border-black rounded-md shadow-lg shadow-black/65 ">

        {/* Fridge Legs */}
        <div className="absolute -bottom-4 left-2 w-4 h-4 bg-black rounded-sm shadow-md"></div>
        <div className="absolute -bottom-4 right-2 w-4 h-4 bg-black rounded-sm shadow-md"></div>
        
        {/* Main Body */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300"></div>

        {/* Freezer Door */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[25%] bg-gray-200 ring-4 ring-[#333] rounded-md shadow-md"
          animate={{ rotateY: isOpen ? -200 : 0, rotateX: isOpen ? -10 : 0, x: isOpen ? 5 : 0}}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "right" }}
        />

        {/* Main Door */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[70%] bg-gray-200 ring-4 ring-[#333] rounded-md shadow-md"
          animate={{ rotateY: isOpen ? -200 : 0 , rotateX: isOpen ? -10 : 0, x: isOpen ? 5 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "right" }}
          onClick={() => setIsOpen(!isOpen)}
        >
        {/* handles */}
        <div className="absolute left-2 top-5 bottom-5 w-2 bg-[#333] rounded-2xl"></div>
        </motion.div>

        
      </div>
    </div>
  );
}

