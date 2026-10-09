/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import IntroScreen from "./components/IntroScreen";
import Navigation from "./components/Navigation";
import ThreeCanvas from "./components/ThreeCanvas";
import Portfolio from "./components/Portfolio";
import AboutUs from "./components/AboutUs";
import Cualidades from "./components/Cualidades";
import Services from "./components/Services";
import Drones from "./components/Drones";
import RealEstate from "./components/RealEstate";
import Contact from "./components/Contact";
import HlsPlayer from "./components/HlsPlayer";
import FloatingWpp from "./components/FloatingWpp";
import HolographicFooter from "./components/HolographicFooter";
import CinematicGridHero from "./components/CinematicGridHero";
import { SliderCinematico } from "./components/SliderCinematico";
import logoZeta from "./logo-zeta.png";
import { Play, Eye, Sliders, Layers } from "lucide-react";

export default function App() {
  const [introSkipped, setIntroSkipped] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("proyectos");

  // Dynamic player overrides
  const [playerSource, setPlayerSource] = useState<{ url: string; title: string } | null>(null);

  // Dynamic favicon injector to make it the 'live icon of the web'
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logoZeta;
    link.type = "image/png";
  }, []);

  // Intercept any click to #contacto-section, #contacto, or #contact-section to change activeTab and scroll
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && (href.includes("contact") || href.includes("contacto"))) {
          e.preventDefault();
          setActiveTab("contacto");
          setTimeout(() => {
            const el = document.getElementById("contact-section") || 
                       document.getElementById("contacto-section") || 
                       document.getElementById("contacto");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#010204] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      <AnimatePresence mode="wait">
        {!introSkipped ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 w-screen h-screen"
          >
            <IntroScreen onSkip={() => setIntroSkipped(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative flex-1 flex flex-col"
          >
            {/* 1. Sticky Navigation */}
            <Navigation activeTab={activeTab} onNavClick={setActiveTab} />

            {/* Cinematic Multi-Screen Live Video Collage (DBOX Style) */}
            {activeTab === "proyectos" && (
              <CinematicGridHero 
                onSelectProject={(url, title) => setPlayerSource({ url, title })} 
                onNavigate={setActiveTab}
              />
            )}

            {/* 2. Interactive Background WebGL Wireframe Canvas */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <ThreeCanvas />
            </div>

            {/* 3. Main Workspace container */}
            <main className={`relative flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 pb-24 z-10 space-y-16 ${activeTab === "proyectos" ? "pt-6" : "pt-32"}`}>
              {/* Lab Custom Player Spotlight (Appears if a stream was compiled in the lab) */}
              {playerSource && (
                <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-6 space-y-4 shadow-md animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                        REPRODUCTOR
                      </span>
                    </div>
                    <button
                      onClick={() => setPlayerSource(null)}
                      className="text-[9px] font-mono text-slate-500 hover:text-white uppercase tracking-wider cursor-pointer"
                    >
                      Remover Stream
                    </button>
                  </div>
                  <HlsPlayer src={playerSource.url} title={playerSource.title} autoPlay={true} />
                </div>
              )}

              {/* Section Router with Framer Motion transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[400px]"
                >
                  {activeTab === "proyectos" && (
                    <div className="space-y-16">
                      <Portfolio onSelectProject={(url, title) => setPlayerSource({ url, title })} />
                      
                      {/* CLIENTES */}
                      <div className="bg-[#000000] border-t border-white/5">
                        <SliderCinematico />
                      </div>
                    </div>
                  )}
                  {activeTab === "servicios" && <Services onNavigate={setActiveTab} />}
                  {activeTab === "drones" && <Drones onNavigate={setActiveTab} />}
                  {activeTab === "realestate" && <RealEstate onNavigate={setActiveTab} />}
                  {activeTab === "nosotros" && (
                    <div className="space-y-16">
                      <AboutUs />
                      <Cualidades />
                    </div>
                  )}
                  {activeTab === "contacto" && <Contact />}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* 4. Holographic Portal Footer */}
            <HolographicFooter />

            {/* Ultra Premium 3D Floating WhatsApp Widget */}
            <FloatingWpp />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
