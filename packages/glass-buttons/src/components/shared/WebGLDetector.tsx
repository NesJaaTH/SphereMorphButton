import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import type { QualityTier } from "../../types/button";
import type { ReactNode } from "react";

interface WebGLDetectorProps {
  children: (tier: QualityTier) => ReactNode;
  forceTier?: QualityTier;
}

export function WebGLDetector({ children, forceTier }: WebGLDetectorProps) {
  const detectedTier = useWebGLSupport();
  const tier = forceTier ?? detectedTier;
  return <>{children(tier)}</>;
}
