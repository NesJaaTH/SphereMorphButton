import type { ReactNode } from "react";

export type ButtonVariant = "capsule" | "sphere";

export type ColorScheme = "rainbow" | "pink" | "cyan" | "custom";

export type QualityTier = "high" | "medium" | "low" | "fallback";

export type AnimationState = "idle" | "hover" | "active" | "disabled" | "effect";

export interface GlassButtonProps {
  variant: ButtonVariant;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  colorScheme?: ColorScheme;
  qualityTier?: QualityTier;
  effectOnClick?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface CapsuleBubbleButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  wobbleIntensity?: number;
  dissolveOnClick?: boolean;
  colorScheme?: ColorScheme;
  qualityTier?: QualityTier;
  className?: string;
  ariaLabel?: string;
}

export interface SphereMorphButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  blobIntensity?: number;
  shatterOnClick?: boolean;
  particleCount?: number;
  colorScheme?: ColorScheme;
  qualityTier?: QualityTier;
  className?: string;
  ariaLabel?: string;
}

export interface GlassButtonFallbackProps {
  variant: ButtonVariant;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  colorScheme?: ColorScheme;
  className?: string;
  ariaLabel?: string;
}

export interface ShaderUniforms {
  uTime: number;
  uHover: number;
  uActive: number;
  uDisabled: number;
  uFresnelPower: number;
  uNoiseScale: number;
  uNoiseSpeed: number;
  uDissolve: number;
  uColorShift: number;
}

export interface PerformanceConfig {
  segments: number;
  noiseOctaves: number;
  enableBloom: boolean;
  enableParticles: boolean;
  maxFps: number;
  idleFps: number;
}
