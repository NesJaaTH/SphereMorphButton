import { createIridescentMaterial } from "./IridescentMaterial";
import type { ColorScheme } from "../types/button";
import capsuleVert from "../shaders/capsule/capsuleMorph.vert.glsl";
import capsuleFrag from "../shaders/capsule/capsuleGlow.frag.glsl";

export function createCapsuleMaterial(colorScheme: ColorScheme = "rainbow") {
  return createIridescentMaterial(
    capsuleVert,
    capsuleFrag,
    {
      uWobbleIntensity: { value: 0.12 },
      uDissolve: { value: 0 },
    },
    colorScheme
  );
}
