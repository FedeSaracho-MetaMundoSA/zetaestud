/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import TransparentLogo from "./TransparentLogo";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

interface NavigationProps {
  onNavClick: (tab: string) => void;
  activeTab: string;
}

export default function Navigation({ onNavClick, activeTab }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "proyectos", key: "nav.proyectos", defaultLabel: "INICIO" },
    { id: "nosotros", key: "nav.nosotros", defaultLabel: "QUIENES SOMOS" },
    { id: "servicios", key: "nav.servicios", defaultLabel: "SERVICIOS" },
    { id: "drones", key: "nav.drones", defaultLabel: "FILMACIÓN DRON" },
    { id: "realestate", key: "nav.realestate", defaultLabel: "REAL ESTATE" },
    { id: "contacto", key: "nav.contacto", defaultLabel: "CONTACTO" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-[#030406]/95 backdrop-blur-md border-white/5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-transparent py-4"
      }`}
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
        
        {/* Official Brand Logo Section - Large & Pristine */}
        <button
          onClick={() => onNavClick("proyectos")}
          className="flex items-center gap-5 group focus:outline-none cursor-pointer text-left shrink-0"
        >
          {/* Logo container, enlarged to highlight the official brand art */}
          <div className="relative flex items-center justify-center p-1.5 overflow-hidden transition-all duration-300">
            <TransparentLogo 
              className="h-12 sm:h-16 md:h-20 w-auto transition-transform duration-500 group-hover:scale-105" 
              enforceWhite={false}
            />
          </div>
        </button>

        {/* Desktop Menu - High Contrast & Prestigious Typography */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isRealEstate = item.id === "realestate";
            const isActive = activeTab === item.id;
            const label = t(item.key, item.defaultLabel);
            
            if (isRealEstate) {
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`px-3.5 xl:px-5 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-amber-400 bg-amber-950/20 border-b border-amber-400"
                      : "text-amber-400 hover:text-amber-300 border-b border-transparent"
                  }`}
                  title="Servicio Premium de Real Estate"
                >
                  {label}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-3.5 xl:px-5 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-cyan-400 font-bold bg-cyan-950/20 border-b border-cyan-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border-b border-transparent"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Language Selector Button (Desktop & Tablet) */}
        <div className="hidden md:flex items-center shrink-0">
          <LanguageSelector variant="header" />
        </div>

        {/* Mobile Controls (Language & Hamburger) */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSelector variant="header" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-400 hover:text-white p-2 cursor-pointer transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Sidebar) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030406]/98 border-b border-white/10 absolute top-full left-0 w-full p-6 space-y-6 shadow-2xl z-50 backdrop-blur-2xl">
          
          {/* Mobile Drawer Header Brand */}
          <div className="flex items-center gap-4 pb-4 border-b border-white/5">
            <div className="relative flex items-center justify-center overflow-hidden">
              <TransparentLogo className="h-10 w-auto" />
            </div>
            <div className="flex flex-col items-start leading-none pl-1">
              <span className="text-white text-sm font-bold tracking-[0.3em] uppercase">
                ZETA ESTUDIO
              </span>
              <span className="text-[7.5px] text-cyan-400 font-mono tracking-[0.25em] mt-1.5">
                {t("ui.cgiSubtitle", "CGI & FILM DIRECTING")}
              </span>
            </div>
          </div>

          {/* Navigation Links inside Mobile Sidebar */}
          <div className="space-y-2 pt-1">
            {navItems.map((item) => {
              const isRealEstate = item.id === "realestate";
              const isActive = activeTab === item.id;
              const label = t(item.key, item.defaultLabel);
              
              if (isRealEstate) {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavClick(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-3 px-5 rounded-none text-xs font-mono uppercase tracking-[0.22em] font-bold block transition-all duration-300 ${
                      isActive
                        ? "bg-amber-950/25 text-amber-400 border-l-2 border-amber-400"
                        : "text-amber-400 hover:text-amber-300 hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-3 px-5 rounded-none text-xs font-mono uppercase tracking-[0.2em] block transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-950/20 text-cyan-400 border-l-2 border-cyan-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Language Selector Grid in Mobile Drawer */}
          <div className="pt-3 border-t border-white/5">
            <LanguageSelector variant="mobile" />
          </div>

          {/* Telemetry and System Status inside Mobile Drawer */}
          <div className="pt-4 border-t border-white/5 text-[8px] font-mono text-slate-500 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t("ui.serverStatus", "ESTADO DEL SERVIDOR // CONECTADO")}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
