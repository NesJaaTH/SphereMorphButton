import { Html } from "@react-three/drei";
import type { ReactNode } from "react";

interface HtmlLabelProps {
  children: ReactNode;
  disabled?: boolean;
}

export function HtmlLabel({ children, disabled }: HtmlLabelProps) {
  return (
    <Html
      center
      distanceFactor={4}
      style={{
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        color: disabled ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.95)",
        fontSize: "16px",
        fontWeight: 600,
        fontFamily: "system-ui, -apple-system, sans-serif",
        textShadow: disabled
          ? "none"
          : "0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(150,200,255,0.2)",
        letterSpacing: "0.05em",
        transition: "color 0.3s, text-shadow 0.3s",
      }}
    >
      {children}
    </Html>
  );
}
