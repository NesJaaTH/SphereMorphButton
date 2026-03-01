import { ShaderMaterial, DoubleSide, AdditiveBlending } from "three";
import type { ColorScheme } from "../types/button";
import { COLOR_SCHEMES } from "../constants/colors";

export interface IridescentMaterialUniforms {
  uTime: { value: number };
  uHover: { value: number };
  uActive: { value: number };
  uDisabled: { value: number };
  uFresnelPower: { value: number };
  uNoiseScale: { value: number };
  uNoiseSpeed: { value: number };
  uColorShift: { value: number };
  uColorBase: { value: [number, number, number] };
  uColorShiftVec: { value: [number, number, number] };
}

export function createBaseUniforms(colorScheme: ColorScheme = "rainbow"): IridescentMaterialUniforms {
  const scheme = COLOR_SCHEMES[colorScheme];
  return {
    uTime: { value: 0 },
    uHover: { value: 0 },
    uActive: { value: 0 },
    uDisabled: { value: 0 },
    uFresnelPower: { value: 2.5 },
    uNoiseScale: { value: 1.5 },
    uNoiseSpeed: { value: 0.8 },
    uColorShift: { value: 0 },
    uColorBase: { value: scheme.base as [number, number, number] },
    uColorShiftVec: { value: scheme.shift as [number, number, number] },
  };
}

export function createIridescentMaterial(
  vertexShader: string,
  fragmentShader: string,
  additionalUniforms: Record<string, { value: unknown }> = {},
  colorScheme: ColorScheme = "rainbow"
): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      ...createBaseUniforms(colorScheme),
      ...additionalUniforms,
    },
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}
