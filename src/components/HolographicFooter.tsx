/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLanguage } from "../context/LanguageContext";
import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Youtube, 
  Music2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp,
  Globe
} from "lucide-react";
import TransparentLogo from "./TransparentLogo";
import rubenPhoto from "../assets/images/zeta_estudio_ruben.jpg";

export default function HolographicFooter() {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const socialLinks = [
    { icon: <Instagram size={16} />, url: "https://www.instagram.com/zeta_estudio/", label: "Instagram" },
    { icon: <Linkedin size={16} />, url: "https://www.linkedin.com/in/zeta-estudio", label: "LinkedIn" },
    { icon: <Facebook size={16} />, url: "https://www.facebook.com/zeta.estudio.1", label: "Facebook" },
    { icon: <Music2 size={16} />, url: "https://www.tiktok.com/@zeta_estudio", label: "TikTok" },
    { icon: <Youtube size={16} />, url: "https://www.youtube.com/@zeta_estudio", label: "YouTube" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("zetaestudio@zetaestudio.xyz");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSectionScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback for SPA routing if needed
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative mt-20 overflow-hidden bg-[#020306] border-t border-white/10 pt-20 pb-12 px-6 md:px-12 select-none">
      
      {/* Background Image of Ruben (Zeta Estudio Director) with elegant atmospheric overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.img 
          src={rubenPhoto} 
          alt="Zeta Estudio Rubén" 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.18 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full object-cover mix-blend-luminosity"
        />
        {/* Cinematic gradient and vignette masks to maintain absolute readability for the UI */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020306] via-[#020306]/95 to-[#020306]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020306] via-transparent to-[#020306]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020306_95%)]" />
      </div>

      {/* Subtle Ambient Background Gradient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[150px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[150px] bg-amber-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/5">
          
          {/* Column 1: Branding & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-4">
              <TransparentLogo className="h-12 w-auto brightness-200" enforceWhite={true} />
              <div className="h-8 w-px bg-white/15" />
              <div className="flex flex-col">
                <span className="text-[11px] font-mono tracking-[0.3em] text-white/95 uppercase font-bold leading-none">
                  ZETA ESTUDIO
                </span>
                <span className="text-[8px] font-mono tracking-[0.2em] text-cyan-400 mt-1 uppercase">
                  CGI & FILM DIRECTING
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md">
              {t("footer.desc", "Estudio de visualización arquitectónica de alta gama, CGI y dirección de arte cinematográfica. Desarrollamos renders fotorrealistas de nivel editorial, animaciones cinematográficas y showrooms interactivos 3D que conectan el diseño con la emoción.")}
            </p>

            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 tracking-wider">
              <Globe size={11} className="text-cyan-400/60 animate-pulse" />
              <span>{t("footer.location", "PUERTO MADERO, BUENOS AIRES, ARGENTINA")}</span>
            </div>
          </div>

          {/* Column 2: Interactive Section Links (3 cols) */}
          <div className="lg:col-span-3 space-y-5 text-left">
            <h4 className="text-[10px] font-mono tracking-[0.3em] text-white/80 uppercase font-bold border-b border-white/10 pb-2">{t("footer.sections", "SECCIONES")}</h4>
            <ul className="space-y-3">
              {[
                { label: t("footer.sec1", "Inicio / Portfolio"), target: "portfolio-section" },
                { label: t("footer.sec2", "Servicios Especializados"), target: "servicios-section" },
                { label: t("footer.sec3", "Quiénes Somos"), target: "nosotros-section" },
                { label: t("footer.sec4", "Servicio Real Estate"), target: "realestate-section" },
                { label: t("footer.sec5", "Contacto Comercial"), target: "contacto-section" },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleSectionScroll(item.target)}
                    className="text-xs text-slate-400 hover:text-cyan-400 transition-colors font-light tracking-wide flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <h4 className="text-[10px] font-mono tracking-[0.3em] text-white/80 uppercase font-bold border-b border-white/10 pb-2">{t("footer.sec5", "CONTACTO COMERCIAL")}</h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 font-light leading-relaxed">
                  <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">{t("contact.hq", "OFICINA CENTRAL")}</span>
                  Pierina Dealessi 1030, Puerto Madero<br />
                  Buenos Aires, Argentina
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 font-light">
                  <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">{t("contact.link", "ENLACE DIGITAL")}</span>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <a 
                      href="mailto:zetaestudio@zetaestudio.xyz"
                      className="text-slate-200 hover:text-cyan-400 font-light transition-colors relative group"
                    >
                      zetaestudio@zetaestudio.xyz
                      <span className="absolute left-0 bottom-0 w-0 h-px bg-cyan-400/50 group-hover:w-full transition-all duration-300" />
                    </a>
                    <button 
                      onClick={handleCopyEmail}
                      className="px-2 py-0.5 bg-white/[0.02] hover:bg-cyan-950/20 border border-white/10 hover:border-cyan-400/40 text-[8px] font-mono text-slate-400 hover:text-cyan-400 tracking-wider uppercase transition-all duration-300 rounded cursor-pointer"
                    >
                      {copiedEmail ? t("ui.copied", "¡COPIADO!") : t("ui.copy", "COPIAR")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 font-light space-y-1">
                  <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">{t("contact.phones", "TELÉFONOS DE CONTACTO")}</span>
                  <div className="flex flex-col space-y-1 font-mono text-xs">
                    <a href="tel:+5491158547294" className="text-slate-200 hover:text-cyan-400 transition-colors">+54 9 11 5854-7294</a>
                    <a href="tel:+5491134992612" className="text-slate-200 hover:text-cyan-400 transition-colors">+54 9 11 3499-2612</a>
                    <a href="tel:+5491134992500" className="text-slate-200 hover:text-cyan-400 transition-colors">+54 9 11 3499-2500</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Copyright text */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{t("ui.allRights", "© 2026 ZETA ESTUDIO — TODOS LOS DERECHOS RESERVADOS")}</span>
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider block">{t("ui.madeIn", "DIRECCIÓN DE ARTE CREADA EN ARGENTINA")}</span>
          </div>

          {/* Social Icons inside clean minimalist boxes */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="p-2.5 bg-white/[0.02] border border-white/5 rounded-none text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                {link.icon}
              </a>
            ))}

            {/* Back to top button */}
            <button
              onClick={handleScrollToTop}
              title="Volver Arriba"
              className="p-2.5 bg-cyan-950/10 border border-cyan-500/20 hover:border-cyan-400 text-cyan-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer ml-2"
            >
              <ArrowUp size={16} />
            </button>
          </div>

        </div>

      </div>

    </footer>
  );
}
