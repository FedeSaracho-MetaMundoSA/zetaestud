/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: "Render 4K" | "Animación Drone" | "Modelo 3D Interactivo";
  description: string;
  imageUrl: string;
  videoUrl: string;
  year: string;
  location: string;
  architect: string;
  stats: {
    duration?: string;
    altitude?: string;
    resolution: string;
    fps: string;
  };
  client?: string;
  narrativeImages?: string[];
  poeticDescription?: string;
  gridSpan?: string;
  credits?: { role: string; name: string }[];
}

export interface HlsQuality {
  width: number;
  height: number;
  bitrate: number;
  levelIndex: number;
}

export interface StreamStats {
  bitrate: number;
  bufferLength: number;
  fps: number;
  latency: number;
  droppedFrames: number;
  resolution: string;
}

export interface FfMpegStatus {
  step: "idle" | "downloading" | "segmenting" | "completed" | "failed";
  progress: number; // 0 to 100;
  logs: string[];
  outputM3u8?: string;
}

