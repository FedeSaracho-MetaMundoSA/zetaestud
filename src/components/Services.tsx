/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Eye, Cpu, ArrowRight, Video, Clock, Sparkles, Clapperboard, Compass, Maximize2, HelpCircle } from "lucide-react";
import VRShowroomViewer from "./VRShowroomViewer";

interface ServicesProps {
  onNavigate?: (tab: string) => void;
}

interface AnimType {
  title: string;
  badge: string;
  icon: any;
  description: string;
  specLine?: string;
  videoUrl: string;
  watchUrl?: string;
  isVideo: boolean;
  isLocal: boolean;
}

export default function Services({ onNavigate }: ServicesProps) {
  const { t } = useLanguage();
  const [activeAnimTab, setActiveAnimTab] = useState<"tradicional" | "timelapse" | "creativa" | "cine">("cine");

  const animTypes: Record<"tradicional" | "timelapse" | "creativa" | "cine", AnimType> = {
    tradicional: {
      title: t("serv.anim.traditional.title", "ANIMACIÓN TRADICIONAL"),
      badge: t("serv.anim.traditional.badge", "COMERCIAL"),
      icon: Video,
      description: t("serv.anim.traditional.desc", "Desarrollamos films arquitectónicos en resolución 4K que transforman proyectos en experiencias visuales inmersivas, en donde además de la arquitectura se observará en detalle el mobiliario, equipamiento y materialidad en diferentes situaciones climáticas y en diferentes momentos del día, potenciando su presentación, comercialización y comunicación."),
      videoUrl: "https://www.youtube.com/embed/ZsGUg3K1zMw?autoplay=1&mute=1&loop=1&playlist=ZsGUg3K1zMw&controls=1&rel=0",
      watchUrl: "https://www.youtube.com/watch?v=ZsGUg3K1zMw",
      isVideo: true,
      isLocal: false
    },
    timelapse: {
      title: t("serv.anim.timelapse.title", "TIMELAPSE ESTUDIO"),
      badge: t("serv.anim.timelapse.badge", "CONSTRUCTIVO"),
      icon: Clock,
      description: t("serv.anim.timelapse.desc", "Transformamos el proceso constructivo en una experiencia visual dinámica, mostrando la evolución de la obra desde sus cimientos hasta su finalización mediante animaciones aceleradas en el tiempo. Cada secuencia está cuidadosamente desarrollada para comunicar de forma clara y atractiva las distintas etapas de construcción, convirtiéndose en un recurso ideal para presentaciones, marketing, concursos e inversores."),
      specLine: t("serv.anim.timelapse.spec", "Asoleamiento dinámico real  ·  Evolución constructiva acelerada  ·  Inversores & Presentaciones"),
      videoUrl: "https://www.youtube.com/embed/NOShuxJfE_s?autoplay=1&mute=1&loop=1&playlist=NOShuxJfE_s&controls=1&rel=0",
      watchUrl: "https://www.youtube.com/watch?v=NOShuxJfE_s",
      isVideo: true,
      isLocal: false
    },
    creativa: {
      title: t("serv.anim.creative.title", "ANIMACIÓN CREATIVA"),
      badge: t("serv.anim.creative.badge", "STORYTELLING"),
      icon: Sparkles,
      description: t("serv.anim.creative.desc", "Mediante un Storytelling consensuado, diseñamos producciones audiovisuales que van más allá de la visualización tradicional. Combinamos animaciones dinámicas, efectos cinematográficos, diseño sonoro y secuencias timelapse para construir una narrativa visual capaz de generar impacto, despertar emociones y potenciar la presentación de cada proyecto. El resultado es una experiencia única que comunica la arquitectura de forma innovadora y memorable."),
      specLine: t("serv.anim.creative.spec", "Guion de marca a medida  ·  Efectos atmosféricos y partículas  ·  Lanzamientos inmobiliarios"),
      videoUrl: "https://www.youtube.com/embed/TPsKpGjxsQI?autoplay=1&mute=1&loop=1&playlist=TPsKpGjxsQI&controls=1&rel=0",
      watchUrl: "https://www.youtube.com/watch?v=TPsKpGjxsQI",
      isVideo: true,
      isLocal: false
    },
    cine: {
      title: t("serv.cine.title", "CINE ARQUITECTÓNICO"),
      badge: t("serv.cine.badge", "PREMIUM"),
      icon: Clapperboard,
      description: t("serv.cine.desc", "El cine arquitectónico es un servicio PREMIUM en donde el séptimo arte y la arquitectura se encuentran. Los proyectos no son solo escenarios, sino que funcionan como personajes y narradores visuales: ambas artes controlan el espacio y el tiempo, creando experiences inmersivas únicas para el espectador. Tomas y movimientos de cámara de calidad cinematográfica con resolución 4K. Un servicio premium para proyectos premium."),
      specLine: t("serv.cine.spec", "4K Master Grado de Color Cine  ·  Profundidad de campo real  ·  Desarrollos de lujo"),
      videoUrl: "https://www.youtube.com/embed/1-YYLYnlrsI?autoplay=1&mute=1&loop=1&playlist=1-YYLYnlrsI&controls=1&rel=0",
      watchUrl: "https://www.youtube.com/watch?v=1-YYLYnlrsI",
      isVideo: true,
      isLocal: false
    }
  };

  const servicesList = [
    {
      id: "01",
      title: t("serv.still.title", "MODELADO 3D Y RENDERS"),
      subtitle: t("serv.still.subtitle", "PRECISIÓN GEOMÉTRICA Y COMPOSICIÓN LUMÍNICA EDITORIAL"),
      description: t("serv.still.desc", "Desarrollamos modelos 3D de alta precisión y renders fotorrealistas que comunican la esencia de cada proyecto arquitectónico. Cuidamos cada detalle —materiales, iluminación, entorno y composición— para generar imágenes de gran impacto visual que facilitan la comercialización, la presentación y la toma de decisiones antes de construir."),
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      icon: Layers,
      actionText: t("ui.viewExamples", "VER EJEMPLOS"),
      actionHref: "#portfolio-section",
      specLine: t("serv.still.spec", "Imágenes fijas hasta 8K Ultra High-DPI  ·  Path Tracing físicamente calibrado  ·  Encuadre áureo")
    },
    {
      id: "03",
      title: t("serv.pan.title", "PANORAMAS 360°"),
      subtitle: t("serv.pan.subtitle", "EXPLORACIÓN ESPACIAL INTERACTIVA DE 360 GRADOS"),
      description: t("serv.pan.desc", "Desarrollamos panoramas 360° de alta calidad que invitan a vivir la arquitectura de manera inmersiva. Cada escena está diseñada para que el usuario explore los espacios libremente, apreciando materiales, iluminación y proporciones con una experiencia cercana a la realidad. Puede ser visualizado con GAFAS VR o cualquier otro dispositivo interactivamente."),
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      icon: Eye,
      actionText: t("ui.viewExamples", "VER EJEMPLOS"),
      actionHref: "#portfolio-section",
      specLine: t("serv.pan.spec", "Cascos VR, Web, Celulares y Tablets  ·  Hotspots interactivos  ·  Panoramas equirectangulares UHD")
    },
    {
      id: "04",
      title: t("serv.vr.title", "REALIDAD VIRTUAL"),
      subtitle: t("serv.vr.subtitle", "EXPERIENCIAS DE INMERSIÓN ABSOLUTA A ESCALA HUMANA"),
      description: t("serv.vr.desc", "Desarrollamos experiencias inmersivas de realidad virtual que permiten vivir la arquitectura antes de construirla. Cada proyecto incluye gafas Meta Quest 3, un showroom virtual donde una maqueta electrónica e interactiva integra infografías, información técnica y contenidos multimedia para explorar cada detalle de forma intuitiva y en espacios inmersivos. Una solución innovadora que transforma la presentación arquitectónica en una experiencia realmente memorable, ideal para potenciar la comunicación y el valor de cada desarrollo. Producto orientado para grandes desarrollos."),
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      icon: Cpu,
      actionText: t("ui.viewExamples", "VER EJEMPLOS"),
      actionHref: "#portfolio-section",
      specLine: t("serv.vr.spec", "Meta Quest III & Visualizadores VR  ·  Showrooms de venta inmersivos  ·  Maqueta tridimensional interactiva")
    }
  ];

  return (
    <div 
      className="relative w-full bg-[#050608] py-28 px-6 md:px-12 space-y-40 text-white"
      id="servicios-section"
    >
      {/* Editorial Header Section */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-6 text-left">
        {/* Title without grid frames or cards */}
        <h2 className="text-4xl sm:text-7xl font-extralight tracking-tight uppercase leading-none max-w-4xl">
          {t("services.title.our", "NUESTROS")} <span className="font-semibold text-cyan-400 block sm:inline">{t("services.title.services", "SERVICIOS")}</span>
        </h2>
      </div>

      {/* Services Main Loop */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-36">
        
        {/* SERVICE 1: MODELADO 3D Y RENDERS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* IMAGE PORTION - NO borders, NO tech indicators */}
          <div className="lg:col-span-7 relative group lg:order-1">
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0b0d]">
              <img 
                src={servicesList[0].imageUrl} 
                alt={servicesList[0].title} 
                className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-102 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* TEXT PORTION - "Estilo Llaves" (Indented, guided by a sophisticated vertical layout line) */}
          <div className="lg:col-span-5 space-y-6 lg:order-2">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-extralight text-cyan-400/30 font-mono leading-none">
                {servicesList[0].id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-wider uppercase leading-none">
                {servicesList[0].title}
              </h3>
            </div>

            {/* The "Llave" style - Left bordered minimalist grouping */}
            <div className="border-l-2 border-cyan-400/30 pl-5">
              <p className="text-xs text-slate-300 leading-relaxed font-light text-justify">
                {servicesList[0].description}
              </p>
            </div>
          </div>
        </motion.div>


        {/* SERVICE 2: ANIMACIÓN 4K (Typographical interactive tabs with left braces/keys indicator, no borders or panels) */}
        <motion.div
          id="animacion-4k-interactive"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Header section (Pure Typography, NO borders or panels) */}
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-extralight text-amber-400/30 font-mono leading-none">02</span>
              <h3 className="text-3xl sm:text-4xl font-light tracking-wider uppercase leading-none">
                 {t("serv.anim.title", "ANIMACIONES 4K")}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light text-justify max-w-3xl">
              {t("serv.anim.intro", "Desarrollamos films arquitectónicos en resolución 4K que transforman proyectos en experiencias visuales inmersivas. Combinamos calidad cinematográfica, precisión técnica y una cuidada dirección visual para mostrar cada obra con el máximo nivel de realismo, emoción y detalle, potenciando su presentación, comercialización y comunicación. CONOZCA TODAS NUESTRAS OPCIONES DE ANIMACIONES.")}
            </p>
          </div>

          {/* Clean grid content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Interactive Type Selector (The 4 Options from the Notebook - styled with Left Braces, totally borderless, cardless) */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                {t("serv.selectCategory", "SELECCIONE CATEGORÍA:")}
              </span>
              
              <div className="space-y-4 pl-1">
                {(Object.keys(animTypes) as Array<keyof typeof animTypes>).map((key) => {
                  const isSelected = activeAnimTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveAnimTab(key)}
                      className="w-full text-left py-1.5 focus:outline-none cursor-pointer flex items-center transition-all duration-300"
                    >
                      {/* LLAVE/BRACKET Style Dynamic Indicator */}
                      <span className={`font-mono text-lg mr-3 transition-all duration-300 ${
                        isSelected ? "text-amber-400 opacity-100 translate-x-0 font-bold" : "text-transparent opacity-0 -translate-x-2"
                      }`}>
                        [
                      </span>
                      
                      <span className={`text-[12px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                        isSelected ? "text-amber-400 font-bold" : "text-slate-400 hover:text-slate-200"
                      }`}>
                        {animTypes[key].title}
                      </span>
                      
                      <span className={`font-mono text-lg ml-3 transition-all duration-300 ${
                        isSelected ? "text-amber-400 opacity-100 translate-x-0 font-bold" : "text-transparent opacity-0 translate-x-2"
                      }`}>
                        ]
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => onNavigate?.("contacto")}
                  className="inline-flex items-center gap-2 text-[10px] font-mono text-amber-400 hover:text-white tracking-widest uppercase group/btn cursor-pointer bg-transparent border-none p-0"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  <span>{t("serv.checkAvailability", "CONSULTAR DISPONIBILIDAD")}</span>
                  <ArrowRight size={10} className="transform group-hover/btn:translate-x-1 transition-transform text-amber-400" />
                </button>
              </div>
            </div>

            {/* Displaying Current Tab's Detailed content dynamically without any container background or border card */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAnimTab}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  {/* Visual preview frame - NO borders, NO badges */}
                  <div className="md:col-span-7 relative">
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      {animTypes[activeAnimTab].isLocal ? (
                        <video
                          src={animTypes[activeAnimTab].videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover filter brightness-[0.75] contrast-105"
                        />
                      ) : (
                        <iframe
                          src={animTypes[activeAnimTab].videoUrl}
                          title={animTypes[activeAnimTab].title}
                          className="w-full h-full object-cover border-none filter brightness-[0.85] contrast-105"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Text Description with Elegant left guide bar */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="border-l-2 border-amber-500/30 pl-5 space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-xl font-light tracking-widest uppercase leading-none">
                          {animTypes[activeAnimTab].title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-light text-justify">
                        {animTypes[activeAnimTab].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>


        {/* SERVICE 3: PANORAMAS 360° */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* Visual preview frame - NO borders, NO badges */}
          <div className="lg:col-span-7 relative lg:order-2">
            <div className="relative aspect-video bg-slate-900 overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/CQhLsQdad98?autoplay=1&mute=1&loop=1&playlist=CQhLsQdad98&controls=1&rel=0"
                title="Panoramas 360 Reel"
                className="w-full h-full object-cover border-none filter brightness-[0.85] contrast-105"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* TEXT PORTION */}
          <div className="lg:col-span-5 space-y-6 lg:order-1">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-extralight text-cyan-400/30 font-mono leading-none">
                {servicesList[1].id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-wider uppercase leading-none">
                {servicesList[1].title}
              </h3>
            </div>

            {/* Border guide */}
            <div className="border-l-2 border-cyan-400/30 pl-5">
              <p className="text-xs text-slate-300 leading-relaxed font-light text-justify">
                {servicesList[1].description}
              </p>
            </div>
          </div>
        </motion.div>


        {/* SERVICE 4: REALIDAD VIRTUAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* INTERACTIVE VR SHOWROOM VIEWPORT */}
          <div className="lg:col-span-7 lg:order-1">
            <VRShowroomViewer />
          </div>

          {/* TEXT PORTION */}
          <div className="lg:col-span-5 space-y-6 lg:order-2">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-extralight text-cyan-400/30 font-mono leading-none">
                {servicesList[2].id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-wider uppercase leading-none">
                {servicesList[2].title}
              </h3>
            </div>

            {/* Left guide line */}
            <div className="border-l-2 border-cyan-400/30 pl-5">
              <p className="text-xs text-slate-300 leading-relaxed font-light text-justify">
                {servicesList[2].description}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
