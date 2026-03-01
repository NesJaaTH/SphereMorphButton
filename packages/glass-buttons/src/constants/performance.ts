import type { PerformanceConfig, QualityTier } from "../types/button";

export const QUALITY_CONFIGS: Record<QualityTier, PerformanceConfig> = {
  high: {
    segments: 128,
    noiseOctaves: 3,
    enableBloom: true,
    enableParticles: true,
    maxFps: 60,
    idleFps: 15,
  },
  medium: {
    segments: 64,
    noiseOctaves: 2,
    enableBloom: false,
    enableParticles: true,
    maxFps: 60,
    idleFps: 15,
  },
  low: {
    segments: 32,
    noiseOctaves: 1,
    enableBloom: false,
    enableParticles: false,
    maxFps: 30,
    idleFps: 10,
  },
  fallback: {
    segments: 0,
    noiseOctaves: 0,
    enableBloom: false,
    enableParticles: false,
    maxFps: 0,
    idleFps: 0,
  },
};
