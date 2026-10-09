/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TransparentLogo from "./TransparentLogo";

export default function FloatingWpp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWppRedirect = () => {
    const url = "https://wa.me/5491158547294?text=Hola%20ZetaEstudio,%20me%20gustar%C3%ADa%20consultar%20por%20sus%20servicios%204K%20y%20renders%203D.";
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-end select-none">
      
      {/* 1. CINEMATIC FLOAT TOOLTIP */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-20 mr-1 bg-[#030406]/95 border border-cyan-400/30 text-white py-2.5 px-4 rounded-none font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
              </span>
              <span>CONSULTA COMERCIAL 4K</span>
            </div>
            {/* Decorative arrow */}
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#030406] border-r border-t border-cyan-400/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CINEMATIC ORB / ROUND WORLD WHATSAPP BUTTON */}
      <motion.button
        id="floating-wpp-button"
        onClick={handleWppRedirect}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full cursor-pointer flex items-center justify-center bg-[#030406] border border-cyan-400/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300"
      >
        {/* Pulsing light rings for architectural radar feel */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/5 animate-pulse" />
        
        {/* Rotating technical outer orbital ring */}
        <div className="absolute inset-[-4px] border border-cyan-400/10 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-[-4px] border-t-2 border-r-2 border-transparent border-t-cyan-400/40 border-r-cyan-400/20 rounded-full animate-[spin_4s_linear_infinite]" />

        {/* The prominent Zeta Logo inside (Perfect scale & clean dynamic background removal) */}
        <div className="w-11 h-11 flex items-center justify-center overflow-hidden p-1.5 rounded-full">
          <TransparentLogo 
            className="w-full h-full object-contain scale-125" 
            enforceWhite={false}
          />
        </div>

        {/* Famous WhatsApp Badge on the bottom-right corner, respecting ZetaEstudio UHD colors */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#030406] border border-cyan-400/40 p-1 flex items-center justify-center shadow-lg hover:bg-cyan-950/20 transition-colors">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full fill-current text-cyan-400"
          >
            <path d="M12.031 6c-3.302 0-5.992 2.691-5.992 5.993 0 1.106.3 2.185.874 3.132L6 19.141l4.136-1.084c.915.498 1.945.761 3.003.761 3.303 0 5.993-2.69 5.993-5.993C19.132 8.691 16.434 6 12.031 6zm3.501 8.52c-.149.42-.767.767-1.06 1.011-.252.21-.571.385-.92.481-.332.091-.676.151-1.025.176-.921.061-1.842-.212-2.585-.688a7.8 7.8 0 0 1-2.228-2.228c-.476-.743-.75-1.664-.688-2.585.025-.349.085-.693.176-1.025.096-.349.271-.668.481-.92.244-.293.591-.711 1.011-1.06l.42-.149c.14-.05.291-.013.393.093l1.107 1.144c.092.096.113.237.053.354l-.451.879a.258.258 0 0 0 .034.298c.319.414.708.767 1.144 1.042.1.063.229.049.313-.034l.654-.654c.096-.096.244-.114.359-.044l1.45.892c.119.073.159.227.094.351z" />
          </svg>
        </div>
      </motion.button>
    </div>
  );
}
