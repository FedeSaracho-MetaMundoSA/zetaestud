/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import catBarrio from "../assets/images/cat_barrio.png";
import catTorre from "../assets/images/cat_torre.png";
import catMultiTorre from "../assets/images/cat_multitorre.png";
import catEspecial from "../assets/images/cat_especial.png";
import { 
  Sun, Sunset, Moon, Sliders, Eye, Compass, Smartphone, ArrowRight, Share2, ZoomIn, 
  Calendar, MessageCircle, Clock, TrendingUp, Link, ChevronDown, ChevronUp, Check, 
  HelpCircle, Send, Info, Layers, Cloud, CreditCard, Search, ExternalLink,
  Database, Users, Globe, Settings, ShieldCheck, Play, MapPin, Building, Video, X
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type CameraView = "facade" | "lounge" | "terrace";
type LightingMode = "day" | "sunset" | "night";
type MaterialTheme = "industrial" | "minimalist";

interface VirtualShowroom {
  id: string;
  title: string;
  developer: string;
  location: string;
  country: "Panamá" | "Argentina" | "Colombia" | "Paraguay" | "República Dominicana" | "España" | "México" | "Guatemala" | "Estados Unidos";
  description: string;
  url: string;
  image: string;
  badge: "Maqueta 3D" | "Recorrido 360" | "Masterplan";
}

const virtualShowrooms: VirtualShowroom[] = [
  {
    id: "remeros",
    title: "ARBORIS – REMEROS BEACH",
    developer: "Remeros Beach",
    location: "Tigre, Buenos Aires",
    country: "Argentina",
    description: "Imponente laguna artificial de aguas cristalinas rodeada de condominios residenciales de alta gama.",
    url: "https://recorrido360.remerosbeach.com/#/",
    image: "/ProyectosRealEstate/remeros.png",
    badge: "Masterplan"
  },
  {
    id: "armonia",
    title: "ARMONÍA – CINTA COSTERA",
    developer: "Armonía 360",
    location: "Cinta Costera, Ciudad de Panamá",
    country: "Panamá",
    description: "Espectacular torre de bienestar residencial enfocada en la salud and el equilibrio en Cinta Costera.",
    url: "https://www.armoniapanama360.com/#/",
    image: "/ProyectosRealEstate/armonia.png",
    badge: "Maqueta 3D"
  },
  {
    id: "artie84",
    title: "ARTIÉ 84 RESIDENCES",
    developer: "Arquitectura y Concreto",
    location: "Bogotá",
    country: "Colombia",
    description: "Exclusivo complejo de apartamentos urbanos con diseño sofisticado e interactividad virtual avanzada.",
    url: "https://360artie84.arquitecturayconcreto.com/#/",
    image: "/ProyectosRealEstate/artie84.png",
    badge: "Maqueta 3D"
  },
  {
    id: "begin",
    title: "BEGIN CO LIVING",
    developer: "Grupo Residencial",
    location: "Ciudad de Panamá",
    country: "Panamá",
    description: "Concepto innovador de co-living con áreas compartidas premium y suites privadas optimizadas.",
    url: "https://www.begincoliving360.com/#/",
    image: "/ProyectosRealEstate/begin.png",
    badge: "Recorrido 360"
  },
  {
    id: "bourbon",
    title: "EDIFICIO BOURBON",
    developer: "Bourbon Luxury Residences",
    location: "Asunción",
    country: "Paraguay",
    description: "Apartamentos residenciales boutique con diseño elegante, asoleamiento programado y acabados de lujo.",
    url: "https://www.edificioburband.com/#/",
    image: "/ProyectosRealEstate/bourbon.png",
    badge: "Maqueta 3D"
  },
  {
    id: "buenaventura",
    title: "BUENAVENTURA – RIVIERA PACÍFICA",
    developer: "Buenaventura",
    location: "Coclé, Riviera Pacífica",
    country: "Panamá",
    description: "La comunidad de playa más exclusiva de Panamá, con canchas de golf profesionales y marina de lujo.",
    url: "https://360.buenaventura.com.pa/#/",
    image: "/ProyectosRealEstate/buenaventura.png",
    badge: "Masterplan"
  },
  {
    id: "condado",
    title: "CONDADO GARDENS",
    developer: "Condado Gardens",
    location: "Condado, Ciudad de Panamá",
    country: "Panamá",
    description: "Moderno complejo familiar residencial inmerso en la exhuberante naturaleza tropical panameña.",
    url: "https://360.condadogardens.com/#/",
    image: "/ProyectosRealEstate/condado.png",
    badge: "Maqueta 3D"
  },
  {
    id: "davidcommercial",
    title: "DAVID COMMERCIAL PARK",
    developer: "David Corp",
    location: "David, Chiriquí",
    country: "Panamá",
    description: "Parque industrial y comercial de alto nivel logístico con infraestructuras operativas inteligentes.",
    url: "https://www.davidcommercialpark.com/#/",
    image: "/ProyectosRealEstate/davidcommercial.png",
    badge: "Masterplan"
  },
  {
    id: "expobariloche",
    title: "EXPO 2027 BARILOCHE – PATAGONIA",
    developer: "Expo Bariloche",
    location: "San Carlos de Bariloche",
    country: "Argentina",
    description: "Plan maestro interactivo para el predio del centro de exposiciones y eventos de la Patagonia.",
    url: "https://www.masterplanexpobariloche.com/#/",
    image: "/ProyectosRealEstate/expobariloche.png",
    badge: "Masterplan"
  },
  {
    id: "ipanema",
    title: "IPANEMA – WATERFRONT RESIDENCES",
    developer: "Ipanema Residences",
    location: "Costa del Este",
    country: "Panamá",
    description: "Residencias frente al océano pacífico con vistas panorámicas excepcionales y amenities premium de resort.",
    url: "https://360.ipanemaresidences.com/#/",
    image: "/ProyectosRealEstate/ipanema.png",
    badge: "Maqueta 3D"
  },
  {
    id: "breezetowers",
    title: "LARIMAR – BREEZE TOWERS",
    developer: "Larimar City",
    location: "Punta Cana",
    country: "República Dominicana",
    description: "Majestuosas torres residenciales integradas en el mega-desarrollo turístico e inteligente de Punta Cana.",
    url: "https://breezetowers.larimarcity.com/#/",
    image: "/ProyectosRealEstate/breezetowers.png",
    badge: "Maqueta 3D"
  },
  {
    id: "matisse",
    title: "MATISSE – STAY BY LIROE",
    developer: "Stay Matisse",
    location: "República Dominicana",
    country: "República Dominicana",
    description: "Condominios residenciales de lujo de gran altura con vistas directas al mar y espacialidad imponente.",
    url: "https://virtual.stay-matisse.com/#/",
    image: "/ProyectosRealEstate/matisse.png",
    badge: "Maqueta 3D"
  },
  {
    id: "metro73",
    title: "METRO 73 RESIDENCES",
    developer: "Metro 73",
    location: "Bogotá",
    country: "Colombia",
    description: "Unidades boutique contemporáneas de arquitectura limpia y eficiente con excelente ubicación urbana.",
    url: "https://virtual.metro73.com/#/",
    image: "/ProyectosRealEstate/metro73.png",
    badge: "Maqueta 3D"
  },
  {
    id: "moderna",
    title: "MODERNA – 360 URBAN LIVING",
    developer: "Moderna 360",
    location: "Ciudad de Panamá",
    country: "Panamá",
    description: "Apartamentos modulares de alta tecnología y gran diseño sustentable en zonas residenciales clave.",
    url: "https://living.moderna-360.com/#/",
    image: "/ProyectosRealEstate/moderna.png",
    badge: "Recorrido 360"
  },
  {
    id: "nogal",
    title: "NOGAL – COSTA DEL ESTE",
    developer: "Mallol Arquitectos",
    location: "Costa del Este",
    country: "Panamá",
    description: "Una gema residencial biofílica en Costa del Este que integra el verde natural con el lujo moderno.",
    url: "https://360.nogalpanama.com/#/",
    image: "/ProyectosRealEstate/nogal.png",
    badge: "Maqueta 3D"
  },
  {
    id: "pinoalto",
    title: "PINOALTO – BOQUETE COUNTRY CLUB",
    developer: "Pinoalto",
    location: "Boquete, Chiriquí",
    country: "Panamá",
    description: "Villas y condominios exclusivos de montaña rodeados de microclima templado y naturaleza imponente.",
    url: "https://360.pinoaltopanama.com/#/",
    image: "/ProyectosRealEstate/pinoalto.png",
    badge: "Recorrido 360"
  },
  {
    id: "sunquest",
    title: "QNTK CAPITALS – SUNQUEST",
    developer: "QNTK Capitals",
    location: "España / Canales",
    country: "España",
    description: "Espectacular masterplan náutico residencial vacacional premium con dársenas y muelles privados.",
    url: "https://sunquestcity.qntkcapitals.nl/#/",
    image: "/ProyectosRealEstate/sunquest.png",
    badge: "Masterplan"
  },
  {
    id: "santafamilia",
    title: "SANTA FAMILIA RESIDENCES",
    developer: "Santa Familia",
    location: "Casco Viejo, Panamá",
    country: "Panamá",
    description: "Exclusivo complejo residencial frente al mar que rescata e integra la herencia histórica arquitectónica.",
    url: "https://www.santafamilia360.com/#/",
    image: "/ProyectosRealEstate/santafamilia.png",
    badge: "Maqueta 3D"
  },
  {
    id: "thewavvebaja",
    title: "THE WAVE – BAJA CALIFORNIA",
    developer: "The Wavve",
    location: "Baja California",
    country: "México",
    description: "Residencias esculpidas sobre los acantilados marinos del pacífico con diseño orgánico de vanguardia.",
    url: "https://3des.thewavvebaja.com/#/",
    image: "/ProyectosRealEstate/thewavvebaja.png",
    badge: "Maqueta 3D"
  },
  {
    id: "torreferran",
    title: "TORRE FERRÁN II",
    developer: "Torre Ferran",
    location: "Guatemala",
    country: "Guatemala",
    description: "Torre residencial de estilo contemporáneo europeo con asoleamiento interactivo en tiempo real.",
    url: "https://www.virtualtorreferran.com/#/",
    image: "/ProyectosRealEstate/torreferran.png",
    badge: "Maqueta 3D"
  },
  {
    id: "uppereast",
    title: "UPPER EAST TOWER",
    developer: "Upper East Residences",
    location: "Costa del Este",
    country: "Panamá",
    description: "El nuevo ícono de ultra-lujo residencial con arquitectura fluida de vanguardia y servicios premium.",
    url: "https://www.uppereast360.com/#/",
    image: "/ProyectosRealEstate/uppereast.png",
    badge: "Maqueta 3D"
  },
  {
    id: "vistacay",
    title: "VISTA CAY ORLANDO",
    developer: "Vista Cay Residences",
    location: "Orlando, Florida",
    country: "Estados Unidos",
    description: "Lujosos apartamentos vacacionales con vistas al lago, ubicados junto al Centro de Convenciones de Orlando.",
    url: "https://tour.meetvistacay.org/#/",
    image: "/ProyectosRealEstate/vistacay.png",
    badge: "Recorrido 360"
  }
];

interface RealEstateProps {
  onNavigate?: (tab: string) => void;
}

export default function RealEstate({ onNavigate }: RealEstateProps) {
  const { t } = useLanguage();

  // Live Showrooms Filtering
  const [showroomFilter, setShowroomFilter] = useState<"Todos" | "Panamá" | "Argentina" | "Colombia" | "Paraguay" | "República Dominicana" | "España" | "México" | "Guatemala" | "Estados Unidos">("Todos");
  const [showroomSearch, setShowroomSearch] = useState("");

  const filteredShowrooms = virtualShowrooms.filter((item) => {
    const matchesCountry = showroomFilter === "Todos" || item.country === showroomFilter;
    const matchesSearch = item.title.toLowerCase().includes(showroomSearch.toLowerCase()) || 
                          item.location.toLowerCase().includes(showroomSearch.toLowerCase()) ||
                          item.developer.toLowerCase().includes(showroomSearch.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  // Prices and Customization State
  const [activePriceTab, setActivePriceTab] = useState<"full" | "lite">("full");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeSpecTab, setActiveSpecTab] = useState<string>("3d-visualizacion");
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; embedUrl: string } | null>(null);

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "residencial",
    units: "hasta-50"
  });

  const pillars = [
    {
      title: t("re.pillar1.title", "SHOWROOM VIRTUAL ACTIVO 24/7"),
      description: t("re.pillar1.desc", "Presentá tu proyecto permanentemente, sin maquetas físicas costosas ni límites de horarios de oficina."),
      icon: Clock
    },
    {
      title: t("re.pillar2.title", "EXPERIENCIA INTERACTIVA"),
      description: t("re.pillar2.desc", "Tus clientes recorren los espacios manipulando el sol y alternando acabados en tiempo real."),
      icon: Sliders
    },
    {
      title: t("re.pillar3.title", "RÁPIDO Y SIN DESCARGAS"),
      description: t("re.pillar3.desc", "Acceso inmediato optimizado desde cualquier navegador de celulares, tablets o computadoras."),
      icon: Smartphone
    },
    {
      title: t("re.pillar4.title", "COMERCIALIZACIÓN MODERNA"),
      description: t("re.pillar4.desc", "Herramientas avanzadas de marketing digital y captación de leads integradas directamente al showroom."),
      icon: TrendingUp
    },
    {
      title: t("re.pillar5.title", "TODO EN UN LINK"),
      description: t("re.pillar5.desc", "Accedé al proyecto completo con un solo click, sin necesidad de instalar aplicaciones externas."),
      icon: Link
    },
    {
      title: t("re.pillar6.title", "RECORRÉ TU FUTURA CASA EN 360°"),
      description: t("re.pillar6.desc", "Navegación sumamente intuitiva y fluida en primera persona con inmersión tridimensional absoluta."),
      icon: Compass
    }
  ];

  return (
    <div 
      className="relative w-full bg-[#050608] py-24 px-6 md:px-12 space-y-36 text-white overflow-hidden"
      id="realestate-section"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-96 w-[600px] h-[600px] bg-cyan-500/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-96 w-[600px] h-[600px] bg-amber-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* REAL ESTATE HERO SECTION */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="relative w-full overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-end p-8 md:p-16 mb-12 shadow-2xl">
          {/* Render Background - No stock photo of offices or people with laptops */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
              alt="Modelado 3D de alta gama para proyectos inmobiliarios" 
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] scale-100 transition-all duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Very clean gradient masks (NOT a heavy dark solid overlay, keeping the image pristine and glowing) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/50 via-transparent to-transparent" />
          </div>

          {/* Glowing Celeste Aesthetic lines */}
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#00d2ff]/40 via-[#00d2ff]/10 to-transparent z-10" />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00d2ff]/40 via-[#00d2ff]/10 to-transparent z-10" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl space-y-8 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00d2ff]/10 border border-[#00d2ff]/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
              <span className="font-mono text-[9px] text-[#00d2ff] tracking-[0.25em] uppercase font-bold">
                {t("re.hero.badge", "SHOWROOM WEB 3D INVERSIVO")}
              </span>
            </div>

            {/* Title with "Zeta" highlighted in custom celeste */}
            <h1 className="text-4xl sm:text-7xl font-extralight tracking-tight uppercase leading-[0.95] max-w-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {t("re.hero.title_part1", "¿Por Qué Elegir")} <span className="font-semibold text-[#00d2ff] relative">ZETA<span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#00d2ff]/30" /></span> {t("re.hero.title_part2", "ESTUDIO para tu Proyecto?")}
            </h1>

            {/* Subtitle - exactly 2 lines on desktop, clean and persuasive */}
            <p className="text-xs sm:text-lg text-slate-200 font-light max-w-3xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
              {t("re.hero.desc", "Somos la primera plataforma inmobiliaria online que permite crear un showroom virtual 24/7 interactivo e inmersivo. Presentamos tu desarrollo con un fotorrealismo supremo y navegación Web3D fluida directamente en tu sitio web.")}
            </p>

            {/* Call to Actions (No default green, aligned to celeste/white theme) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#realestate-cta-section"
                className="px-8 py-4 bg-gradient-to-r from-[#00d2ff]/20 to-[#00d2ff]/35 hover:from-[#00d2ff]/30 hover:to-[#00d2ff]/50 border border-[#00d2ff]/60 hover:border-[#00d2ff] text-[10px] font-mono font-bold tracking-[0.2em] text-white hover:text-[#00d2ff] flex items-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.25)] hover:shadow-[0_0_30px_rgba(0,210,255,0.45)] cursor-pointer"
              >
                <Calendar size={13} className="text-[#00d2ff]" />
                <span>{t("re.btn.appointment", "PROGRAMAR UNA CITA")}</span>
              </a>

              <a 
                href="https://wa.me/5491158547294?text=Hola%20Zeta%20Estudio,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20su%20servicio%20premium%20de%20Real%20Estate."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#00d2ff]/60 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-100 hover:text-[#00d2ff] flex items-center gap-3 transition-all duration-300 cursor-pointer"
              >
                <MessageCircle size={13} className="text-[#00d2ff]" />
                <span>{t("re.btn.whatsapp", "WHATSAPP DIRECTO")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* INMERSIVE PRESENTATION & YOUTUBE VIDEO SECTION */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
        {/* Left Column: Text (5 cols) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-cyan-400 tracking-[0.3em] uppercase block font-semibold">
              {t("re.video.badge", "PRESENTACIÓN ULTRA-INMERSIVA")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-white uppercase leading-tight">
              {t("re.video.title", "MÁS QUE UNA PLATAFORMA, UNA EXPERIENCIA")}
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-300 font-light text-sm leading-relaxed text-justify">
            <p>
              {t("re.video.desc1", "Más que una plataforma, ofrecemos una experiencia inmersiva para presentar proyectos inmobiliarios. Permite que potenciales compradores e inversores recorran cada desarrollo de forma interactiva, comprendan su propuesta de valor y accedan a toda la información del proyecto en cuestión de segundos.")}
            </p>
            <p>
              {t("re.video.desc2", "La plataforma se adapta a cualquier tipología y escala: edificios, barrios privados, urbanizaciones, hoteles, oficinas, centros comerciales y desarrollos de usos mixtos. Su flexibilidad permite integrar cualquier arquitectura y gestionar desde pequeños emprendimientos hasta proyectos con miles de unidades, brindando una herramienta innovadora para potenciar la comercialización.")}
            </p>
          </div>
        </div>

        {/* Right Column: Video3D Embed (7 cols) */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-none blur opacity-20 group-hover:opacity-30 transition duration-1000" />
          <div className="relative w-full aspect-video bg-[#0c0e12] border border-white/10 shadow-2xl overflow-hidden">
            <iframe
              src="https://www.youtube-nocookie.com/embed/TPsKpGjxsQI?autoplay=1&mute=1&loop=1&playlist=TPsKpGjxsQI&controls=1&rel=0"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Zeta Estudio Real Estate 3D Film"
            />
          </div>
        </div>
      </div>



      {/* Pillars Presentation using "Estilo Llaves" (Pure minimalist keys design, no card containers) */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        <div className="space-y-2 border-b border-white/5 pb-6">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
            {t("re.qualities.badge", "CUALIDADES CLAVE DE NUESTRO SISTEMA")}
          </span>
          <h3 className="text-3xl font-light tracking-wider text-white uppercase leading-none">
            {t("re.qualities.title", "MÁXIMA EFICACIA COMERCIAL")}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div key={index} className="space-y-3.5">
                
                {/* Dynamic Number indicator */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extralight text-amber-400/40 font-mono">
                    {`0${index + 1}`}
                  </span>
                  <div className="w-8 h-[1px] bg-amber-500/20" />
                  <span className="font-mono text-[9px] text-amber-400 uppercase tracking-widest">ZETA MULTI-SHOWROOM</span>
                </div>

                {/* The "Llave" Left Bordered bracket accent with Icon */}
                <div className="border-l-2 border-amber-500/30 pl-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <IconComponent size={16} className="text-amber-400 shrink-0" />
                    <h4 className="text-xs font-semibold tracking-wider text-white uppercase leading-tight">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed text-justify">
                    {pillar.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* High-impact Statistics Section */}
      <div className="relative z-10 max-w-5xl mx-auto py-16 border-t border-b border-white/5 bg-gradient-to-r from-slate-950/40 via-[#0a0b0d]/80 to-slate-950/40 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Stat 1 */}
          <div className="space-y-3 group">
            <div className="text-5xl sm:text-7xl font-bold text-[#00d2ff] tracking-tight font-sans select-none transition-transform duration-500 group-hover:scale-105">
              6X
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-mono uppercase text-amber-400 tracking-[0.2em]">{t("re.stat1.label", "MÁS TIEMPO")}</h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {t("re.stat1.desc", "Los visitantes permanecen en promedio 5 minutos, hasta 6 veces más que en un sitio web tradicional.")}
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="space-y-3 group border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10">
            <div className="text-5xl sm:text-7xl font-bold text-[#00d2ff] tracking-tight font-sans select-none transition-transform duration-500 group-hover:scale-105">
              24/7
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-mono uppercase text-amber-400 tracking-[0.2em]">{t("re.stat2.label", "SHOWROOM ACTIVO")}</h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {t("re.stat2.desc", "Siempre disponible en línea para tus clientes desde cualquier dispositivo, sin costos de instalaciones físicas.")}
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="space-y-3 group border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10">
            <div className="text-5xl sm:text-7xl font-bold text-[#00d2ff] tracking-tight font-sans select-none transition-transform duration-500 group-hover:scale-105">
              100%
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-mono uppercase text-amber-400 tracking-[0.2em]">{t("re.stat3.label", "LEADS CALIFICADOS")}</h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {t("re.stat3.desc", "Integración nativa con Google Analytics y Facebook Pixel para captar prospectos con alto interés de compra.")}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION: ¿CÓMO FUNCIONA? */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-12 pt-12">
        <div className="space-y-2 border-b border-white/5 pb-6 text-left">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
            {t("re.process.badge", "PROCESO SIMPLE Y TRANSPARENTE")}
          </span>
          <h3 className="text-3xl font-light tracking-wider text-white uppercase leading-none">
            {t("re.process.title", "¿CÓMO FUNCIONA NUESTRA PLATAFORMA?")}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Step 1 */}
          <div className="p-6 border border-white/5 bg-[#0a0b0d]/50 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between h-full text-left">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-none bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <CreditCard size={18} className="text-[#00d2ff]" />
              </div>
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                {t("re.step1.title", "1. Se vende por licencia")}
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {t("re.step1.desc", "El costo se adapta de manera precisa según la cantidad de unidades que integran tu proyecto.")}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 border border-white/5 bg-[#0a0b0d]/50 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between h-full text-left">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-none bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Layers size={18} className="text-[#00d2ff]" />
              </div>
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                {t("re.step2.title", "2. Creación de contenidos")}
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {t("re.step2.desc", "Renderizado de imágenes, videos, infografías y tours 360° siguiendo nuestra guía de contenidos.")}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 border border-white/5 bg-[#0a0b0d]/50 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between h-full text-left">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-none bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Cloud size={18} className="text-[#00d2ff]" />
              </div>
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                {t("re.step3.title", "3. Plataforma en la nube")}
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {t("re.step3.desc", "Configuración completa, carga rápida y publicación final junto a nuestro equipo de Content Managers.")}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION: MULTIPLE PROJECT TYPOLOGIES */}
      <div className="relative z-10 max-w-6xl mx-auto pt-20 pb-6 space-y-10">
        <div className="space-y-2 border-b border-white/5 pb-6 text-left">
          <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
            {t("re.typologies.badge", "VARIEDAD E INTEGRACIÓN NATIVA")}
          </span>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#00d2ff] uppercase leading-none">
            {t("re.typologies.title", "Múltiples Tipologías de Proyectos")}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: t("re.type.house", "Barrio de Casas"),
              subtitle: t("re.type.house.sub", "Urbanizaciones y Masterplans"),
              image: catBarrio,
              link: "https://virtual.residencialbosco.com/#/masterplan/0",
              videoEmbed: "https://virtual.residencialbosco.com/#/masterplan/0"
            },
            {
              title: t("re.type.tower", "Edificios de una Torre"),
              subtitle: t("re.type.tower.sub", "Torres Residenciales y Oficinas"),
              image: catTorre,
              link: "https://living.moderna-360.com/#/",
              videoEmbed: "https://living.moderna-360.com/#/"
            },
            {
              title: t("re.type.multi", "Multi Torre"),
              subtitle: t("re.type.multi.sub", "Complejos y Condominios"),
              image: catMultiTorre,
              link: "https://breezetowers.larimarcity.com/#/",
              videoEmbed: "https://breezetowers.larimarcity.com/#/"
            },
            {
              title: t("re.type.special", "Proyecto Especial"),
              subtitle: t("re.type.special.sub", "Arquitectura Icónica y Corporativa"),
              image: catEspecial,
              link: "https://www.masterplanexpobariloche.com/#/",
              videoEmbed: "https://www.masterplanexpobariloche.com/#/"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}
              className="group/item relative h-[320px] rounded-lg overflow-hidden border border-white/10 bg-[#060709] flex flex-col justify-end p-5 cursor-pointer shadow-lg hover:shadow-cyan-500/5 hover:border-cyan-500/35 transition-all duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 brightness-[0.7] group-hover/item:brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              {/* Floating External Link Icon on Hover */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                <ExternalLink size={13} className="text-[#00d2ff]" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-4 text-center">
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-white tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                    {item.subtitle}
                  </p>
                </div>

                {/* EXPLORAR TOUR button with modern glowing effect */}
                <div className="pt-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-white/5 font-mono text-[10px] tracking-widest text-slate-200 uppercase transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover/item:bg-[#00d2ff]/10 group-hover/item:border-[#00d2ff]/40 group-hover/item:text-[#00d2ff] group-hover/item:shadow-[0_0_15px_rgba(0,210,255,0.25)] cursor-pointer"
                  >
                    <span>{t("re.btn.explore_tour", "EXPLORAR TOUR")}</span>
                    <ExternalLink size={11} className="text-[#00d2ff]" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION: SELLER PANEL VIDEO SHOWCASE */}
      <div className="relative z-10 max-w-6xl mx-auto pt-24 pb-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Features (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[9px] font-mono text-[#00d2ff] tracking-[0.3em] uppercase block font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
              {t("re.seller.badge", "SISTEMA BACK-OFFICE // ÁREA VENDEDOR")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase leading-none">
              {t("re.seller.title1", "PANEL DE")} <span className="font-semibold text-[#00d2ff]">{t("re.seller.title2", "VENDEDOR")}</span> {t("re.seller.title3", "INTELIGENTE")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed text-justify">
              {t("re.seller.desc", "Capacite a su fuerza de ventas y potencie el cierre de operaciones en tiempo real con nuestra herramienta interactiva de gestión comercial. Un panel privado, responsivo y dinámico diseñado para vendedores y brokers que deseen gestionar el inventario, reservar unidades e interactuar de forma inmediata con los leads.")}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start border-l-2 border-[#00d2ff]/30 pl-4">
                <Database size={16} className="text-[#00d2ff] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold tracking-wider text-white uppercase font-mono">{t("re.seller.feat1.title", "Sincronización de Inventario")}</h4>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                    {t("re.seller.feat1.desc", "Actualice al instante el estado de las unidades [Disponible - Reservado - Vendido] para evitar reservas duplicadas y mantener a todo el equipo de ventas coordinado.")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-l-2 border-[#00d2ff]/30 pl-4">
                <Sliders size={16} className="text-[#00d2ff] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold tracking-wider text-white uppercase font-mono">{t("re.seller.feat2.title", "Cotizador Dinámico & Filtros")}</h4>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                    {t("re.seller.feat2.desc", "Filtre lotes o departamentos según área, precio, orientación y tipología, generando cotizaciones formales en formato PDF listas para compartir con el cliente.")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-l-2 border-[#00d2ff]/30 pl-4">
                <ShieldCheck size={16} className="text-[#00d2ff] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold tracking-wider text-white uppercase font-mono">{t("re.seller.feat3.title", "Reserva de Unidades en un Clic")}</h4>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                    {t("re.seller.feat3.desc", "Bloquee temporalmente una unidad de forma segura directamente desde el dispositivo del vendedor durante una reunión presencial, videollamada o visita guiada.")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Custom Video Player (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-none blur opacity-20 group-hover:opacity-30 transition duration-1000" />
            <div className="relative w-full border border-white/10 bg-[#0c0e12] shadow-2xl overflow-hidden flex flex-col">
              
              {/* Telemetry Header */}
              <div className="px-4 py-2.5 bg-black/60 border-b border-white/5 flex items-center justify-between text-[8px] font-mono text-slate-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SYSTEM: ACTIVE // BROKER AREA</span>
                </div>
                <span>ZETA_V_PANEL.MP4</span>
              </div>

              {/* Video Element with absolute custom aspects */}
              <div className="relative aspect-video bg-black w-full overflow-hidden">
                <video
                  src="/multimedia/Panel_Area_Vendedor.mp4"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Technical Specifications bar */}
              <div className="p-4 bg-black/80 border-t border-white/5 grid grid-cols-3 gap-4 text-left font-mono text-[9px] text-slate-400">
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[7px] uppercase">{t("re.spec.module", "MODULO")}</span>
                  <span className="text-white font-semibold">{t("re.spec.crm", "CRM INTEGRADOR")}</span>
                </div>
                <div className="space-y-0.5 border-l border-white/5 pl-4">
                  <span className="text-slate-500 block text-[7px] uppercase">{t("re.spec.latency", "LATENCIA")}</span>
                  <span className="text-cyan-400 font-semibold">&lt; 150MS SYNC</span>
                </div>
                <div className="space-y-0.5 border-l border-white/5 pl-4">
                  <span className="text-slate-500 block text-[7px] uppercase">{t("re.spec.access", "ACCESO")}</span>
                  <span className="text-amber-400 font-semibold">MOBILE & DESKTOP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: INTERACTIVE TECHNICAL SPECS DASHBOARD */}
      <div className="relative z-10 max-w-6xl mx-auto pt-16 pb-6 space-y-12">
        <div className="text-center md:text-left space-y-3">
          <span className="text-[9px] font-mono text-[#00d2ff] tracking-[0.3em] uppercase block font-semibold">
            {t("re.specs.badge", "ESPECIFICACIONES TÉCNICAS Y CAPACIDADES")}
          </span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.15em] text-white uppercase leading-none">
            {t("re.specs.title", "FUNCIONALIDADES DE LA PLATAFORMA WEB3D")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-3xl leading-relaxed">
            {t("re.specs.desc", "Explora las funcionalidades nativas, herramientas de comercialización y capacidades tecnológicas incluidas en nuestro ecosistema inmersivo premium.")}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 border-b border-white/5 pb-4">
          {[
            { id: "3d-visualizacion", label: t("re.tab.visualizacion", "VISUALIZACIÓN & 3D"), icon: Eye },
            { id: "comercializacion", label: t("re.tab.comercializacion", "COMERCIALIZACIÓN"), icon: TrendingUp },
            { id: "comunicacion", label: t("re.tab.comunicacion", "COMUNICACIÓN"), icon: MessageCircle },
            { id: "proyecto-avance", label: t("re.tab.proyecto_avance", "PROYECTO & AVANCE"), icon: MapPin },
            { id: "diseno-adaptabilidad", label: t("re.tab.diseno_adaptabilidad", "DISEÑO & ADAPTABILIDAD"), icon: Sliders },
            { id: "tecnologia-integraciones", label: t("re.tab.integraciones", "INTEGRACIONES"), icon: Settings },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeSpecTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSpecTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 text-[10px] font-mono tracking-widest uppercase border-b-2 cursor-pointer transition-all duration-300 text-left ${
                  isActive
                    ? "border-cyan-400 text-cyan-400 font-bold bg-cyan-950/10"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <IconComponent size={13} className={isActive ? "text-cyan-400" : "text-slate-500"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="bg-black/25 border border-white/5 p-6 md:p-8 relative min-h-[350px]">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-24 h-[1px] bg-cyan-400/50" />
          <div className="absolute top-0 right-0 w-[1px] h-24 bg-cyan-400/50" />

          <AnimatePresence mode="wait">
            {activeSpecTab === "3d-visualizacion" && (
              <motion.div
                key="3d-visualizacion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
              >
                {/* Visualización del proyecto */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Building size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">VISUALIZACIÓN DEL PROYECTO</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Imagen o video de portada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Introducción con vuelo al edificio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Giro 360 orbital del edificio con su entorno</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Vuelo hacia el top de plantas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Recorrido por plantas</span>
                    </li>
                  </ul>
                </div>

                {/* Detalle de cada unidad */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Sliders size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">DETALLE DE CADA UNIDAD</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Planta Amoblada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Plano con Medidas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Galería de Imágenes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Galería de Vistas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Galería de Acabados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-amber-400 font-medium">Estados de venta [Disponible – Reservado – Vendido]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Items de Características (m2, dormitorios, baños, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Tipo de operación (Venta o Alquiler)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Video de la unidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Recorrido 360</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Brochure PDF</span>
                    </li>
                  </ul>
                </div>

                {/* Detalle de cada área social */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Layers size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">DETALLE DE ÁREA SOCIAL</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Planta Amoblada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Plano con Medidas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Galería de Imágenes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Galería de Vistas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Galería de Acabados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Video de amenities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Brochure PDF</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Ítems de Características (Piscina, Gimnasio, Coworking, etc)</span>
                    </li>
                  </ul>
                </div>

                {/* Tours Virtuales & Calidad */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <Compass size={16} />
                      <h4 className="text-xs font-mono font-bold tracking-widest uppercase">360 VIRTUAL TOURS</h4>
                    </div>
                    <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Integración de recorrido 360 de unidades y amenities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-cyan-400 font-semibold">Tecnología soportada: Matterport, Layama, 3D Vista, Pano2VR, Luma Labs, Kula, etc.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Integración con VR/AR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Consultar por otras tecnologías de tours 360</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <Video size={16} />
                      <h4 className="text-xs font-mono font-bold tracking-widest uppercase">CALIDAD DE IMÁGENES & VIDEOS</h4>
                    </div>
                    <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Full HD – 1920 x 1080</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-amber-400 font-bold">4K – 3840 x 2160</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSpecTab === "comercializacion" && (
              <motion.div
                key="comercializacion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
              >
                {/* Comercialización */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <CreditCard size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">COMERCIALIZACIÓN</h4>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Publicación de Precio de Venta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Publicación de Precio de Alquiler</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Listas de Precios por Formas de Pago</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Cotizador Online</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Consultar Precios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Reserva Online con integración de pasarelas de pagos locales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Buscador de Unidades por estado, recamaras, precio y tipologías</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Integración de calendarios para agendar Cita por videollamada o en showroom</span>
                    </li>
                  </ul>
                </div>

                {/* Administrador para vendedores */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Database size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">ADMINISTRADOR PARA VENDEDORES</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Administrador de Estado de Unidades a la Venta [Disponible – Reservado – Vendido]</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Administrador de Precio (si está activado el módulo de precio)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Administrador de Usuarios Vendedores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Permisos de Vendedores para modificar precios</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeSpecTab === "comunicacion" && (
              <motion.div
                key="comunicacion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
              >
                {/* Canales */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <MessageCircle size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">COMUNICACIÓN DIRECTA</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Whatsapp directo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Formulario de Consultas inteligente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Llamada telefónica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>E-mail de contacto</span>
                    </li>
                  </ul>
                </div>

                {/* Redes Sociales */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Share2 size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">REDES SOCIALES</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Link directo a redes sociales de la constructora/promotora</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Soporte para Facebook, Instagram, Linkedin, TikTok y más</span>
                    </li>
                  </ul>
                </div>

                {/* Compartir */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Link size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">COMPARTIR CONTENIDO</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Compartir Copiar Link directo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Integración directa para Facebook</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Integración directa para Instagram</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeSpecTab === "proyecto-avance" && (
              <motion.div
                key="proyecto-avance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
              >
                {/* Proyecto Ficha */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Building size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">INFORMACIÓN DEL PROYECTO</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Video del proyecto (1 video integrado con Vimeo)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Ubicación exacta del proyecto (Google Maps)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-cyan-400 font-semibold">Referencias de Puntos de Interés con cálculo de distancia en tiempo real (Google Maps)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Formulario de Contacto general</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Información detallada de la Promotora</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Brochure PDF de alta calidad descargable</span>
                    </li>
                  </ul>
                </div>

                {/* Avance & Calificaciones */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Clock size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">AVANCE DE OBRA & COMUNIDAD</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-cyan-400 font-bold">Sección de avance de obra, con imágenes, videos y recorridos 360</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-amber-400 font-medium">Soporte para cámara en vivo de la obra en tiempo real</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Sistema integrado de calificación y comentarios para clientes verificados que compraron en el proyecto</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeSpecTab === "diseno-adaptabilidad" && (
              <motion.div
                key="diseno-adaptabilidad"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
              >
                {/* Adaptabilidad */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Smartphone size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">ADAPTABILIDAD TOTAL</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Desktop (Computadora de Escritorio)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Mobile Vertical</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Mobile Horizontal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Tablets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Pantallas Táctiles (Tótems interactivos)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Smart TV</span>
                    </li>
                    <li className="flex items-start gap-2 pt-2 border-t border-white/5">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-amber-400 font-medium">Compatibilidad de Navegadores: Chrome & Safari (Testing exhaustivo)</span>
                    </li>
                  </ul>
                </div>

                {/* Diseño */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Sliders size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">DISEÑO Y PERSONALIZACIÓN</h4>
                  </div>
                  <ul className="space-y-2 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Configuración de un color por default</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Biblioteca de Iconos por default</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Tipografías por default de Google Fonts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Estilos de menú por default</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Estilos de botones por default</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Template de Diseño por default</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Edición del Logotipo para Portada y Menú</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Edición de imágenes para los contenidos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Favicon Personalizado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Título HTML personalizado de la página</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Personalización de CSS y/o Template en caso de contratarlo</span>
                    </li>
                  </ul>
                </div>

                {/* Capacidad & Registro */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <Database size={16} />
                      <h4 className="text-xs font-mono font-bold tracking-widest uppercase">CAPACIDAD ILIMITADA</h4>
                    </div>
                    <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Capacidad para Carga de todos los Contenidos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-cyan-400 font-semibold">Visitas, Consultas y Contactos ilimitados</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <Globe size={16} />
                      <h4 className="text-xs font-mono font-bold tracking-widest uppercase">DOMINIO & SEGURIDAD</h4>
                    </div>
                    <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Registro y Renovación Anual de Dominio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Squarespace registration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-cyan-400 font-bold">Certificado SSL de Seguridad</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSpecTab === "tecnologia-integraciones" && (
              <motion.div
                key="tecnologia-integraciones"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
              >
                {/* Marketing Digital */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <TrendingUp size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">MARKETING DIGITAL</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Integración de Google Analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Integración de Píxel de Facebook</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Integración de Google Tag Manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Capacidad de recibir alto tráfico desde campañas de marketing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-cyan-400">Capacidad de Remarketing para mostrar publicidad personalizada a las personas que navegan en el Web3D según sus preferencias</span>
                    </li>
                  </ul>
                </div>

                {/* Internacionalización */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Globe size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">INTERNACIONALIZACIÓN</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-cyan-400 font-bold">Configuración de un idioma por proyecto (Español, Inglés, Francés o Vietnamita)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Se puede configurar en cualquier idioma</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Configuración de la moneda del país</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>Configuración de múltiples idiomas y monedas</span>
                    </li>
                  </ul>
                </div>

                {/* Integraciones */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-cyan-400">
                    <Settings size={16} />
                    <h4 className="text-xs font-mono font-bold tracking-widest uppercase">INTEGRACIONES DE SISTEMAS</h4>
                  </div>
                  <ul className="space-y-2.5 text-[11px] text-slate-300 font-light">
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-cyan-400 font-bold">API de Integración propia para software de terceros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-amber-400 font-semibold">Integraciones con CRM y ERP para el manejo de los formularios de contacto y el estado de las unidades en tiempo real</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SECTION: PRECIOS */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-12 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
          <div className="space-y-2 text-left">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
              LICENCIA SUPREMA
            </span>
            <h3 className="text-3xl font-light tracking-wider text-white uppercase leading-none">
              NUESTROS PLANES Y PRECIOS
            </h3>
          </div>

          {/* Tab toggles */}
          <div className="flex items-center gap-2 border border-white/10 p-1 bg-black/40">
            <button
              onClick={() => setActivePriceTab("full")}
              className={`px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-all duration-300 ${
                activePriceTab === "full" 
                  ? "bg-amber-400 text-black font-bold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Versión Full
            </button>
            <button
              onClick={() => setActivePriceTab("lite")}
              className={`px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-all duration-300 ${
                activePriceTab === "lite" 
                  ? "bg-amber-400 text-black font-bold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Versión Lite
            </button>
          </div>
        </div>

        {/* Pricing Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Prices Table Area (8 cols) */}
          <div className="lg:col-span-8 overflow-hidden border border-white/5 bg-black/20">
            <table className="w-full text-left border-collapse font-mono text-[11px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-400 text-[9px] tracking-widest uppercase">
                  <th className="py-4 px-6 font-semibold">Rango de Unidades</th>
                  <th className="py-4 px-6 font-semibold text-right">Inversión (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { label: "Proyecto hasta 20 unidades", full: "3,000", lite: "2,000" },
                  { label: "Proyecto hasta 50 unidades", full: "4,000", lite: "3,000" },
                  { label: "Proyecto hasta 100 unidades", full: "5,000", lite: "4,000" },
                  { label: "Proyecto hasta 150 unidades", full: "6,000", lite: "5,000" },
                  { label: "Proyecto hasta 200 unidades", full: "7,000", lite: "6,000" },
                  { label: "Proyecto hasta 300 unidades", full: "8,000", lite: "7,000" },
                  { label: "Proyecto hasta 500 unidades", full: "10,000", lite: "9,000" },
                  { label: "Proyecto hasta 1000 unidades", full: "12,000", lite: "11,000" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-6 text-slate-200">{row.label}</td>
                    <td className="py-3 px-6 text-right font-bold text-amber-400">
                      USD {activePriceTab === "full" ? row.full : row.lite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Column details & Demo button (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 border border-amber-500/20 bg-amber-500/[0.02] space-y-4 text-left">
              <span className="block text-[8px] font-mono text-amber-400 uppercase tracking-widest">INTERACTUAR</span>
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                {activePriceTab === "full" ? "DEMO VERSIÓN FULL" : "DEMO VERSIÓN LITE"}
              </h4>
              
              {/* IMAGE PREVIEW WITH DYNAMIC LINK */}
              <a 
                href={activePriceTab === "full" ? "https://try.web3d.app/#/" : "https://site3.demo.web3d.page/#/"}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-video w-full bg-black border border-white/10 overflow-hidden group/demolink cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all duration-500"
              >
                <img 
                  src={
                    activePriceTab === "full"
                      ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                      : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                  } 
                  alt={activePriceTab === "full" ? "Demo Full Preview" : "Demo Lite Preview"}
                  className="w-full h-full object-cover brightness-[0.55] group-hover/demolink:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Overlays */}
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-black/85 backdrop-blur-sm border border-[#00d2ff]/30 px-1.5 py-0.5 rounded font-mono text-[7px] text-[#00d2ff] tracking-wider uppercase">
                      {activePriceTab === "full" ? "Interactive 3D Engine" : "Optimized Web Engine"}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  </div>

                  <div className="bg-black/60 backdrop-blur-xs p-1.5 border border-white/5 font-mono text-[7px] text-slate-400">
                    <span className="text-white block font-bold text-[8px] tracking-wide mb-0.5">
                      {activePriceTab === "full" ? "PROYECTO COMPLETO" : "VISTA INMEDIATA"}
                    </span>
                    {activePriceTab === "full" ? "try.web3d.app" : "site3.demo.web3d.page"}
                  </div>
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/demolink:opacity-100 transition-opacity duration-300">
                  <div className="px-3 py-1.5 bg-[#00d2ff] text-black font-mono text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-lg shadow-[#00d2ff]/20 scale-95 group-hover/demolink:scale-100 transition-transform duration-300">
                    <span>EXPLORAR DEMO</span>
                    <ArrowRight size={10} strokeWidth={2.5} />
                  </div>
                </div>
              </a>

              {/* Action Link button */}
              <a
                href={activePriceTab === "full" ? "https://try.web3d.app/#/" : "https://site3.demo.web3d.page/#/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 border border-[#00d2ff]/40 hover:border-[#00d2ff]/80 text-[9px] font-mono font-bold tracking-widest text-[#00d2ff] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <span>ACCEDER A DEMO INTERACTIVA</span>
                <ArrowRight size={10} className="text-[#00d2ff]" />
              </a>
            </div>

            {/* Quick help note */}
            <div className="flex gap-3 text-left p-4 bg-white/5 border border-white/5">
              <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Nuestros asesores comerciales pueden armar un plan personalizado de acuerdo a las características específicas de tu porfolio corporativo.
              </p>
            </div>
          </div>

        </div>

        {/* Collapsible / Accordion details */}
        <div className="space-y-2 pt-6">
          <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest text-left mb-3">
            CONSIDERACIONES COMERCIALES Y ADICIONALES
          </span>

          {/* Accordion Item 1 */}
          <div className="border border-white/5">
            <button
              onClick={() => setOpenAccordion(openAccordion === "fases" ? null : "fases")}
              className="w-full flex justify-between items-center p-4 text-left font-mono text-[11px] tracking-wider uppercase text-slate-200 hover:bg-white/[0.02] cursor-pointer"
            >
              <span>PROYECTOS EN FASES</span>
              {openAccordion === "fases" ? <ChevronUp size={14} className="text-amber-400" /> : <ChevronDown size={14} className="text-slate-500" />}
            </button>
            <AnimatePresence>
              {openAccordion === "fases" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white/[0.01] border-t border-white/5 text-xs text-slate-300 font-light leading-relaxed text-left">
                    Diseñado para desarrollos inmobiliarios de gran envergadura que se lanzan en etapas consecutivas. Permite estructurar y habilitar módulos de forma progresiva según el avance de las etapas de venta, optimizando el costo inicial de la suscripción y sincronizando el material interactivo de obra de manera armónica.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion Item 2 */}
          <div className="border border-white/5">
            <button
              onClick={() => setOpenAccordion(openAccordion === "idiomas" ? null : "idiomas")}
              className="w-full flex justify-between items-center p-4 text-left font-mono text-[11px] tracking-wider uppercase text-slate-200 hover:bg-white/[0.02] cursor-pointer"
            >
              <span>PROYECTOS EN MÚLTIPLES IDIOMAS</span>
              {openAccordion === "idiomas" ? <ChevronUp size={14} className="text-amber-400" /> : <ChevronDown size={14} className="text-slate-500" />}
            </button>
            <AnimatePresence>
              {openAccordion === "idiomas" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white/[0.01] border-t border-white/5 text-xs text-slate-300 font-light leading-relaxed text-left space-y-1">
                    <p>Soporte multilinguaje completo para atraer inversionistas globales de manera impecable.</p>
                    <p className="font-mono text-[10px] text-amber-400 font-semibold">
                      Inversión: USD 600 por implementación de idioma adicional + USD 300 de renovación anual por idioma.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion Item 3 */}
          <div className="border border-white/5">
            <button
              onClick={() => setOpenAccordion(openAccordion === "mantenimiento" ? null : "mantenimiento")}
              className="w-full flex justify-between items-center p-4 text-left font-mono text-[11px] tracking-wider uppercase text-slate-200 hover:bg-white/[0.02] cursor-pointer"
            >
              <span>MANTENIMIENTO SEGUNDO AÑO</span>
              {openAccordion === "mantenimiento" ? <ChevronUp size={14} className="text-amber-400" /> : <ChevronDown size={14} className="text-slate-500" />}
            </button>
            <AnimatePresence>
              {openAccordion === "mantenimiento" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white/[0.01] border-t border-white/5 text-xs text-slate-300 font-light leading-relaxed text-left space-y-1">
                    <p>Soporte técnico preferencial, actualizaciones de seguridad del core de visualización, hosting dedicado optimizado en la nube y optimizaciones periódicas.</p>
                    <p className="font-mono text-[10px] text-amber-400 font-semibold">
                      Inversión: USD 1,000 anuales (Primer año completamente bonificado e incluido en la licencia original).
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pricing Terms & Inclusions Footer */}
        <div className="pt-8 border-t border-white/5 text-left space-y-4">
          <p className="text-[10px] font-mono text-slate-500">
            * Los precios expresados en las tablas no incluyen impuestos locales ni retenciones aplicables según la región de contratación.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-slate-400 font-light">
            <div className="space-y-1.5 border-l border-[#00d2ff]/30 pl-4">
              <span className="block text-[8px] font-mono text-[#00d2ff] uppercase tracking-widest font-bold">¿QUÉ INCLUYE LA LICENCIA?</span>
              <p className="leading-relaxed">
                Acceso completo a la plataforma SaaS, registro de dominio exclusivo (hasta USD 15 anuales), certificado de seguridad SSL, configuración técnica inicial de servidores, panel de administración autogestionable y primer año de mantenimiento integral.
              </p>
            </div>
            <div className="space-y-1.5 border-l border-amber-500/30 pl-4">
              <span className="block text-[8px] font-mono text-amber-400 uppercase tracking-widest font-bold">¿QUÉ NO INCLUYE?</span>
              <p className="leading-relaxed">
                Creación o provisión de contenidos audiovisuales base (los modelados CAD, planos, renders brutos o animaciones deben ser suministrados por el cliente en los formatos solicitados, o contratados de forma externa).
              </p>
            </div>
            <div className="space-y-1.5 border-l border-white/20 pl-4">
              <span className="block text-[8px] font-mono text-slate-300 uppercase tracking-widest font-bold">TIEMPO DE IMPLEMENTACIÓN</span>
              <p className="leading-relaxed">
                De 5 a 15 días hábiles a partir de la recepción y aprobación técnica de todo el material gráfico e información del proyecto por parte de nuestro equipo Content Manager.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: PROYECTOS PREMIUM REAL ESTATE (LIVE SHOWROOMS) */}
      <div id="live-showrooms-section" className="relative z-10 max-w-5xl mx-auto space-y-12 pt-12 border-t border-white/5">
        <div className="space-y-3 text-left">
          <span className="text-[9px] font-mono text-amber-400 tracking-[0.25em] uppercase font-bold block">
            {t("re.live.badge", "DEMOSTRACIONES EN TIEMPO REAL")}
          </span>
          <h3 className="text-3xl font-light tracking-wider text-white uppercase leading-none">
            {t("re.live.title", "RECORRIDOS 360 & MAQUETAS INTERACTIVAS EN VIVO")}
          </h3>
          <p className="text-xs text-slate-400 font-light max-w-3xl leading-relaxed">
            {t("re.live.desc", "Haga clic directamente sobre la imagen de cualquiera de nuestros desarrollos premium activos para ingresar de forma instantánea a su respectiva maqueta virtual 3D o recorrido interactivo en vivo.")}
          </p>
        </div>

        {/* Filters and Search controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {(["Todos", "Panamá", "Argentina", "Colombia", "Paraguay", "República Dominicana", "España", "México", "Guatemala", "Estados Unidos"] as const).map((country) => {
              const countryLabel = 
                country === "Todos" ? t("re.country.all", "Todos") :
                country === "Panamá" ? t("re.country.panama", "Panamá") :
                country === "Argentina" ? t("re.country.argentina", "Argentina") :
                country === "Colombia" ? t("re.country.colombia", "Colombia") :
                country === "Paraguay" ? t("re.country.paraguay", "Paraguay") :
                country === "República Dominicana" ? t("re.country.dominican_republic", "República Dominicana") :
                country === "España" ? t("re.country.spain", "España") :
                country === "México" ? t("re.country.mexico", "México") :
                country === "Guatemala" ? t("re.country.guatemala", "Guatemala") :
                country === "Estados Unidos" ? t("re.country.usa", "Estados Unidos") : country;
              return (
                <button
                  key={country}
                  onClick={() => setShowroomFilter(country)}
                  className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider border rounded-full cursor-pointer transition-all ${
                    showroomFilter === country
                      ? "bg-amber-400/10 text-amber-400 border-amber-400/30 font-bold"
                      : "text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {countryLabel}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder={t("re.search_placeholder", "Buscar desarrollo...")}
              value={showroomSearch}
              onChange={(e) => setShowroomSearch(e.target.value)}
              className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/40"
            />
          </div>
        </div>

        {/* Live Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShowrooms.map((item) => {
            const countryTranslated = 
              item.country === "Panamá" ? t("re.country.panama", "Panamá") :
              item.country === "Argentina" ? t("re.country.argentina", "Argentina") :
              item.country === "Colombia" ? t("re.country.colombia", "Colombia") :
              item.country === "Paraguay" ? t("re.country.paraguay", "Paraguay") :
              item.country === "República Dominicana" ? t("re.country.dominican_republic", "República Dominicana") :
              item.country === "España" ? t("re.country.spain", "España") :
              item.country === "México" ? t("re.country.mexico", "México") :
              item.country === "Guatemala" ? t("re.country.guatemala", "Guatemala") :
              item.country === "Estados Unidos" ? t("re.country.usa", "Estados Unidos") : item.country;

            const badgeTranslated = 
              item.badge === "Masterplan" ? t("re.badge.masterplan", "Masterplan") :
              item.badge === "Maqueta 3D" ? t("re.badge.maqueta3d", "Maqueta 3D") :
              item.badge === "Recorrido 360" ? t("re.badge.recorrido360", "Recorrido 360") : item.badge;

            return (
              <motion.a 
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group/item relative h-[350px] rounded-lg overflow-hidden border border-white/10 bg-[#060709] flex flex-col justify-end p-5 cursor-pointer shadow-lg hover:shadow-cyan-500/5 hover:border-cyan-500/35 transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={t(`re.showroom.${item.id}.title`, item.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 brightness-[0.7] group-hover/item:brightness-[0.5]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="font-mono text-[7px] text-slate-300 bg-black/80 px-2.5 py-1 border border-white/10 rounded-full tracking-wider uppercase font-bold">
                    {countryTranslated}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                  <span className="font-mono text-[7px] text-amber-400 bg-amber-500/10 px-2.5 py-1 border border-amber-400/25 rounded-full tracking-wider uppercase font-bold">
                    {badgeTranslated}
                  </span>
                </div>

                {/* Card Content */}
                <div className="relative z-10 space-y-3 text-center">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-slate-400 tracking-widest uppercase block font-semibold">
                      {t(`re.showroom.${item.id}.developer`, item.developer)}
                    </span>
                    <h4 className="text-sm font-semibold text-white tracking-wide uppercase line-clamp-1 group-hover/item:text-[#00d2ff] transition-colors duration-300">
                      {t(`re.showroom.${item.id}.title`, item.title)}
                    </h4>
                    <p className="text-[10px] text-slate-300 font-light leading-normal line-clamp-2 px-2">
                      {t(`re.showroom.${item.id}.desc`, item.description)}
                    </p>
                  </div>

                  {/* VER PROYECTO pill button */}
                  <div className="pt-1.5">
                    <span className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/20 bg-white/5 font-mono text-[9px] tracking-widest text-slate-200 uppercase transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover/item:bg-[#00d2ff]/10 group-hover/item:border-[#00d2ff]/40 group-hover/item:text-[#00d2ff] group-hover/item:shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                      {t("re.btn.view_project", "VER PROYECTO")}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
          {filteredShowrooms.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 font-mono text-xs">
              {t("re.no_projects", "No se encontraron proyectos con ese nombre.")}
            </div>
          )}
        </div>
      </div>

      {/* SECTION: CTA FINAL Y CONTACTO */}
      <div id="realestate-cta-section" className="relative z-10 max-w-5xl mx-auto py-16 border-t border-white/5 space-y-16">
        
        {/* Intro */}
        <div className="text-center md:text-left space-y-4 max-w-3xl">
          <span className="text-[9px] font-mono text-[#00d2ff] tracking-[0.25em] uppercase font-bold block text-left">
            {t("re.cta.badge", "DA EL PASO DEFINITIVO")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight uppercase leading-none text-white text-left">
            {t("re.cta.title1", "¿Listo para llevar tu proyecto al")} <span className="text-[#00d2ff] font-semibold">{t("re.cta.title2", "siguiente nivel")}</span>?
          </h2>
          <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed text-left">
            {t("re.cta.desc", "Unificamos el poder del renderizado 4K de alta fidelidad, la interactividad fluida 3D y la tecnología Web3D para dar forma a la herramienta definitiva de ventas inmobiliarias. Hablemos hoy para agendar tu demostración comercial sin cargo.")}
          </p>
        </div>

        {/* Content Layout: Form vs Cita Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Calendar & Instant Contact Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-gradient-to-b from-[#0a0b0d]/80 to-[#050608]/90 p-8 border border-white/5 text-left">
            <div className="space-y-6">
              <span className="block text-[9px] font-mono text-amber-400 tracking-widest uppercase">{t("re.cta.instant", "CONEXIÓN INSTANTÁNEA")}</span>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold tracking-wider text-white uppercase">{t("re.cta.meeting_title", "AGENDA UNA REUNIÓN DE CONSULTA")}</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {t("re.cta.meeting_desc", "Accede de forma directa a nuestro Google Calendar corporativo para programar una videollamada personalizada de 15 minutos con un consultor tecnológico.")}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a 
                  href="https://calendar.google.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 border border-[#00d2ff]/40 hover:border-[#00d2ff]/80 text-[10px] font-mono font-bold tracking-widest text-white hover:text-[#00d2ff] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_15px_rgba(0,210,255,0.1)] cursor-pointer"
                >
                  <Calendar size={13} className="text-[#00d2ff]" />
                  <span>{t("re.cta.btn.schedule", "PROGRAMAR UNA CITA")}</span>
                </a>

                <a 
                  href="https://wa.me/5491158547294?text=Hola%20Zeta%20Estudio,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20su%20servicio%20premium%20de%20Real%20Estate."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/60 text-[10px] font-mono font-bold tracking-widest text-slate-100 hover:text-amber-400 flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
                >
                  <MessageCircle size={13} className="text-[#00d2ff]" />
                  <span>{t("re.cta.btn.whatsapp", "HABLAR POR WHATSAPP")}</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-2">
              <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">{t("re.cta.email_direct", "EMAIL DIRECTO")}</span>
              <a href="mailto:zetaestudio@zetaestudio.xyz" className="text-[11px] font-mono text-slate-300 hover:text-[#00d2ff] transition-colors">
                zetaestudio@zetaestudio.xyz
              </a>
            </div>
          </div>

          {/* Form Area (7 cols) */}
          <div className="lg:col-span-7 bg-[#0a0b0d]/40 p-8 border border-white/5 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    
                    const emailSubject = t("re.email.subject", "ZETA ESTUDIO — Consulta de Real Estate");
                    const emailBodyIntro = t("re.email.body_intro", "Hola Rubén,\n\nHe enviado una consulta a través de la web con los siguientes datos:\n\n");
                    const emailNameLabel = t("re.email.name_label", "Nombre");
                    const emailContactLabel = t("re.email.contact_label", "Correo de contacto");
                    const emailTypeLabel = t("re.email.type_label", "Tipo de Proyecto");
                    const emailUnitsLabel = t("re.email.units_label", "Cantidad de Unidades");
                    const emailWaiting = t("re.email.waiting", "Quedo a la espera de su respuesta.\n\nSaludos,\n");

                    const subject = encodeURIComponent(emailSubject);
                    const body = encodeURIComponent(
                      `${emailBodyIntro}` +
                      `- ${emailNameLabel}: ${formData.name}\n` +
                      `- ${emailContactLabel}: ${formData.email}\n` +
                      `- ${emailTypeLabel}: ${formData.projectType}\n` +
                      `- ${emailUnitsLabel}: ${formData.units}\n\n` +
                      `${emailWaiting}` +
                      `${formData.name}`
                    );
                    
                    window.location.href = `mailto:zetaestudio@zetaestudio.xyz?subject=${subject}&body=${body}`;
                    setFormSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">{t("re.cta.form_badge", "FORMULARIO DE CONTACTO")}</span>
                    <h4 className="text-sm font-semibold tracking-wider text-white uppercase">{t("re.cta.form_title", "CONSULTA PERSONALIZADA")}</h4>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">{t("re.form.name", "Nombre Completo")}</label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("re.form.name_placeholder", "Ej. Santiago Fernández")}
                      className="w-full px-4 py-2.5 bg-black/60 border border-white/10 focus:border-[#00d2ff]/60 focus:outline-none text-xs font-light text-slate-200 transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">{t("re.form.email", "Correo Electrónico")}</label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("re.form.email_placeholder", "Ej. santiago@desarrollos.com")}
                      className="w-full px-4 py-2.5 bg-black/60 border border-white/10 focus:border-[#00d2ff]/60 focus:outline-none text-xs font-light text-slate-200 transition-colors"
                    />
                  </div>

                  {/* Dual selectors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">{t("re.form.type", "Tipo de Proyecto")}</label>
                      <select 
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 focus:border-[#00d2ff]/60 focus:outline-none text-xs font-light text-slate-200 transition-colors"
                      >
                        <option value="residencial">{t("re.form.type.res", "Residencial / Condominio")}</option>
                        <option value="torre">{t("re.form.type.tower", "Torre de Departamentos")}</option>
                        <option value="barrio">{t("re.form.type.neighborhood", "Barrio Cerrado / Masterplan")}</option>
                        <option value="comercial">{t("re.form.type.commercial", "Corporativo / Comercial")}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">{t("re.form.units", "Cantidad de Unidades")}</label>
                      <select 
                        value={formData.units}
                        onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black border border-white/10 focus:border-[#00d2ff]/60 focus:outline-none text-xs font-light text-slate-200 transition-colors"
                      >
                        <option value="hasta-20">{t("re.form.units.hasta20", "Hasta 20 unidades")}</option>
                        <option value="hasta-50">{t("re.form.units.hasta50", "Hasta 50 unidades")}</option>
                        <option value="hasta-100">{t("re.form.units.hasta100", "Hasta 100 unidades")}</option>
                        <option value="hasta-200">{t("re.form.units.hasta200", "Hasta 200 unidades")}</option>
                        <option value="mas-200">{t("re.form.units.mas200", "Más de 200 unidades")}</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 border border-[#00d2ff]/40 hover:border-[#00d2ff] text-[10px] font-mono font-bold tracking-widest text-[#00d2ff] hover:text-white flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
                    >
                      <Send size={12} />
                      <span>{t("re.form.submit_btn", "ENVIAR CONSULTA")}</span>
                    </button>
                  </div>

                </motion.form>
              ) : (
                <motion.div 
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 text-center py-8"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/40 flex items-center justify-center mx-auto">
                    <Check size={20} className="text-[#00d2ff]" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-semibold tracking-wider text-white uppercase">{t("re.form.success_title", "¡CONSULTA ENVIADA CON ÉXITO!")}</h4>
                    <p className="text-xs text-slate-300 font-light max-w-sm mx-auto leading-relaxed">
                      {t("re.form.success_desc1", "Muchas gracias,")} <span className="text-[#00d2ff] font-medium">{formData.name}</span>. {t("re.form.success_desc2", "Un consultor comercial de Zeta Estudio se contactará a")} <span className="text-white">{formData.email}</span> {t("re.form.success_desc3", "dentro de las próximas 24 horas hábiles.")}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", projectType: "residencial", units: "hasta-50" });
                    }}
                    className="mt-2 text-[9px] font-mono text-slate-500 hover:text-slate-300 underline tracking-widest uppercase transition-colors"
                  >
                    {t("re.form.send_another", "Enviar otra consulta")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Lightbox Video Modal for Vimeo */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-[#090b0f] border border-white/10 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,210,255,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#050608]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#00d2ff] uppercase">
                    {t("re.modal.video_projection", "PROYECCIÓN DE VIDEO //")} {activeVideoModal.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition duration-200 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Video aspect frame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={activeVideoModal.embedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={activeVideoModal.title}
                />
              </div>

              {/* Footer */}
              <div className="p-3 bg-[#050608] flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/5">
                <span>{t("re.modal.playing_desc", "REPRODUCIENDO DEMOSTRACIÓN COMERCIAL DE ALTA CALIDAD")}</span>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="text-[#00d2ff] hover:underline uppercase tracking-wider text-[9px] font-bold"
                >
                  {t("re.modal.close_view", "CERRAR VISTA")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
