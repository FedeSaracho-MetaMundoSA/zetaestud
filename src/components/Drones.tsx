/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { 
  Video, 
  Shield, 
  Compass, 
  Zap, 
  Play, 
  Cpu, 
  Activity, 
  ArrowRight,
  Info,
  ChevronLeft,
  ChevronRight,
  Navigation
} from "lucide-react";

interface DroneVideo {
  id: string;
  title: string;
  location: string;
  description: string;
  videoUrl?: string;
  stats: {
    resolution: string;
    fps: string;
    altitude: string;
    duration: string;
    pilot: string;
  };
}

export default function Drones({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { t } = useLanguage();
  // Principal video is the master reel
  const principalVideo: DroneVideo = {
    id: "OxNQDzN5XWQ",
    title: t("drones.principal.title", "DRONE REEL MASTER — ZETA ESTUDIO"),
    location: t("drones.principal.location", "Puerto Madero, Buenos Aires"),
    description: t("drones.principal.desc", "Nuestra pieza maestra de filmación aérea que compila tomas cinematográficas imponentes, vuelos FPV dinámicos e integración tridimensional. Una demostración de alta gama en trayectorias de precisión y postproducción CGI de nivel internacional."),
    stats: {
      resolution: "8K Ultra-DCI (8192x4320)",
      fps: "60 FPS (ProRes RAW)",
      altitude: "180m AGL",
      duration: t("drones.stats.duration.master", "1:45 Minutos"),
      pilot: "ZETA COMMAND UNIT ALPHA",
    }
  };

  const carouselVideos: DroneVideo[] = [
    {
      id: "eW0FgaYJJf8",
      title: t("drones.carousel.0.title", "OPERACIÓN COSTA PREMIUM"),
      location: t("drones.carousel.0.location", "Punta del Este, UY"),
      description: t("drones.carousel.0.desc", "Vuelo rasante de precisión milimétrica sobre desarrollos residenciales de lujo frente al mar. Capturando la hora dorada reflejada en balcones curvos."),
      stats: {
        resolution: "5.1K Apple ProRes",
        fps: "50 FPS",
        altitude: "45m AGL",
        duration: t("drones.stats.duration.45s", "45 segundos"),
        pilot: "COASTAL DRONE COMMAND",
      }
    },
    {
      id: "-EBvA1kNEsg",
      title: t("drones.carousel.1.title", "INTEGRACIÓN CGI VERTICAL"),
      location: t("drones.carousel.1.location", "Buenos Aires, AR"),
      description: t("drones.carousel.1.desc", "Tracking de cámara aéreo de alta precisión para inserción fotorrealista de renders 3D en entornos reales. Sincronización perfecta de luz natural."),
      stats: {
        resolution: "4K DCI (4096x2160)",
        fps: "60 FPS",
        altitude: "120m AGL",
        duration: t("drones.stats.duration.52s", "52 segundos"),
        pilot: "VFX COORDINATION FLIGHT",
      }
    },
    {
      id: "XDDWt77BD1E",
      title: t("drones.carousel.2.title", "TRAYECTORIA DE HORA DORADA"),
      location: t("drones.carousel.2.location", "Miami, US"),
      description: t("drones.carousel.2.desc", "Transición cinematográfica continua capturando los reflejos solares en las fachadas de cristal de rascacielos. Espectáculo visual aéreo premium."),
      stats: {
        resolution: "4K UHD (3840x2160)",
        fps: "60 FPS",
        altitude: "95m AGL",
        duration: t("drones.stats.duration.38s", "38 segundos"),
        pilot: "LIGHT CHASER SQUAD",
      }
    },
    {
      id: "8tcn-E8sFLY",
      title: t("drones.carousel.3.title", "VUELO FPV OUT-IN-OUT"),
      location: t("drones.carousel.3.location", "San Pablo, BR"),
      description: t("drones.carousel.3.desc", "Secuencia continua ininterrumpida ingresando por claraboyas y saliendo por ventanales del edificio. Máxima inmersión y dominio espacial."),
      stats: {
        resolution: "4K GyroFlow Stabilized",
        fps: "120 FPS",
        altitude: "15m AGL (FPV)",
        duration: t("drones.stats.duration.30s", "30 segundos"),
        pilot: "FPV SPECIAL OPERATIONS",
      }
    },
    {
      id: "Mdpq5lARro0",
      title: t("drones.carousel.4.title", "DINÁMICA URBANA NOCTURNA"),
      location: t("drones.carousel.4.location", "Santiago, CL"),
      description: t("drones.carousel.4.desc", "Barrido hiperlapso aéreo con estabilización digital capturando el flujo del tránsito citadino. Integración impecable con el relieve andino."),
      stats: {
        resolution: "8K Hyperlapse Engine",
        fps: "30 FPS",
        altitude: "150m AGL",
        duration: t("drones.stats.duration.40s", "40 segundos"),
        pilot: "NIGHT OPS EXPERT",
      }
    },
    {
      id: "7TGlDwn442E",
      title: t("drones.carousel.5.title", "RECORRIDO PERIMETRAL"),
      location: t("drones.carousel.5.location", "Bogotá, CO"),
      description: t("drones.carousel.5.desc", "Órbita continua automatizada de velocidad constante con enfoque centrado en núcleo estructural. Ideal para maquetación e inspección 3D."),
      stats: {
        resolution: "4K UHD (3840x2160)",
        fps: "60 FPS",
        altitude: "80m AGL",
        duration: t("drones.stats.duration.48s", "48 segundos"),
        pilot: "ORBIT CONTROL SYSTEM",
      }
    },
    {
      id: "ul4nmjiYpMI",
      title: t("drones.carousel.6.title", "MASTERPLAN PAISAJISTA"),
      location: t("drones.carousel.6.location", "Bariloche, AR"),
      description: t("drones.carousel.6.desc", "Vuelo de reconocimiento a gran altitud para la delimitación espacial y topográfica de obras. Capturando la imponente escala natural del entorno."),
      stats: {
        resolution: "5.1K Hasselblad",
        fps: "24 FPS (Cinema Tone)",
        altitude: "195m AGL",
        duration: t("drones.stats.duration.1m15s", "1:15 Minutos"),
        pilot: "PATAGONIA SURVEY UNIT",
      }
    },
    {
      id: "REChdjNrd10",
      title: t("drones.carousel.7.title", "DETALLES DE ARQUITECTURA"),
      location: t("drones.carousel.7.location", "Asunción, PY"),
      description: t("drones.carousel.7.desc", "Planos de detalle hiper-cerrados en hormigón visto y materiales nobles mediante teleobjetivo de alta gama sin perturbar el entorno."),
      stats: {
        resolution: "4K Tele-lens Pro",
        fps: "60 FPS",
        altitude: "35m AGL",
        duration: t("drones.stats.duration.35s", "35 segundos"),
        pilot: "MACRO FLIGHT DIVISION",
      }
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState<DroneVideo>(principalVideo);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const topPlayerRef = useRef<HTMLDivElement>(null);

  // Auto-slide carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselVideos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselVideos.length]);

  // Center active card in carousel view smoothly
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[carouselIndex] as HTMLElement;
    if (card) {
      const containerWidth = container.clientWidth;
      const cardWidth = card.clientWidth;
      const cardLeft = card.offsetLeft;
      const targetLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      container.scrollTo({
        left: targetLeft,
        behavior: "smooth"
      });
    }
  }, [carouselIndex]);

  const selectVideoForCinema = (video: DroneVideo) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    // Smoothly scroll to the main cinematic player
    topPlayerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCarouselIndex((prev) => (prev + 1) % carouselVideos.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCarouselIndex((prev) => (prev - 1 + carouselVideos.length) % carouselVideos.length);
  };

  const fleet = [
    {
      model: "DJI INSPIRE 3",
      sensor: "Full-Frame Zenmuse X9-8K Air",
      lenses: "18mm, 24mm, 35mm, 50mm DL RT",
      codec: "CinemaDNG / Apple ProRes RAW",
      maxSpeed: "94 km/h",
      useCase: t("drones.fleet.0.useCase", "Producciones de Cine Arquitectónico y Publicidad Premium")
    },
    {
      model: "CUSTOM FPV CINELOG 35",
      sensor: "O3 Air Unit / Naked GP 12 Black",
      lenses: "Ultra-Wide 155° FOV F/2.8",
      codec: "10-bit H.265 / ReelSteady GO",
      maxSpeed: t("drones.fleet.1.maxSpeed", "140 km/h (Aceleración Instantánea)"),
      useCase: t("drones.fleet.1.useCase", "Infiltraciones en Interiores, Pasos por Columnas y Dinámicas de Vértigo")
    },
    {
      model: "DJI MAVIC 3 PRO CINE",
      sensor: "Hasselblad 4/3 CMOS Tri-Cámara",
      lenses: "24mm f/2.8, 70mm f/2.8, 166mm f/3.4",
      codec: "Apple ProRes 422 HQ",
      maxSpeed: "75 km/h",
      useCase: t("drones.fleet.2.useCase", "Inspección de Obras, Ortofotografía y Seguimiento de Fachadas")
    }
  ];

  return (
    <div 
      className="relative w-full bg-[#050608] py-24 px-6 md:px-12 space-y-32 text-white"
      id="drones-section"
    >
      {/* 1. Header Seccional */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-6 text-left">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {t("drones.header.sub", "FILMACIÓN AÉREA PROFESIONAL")}
        </span>
        <h2 className="text-4xl sm:text-7xl font-extralight tracking-tight uppercase leading-none max-w-4xl">
          {t("drones.header.title.part1", "FILMACIÓN CON")} <span className="font-semibold text-cyan-400 block sm:inline">{t("drones.header.title.part2", "DRONES")}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl text-justify">
          {t("drones.header.desc", "Elevamos la narrativa visual de sus proyectos mediante vuelos cinemáticos de precisión y tomas aéreas de resolución cinematográfica. Con pilotos certificados, tecnología de guiado GNSS/RTK y drones de última generación, capturamos la volumetría, el entorno y la escala real de sus obras con una calidad visual sin precedentes.")}
        </p>
      </div>

      {/* 2. Proyector Cinematográfico de Alta Gama */}
      <div ref={topPlayerRef} className="relative z-10 max-w-5xl mx-auto space-y-8 scroll-mt-24">
        <div className="border-b border-white/5 pb-4 flex items-center justify-between">
          <div className="space-y-1 text-left">
            <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest block">{t("drones.player.label", "PROYECTOR CINEMATOGRÁFICO PRINCIPAL")}</span>
            <h3 className="text-lg sm:text-xl font-light tracking-wider uppercase flex items-center gap-2">
              <Activity size={14} className="text-cyan-400 animate-pulse" />
              {selectedVideo.title}
            </h3>
          </div>
          {selectedVideo.id !== principalVideo.id && (
            <button
              onClick={() => {
                setSelectedVideo(principalVideo);
                setIsPlaying(true);
              }}
              className="text-[9px] font-mono border border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/20 text-cyan-400 px-3 py-1.5 rounded uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              {t("drones.player.loadMaster", "Cargar Master Reel 8K")}
            </button>
          )}
        </div>

        {/* Layout del Reproductor y Ficha Técnica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Reproductor Cinematográfico (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video bg-black border border-white/5 overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.07)]">
              {isPlaying ? (
                selectedVideo.videoUrl ? (
                  <video
                    src={selectedVideo.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                      title={selectedVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  {selectedVideo.videoUrl ? (
                    <video 
                      src={selectedVideo.videoUrl} 
                      className="w-full h-full object-cover brightness-[0.5] group-hover:scale-102 transition-transform duration-1000"
                      muted
                      playsInline
                    />
                  ) : (
                    <img 
                      src={`https://img.youtube.com/vi/${selectedVideo.id}/hqdefault.jpg`} 
                      alt={selectedVideo.title} 
                      className="w-full h-full object-cover brightness-[0.4] group-hover:scale-102 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* Play trigger button */}
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="absolute p-5 rounded-full bg-cyan-400 text-black hover:bg-white transition-all scale-100 hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center group-hover:shadow-cyan-400/30 group-hover:shadow-2xl z-10"
                  >
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </button>
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity size={10} className="text-cyan-400 animate-pulse" />
                    <span>{t("drones.player.ready", "CARGA LISTA // REEL DIGITAL DISPONIBLE")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Poetic description & Metadata */}
            <div className="space-y-3 pl-1 text-left">
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
                <span>📍 {selectedVideo.location}</span>
                <span>·</span>
                <span className="text-cyan-400">ARCHIVE_AIR_RECORDS</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                {selectedVideo.description}
              </p>
            </div>
          </div>

          {/* Ficha Técnica de Vuelo (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="border border-white/5 bg-slate-950/20 p-6 space-y-6">
              <h4 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-white/5 pb-3 flex items-center gap-2">
                <Cpu size={14} />
                {t("drones.telemetry.title", "TELEMETRÍA Y CONTROL DE VUELO")}
              </h4>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="space-y-1">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">{t("drones.telemetry.resolution", "RESOLUCIÓN DE CAPTURA")}</span>
                  <span className="text-xs font-mono font-bold text-white block">{selectedVideo.stats.resolution}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">{t("drones.telemetry.fps", "TASA DE REPETICIÓN")}</span>
                  <span className="text-xs font-mono font-bold text-white block">{selectedVideo.stats.fps}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">{t("drones.telemetry.altitude", "ALTITUD DE REGISTRO")}</span>
                  <span className="text-xs font-mono font-bold text-white block">{selectedVideo.stats.altitude}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">{t("drones.telemetry.duration", "DURACIÓN DEL REGISTRO")}</span>
                  <span className="text-xs font-mono font-bold text-white block">{selectedVideo.stats.duration}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex items-start gap-2.5">
                  <Shield size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400 leading-normal">
                    <strong className="text-white block font-mono text-[9px] uppercase tracking-wider mb-0.5">{t("drones.pilot.registered", "Piloto Registrado & Certificado")}</strong>
                    {selectedVideo.stats.pilot} — {t("drones.pilot.legal", "Vuelo legalmente coordinado según normativas vigentes.")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-cyan-500/10 bg-cyan-950/5 flex items-start gap-3">
              <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-300 leading-relaxed text-justify">
                {t("drones.telemetry.info", "Haga clic en cualquiera de las filmaciones de la galería a continuación para proyectarlas directamente en esta pantalla de telemetría de alta resolución.")}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Carrusel Adaptable de la Nueva Era con Reproducción Automática */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="border-b border-white/5 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">{t("drones.carousel.label", "GALERÍA CINEMATOGRÁFICA")}</span>
            <h3 className="text-xl sm:text-2xl font-light tracking-wider uppercase">{t("drones.carousel.title", "DRONE SHOTS MULTIMEDIA")}</h3>
          </div>

          {/* Carrusel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-2 border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 transition-all rounded cursor-pointer"
              title={t("ui.previous", "Anterior")}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-[10px] text-slate-500">
              {String(carouselIndex + 1).padStart(2, '0')} / {String(carouselVideos.length).padStart(2, '0')}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 transition-all rounded cursor-pointer"
              title={t("ui.next", "Siguiente")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carrusel Horizontal Track */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-none py-4 px-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {carouselVideos.map((video, idx) => {
              const isActive = idx === carouselIndex;
              return (
                <div
                  key={video.id}
                  onClick={() => {
                    setCarouselIndex(idx);
                    selectVideoForCinema(video);
                  }}
                  className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 cursor-pointer group/card border transition-all duration-500 select-none ${
                    isActive 
                      ? "border-cyan-500/50 bg-[#080b11] shadow-[0_0_25px_rgba(6,182,212,0.1)] scale-[1.01]" 
                      : "border-white/5 bg-[#06070a] opacity-70 hover:opacity-100 hover:border-white/20"
                  }`}
                  style={{ scrollSnapAlign: "center" }}
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    {/* YouTube thumbnail */}
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient and active overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/40 to-transparent flex flex-col justify-between p-3.5">
                      <div className="flex justify-between items-start">
                        <span className="bg-black/80 backdrop-blur-md border border-cyan-500/20 px-1.5 py-0.5 rounded font-mono text-[7px] text-cyan-400 tracking-wider">
                          {video.stats.resolution}
                        </span>
                        {isActive && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                          </span>
                        )}
                      </div>

                      {/* Floating Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="p-3 rounded-full bg-cyan-400 text-black shadow-lg shadow-cyan-400/20 scale-90 group-hover/card:scale-100 transition-transform duration-300">
                          <Play size={16} fill="currentColor" className="ml-0.5" />
                        </div>
                      </div>

                      <div className="space-y-0.5 mt-auto">
                        <span className="block font-mono text-[7px] text-slate-400 uppercase tracking-widest">{video.location}</span>
                        <h4 className="text-xs font-semibold text-white tracking-wide uppercase truncate">
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Description & Technical Telemetry footer inside the card */}
                  <div className="p-4 space-y-3 text-left">
                    <p className="text-[10px] text-slate-400 leading-normal font-light line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-2.5 font-mono text-[8px] text-slate-500">
                      <span>ALT: {video.stats.altitude}</span>
                      <span>FPS: {video.stats.fps}</span>
                      <span className="text-cyan-400 group-hover/card:translate-x-1 transition-transform flex items-center gap-1 font-bold text-[7.5px]">
                        {t("drones.carousel.project", "PROYECTAR →")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic active dot progress bar */}
        <div className="flex justify-center items-center gap-1.5 pt-2">
          {carouselVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setCarouselIndex(idx);
              }}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                idx === carouselIndex ? "w-6 bg-cyan-400" : "w-1.5 bg-white/10 hover:bg-white/30"
              }`}
              title={`${t("ui.goToSlide", "Ir al slide")} ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 4. Pilares del Servicio (Minimalist Brackets) */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        <div className="space-y-2 border-b border-white/5 pb-6 text-left">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">{t("drones.pillars.label", "CUALIDADES CLAVE")}</span>
          <h3 className="text-3xl font-light tracking-wider text-white uppercase leading-none">{t("drones.pillars.title", "NUESTROS ESTÁNDARES OPERATIVOS")}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {/* Pilar 1 */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extralight text-cyan-400/40 font-mono">01</span>
              <div className="w-8 h-[1px] bg-cyan-500/20" />
              <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest">DRONE PILOTS</span>
            </div>
            <div className="border-l-2 border-cyan-400/30 pl-5 space-y-2">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-cyan-400 shrink-0" />
                <h4 className="text-xs font-semibold tracking-wider text-white uppercase leading-tight">{t("drones.pillars.1.title", "PILOTOS REGISTRADOS")}</h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                {t("drones.pillars.1.desc", "Toda nuestra tripulación de mando cuenta con licencias comerciales de piloto de drone emitidas por autoridades de aviación civil (ANAC / SCT / FAA). Ejecutamos procedimientos de seguridad operacional rigurosos antes de cada despegue.")}
              </p>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extralight text-cyan-400/40 font-mono">02</span>
              <div className="w-8 h-[1px] bg-cyan-500/20" />
              <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest">FPV CINEMATIC</span>
            </div>
            <div className="border-l-2 border-cyan-400/30 pl-5 space-y-2">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-cyan-400 shrink-0" />
                <h4 className="text-xs font-semibold tracking-wider text-white uppercase leading-tight">{t("drones.pillars.2.title", "VUELOS FPV INMERSIVOS")}</h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                {t("drones.pillars.2.desc", "Utilizamos micro-drones FPV de hélice protegida para volar a escasos centímetros de superficies, ingresando por portones de acceso y cruzando ventanales para mostrar el proyecto a escala humana en una sola toma cinematográfica ininterrumpida.")}
              </p>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extralight text-cyan-400/40 font-mono">03</span>
              <div className="w-8 h-[1px] bg-cyan-500/20" />
              <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest">SATELLITE SYNC</span>
            </div>
            <div className="border-l-2 border-cyan-400/30 pl-5 space-y-2">
              <div className="flex items-center gap-2">
                <Compass size={16} className="text-cyan-400 shrink-0" />
                <h4 className="text-xs font-semibold tracking-wider text-white uppercase leading-tight">{t("drones.pillars.3.title", "PRE-PROGRAMACIÓN GNSS")}</h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                {t("drones.pillars.3.desc", "Cargamos rutas de vuelo pre-establecidas mediante telemetría satelital RTK. Esto nos permite repetir la misma trayectoria de vuelo milimétricamente en diferentes épocas del año, ideal para generar timelapses dinámicos de la evolución de la obra.")}
              </p>
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extralight text-cyan-400/40 font-mono">04</span>
              <div className="w-8 h-[1px] bg-cyan-500/20" />
              <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest">MASTER GRADE</span>
            </div>
            <div className="border-l-2 border-cyan-400/30 pl-5 space-y-2">
              <div className="flex items-center gap-2">
                <Video size={16} className="text-cyan-400 shrink-0" />
                <h4 className="text-xs font-semibold tracking-wider text-white uppercase leading-tight">{t("drones.pillars.4.title", "COLOR METICULOSO (10-BIT)")}</h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                {t("drones.pillars.4.desc", "Capturamos en perfiles planos (D-Log/HLG) a 10 bits reales para obtener el máximo rango dinámico, permitiendo a nuestros coloristas integrar las tomas aéreas de manera imperceptible con los renders 3D y simulaciones digitales hiperrealistas.")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Especificaciones de la Flota */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <div className="space-y-2 border-b border-white/5 pb-6 text-left">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">{t("drones.fleet.label", "EQUIPAMIENTO DE PUNTA")}</span>
          <h3 className="text-3xl font-light tracking-wider text-white uppercase leading-none">{t("drones.fleet.title", "NUESTRA FLOTA DE TECNOLOGÍA")}</h3>
        </div>

        <div className="overflow-x-auto border border-white/5 bg-black/30">
          <table className="w-full text-left border-collapse font-mono text-[11px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 text-[9px] tracking-widest uppercase">
                <th className="py-4 px-6 font-semibold">{t("drones.table.model", "SISTEMA / DRON")}</th>
                <th className="py-4 px-6 font-semibold">{t("drones.table.optics", "ÓPTICA & SENSOR")}</th>
                <th className="py-4 px-6 font-semibold">{t("drones.table.codec", "CÓDEC MÁXIMO")}</th>
                <th className="py-4 px-6 font-semibold">{t("drones.table.speed", "VELOCIDAD MÁXIMA")}</th>
                <th className="py-4 px-6 font-semibold">{t("drones.table.use", "PRINCIPAL CASO DE USO")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {fleet.map((item, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4.5 px-6 font-bold text-white text-[12px]">{item.model}</td>
                  <td className="py-4.5 px-6 text-slate-300 leading-normal">{item.sensor} <br/><span className="text-[9px] text-slate-500">{item.lenses}</span></td>
                  <td className="py-4.5 px-6 text-cyan-400 text-[10px]">{item.codec}</td>
                  <td className="py-4.5 px-6 text-slate-300">{item.maxSpeed}</td>
                  <td className="py-4.5 px-6 text-slate-400 leading-relaxed text-xs">{item.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Llamada a la acción (CTA) */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-8">
        <button 
          onClick={() => onNavigate?.("contacto")}
          className="inline-flex flex-col items-center gap-3 group cursor-pointer bg-transparent border-none p-0 w-full"
        >
          <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">{t("drones.cta.sub", "SOLICITAR COBERTURA AÉREA")}</span>
          <span className="h-10 w-[1px] bg-cyan-400 group-hover:h-16 transition-all duration-500" />
          <span className="text-white hover:text-cyan-400 transition-colors uppercase text-sm tracking-widest font-light flex items-center justify-center gap-2">
            {t("drones.cta.title", "PLANIFICAR PLAN DE VUELO")} <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}
