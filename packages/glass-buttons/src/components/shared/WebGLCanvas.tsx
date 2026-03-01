import { Suspense, lazy, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

interface WebGLCanvasProps {
  children: ReactNode;
  width: number;
  height: number;
  className?: string;
  frameloop?: "always" | "demand" | "never";
}

export function WebGLCanvas({
  children,
  width,
  height,
  className,
  frameloop = "always",
}: WebGLCanvasProps) {
  return (
    <div
      style={{ width, height, position: "relative" }}
      className={className}
    >
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "9999px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              Loading...
            </span>
          </div>
        }
      >
        <Canvas
          frameloop={frameloop}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3], fov: 45 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
