/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader, Volume2, VolumeX } from "lucide-react";

interface IntroScreenProps {
  onSkip: () => void;
}

export default function IntroScreen({ onSkip }: IntroScreenProps) {
  const [showSkip, setShowSkip] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const targetMuted = !videoRef.current.muted;
      videoRef.current.muted = targetMuted;
      setIsMuted(targetMuted);
    }
  };

  useEffect(() => {
    // Timer to trigger the skip button visibility after 500ms so it is practically instant
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 500);

    // Fallback timer to automatically hide the loading state after 3 seconds in case the video loads slowly
    const fallbackTimer = setTimeout(() => {
      setVideoLoaded(true);
    }, 3000);

    // Countdown interval for visual countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(fallbackTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="relative w-screen h-screen bg-black overflow-hidden flex flex-col justify-between select-none z-50"
      id="cinematic-intro-screen"
    >
      {/* 1. Fullscreen Video Player (Embeds 4K Architectural Reel from Zeta Estudio) */}
      <div className="absolute inset-0 w-full h-full z-10 bg-black overflow-hidden flex items-center justify-center">
        <iframe
          src="https://www.youtube-nocookie.com/embed/1-YYLYnlrsI?autoplay=1&mute=1&loop=1&playlist=1-YYLYnlrsI&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1"
          className="absolute w-[125vw] h-[125vh] min-w-[125vw] min-h-[125vh] border-none pointer-events-none transition-opacity duration-1000"
          style={{
            transform: "translate(-50%, -50%) scale(1.15)",
            top: "50%",
            left: "50%",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          onLoad={() => setVideoLoaded(true)}
        />

        {/* Clear transparent block to completely shield the iframe from mouse hovers, ensuring native controls never overlay */}
        <div className="absolute inset-0 bg-transparent z-20" />

        {/* Cinematic Loading Spinner when stream is buffering */}
        {!videoLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black z-15">
            <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
            <span className="font-mono text-[9px] text-slate-500 tracking-[0.3em] uppercase">
              Cargando Introducción...
            </span>
          </div>
        )}
      </div>

      {/* 2. Soft Vignette & Dark Overlay for atmospheric depth and cinematic look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-20" />

      {/* 3. Extremely Minimal Countdown / Status HUD */}
      <div className="absolute bottom-6 left-6 z-30 font-mono text-[9px] text-slate-400 tracking-[0.25em] flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>BIENVENIDOS A ZETAESTUDIO</span>
        {!showSkip && (
          <span className="text-cyan-400/80 font-bold ml-1">[{countdown}s]</span>
        )}
      </div>

      {/* 4. Sleek Sound Control Button (High z-index to stay clickable over the shield layer) */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={toggleMute}
          className="px-5 py-2.5 bg-black/80 hover:bg-[#00d2ff] hover:text-black hover:scale-105 border border-white/20 hover:border-[#00d2ff] text-white font-mono text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          {isMuted ? (
            <>
              <VolumeX size={13} className="text-red-400 group-hover:text-black" />
              <span>Activar Sonido</span>
            </>
          ) : (
            <>
              <Volume2 size={13} className="text-[#00d2ff] animate-pulse group-hover:text-black" />
              <span>Silenciar</span>
            </>
          )}
        </button>
      </div>

      {/* 5. SKIP INTRO / ENTER BUTTON (Fades in after 10s) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40">
        <AnimatePresence>
          {showSkip && (
            <motion.button
              onClick={onSkip}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="px-8 py-3.5 bg-black/95 hover:bg-cyan-500 border border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:text-black font-mono text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 rounded-none cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center gap-2.5 group whitespace-nowrap"
            >
              <span>INGRESAR A LA WEB</span>
              <ArrowRight size={12} className="text-cyan-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
