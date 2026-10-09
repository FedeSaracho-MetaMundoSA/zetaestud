/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

interface PortfolioProps {
  onSelectProject?: (videoUrl: string, title: string) => void;
}

export default function Portfolio({ onSelectProject: _onSelectProject }: PortfolioProps) {
  const { t } = useLanguage();
  
  // State for Viviendas interactive carousel
  const [activeViviendaIdx, setActiveViviendaIdx] = useState<number>(0);
  const [isViviendaHovered, setIsViviendaHovered] = useState<boolean>(false);

  // State for Edificio interactive carousel
  const [activeEdificioIdx, setActiveEdificioIdx] = useState<number>(0);
  const [isEdificioHovered, setIsEdificioHovered] = useState<boolean>(false);

  // State for Local Comercial interactive carousel
  const [activeLocalIdx, setActiveLocalIdx] = useState<number>(0);
  const [isLocalHovered, setIsLocalHovered] = useState<boolean>(false);

  const viviendasImages = [
    { id: "viv_1", url: "/viviendas/vivienda_fachada_01.jpg", label: "01 // FACHADA PRINCIPAL" },
    { id: "viv_3", url: "/viviendas/vivienda_volumetria_02.jpg", label: "02 // VOLUMETRÍA EXTERIOR" },
    { id: "viv_4", url: "/viviendas/vivienda_vidriados_03.jpg", label: "03 // SUPERFICIES VIDRIADAS" },
    { id: "viv_5", url: "/viviendas/vivienda_paisajismo_04.jpg", label: "04 // PAISAJISMO & ENTORNO" },
    { id: "viv_6", url: "/viviendas/vivienda_materiales_05.jpg", label: "05 // PIEDRA NATURAL & MADERA" },
    { id: "viv_7", url: "/viviendas/vivienda_iluminacion_06.jpg", label: "06 // ILUMINACIÓN CREPUSCULAR" },
    { id: "viv_8", url: "/viviendas/vivienda_perspectiva_07.jpg", label: "07 // PERSPECTIVA ARQUITECTÓNICA" },
  ];

  const edificiosImages = [
    { id: "edf_1", url: "/locales/local_fachada_01.jpg", label: "01 // FACHADA CORPORATIVA" },
    { id: "edf_2", url: "/locales/local_doble_altura_02.jpg", label: "02 // TERRAZAS & VOLADIZOS" },
    { id: "edf_3", url: "/locales/local_iluminacion_03.jpg", label: "03 // LÍNEAS HORIZONTALES" },
    { id: "edf_4", url: "/locales/local_espacio_04.jpg", label: "04 // INTEGRACIÓN URBANA" },
    { id: "edf_5", url: "/locales/local_materiales_05.jpg", label: "05 // ENTORNO DE VANGUARDIA" },
    { id: "edf_6", url: "/locales/local_vidriera_06.jpg", label: "06 // DETALLE ARQUITECTÓNICO" },
    { id: "edf_7", url: "/locales/local_perspectiva_07.jpg", label: "07 // PERSPECTIVA ARQUITECTÓNICA" },
  ];

  const localesImages = [
    { id: "loc_1", url: "/edificios/edificio_fachada_01.jpg", label: "01 // FACHADA & VIDRIERAS" },
    { id: "loc_2", url: "/edificios/edificio_terrazas_02.jpg", label: "02 // DOBLE ALTURA & INTERIORISMO" },
    { id: "loc_3", url: "/edificios/edificio_lineas_03.jpg", label: "03 // ILUMINACIÓN ESCENOGRÁFICA" },
    { id: "loc_4", url: "/edificios/edificio_integracion_04.jpg", label: "04 // ESPACIO COMERCIAL & RETAIL" },
    { id: "loc_5", url: "/edificios/edificio_entorno_05.jpg", label: "05 // MATERIALES NOBLES & DETALLES" },
    { id: "loc_6", url: "/edificios/edificio_detalle_06.jpg", label: "06 // VIDRIERA & AMBIENTACIÓN" },
  ];

  // Auto-play timers with pause on hover (every 4.5 seconds)
  useEffect(() => {
    if (isViviendaHovered) return;
    const interval = setInterval(() => {
      setActiveViviendaIdx((prev) => (prev + 1) % viviendasImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isViviendaHovered, viviendasImages.length]);

  useEffect(() => {
    if (isEdificioHovered) return;
    const interval = setInterval(() => {
      setActiveEdificioIdx((prev) => (prev + 1) % edificiosImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isEdificioHovered, edificiosImages.length]);

  useEffect(() => {
    if (isLocalHovered) return;
    const interval = setInterval(() => {
      setActiveLocalIdx((prev) => (prev + 1) % localesImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLocalHovered, localesImages.length]);

  return (
    <div className="space-y-12" id="portfolio-section">
      {/* 1. Header & Luxury Filter Bar (DBOX & ZETA Inspired) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] uppercase font-semibold">
              PORTFOLIO OFICIAL // ZETA ESTUDIO
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-light tracking-[0.3em] text-white uppercase leading-none">{t("port.title", "PROYECTOS DESTACADOS")}</h2>
        </div>
      </div>

      {/* 2. PROYECTO PRINCIPAL 1: SHOWROOM BOCA JUNIORS */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#08090d] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
        id="project-principal-boca"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Imagen del Showroom de Boca */}
          <div className="lg:col-span-7 bg-black min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative group overflow-hidden">
            <img
              src="/showroom_boca.jpeg"
              alt="Showroom Boca - Estadio Alberto J. Armando"
              className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Texto / Llave Informativa */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#08090d]">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-light tracking-[0.15em] text-white uppercase leading-snug">
                ESTADIO ALBERTO J. ARMANDO
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-[14px] text-slate-300 font-light leading-relaxed">
              <p>
                Zeta Estudio fue convocado por un candidato a la presidencia del Club Atlético Boca Juniors para desarrollar la representación integral de una propuesta no oficial de ampliación, modernización y puesta en valor del Estadio Alberto J. Armando.
              </p>
              <p>
                Nuestro trabajo comprende el Modelado 3D del proyecto, la producción de Renders hiperrealistas, Animaciones y el desarrollo de un Film Arquitectónico de alta calidad audiovisual, concebido para comunicar con claridad, impacto y realismo la visión general de la propuesta.
              </p>
              <p>
                A través de una producción visual de nivel premium, buscamos transformar una idea de gran escala en una experiencia audiovisual capaz de transmitir su arquitectura, magnitud, funcionalidad y potencial, permitiendo visualizar cómo podría evolucionar uno de los estadios más emblemáticos del mundo.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. PROYECTO DESTACADO 2: PROYECTO 1 INICIO - VIVIENDAS CON CARRUSEL AUTOMÁTICO & SCROLL RECREATIVO */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#08090d] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
        id="project-principal-viviendas"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Columna Izquierda: Carrusel Profesional con Visor Principal y Scroll Recreativo */}
          <div 
            className="lg:col-span-7 bg-black flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 p-4 sm:p-6 space-y-4"
            onMouseEnter={() => setIsViviendaHovered(true)}
            onMouseLeave={() => setIsViviendaHovered(false)}
          >
            
            {/* Visor Principal de Alta Definición con Auto-play */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#050608] border border-white/10 overflow-hidden group">
              <img
                key={viviendasImages[activeViviendaIdx].url}
                src={viviendasImages[activeViviendaIdx].url}
                alt={viviendasImages[activeViviendaIdx].label}
                className="w-full h-full object-cover select-none transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Barra de progreso de auto-reproducción */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
                <div 
                  key={`progress-viv-${activeViviendaIdx}-${isViviendaHovered}`}
                  className={`h-full bg-cyan-400 ${isViviendaHovered ? "w-full opacity-30" : "animate-[shrink_4.5s_linear_infinite]"}`}
                  style={{
                    animation: isViviendaHovered ? "none" : "growWidth 4.5s linear infinite"
                  }}
                />
              </div>

              {/* Controles de Navegación del Carrusel */}
              <button
                type="button"
                onClick={() => setActiveViviendaIdx((prev) => (prev === 0 ? viviendasImages.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/75 hover:bg-cyan-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md opacity-90 group-hover:opacity-100"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setActiveViviendaIdx((prev) => (prev === viviendasImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/75 hover:bg-cyan-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md opacity-90 group-hover:opacity-100"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Carrusel con Scroll Recreativo (Horizontal Thumbnail Rail) */}
            <div className="space-y-2">
              <div 
                className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth select-none cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-black"
                style={{ scrollbarWidth: 'thin' }}
              >
                {viviendasImages.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveViviendaIdx(idx)}
                    className={`flex-shrink-0 w-24 sm:w-28 aspect-[16/10] relative border transition-all duration-300 overflow-hidden cursor-pointer ${
                      activeViviendaIdx === idx
                        ? "border-cyan-400 ring-1 ring-cyan-400/50 opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-90 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha: Texto Informativo */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#08090d]">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-light tracking-[0.15em] text-white uppercase leading-snug">
                VIVIENDAS RESIDENCIALES
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-[14px] text-slate-300 font-light leading-relaxed">
              <p>
                Zeta Estudio desarrolló la visualización arquitectónica integral de esta propuesta residencial, mediante Modelado 3D, Renders hiperrealistas y producción audiovisual de alta calidad.
              </p>
              <p>
                La arquitectura se distingue por una estética contemporánea, elegante y cálida, combinando grandes superficies vidriadas, volúmenes horizontales, piedra natural, madera y amplios aleros que refuerzan la relación entre interior y exterior.
              </p>
              <p>
                Nuestro trabajo buscó transmitir no solo el diseño de la vivienda, sino también la experiencia de habitar un entorno residencial exclusivo, integrando arquitectura, paisajismo, iluminación y vida urbana en una imagen de fuerte impacto visual y comercial.
              </p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 4. PROYECTO DESTACADO 3: PROYECTO 2 - EDIFICIO CORPORATIVO CON CARRUSEL AUTOMÁTICO */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#08090d] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
        id="project-principal-edificio"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Columna Izquierda: Carrusel Profesional con Visor Principal y Scroll Recreativo */}
          <div 
            className="lg:col-span-7 bg-black flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 p-4 sm:p-6 space-y-4"
            onMouseEnter={() => setIsEdificioHovered(true)}
            onMouseLeave={() => setIsEdificioHovered(false)}
          >
            
            {/* Visor Principal de Alta Definición con Auto-play */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#050608] border border-white/10 overflow-hidden group">
              <img
                key={edificiosImages[activeEdificioIdx].url}
                src={edificiosImages[activeEdificioIdx].url}
                alt={edificiosImages[activeEdificioIdx].label}
                className="w-full h-full object-cover select-none transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Barra de progreso de auto-reproducción */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
                <div 
                  key={`progress-edf-${activeEdificioIdx}-${isEdificioHovered}`}
                  className={`h-full bg-cyan-400 ${isEdificioHovered ? "w-full opacity-30" : ""}`}
                  style={{
                    animation: isEdificioHovered ? "none" : "growWidth 4.5s linear infinite"
                  }}
                />
              </div>

              {/* Controles de Navegación del Carrusel */}
              <button
                type="button"
                onClick={() => setActiveEdificioIdx((prev) => (prev === 0 ? edificiosImages.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/75 hover:bg-cyan-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md opacity-90 group-hover:opacity-100"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setActiveEdificioIdx((prev) => (prev === edificiosImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/75 hover:bg-cyan-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md opacity-90 group-hover:opacity-100"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Carrusel con Scroll Recreativo (Horizontal Thumbnail Rail) */}
            <div className="space-y-2">
              <div 
                className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth select-none cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-black"
                style={{ scrollbarWidth: 'thin' }}
              >
                {edificiosImages.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveEdificioIdx(idx)}
                    className={`flex-shrink-0 w-24 sm:w-28 aspect-[16/10] relative border transition-all duration-300 overflow-hidden cursor-pointer ${
                      activeEdificioIdx === idx
                        ? "border-cyan-400 ring-1 ring-cyan-400/50 opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-90 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha: Texto Informativo */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#08090d]">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-light tracking-[0.15em] text-white uppercase leading-snug">
                EDIFICIO CORPORATIVO
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-[14px] text-slate-300 font-light leading-relaxed">
              <p>
                Zeta Estudio desarrolló la visualización arquitectónica integral de este edificio corporativo, mediante Modelado 3D, Renders hiperrealistas y producción audiovisual de alta calidad.
              </p>
              <p>
                La propuesta arquitectónica se caracteriza por una imagen contemporánea y sofisticada, con amplias superficies vidriadas, líneas horizontales, terrazas verdes, grandes voladizos y una cuidada relación entre interior y exterior.
              </p>
              <p>
                Nuestro trabajo buscó potenciar estos atributos y transmitir el carácter premium, tecnológico y corporativo del proyecto, integrándolo con un entorno urbano de vanguardia y máxima jerarquía.
              </p>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 5. PROYECTO DESTACADO 4: PORTAFOLIO 3 - LOCAL COMERCIAL CON 7 FOTOS Y CARRUSEL AUTOMÁTICO */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#08090d] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
        id="project-principal-local"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Columna Izquierda: Carrusel Profesional con Visor Principal y Scroll Recreativo */}
          <div 
            className="lg:col-span-7 bg-black flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 p-4 sm:p-6 space-y-4"
            onMouseEnter={() => setIsLocalHovered(true)}
            onMouseLeave={() => setIsLocalHovered(false)}
          >
            
            {/* Visor Principal de Alta Definición con Auto-play */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#050608] border border-white/10 overflow-hidden group">
              <img
                key={localesImages[activeLocalIdx].url}
                src={localesImages[activeLocalIdx].url}
                alt={localesImages[activeLocalIdx].label}
                className="w-full h-full object-cover select-none transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Barra de progreso de auto-reproducción */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
                <div 
                  key={`progress-loc-${activeLocalIdx}-${isLocalHovered}`}
                  className={`h-full bg-cyan-400 ${isLocalHovered ? "w-full opacity-30" : ""}`}
                  style={{
                    animation: isLocalHovered ? "none" : "growWidth 4.5s linear infinite"
                  }}
                />
              </div>

              {/* Controles de Navegación del Carrusel */}
              <button
                type="button"
                onClick={() => setActiveLocalIdx((prev) => (prev === 0 ? localesImages.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/75 hover:bg-cyan-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md opacity-90 group-hover:opacity-100"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setActiveLocalIdx((prev) => (prev === localesImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/75 hover:bg-cyan-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md opacity-90 group-hover:opacity-100"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Carrusel con Scroll Recreativo (Horizontal Thumbnail Rail) */}
            <div className="space-y-2">
              <div 
                className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth select-none cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-black"
                style={{ scrollbarWidth: 'thin' }}
              >
                {localesImages.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveLocalIdx(idx)}
                    className={`flex-shrink-0 w-24 sm:w-28 aspect-[16/10] relative border transition-all duration-300 overflow-hidden cursor-pointer ${
                      activeLocalIdx === idx
                        ? "border-cyan-400 ring-1 ring-cyan-400/50 opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-90 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha: Texto Informativo */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#08090d]">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-light tracking-[0.15em] text-white uppercase leading-snug">
                LOCAL COMERCIAL
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-[14px] text-slate-300 font-light leading-relaxed">
              <p>
                Zeta Estudio desarrolló la visualización arquitectónica integral de este local comercial, mediante Modelado 3D, Renders hiperrealistas y producción audiovisual de alta calidad.
              </p>
              <p>
                La propuesta arquitectónica se destaca por una imagen contemporánea, elegante y sofisticada, con una fachada de líneas puras, grandes superficies vidriadas, doble altura y una cuidada combinación de materiales nobles, iluminación escenográfica y detalles de alta gama.
              </p>
              <p>
                Nuestro trabajo buscó transmitir no solo la identidad del espacio comercial, sino también su carácter premium, urbano y exclusivo, integrando arquitectura, diseño interior, vidrieras y movimiento peatonal en una imagen de fuerte impacto visual y comercial.
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
