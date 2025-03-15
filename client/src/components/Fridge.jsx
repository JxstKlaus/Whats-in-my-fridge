import { useState } from "react";
import { motion } from "framer-motion";

export default function Fridge() {
  const [isOpen, setIsOpen] = useState(false);
  const scale = 2;

  return (
    <>
      {/* Entire fridge container scaled */}
      <motion.div
        className="relative w-64 h-116 bg-gray-300 border-12 border-black rounded-xl shadow-lg shadow-black/65"
        animate={{
          scale: isOpen ? scale : 1,  // Apply scale to entire fridge container
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Fridge Legs */}
        <div className="absolute -bottom-6 left-3 w-6 h-4 bg-black rounded-sm shadow-md"></div>
        <div className="absolute -bottom-6 right-3 w-6 h-4 bg-black rounded-sm shadow-md"></div>

        {/* Main Body */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300 inset-shadow-sm inset-shadow-black"></div>

        {/* Freezer Door */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[25%] bg-gray-200 ring-6 ring-[#333] rounded-md shadow-md"
          animate={{
            rotateY: isOpen ? -200 : 0,
            rotateX: isOpen ? -10 : 0,
            x: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "right" }}
          onClick={() => setIsOpen(!isOpen)}
        >
            
          {/* Freezer Door Handle */}
          <div className="absolute left-4 top-5 bottom-5 w-2 bg-[#333] rounded-2xl"></div>
        </motion.div>

        {/* Main Door */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[70%] bg-gray-200 ring-6 ring-[#333] rounded-md shadow-md"
          animate={{
            rotateY: isOpen ? -200 : 0,
            rotateX: isOpen ? -10 : 0,
            x: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "right" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Main Door Handle */}
          <div className="absolute left-4 top-5 bottom-5 w-2 bg-[#333] rounded-2xl"></div>
        </motion.div>
      </motion.div>
    </>
  );
}
