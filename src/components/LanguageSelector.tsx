import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Check, Sparkles, X } from "lucide-react";
import { useLanguage, LANGUAGES, Language } from "../context/LanguageContext";

interface LanguageSelectorProps {
  variant?: "header" | "mobile" | "footer";
  className?: string;
}

export default function LanguageSelector({ variant = "header", className = "" }: LanguageSelectorProps) {
  const { language, setLanguage, t, currentOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2 uppercase tracking-widest text-[11px] font-bold text-cyan-400">
            <Globe size={14} className="text-cyan-400 animate-pulse" />
            {t("ui.chooseLanguage", "ELEGIR IDIOMA")}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {currentOption.flag} {currentOption.short}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-xs font-mono transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <div className="flex flex-col text-left">
                  <span className="font-bold tracking-wider leading-none text-[11px]">
                    {lang.nativeName}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">
                    {lang.short}
                  </span>
                </div>
                {isSelected && <Check size={12} className="ml-auto text-cyan-400" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Sliding Main Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer overflow-hidden ${
          isOpen
            ? "bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            : "bg-[#060913]/80 backdrop-blur-md border-white/15 text-slate-200 hover:border-cyan-400/60 hover:text-white hover:bg-cyan-950/30"
        }`}
        title={t("ui.chooseLanguage", "ELEGIR IDIOMA")}
        aria-expanded={isOpen}
      >
        {/* Subtle sliding light effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        <Globe size={14} className={`transition-transform duration-500 ${isOpen ? "rotate-180 text-cyan-400" : "text-cyan-400 group-hover:rotate-45"}`} />

        <span className="font-bold text-[10px] tracking-[0.2em] text-cyan-400/90 group-hover:text-cyan-300">
          {t("ui.chooseLanguage", "ELEGIR IDIOMA")}
        </span>

        <span className="flex items-center gap-1 pl-1 border-l border-white/15 text-[11px] font-mono text-slate-300">
          <span>{currentOption.flag}</span>
          <span className="font-bold">{currentOption.short}</span>
        </span>

        <ChevronDown
          size={13}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : ""}`}
        />
      </motion.button>

      {/* Slide-Down / Slide-In Dropdown Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2.5 w-64 rounded-xl bg-[#040711]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 overflow-hidden"
          >
            {/* Header section inside panel */}
            <div className="flex items-center justify-between px-4 py-3 bg-cyan-950/30 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-cyan-300">
                  {t("ui.selectLanguage", "SELECCIONAR IDIOMA")}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X size={12} />
              </button>
            </div>

            {/* Language items list */}
            <div className="p-2 space-y-1">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    whileHover={{ x: 3 }}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500/15 border border-cyan-400/40 text-white font-bold shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                        : "hover:bg-white/5 border border-transparent text-slate-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg leading-none">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-medium tracking-wide leading-tight">
                          {lang.nativeName}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                          {lang.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        isSelected
                          ? "bg-cyan-400/20 border-cyan-400/50 text-cyan-300 font-bold"
                          : "bg-white/5 border-white/10 text-slate-400"
                      }`}>
                        {lang.short}
                      </span>
                      {isSelected && <Check size={14} className="text-cyan-400" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer indicator */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 text-[9px] font-mono text-slate-500 text-center">
              ZETA ESTUDIO // MULTILINGUAL ENGINE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
