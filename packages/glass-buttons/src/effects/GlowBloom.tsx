import { EffectComposer, Bloom } from "@react-three/postprocessing";

interface GlowBloomProps {
  intensity?: number;
  luminanceThreshold?: number;
  luminanceSmoothing?: number;
}

export function GlowBloom({
  intensity = 0.5,
  luminanceThreshold = 0.6,
  luminanceSmoothing = 0.4,
}: GlowBloomProps) {
  return (
    <EffectComposer>
      <Bloom
        intensity={intensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={luminanceSmoothing}
        mipmapBlur
      />
    </EffectComposer>
  );
}
