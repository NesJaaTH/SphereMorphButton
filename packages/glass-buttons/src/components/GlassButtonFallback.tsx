import { forwardRef, useCallback, useState } from "react";
import type { GlassButtonFallbackProps } from "../types/button";

export const GlassButtonFallback = forwardRef<HTMLDivElement, GlassButtonFallbackProps>(
  function GlassButtonFallback(
    {
      variant,
      children = "Button",
      onClick,
      disabled = false,
      width,
      height,
      colorScheme = "rainbow",
      className,
      ariaLabel,
    },
    ref
  ) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const isCapsule = variant === "capsule";
    const w = width ?? (isCapsule ? 220 : 140);
    const h = height ?? (isCapsule ? 70 : 140);

    const gradients: Record<string, string> = {
      rainbow:
        "linear-gradient(135deg, rgba(255,100,100,0.3), rgba(100,255,200,0.3), rgba(100,100,255,0.3), rgba(255,100,255,0.3))",
      pink: "linear-gradient(135deg, rgba(255,100,150,0.4), rgba(200,50,200,0.3), rgba(255,150,200,0.3))",
      cyan: "linear-gradient(135deg, rgba(50,200,255,0.4), rgba(100,255,220,0.3), rgba(50,150,255,0.3))",
      custom:
        "linear-gradient(135deg, rgba(255,100,100,0.3), rgba(100,255,200,0.3), rgba(100,100,255,0.3))",
    };

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          onClick?.();
        }
      },
      [onClick, disabled]
    );

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel ?? (typeof children === "string" ? children : undefined)}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        className={className}
        style={{
          width: w,
          height: h,
          borderRadius: isCapsule ? h / 2 : "50%",
          background: gradients[colorScheme],
          backgroundSize: "400% 400%",
          animation: disabled ? "none" : "glassShimmer 6s ease infinite",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transform: isActive
            ? "scale(0.95)"
            : isHovered
            ? "scale(1.05)"
            : "scale(1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease",
          boxShadow: isHovered
            ? "0 0 30px rgba(150,100,255,0.4), inset 0 0 20px rgba(255,255,255,0.1)"
            : "0 0 15px rgba(150,100,255,0.2), inset 0 0 10px rgba(255,255,255,0.05)",
          color: disabled ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.95)",
          fontSize: "16px",
          fontWeight: 600,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "0.05em",
          textShadow: disabled
            ? "none"
            : "0 0 10px rgba(255,255,255,0.3)",
          outline: "none",
          position: "relative",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {children}
        <style>{`
          @keyframes glassShimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }
);
