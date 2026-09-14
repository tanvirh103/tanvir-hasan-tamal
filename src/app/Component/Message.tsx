"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const messages = [
  "Hello",           
  "Bonjour",         
  "Hola",           
  "こんにちは",      
  "হ্যালো",        
  "नमस्ते",        
  "안녕하세요",      
  "你好",           
  "Merhaba",        
  "Ciao",           
  "Olá",            
  "Привет",         
  "السلام عليكم",    
  "Γεια σας",      
  "สวัสดี"      
];

export default function RotatingMessage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const rotateVariants: Variants = {
    initial: { rotateX: 90, opacity: 0 },
    animate: {
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      rotateX: -90,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div className="">
      <div
        className=""
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={rotateVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="font-[600] text-[20px] md:text-[24px] lg:text-[28px]"
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
