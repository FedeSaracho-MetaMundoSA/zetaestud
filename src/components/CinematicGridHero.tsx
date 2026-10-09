/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Volume2, VolumeX, Eye, ShieldCheck, ArrowDown, Sparkles, Layers, Video } from "lucide-react";
import { Marquee } from "./Marquee";
import { useLanguage } from "../context/LanguageContext";

interface CinematicGridHeroProps {
  onSelectProject: (videoUrl: string, title: string) => void;
  onNavigate?: (tab: string) => void;
}

export default function CinematicGridHero({ onSelectProject, onNavigate }: CinematicGridHeroProps) {
  const [globalMuted, setGlobalMuted] = useState(true);
  const [isAmbientRefracted, setIsAmbientRefracted] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);

  // Premium architectural renders for marquee Row 1
  const { t } = useLanguage();

  const row1Images = [
    {
      id: "r1_boca",
      url: "/showroom_boca.jpeg",
      title: "Showroom Boca - Estadio Alberto J. Armando",
      key: "hero.image.showroom_boca"
    },
    {
      id: "r1_1",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      title: "Puerto Madero - Dique 3",
      key: "hero.image.puerto_madero"
    },
    {
      id: "r1_2",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      title: "Torre Alvear",
      key: "hero.image.torre_alvear"
    },
    {
      id: "r1_3",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      title: "Oficinas Premium",
      key: "hero.image.oficinas_premium"
    },
    {
      id: "r1_4",
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      title: "Complejo Residencial",
      key: "hero.image.complejo_residencial"
    },
    {
      id: "r1_5",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      title: "Showroom Autogestión",
      key: "hero.image.showroom_autogestion"
    }
  ];

  // Premium architectural renders for marquee Row 2 (moves right)
  const row2Images = [
    {
      id: "r2_1",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      title: "Penthouse Vista Río",
      key: "hero.image.penthouse_vista_rio"
    },
    {
      id: "r2_2",
      url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      title: "Amenities & Spa",
      key: "hero.image.amenities_spa"
    },
    {
      id: "r2_3",
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      title: "Fachada Nocturna 4K",
      key: "hero.image.fachada_nocturna"
    },
    {
      id: "r2_4",
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      title: "Masterplan Urbano",
      key: "hero.image.masterplan_urbano"
    },
    {
      id: "r2_5",
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      title: "Paseo Comercial",
      key: "hero.image.paseo_comercial"
    }
  ];

  // Premium architectural renders for marquee Row 3
  const row3Images = [
    {
      id: "r3_1",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      title: "Torre Alvear",
      key: "hero.image.torre_alvear"
    },
    {
      id: "r3_2",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      title: "Oficinas Premium",
      key: "hero.image.oficinas_premium"
    },
    {
      id: "r3_3",
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      title: "Complejo Residencial",
      key: "hero.image.complejo_residencial"
    },
    {
      id: "r3_4",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      title: "Puerto Madero - Dique 3",
      key: "hero.image.puerto_madero"
    },
    {
      id: "r3_5",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      title: "Showroom Autogestión",
      key: "hero.image.showroom_autogestion"
    }
  ];

  const handleScrollDown = () => {
    const portfolioSection = document.getElementById("portfolio-section");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[95vh] min-h-[600px] bg-[#010204] border-b border-white/5 overflow-hidden flex flex-col justify-between group">
      
      {/* 1. DBOX-STYLE INCLINED DYNAMIC BACKGROUND COLLAGE */}
      <div className="dbox-bg-container">
        <div className="dbox-grid opacity-50 group-hover:opacity-75 transition-all duration-[1000ms]">
          
          {/* FILA 1: Desplazamiento Izquierda */}
          <div className="marquee-row">
            <Marquee direction="left" speed={45} pauseOnHover={true}>
              {row1Images.map((img) => (
                <div key={img.id} className="marquee-img-card">
                  <img src={img.url} alt={t(img.key, img.title)} referrerPolicy="no-referrer" />
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 text-[8px] font-mono text-cyan-400 border border-white/10 uppercase tracking-widest">
                    {t(img.key, img.title)}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* FILA 2: Desplazamiento Derecha */}
          <div className="marquee-row">
            <Marquee direction="right" speed={45} pauseOnHover={true}>
              {row2Images.map((img) => (
                <div key={img.id} className="marquee-img-card">
                  <img src={img.url} alt={t(img.key, img.title)} referrerPolicy="no-referrer" />
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 text-[8px] font-mono text-cyan-400 border border-white/10 uppercase tracking-widest">
                    {t(img.key, img.title)}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* FILA 3: Desplazamiento Izquierda */}
          <div className="marquee-row">
            <Marquee direction="left" speed={45} pauseOnHover={true}>
              {row3Images.map((img) => (
                <div key={img.id} className="marquee-img-card">
                  <img src={img.url} alt={t(img.key, img.title)} referrerPolicy="no-referrer" />
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 text-[8px] font-mono text-cyan-400 border border-white/10 uppercase tracking-widest">
                    {t(img.key, img.title)}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

        </div>
      </div>

      {/* 2. PREMIUM CINEMATIC COLOR GRADING VIGNETTES OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060b] via-[#05060b]/35 to-black/70 z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-scanner-grid opacity-15 mix-blend-screen pointer-events-none z-1" />

      {/* Subtle fine-grid lines for structural architecture theme */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/5 hidden md:block z-1" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/5 hidden md:block z-1" />

      {/* 3. FOREGROUND CONTENT: ELEGANT EDITORIAL BRAND TYPOGRAPHY */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 sm:pt-24 flex-1 flex flex-col justify-center">

        {/* Center Title and Pitch (DBOX Style, clean, ultra-thin and premium) */}
        <div className="max-w-4xl space-y-5 md:space-y-6 backdrop-blur-md bg-[#010204]/75 p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background ambient light leak */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-cyan-400 font-bold">
                {t("hero.badge", "Arquitectura Digital de última generación.")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.1] text-white uppercase select-none">
              {t("hero.title", "CREAMOS CONTENIDO DIGITAL")} <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-white tracking-normal drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                {t("hero.subtitle", "DE ÚLTIMA GENERACIÓN.")}
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-3xl pt-1">
              {t("hero.desc", "Creamos contenido CGI para desarrollos inmobiliarios y proyectos arquitectónicos mediante Modelados 3D, Renders Fotorrealistas, Animaciones 4K, Panoramas 360, Realidad Virtual y Filmaciones Profesionales con Drones.")}
            </p>
          </div>

          {/* Call to action action bar */}
          <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row md:items-center gap-4">
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate("contacto");
                } else {
                  const el = document.getElementById("contacto-section") || document.getElementById("contacto");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // Fallback to reload or trigger custom event
                    window.location.hash = "#contacto";
                  }
                }
              }}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>{t("ui.requestDemo", "DEMO")}</span>
              <ArrowDown size={12} className="animate-bounce" />
            </button>
            <p className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold animate-pulse">
              {t("hero.demoText", "SOLICITA UNA DEMO SIN CARGO Y CONOCE UNA NUEVA FORMA DE PRESENTAR LA ARQUITECTURA")}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
