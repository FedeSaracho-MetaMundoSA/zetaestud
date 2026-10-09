/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLanguage } from "../context/LanguageContext";
import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Globe, Compass, Navigation, Layers, Cpu } from "lucide-react";
import officePhoto from "../assets/images/zeta_office_hq_1783421460066.jpg";
import localPhoto from "../assets/images/zeta_estudio_local_new.jpg";
import localPhoto2 from "../assets/images/zeta_estudio_2.jpg";

export default function Contact() {
  const { t } = useLanguage();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const contactRows = [
    {
      id: "address",
      icon: <MapPin className="w-5 h-5 text-cyan-400" />,
      label: t("contact.address", "DIRECCIÓN"),
      value: "Pierina Dealessi 1030, Puerto Madero, Buenos Aires, Argentina C1107",
      copyable: true,
    },
    {
      id: "phone",
      icon: <Phone className="w-5 h-5 text-cyan-400" />,
      label: t("contact.phones", "TELÉFONOS DE CONTACTO"),
      value: "+54 9 11 5854-7294",
      phones: [
        { display: "+54 9 11 5854-7294", raw: "+5491158547294" },
        { display: "+54 9 11 3499-2612", raw: "+5491134992612" },
        { display: "+54 9 11 3499-2500", raw: "+5491134992500" }
      ],
      copyable: true,
    },
    {
      id: "email",
      icon: <Mail className="w-5 h-5 text-cyan-400" />,
      label: t("contact.email", "EMAIL DE CONTACTO"),
      value: "zetaestudio@zetaestudio.xyz",
      copyable: true,
      link: "mailto:zetaestudio@zetaestudio.xyz"
    },
    {
      id: "web",
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      label: t("contact.web", "SITIO WEB"),
      value: "www.zetaestudio.xyz",
      copyable: true,
      link: "https://www.zetaestudio.xyz"
    }
  ];

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-[#010204] p-8 md:p-12 lg:p-16 shadow-md flex flex-col justify-between select-none"
      id="contact-section"
    >
      {/* Decorative fine scanner lines */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #111 0px, #111 1px, transparent 1px, transparent 8px)",
            backgroundSize: "100% 8px"
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #111 0px, #111 1px, transparent 1px, transparent 8px)",
            backgroundSize: "8px 100%"
          }}
        />
      </div>

      {/* Subtle border top glow (Cyan gradient) */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative z-10 space-y-12">
        {/* Section Title & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[9px] text-cyan-400/80 uppercase tracking-[0.45em]">{t("contact.subtitle", "ZETAESTUDIO // CONSULTORIA COMERCIAL GLOBAL")}</span>
          </div>
          <h2 
            className="text-4xl sm:text-5xl font-black tracking-tight text-cyan-400 uppercase leading-none select-none"
            style={{ textShadow: "0 0 35px rgba(6, 182, 212, 0.25)" }}
          >{t("contact.title", "CONTACTO")}</h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl tracking-wide uppercase leading-relaxed">
            {t("contact.desc", "Coordinemos su próximo renderizado arquitectónico UHD o cinemática aérea. Canales oficiales activos.")}
          </p>
        </div>

        {/* Structured Grid: Left Contacts, Middle Map, Right Local Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-4">
          
          {/* LEFT 5-COLUMNS: Contact Details Cards Row-by-Row */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {contactRows.map((row, idx) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group bg-gradient-to-r from-[#090a0f] to-[#040508] border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden shadow-lg transition-all duration-300 hover:border-cyan-400/35 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]"
              >
                {/* Metallic light reflection edge */}
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-cyan-400/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center gap-4">
                  {/* Sleek Minimalist Polished Metal Icon */}
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-[#0e1017] border border-white/10 group-hover:border-cyan-400/35 group-hover:bg-cyan-950/20 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),_0_2px_4px_rgba(0,0,0,0.5)]">
                    {/* Metallic specular ring overlay */}
                    <div className="absolute inset-0 rounded-lg border border-white/5 pointer-events-none group-hover:border-cyan-400/20 transition-all" />
                    {row.icon}
                  </div>
 
                  {/* Text labels and value */}
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-cyan-400/75 tracking-widest font-bold uppercase">
                      {row.label}
                    </span>
                    {row.phones ? (
                      <div className="flex flex-col space-y-1 pt-0.5">
                        {row.phones.map((phone, pIdx) => (
                          <a
                            key={pIdx}
                            href={`tel:${phone.raw}`}
                            className="text-xs sm:text-sm font-mono font-medium text-slate-200 hover:text-cyan-400 transition-colors tracking-wider flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-cyan-400/80 shrink-0" />
                            {phone.display}
                          </a>
                        ))}
                      </div>
                    ) : row.link ? (
                      <a 
                        href={row.link}
                        target={row.link.startsWith("mailto:") ? undefined : "_blank"}
                        rel={row.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="block text-sm sm:text-base font-light text-slate-200 hover:text-cyan-400 transition-colors tracking-wide break-all"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="block text-sm sm:text-base font-light text-slate-200 tracking-wide break-words">
                        {row.value}
                      </span>
                    )}
                  </div>
                </div>

                {/* Copiable badge indicator */}
                {row.copyable && (
                  <button
                    onClick={() => handleCopy(row.phones ? row.phones.map(p => p.display).join(" / ") : row.value, row.label)}
                    className="self-end sm:self-center px-3 py-1 bg-white/[0.02] hover:bg-cyan-950/20 border border-white/10 hover:border-cyan-400/40 text-[9px] font-mono text-slate-400 hover:text-cyan-400 tracking-wider uppercase transition-all duration-300 rounded cursor-pointer"
                  >
                    {copiedText === row.label ? t("ui.copied", "COPIADO") : t("ui.copy", "COPIAR")}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* CENTER 4-COLUMNS: Interactive Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 relative bg-[#040508]/90 border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col justify-between group/map min-h-[460px]"
          >
            {/* Map Header */}
            <div className="flex border-b border-white/5 pb-2.5 justify-between items-center font-mono">
              <span className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase">{t("contact.map", "MAPA DE UBICACIÓN")}</span>
              <div className="flex items-center gap-1.5 text-[8px] text-slate-500">
                <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>34°36'40"S 58°21'41"W</span>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="flex-1 w-full relative min-h-[300px] my-3.5 rounded-xl overflow-hidden border border-white/5 bg-[#030407]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.843647610017!2d-58.3638426!3d-34.6106654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a33526fba8b4a7%3A0xc319bc5a5e3c79a9!2sPierina%20Dealessi%201030%2C%20C1107%20CABA!5e0!3m2!1sen!2sar!4v1700000000000!5m2!1sen!2sar"
                className="w-full h-full border-0 brightness-[0.75] contrast-[1.1] grayscale-[0.35]"
                style={{ 
                  filter: "invert(90%) hue-rotate(180deg) contrast(1.2) brightness(0.85)",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Bottom Telemetry */}
            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[7.5px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-cyan-400">
                <Navigation size={9} className="animate-pulse" />
                GOOGLE MAPS LIVE LAYER
              </span>
              <span>GEO-TARGET: 34.6111° S, 58.3614° W</span>
            </div>
          </motion.div>

          {/* RIGHT 3-COLUMNS: Both Showroom Photos side-by-side / stacked */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-3 relative bg-[#040508]/90 border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col justify-between group/photos min-h-[460px]"
          >
            {/* Showroom Header */}
            <div className="flex border-b border-white/5 pb-2.5 justify-between items-center font-mono">
              <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">{t("contact.showroom", "ZETA ESTUDIO SHOWROOM")}</span>
              <span className="text-[8px] text-slate-500">{t("contact.showroom.hq", "SHOWROOMS HQ")}</span>
            </div>

            {/* Stack of Both Showroom Photos */}
            <div className="flex-1 flex flex-col gap-3.5 my-3.5">
              {/* Photo 1: Zeta Estudio Local 1 */}
              <div className="flex-1 relative rounded-lg overflow-hidden border border-white/5 group/img1 min-h-[140px] bg-slate-950">
                <img
                  src={localPhoto}
                  alt="Interior de Zeta Estudio Puerto Madero - Local 1"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img1:scale-105"
                />
              </div>

              {/* Photo 2: Zeta Estudio Local 2 */}
              <div className="flex-1 relative rounded-lg overflow-hidden border border-white/5 group/img2 min-h-[140px] bg-slate-950">
                <img
                  src={localPhoto2}
                  alt="Interior de Zeta Estudio Puerto Madero - Local 2"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img2:scale-105"
                />
              </div>
            </div>

            {/* Showroom Footer */}
            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[7.5px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-emerald-400">
                <Layers size={9} />
                REAL SHOWROOM CAPTURES
              </span>
              <span>HQ Puerto Madero</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
