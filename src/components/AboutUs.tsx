/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Users, Shield, Cpu, Activity, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function AboutUs() {
  const { t } = useLanguage();

  const team = [
    {
      name: "Rubén Stecco",
      role: "C.E.O.",
      key: "about.role.ceo",
      image: "/staff/ruben.png"
    },
    {
      name: "Samanta Cousín",
      role: "Administración y Finanzas",
      key: "about.role.admin_finances",
      image: "/staff/Samantha.png"
    },
    {
      name: "Ariel Jaime",
      role: "CGI & Fotografía",
      key: "about.role.cgi_photography",
      image: "/staff/Ariel_Jaime.png"
    },
    {
      name: "Pablo Quinteros",
      role: "CGI",
      key: "about.role.cgi",
      image: "/staff/Pablo_Quiteros.png"
    },
    {
      name: "Pablo Biscardi",
      role: "CGI",
      key: "about.role.cgi",
      image: "/staff/Pablo_E.png"
    },
    {
      name: "Daniel Condoluci",
      role: "CGI & Marketing",
      key: "about.role.cgi_marketing",
      image: "/staff/DANIEL.png"
    },
    {
      name: "Belén Stecco",
      role: "RRPP y Locución",
      key: "about.role.pr_voiceover",
      image: "/staff/Belen_Stecco.png"
    },
    {
      name: "Camila Guzmán",
      role: "CGI y Social Media",
      key: "about.role.cgi_socialmedia",
      image: "/staff/Camila_Guzman.png"
    },
    {
      name: "Pierre FPV",
      role: "Piloto Drone",
      key: "about.role.drone_pilot",
      image: "/staff/Pierre.png"
    }
  ];

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-[#010204] p-8 md:p-12 lg:p-16 shadow-md" 
      id="quienes-somos-section"
    >
      {/* Dynamic Brushed Obsidian & Ghostly Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #111 0px, #111 1px, transparent 1px, transparent 4px)",
            backgroundSize: "100% 4px"
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #111 0px, #111 1px, transparent 1px, transparent 4px)",
            backgroundSize: "4px 100%"
          }}
        />
      </div>

      {/* Ghostly CAD Architect lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] mix-blend-screen" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <circle cx="200" cy="300" r="150" fill="none" className="stroke-cyan-400 stroke-[0.5]" strokeDasharray="5,5" />
        <circle cx="800" cy="700" r="250" fill="none" className="stroke-cyan-400 stroke-[0.5]" />
        
        <path d="M 50 150 L 950 150" className="stroke-cyan-400 stroke-[0.5]" />
        <path d="M 50 850 L 950 850" className="stroke-cyan-400 stroke-[0.5]" />
        <path d="M 150 50 L 150 950" className="stroke-cyan-400 stroke-[0.5]" strokeDasharray="10,5" />
        <path d="M 850 50 L 850 950" className="stroke-cyan-400 stroke-[0.5]" strokeDasharray="10,5" />
        
        <path d="M 500 200 L 700 300 L 500 400 L 300 300 Z" fill="none" className="stroke-cyan-400 stroke-[0.75]" />
        <path d="M 300 300 L 300 500 L 500 600 L 500 400" fill="none" className="stroke-cyan-400 stroke-[0.5]" />
        <path d="M 700 300 L 700 500 L 500 600" fill="none" className="stroke-cyan-400 stroke-[0.5]" />

        <path d="M 150 700 L 300 600 L 450 700 L 300 800 Z" fill="none" className="stroke-cyan-400 stroke-[0.5]" strokeDasharray="2,2" />
        <path d="M 150 700 L 150 850" fill="none" className="stroke-cyan-400 stroke-[0.5]" />
        <path d="M 450 700 L 450 850" fill="none" className="stroke-cyan-400 stroke-[0.5]" />
        <path d="M 300 800 L 300 950" fill="none" className="stroke-cyan-400 stroke-[0.5]" />
      </svg>

      <div className="relative z-10 space-y-12">
        {/* Title Block */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] text-cyan-400/80 uppercase tracking-[0.3em]">
              {t("about.history", "ZETA ESTUDIO — NUESTRA HISTORIA")}
            </span>
          </div>
          <h2 
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 uppercase leading-none"
            style={{ textShadow: "0 0 30px rgba(6, 182, 212, 0.15)" }}
          >
            {t("about.title", "¿QUIENES SOMOS?")}
          </h2>
        </div>

        {/* Core Poetic Text Block */}
        <div className="max-w-4xl space-y-6 text-sm sm:text-base text-slate-100 font-light leading-relaxed text-justify md:text-left">
          <p className="border-l-2 border-cyan-400/40 pl-4 md:pl-6 text-white text-base sm:text-lg font-medium tracking-wide">
            {t("about.desc1", "Somos un estudio de arquitectura especializado en visualización y representación arquitectónica 3D.")}
          </p>
          
          <p className="text-slate-300">
            {t("about.desc2", "MÁS de 27 años de evolución digital continua desarrollando contenido digital de alta calidad para arquitectura, urbanismo y desarrollos inmobiliarios, combinando precisión técnica, diseño y narrativa visual para transformar proyectos en experiencias memorables.")}
          </p>

          <p className="text-slate-300">
            {t("about.desc3", "Entendemos que la creación de modelos, renders y animaciones 3D requiere tiempo, conocimiento y una ejecución rigurosa. Por eso ponemos a disposición de nuestros clientes más de dos décadas de experiencia, acompañando cada proyecto desde la idea inicial hasta su presentación final. Nuestro objetivo es ayudar a arquitectos, desarrolladores y empresas a comunicar, vender y presentar sus proyectos de la manera más impactante posible, permitiendo que puedan visualizar, sentir y experimentar cada espacio antes de su construcción.")}
          </p>

          <p className="text-slate-300 font-normal text-white">
            {t("about.desc4", "Contamos con un equipo multidisciplinario integrado por arquitectos, diseñadores, programadores, especialistas en visualización 3D, animadores 4K, fotógrafos, editores de contenido, locutores y pilotos de drones, entre otros profesionales, que trabajan de forma coordinada para ofrecer soluciones integrales de comunicación arquitectónica.")}
          </p>
        </div>

        {/* Architectural Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5 max-w-4xl">
          <div className="space-y-1.5">
            <div className="text-cyan-400 flex items-center gap-2">
              <Award size={15} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{t("about.stat1.title", "TRAYECTORIA")}</span>
            </div>
            <p className="text-xl font-light text-white font-mono">{t("about.stat1.val", "27 AÑOS")}</p>
            <p className="text-[10px] text-slate-500">{t("about.stat1.desc", "Más de 27 años de evolución digital continua.")}</p>
          </div>

          <div className="space-y-1.5">
            <div className="text-cyan-400 flex items-center gap-2">
              <Cpu size={15} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{t("about.stat2.title", "TECNOLOGÍA")}</span>
            </div>
            <p className="text-xl font-light text-white font-mono">{t("about.stat2.val", "VANGUARDIA")}</p>
            <p className="text-[10px] text-slate-500">{t("about.stat2.desc", "Renderizado de última generación y flujos 4K.")}</p>
          </div>

          <div className="space-y-1.5">
            <div className="text-cyan-400 flex items-center gap-2">
              <Shield size={15} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{t("about.stat3.title", "GARANTÍA")}</span>
            </div>
            <p className="text-xl font-light text-white font-mono">{t("about.stat3.val", "100% FIABLE")}</p>
            <p className="text-[10px] text-slate-500">{t("about.stat3.desc", "Control estricto de calidad y tiempos de entrega.")}</p>
          </div>

          <div className="space-y-1.5">
            <div className="text-cyan-400 flex items-center gap-2">
              <Activity size={15} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{t("about.stat4.title", "EQUIPO")}</span>
            </div>
            <p className="text-xl font-light text-white font-mono">{t("about.stat4.val", "MULTIDISCIPLINAR")}</p>
            <p className="text-[10px] text-slate-500">{t("about.stat4.desc", "Especialistas cubriendo todo el espectro creativo.")}</p>
          </div>
        </div>

        {/* Team Section Title */}
        <div className="space-y-2 pt-6 border-t border-white/5">
          <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <Users size={12} />
            <span>{t("about.team.sub", "EXPERTOS MULTIDISCIPLINARIOS")}</span>
          </span>
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">
            {t("about.team.title", "NUESTRO EQUIPO PRINCIPAL")}
          </h3>
        </div>

        {/* Beautiful Row/Grid of Team Portraits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 pb-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group flex flex-col items-center text-center space-y-3"
            >
              {/* Profile Image container with pop-out effect */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                {/* Background glow/ring that stays */}
                <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-cyan-400/50 group-hover:scale-110 transition-all duration-500" />
                
                <motion.div 
                  className="relative w-full h-full rounded-full overflow-hidden border border-white/10 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-[#0a0a0a] z-10"
                  whileHover={{ 
                    scale: 1.25,
                    y: -15,
                    zIndex: 50
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                </motion.div>
              </div>

              {/* Name & Role Text Block */}
              <div className="space-y-0.5 group-hover:translate-y-1 transition-transform duration-300">
                <h4 className="text-[10px] font-bold text-white uppercase group-hover:text-cyan-400 transition-colors tracking-wide leading-tight">
                  {member.name}
                </h4>
                <p className="text-[8px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors uppercase leading-none">
                  {t(member.key, member.role)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  );
}
