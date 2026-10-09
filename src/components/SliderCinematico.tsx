/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const SliderCinematico: React.FC = () => {
  return (
    <div className="bg-[#000000] py-12 sm:py-16 md:py-20 px-4 sm:px-8 select-none overflow-hidden relative border-y border-white/5">
      {/* Background subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center justify-center">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[8px] sm:text-[9px] font-mono text-cyan-400 tracking-[0.3em] uppercase block mb-3 font-semibold">
            NUESTRA RED DE ALIANZAS
          </span>
          <h2 className="text-lg sm:text-2xl font-light tracking-[0.2em] text-white uppercase leading-snug">
            CLIENTES QUE CONFIAN EN NOSOTROS
          </h2>
        </div>

        {/* Container for the image with transition and glowing background */}
        <div className="w-full relative group">
          {/* Subtle ambient light behind the image on hover */}
          <div className="absolute -inset-2 bg-gradient-to-r from-white/0 via-white/[0.03] to-white/0 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <img 
            src="/multimedia/nuestrosclienteszeta.jpg" 
            alt="Clientes - Zeta Estudio" 
            className="w-full h-auto object-contain relative z-10 transition-all duration-700 ease-out group-hover:scale-[1.01] brightness-95 group-hover:brightness-100 select-none pointer-events-none"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

