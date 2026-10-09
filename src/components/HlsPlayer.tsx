/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Activity,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { StreamStats, HlsQuality } from "../types";

interface HlsPlayerProps {
  src: string; // m3u8 playlist or mp4 URL
  fallbackSrc?: string; // mp4 backup URL
  autoPlay?: boolean;
  muted?: boolean;
  onVideoEnded?: () => void;
  title?: string;
}

export default function HlsPlayer({
  src,
  fallbackSrc,
  autoPlay = false,
  muted = false,
  onVideoEnded,
  title,
}: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [volume, setVolume] = useState(muted ? 0 : 0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // HLS specific states
  const [isHls, setIsHls] = useState(false);
  const [qualities, setQualities] = useState<HlsQuality[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 is Auto
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<StreamStats>({
    bitrate: 0,
    bufferLength: 0,
    fps: 0,
    latency: 0,
    droppedFrames: 0,
    resolution: "Detectando...",
  });

  const hlsRef = useRef<Hls | null>(null);

  // Initialize Video & HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset properties
    video.currentTime = 0;
    setCurrentTime(0);

    // Check if the source is HLS (.m3u8)
    const isHlsSource = src.includes(".m3u8");

    if (isHlsSource && Hls.isSupported()) {
      setIsHls(true);
      
      // Setup hls.js
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const loadedQualities = data.levels.map((level, idx) => ({
          width: level.width,
          height: level.height,
          bitrate: level.bitrate,
          levelIndex: idx,
        }));
        setQualities(loadedQualities);
        if (autoPlay) {
          video.play().catch(() => setIsPlaying(false));
        }
      });

      // Handle Errors gracefully
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("Fatal network error in HLS, trying to recover...", data);
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("Fatal media error in HLS, recovering...", data);
              hls.recoverMediaError();
              break;
            default:
              console.error("Unrecoverable HLS error, loading fallback MP4...", data);
              destroyHlsAndFallback();
              break;
          }
        }
      });

      // Track live stats
      const statsInterval = setInterval(() => {
        if (!hlsRef.current || !video) return;

        const currentLevelIndex = hlsRef.current.currentLevel;
        const currentLevel = hlsRef.current.levels[currentLevelIndex];
        
        let bufferLength = 0;
        const buffered = video.buffered;
        const time = video.currentTime;
        for (let i = 0; i < buffered.length; i++) {
          if (time >= buffered.start(i) && time <= buffered.end(i)) {
            bufferLength = buffered.end(i) - time;
            break;
          }
        }

        let resolution = "1920x1080 (HD)";
        let bitrate = 4500000;

        if (currentLevel) {
          resolution = `${currentLevel.width}x${currentLevel.height}`;
          bitrate = currentLevel.bitrate;
        } else if (video.videoWidth) {
          resolution = `${video.videoWidth}x${video.videoHeight}`;
        }

        // Quality indicators
        let videoPlaybackQuality = (video as any).getVideoPlaybackQuality 
          ? (video as any).getVideoPlaybackQuality() 
          : { totalVideoFrames: 60, droppedVideoFrames: 0 };

        setStats({
          bitrate: Math.round(bitrate / 1000), // Kbps
          bufferLength: Number(bufferLength.toFixed(1)),
          fps: videoRef.current.playbackRate * 60,
          latency: hlsRef.current.latency || 0.08,
          droppedFrames: videoPlaybackQuality.droppedVideoFrames || 0,
          resolution,
        });
      }, 500);

      return () => {
        clearInterval(statsInterval);
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
      };
    } else {
      // Fallback to native video (Safari HLS or regular MP4)
      setIsHls(false);
      video.src = src || fallbackSrc || "";
      if (autoPlay) {
        video.play().catch(() => setIsPlaying(false));
      }

      // Basic stats tracker for standard files
      const basicStatsInterval = setInterval(() => {
        if (!video) return;
        let bufferLength = 0;
        const buffered = video.buffered;
        const time = video.currentTime;
        if (buffered.length > 0) {
          for (let i = 0; i < buffered.length; i++) {
            if (time >= buffered.start(i) && time <= buffered.end(i)) {
              bufferLength = buffered.end(i) - time;
              break;
            }
          }
        }
        setStats({
          bitrate: src.includes("mixkit") ? 2800 : 1500, // Est. standard bitrate
          bufferLength: Number(bufferLength.toFixed(1)),
          fps: 24 * video.playbackRate,
          latency: 0.02,
          droppedFrames: 0,
          resolution: `${video.videoWidth || 1920}x${video.videoHeight || 1080}`,
        });
      }, 1000);

      return () => clearInterval(basicStatsInterval);
    }

    function destroyHlsAndFallback() {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      setIsHls(false);
      if (video && fallbackSrc) {
        video.src = fallbackSrc;
        video.load();
        video.play().catch(() => setIsPlaying(false));
      }
    }
  }, [src, fallbackSrc]);

  // Sync mute state and volume
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.volume = volume;
  }, [isMuted, volume]);

  // Handle Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Handle Seek Slider
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle Volume Slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted && volume === 0) {
      setVolume(0.5);
    }
  };

  // Fullscreen controls
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Fullscreen error", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Format Time Helper
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Quality Level Selection
  const handleQualityChange = (levelIndex: number) => {
    setCurrentQuality(levelIndex);
    setShowQualityMenu(false);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative group bg-black rounded-lg overflow-hidden border border-slate-800 shadow-md flex flex-col w-full aspect-video select-none"
      id="hls-video-player"
    >
      {/* 1. Header overlay (Cinema ratio indicator & Title) */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
            {title || "Zeta Cinematic Stream"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className={`p-1.5 rounded border ${
              showStats
                ? "bg-cyan-950/40 border-cyan-400 text-cyan-400"
                : "border-slate-800 text-slate-400 hover:text-white"
            } transition-colors cursor-pointer`}
            title="Diagnósticos de Streaming"
          >
            <Activity size={14} />
          </button>
        </div>
      </div>

      {/* 2. Video Element */}
      <video
        ref={videoRef}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer bg-neutral-950"
        playsInline
        onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
        onDurationChange={() => videoRef.current && setDuration(videoRef.current.duration)}
        onEnded={() => {
          setIsPlaying(false);
          if (onVideoEnded) onVideoEnded();
        }}
      />

      {/* 3. Real-time Diagnostic HUD Overlay */}
      {showStats && (
        <div className="absolute top-16 left-4 bg-slate-950/90 border border-slate-800/80 rounded p-3 font-mono text-[10px] text-slate-300 z-10 w-60 pointer-events-none backdrop-blur shadow-lg space-y-1.5 leading-relaxed">
          <div className="text-cyan-400 border-b border-slate-800 pb-1 mb-1 font-bold flex justify-between items-center">
            <span>HLS DIAGNOSTICS HUD</span>
            <span className="bg-cyan-950 px-1 py-0.2 rounded text-[8px] text-cyan-300">
              {isHls ? "ENGINE HLS.JS" : "NATIVO"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">RESOLUCIÓN:</span>
            <span className="text-white font-semibold">{stats.resolution}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">TASA DE BITS:</span>
            <span className="text-emerald-400 font-semibold">{stats.bitrate} kbps</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">BUFFER AUDIO/VIDEO:</span>
            <span className="text-amber-400 font-semibold">
              {stats.bufferLength} s
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">REDUNDANCIA / LATENCIA:</span>
            <span className="text-white">{stats.latency.toFixed(3)} s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">CUADROS PERDIDOS (LAG):</span>
            <span className={stats.droppedFrames > 0 ? "text-red-400" : "text-white"}>
              {stats.droppedFrames}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">PLAYBACK FPS:</span>
            <span className="text-white">{stats.fps.toFixed(1)} FPS</span>
          </div>
        </div>
      )}

      {/* 4. Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {/* Timeline Slider */}
        <div className="flex items-center gap-3 group/slider mb-3">
          <span className="text-[10px] font-mono text-slate-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1 flex items-center h-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeekChange}
              className="absolute w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-0"
              style={{
                background: `linear-gradient(to right, #00f3ff 0%, #00f3ff ${
                  (currentTime / (duration || 1)) * 100
                }%, #1e293b ${(currentTime / (duration || 1)) * 100}%, #1e293b 100%)`,
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400 w-10 text-left">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            {/* Volume controls */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-16 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400 transition-all duration-300 focus:outline-none"
              />
            </div>

            {/* Playback speed selector */}
            <div className="flex items-center gap-1">
              {[1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => {
                    setPlaybackSpeed(speed);
                    if (videoRef.current) videoRef.current.playbackRate = speed;
                  }}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono border transition-colors cursor-pointer ${
                    playbackSpeed === speed
                      ? "bg-cyan-950/40 border-cyan-400 text-cyan-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* HLS Stream Quality Select Menu */}
            {isHls && qualities.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-2 py-1 rounded transition-all cursor-pointer"
                >
                  <Settings size={11} className="animate-spin-slow" />
                  <span>
                    {currentQuality === -1
                      ? "Calidad: Auto"
                      : `${qualities[currentQuality]?.height}p`}
                  </span>
                  <ChevronDown size={10} />
                </button>

                {showQualityMenu && (
                  <div className="absolute bottom-full right-0 mb-1 bg-slate-950 border border-slate-800 rounded w-32 py-1 flex flex-col z-20 shadow-md">
                    <button
                      onClick={() => handleQualityChange(-1)}
                      className={`text-left px-3 py-1 text-[10px] font-mono transition-colors ${
                        currentQuality === -1
                          ? "bg-cyan-950/50 text-cyan-400"
                          : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      Adaptive (Auto)
                    </button>
                    {qualities.map((q) => (
                      <button
                        key={q.levelIndex}
                        onClick={() => handleQualityChange(q.levelIndex)}
                        className={`text-left px-3 py-1 text-[10px] font-mono transition-colors ${
                          currentQuality === q.levelIndex
                            ? "bg-cyan-950/50 text-cyan-400"
                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        {q.height}p ({Math.round(q.bitrate / 1000)}k)
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reset playback */}
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime = 0;
              }}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reiniciar reproducción"
            >
              <RotateCcw size={15} />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
