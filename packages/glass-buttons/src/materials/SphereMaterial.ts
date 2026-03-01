import { createIridescentMaterial } from "./IridescentMaterial";
import type { ColorScheme } from "../types/button";
import sphereVert from "../shaders/sphere/sphereMorph.vert.glsl";
import sphereFrag from "../shaders/sphere/sphereShatter.frag.glsl";

export function createSphereMaterial(colorScheme: ColorScheme = "pink") {
  return createIridescentMaterial(
    sphereVert,
    sphereFrag,
    {
      uBlobIntensity: { value: 0.2 },
      uMorphProgress: { value: 0 },
      uShatter: { value: 0 },
    },
    colorScheme
  );
}
