/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Shield, Sparkles, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Cualidades() {
  const { t } = useLanguage();

  const pillars = [
    {
      title: t("qualities.respect.title", "RESPETO"),
      icon: <Award className="w-5 h-5 text-cyan-400" />,
      text: t("qualities.respect.desc", "Cada trabajo es importante, cada cliente es importante. Partimos de esa premisa para lograr el mejor producto. Sin importar el tamaño o la complejidad del proyecto, lo que más importa es el momento de trabajar."),
      accentColor: "from-cyan-500/10 to-transparent"
    },
    {
      title: t("qualities.commitment.title", "COMPROMISO"),
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      text: t("qualities.commitment.desc", "Nuestro compromiso es la piedra angular de nuestro camino. Sin compromiso con el tiempo, la calidad y la atención al detalle, no hay clientes satisfechos, y mucho menos clientes que regresen."),
      accentColor: "from-cyan-500/10 to-transparent"
    },
    {
      title: t("qualities.quality.title", "CALIDAD"),
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      text: t("qualities.quality.desc", "Nuestra versatilidad y conocimiento en el campo de la arquitectura nos brindan la ventaja necesaria para trabajar con un equipo con 28 años de experiencia comprobada."),
      accentColor: "from-cyan-500/10 to-transparent"
    }
  ];

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-[#010204] p-8 md:p-12 lg:p-16 shadow-md flex flex-col justify-between" 
      id="cualidades-section"
    >
      {/* Deep dark mineral base grids and overlays */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #111 0px, #111 1px, transparent 1px, transparent 6px)",
            backgroundSize: "100% 6px"
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #111 0px, #111 1px, transparent 1px, transparent 6px)",
            backgroundSize: "6px 100%"
          }}
        />
      </div>

      {/* Decorative subtle border glowing highlights */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[9px] text-cyan-400/80 uppercase tracking-[0.4em]">
              {t("qualities.subtitle", "ZETAESTUDIO // VALORES ESENCIALES")}
            </span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-cyan-400 uppercase leading-none select-none"
            style={{ textShadow: "0 0 40px rgba(6, 182, 212, 0.25)" }}
          >
            {t("qualities.title", "CUALIDADES Y APTITUDES")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl tracking-wider uppercase">
            {t("qualities.desc", "La solidez conceptual y técnica que define cada obra y renderizado de nuestra firma.")}
          </p>
        </div>

        {/* 3 Pillars Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-4">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="relative group flex flex-col pt-12 pb-12 px-6 sm:px-8 bg-gradient-to-b from-[#111216] via-[#090a0d] to-[#040406] border-x border-b border-white/10 rounded-b-xl shadow-md overflow-hidden min-h-[440px] select-none"
            >
              
              {/* STAGE 1: Spotlight Beam shining from above directly onto the pillar top */}
              <div className="absolute -top-40 inset-x-0 h-60 bg-radial-spotlight opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" />
              
              {/* Sharp specular edge highlight */}
              <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />

              {/* STAGE 2: Geometric double-tab U-shaped Notch header cut out on top */}
              <div className="absolute top-0 left-0 right-0 h-10 flex justify-between pointer-events-none bg-transparent">
                {/* Left tab protruding */}
                <div className="w-10 h-10 bg-[#111216] border-t border-l border-white/10 rounded-tl-xl" />
                {/* Lowered center empty notch with horizontal boundary line */}
                <div className="flex-1 h-10 border-b border-white/10" />
                {/* Right tab protruding */}
                <div className="w-10 h-10 bg-[#111216] border-t border-r border-white/10 rounded-tr-xl" />
              </div>

              {/* STAGE 3: Tactile Basalt Grain mineral noise texture simulation */}
              <div 
                className="absolute inset-x-0 top-10 bottom-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
                }}
              />

              {/* Accent colored ambient glow base */}
              <div className={`absolute inset-0 bg-gradient-to-b ${pillar.accentColor} opacity-5 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none`} />

              {/* CONTENT CONTAINER - Centered, spacious & beautifully readable */}
              <div className="relative z-10 flex-1 flex flex-col justify-between text-center mt-4">
                
                {/* Top Spotlight Icon Accent */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shadow-inner group-hover:border-cyan-400/30 group-hover:bg-cyan-950/20 transition-all duration-500">
                    {pillar.icon}
                  </div>
                  
                  {/* Etched Inscribed Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-[0.2em] uppercase font-sans">
                    {pillar.title}
                  </h3>
                  
                  {/* Thin underline dividing accent */}
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent group-hover:via-cyan-400/80 group-hover:w-16 transition-all duration-700" />
                </div>

                {/* Main Etched Body Text (Subtly illuminated clean typography) */}
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed tracking-wide px-2 sm:px-4 py-8 text-center flex-1 flex items-center justify-center">
                  {pillar.text}
                </p>

                {/* Bottom telemetry indicators */}
                <div className="font-mono text-[8px] text-slate-600 group-hover:text-slate-400 transition-colors tracking-widest uppercase mt-auto">
                  PILLAR MODEL {idx + 1} // BR_SOLID_SEC
                </div>

              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
