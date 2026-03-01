import { useState, useEffect } from "react";
import type { QualityTier } from "../types/button";

export function useWebGLSupport(): QualityTier {
  const [tier, setTier] = useState<QualityTier>("medium");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");

      if (!gl) {
        setTier("fallback");
        return;
      }

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : "";

      const rendererLower = renderer.toLowerCase();

      // High-end GPUs
      if (
        /nvidia.*rtx|nvidia.*gtx\s*1[0-9]{3}|radeon.*rx\s*(6|7)|apple.*m[2-9]/i.test(
          renderer
        )
      ) {
        setTier("high");
      }
      // Low-end / integrated
      else if (
        /intel.*hd|intel.*uhd|mali|adreno\s*[0-5]/i.test(renderer) ||
        rendererLower.includes("swiftshader")
      ) {
        setTier("low");
      }
      // Default: medium
      else {
        setTier("medium");
      }

      canvas.remove();
    } catch {
      setTier("fallback");
    }
  }, []);

  return tier;
}
