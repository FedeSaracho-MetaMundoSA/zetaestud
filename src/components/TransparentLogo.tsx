/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import logoZeta from "../logo-zeta.png";

interface TransparentLogoProps {
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
  enforceWhite?: boolean; // If true, we make it white for dark areas
}

export default function TransparentLogo({
  className = "h-12 w-auto",
  alt = "ZETA ESTUDIO",
  style = {},
  enforceWhite = false,
}: TransparentLogoProps) {
  const [triggerKey, setTriggerKey] = useState<number>(0);

  // Restart the fairy flight loop every 3.6 seconds to keep it active
  useEffect(() => {
    const interval = setInterval(() => {
      setTriggerKey((prev) => prev + 1);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // Stardust trail configuration: staggered delays to create a flowing tail behind the fairy
  const trailParticles = [
    { id: 1, delay: 0.05, color: "bg-cyan-400 shadow-cyan-400/80", size: "w-1 h-1" },
    { id: 2, delay: 0.12, color: "bg-amber-300 shadow-amber-300/80", size: "w-1.5 h-1.5" },
    { id: 3, delay: 0.20, color: "bg-white shadow-white/80", size: "w-1 h-1" },
    { id: 4, delay: 0.28, color: "bg-cyan-300 shadow-cyan-300/80", size: "w-1.2 h-1.2" },
    { id: 5, delay: 0.35, color: "bg-amber-400 shadow-amber-400/80", size: "w-1 h-1" },
    { id: 6, delay: 0.45, color: "bg-white shadow-white/80", size: "w-1.5 h-1.5" },
    { id: 7, delay: 0.55, color: "bg-cyan-400 shadow-cyan-400/80", size: "w-1 h-1" },
  ];

  // The custom curved flight path for x and y percentages across the container boundaries
  const pathX = ["-15%", "15%", "55%", "85%", "115%"];
  const pathY = ["70%", "-10%", "95%", "15%", "-25%"];

  return (
    <div className="relative inline-flex items-center justify-center">
      
      {/* 1. Breathing brand aura/glow behind the logo element */}
      <motion.div
        animate={{
          scale: [1, 1.05, 0.97, 1.03, 1],
          opacity: [0.25, 0.6, 0.35, 0.65, 0.25],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 -m-3 blur-md rounded-full pointer-events-none transition-colors duration-500 ${
          enforceWhite 
            ? "bg-gradient-to-r from-white/10 via-cyan-400/10 to-white/5" 
            : "bg-gradient-to-r from-cyan-500/20 via-amber-500/15 to-cyan-400/20"
        }`}
      />

      {/* 2. Logo image with high-contrast stellar responsive shadows */}
      <motion.div
        animate={{
          filter: [
            "drop-shadow(0 0 4px rgba(6,182,212,0.25))",
            "drop-shadow(0 0 14px rgba(234,179,8,0.45))",
            "drop-shadow(0 0 18px rgba(6,182,212,0.55))",
            "drop-shadow(0 0 10px rgba(234,179,8,0.35))",
            "drop-shadow(0 0 4px rgba(6,182,212,0.25))",
          ],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex items-center justify-center"
      >
        <img
          src={logoZeta}
          alt={alt}
          className={`${className} transition-all duration-300`}
          style={{
            objectFit: "contain",
            ...style,
          }}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* 3. The Flying Fairy & sparkling stardust loop container */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
        
        {/* A. The Leader - Fairy Light Orb */}
        <motion.div
          key={`fairy-${triggerKey}`}
          initial={{ x: "-15%", y: "70%", opacity: 0, scale: 0 }}
          animate={{
            x: pathX,
            y: pathY,
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1.4, 1.6, 1.1, 0],
          }}
          transition={{
            duration: 2.0,
            ease: "easeInOut",
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          {/* Glowing Aura around the fairy */}
          <div className="absolute -inset-2.5 bg-gradient-to-r from-cyan-400 via-amber-300 to-cyan-400 rounded-full blur-[4px] opacity-80 animate-pulse" />
          
          {/* Tiny Super-Bright Core */}
          <div className="relative w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#22d3ee,0_0_30px_#eab308] flex items-center justify-center">
            {/* Spark Center */}
            <span className="absolute w-1 h-1 bg-amber-200 rounded-full animate-ping" />
          </div>
        </motion.div>

        {/* B. Stardust Tail Particles (Each staggered behind the fairy to form a trail) */}
        {trailParticles.map((particle) => (
          <motion.div
            key={`dust-${triggerKey}-${particle.id}`}
            initial={{ x: "-15%", y: "70%", opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              x: pathX,
              y: pathY,
              opacity: [0, 0.9, 0.8, 0.4, 0],
              scale: [0, 1.2, 0.9, 0.5, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 2.0,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            {/* Star Sparkle shape: custom rotatable styled sparkling point */}
            <div 
              className={`rounded-full rotate-45 ${particle.size} ${particle.color} shadow-[0_0_6px_rgba(255,255,255,0.8)]`}
            />
          </motion.div>
        ))}

      </div>

    </div>
  );
}
