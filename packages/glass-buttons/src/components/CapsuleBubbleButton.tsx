import { useRef, useMemo, useCallback, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, ShaderMaterial } from "three";
import { useAnimationState } from "../hooks/useAnimationState";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { createCapsuleMaterial } from "../materials/CapsuleMaterial";
import { HtmlLabel } from "./shared/HtmlLabel";
import { WebGLCanvas } from "./shared/WebGLCanvas";
import { QUALITY_CONFIGS } from "../constants/performance";
import type { CapsuleBubbleButtonProps, QualityTier } from "../types/button";

interface CapsuleMeshProps {
  wobbleIntensity: number;
  dissolveOnClick: boolean;
  colorScheme: CapsuleBubbleButtonProps["colorScheme"];
  qualityTier: QualityTier;
  disabled: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

function CapsuleMesh({
  wobbleIntensity,
  dissolveOnClick,
  colorScheme,
  qualityTier,
  disabled,
  onClick,
  children,
}: CapsuleMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();
  const config = QUALITY_CONFIGS[qualityTier];

  const material = useMemo(
    () => createCapsuleMaterial(colorScheme ?? "rainbow"),
    [colorScheme]
  );

  const { values, handlers } = useAnimationState({
    disabled,
    effectOnClick: dissolveOnClick,
    effectType: "dissolve",
  });

  const handlePointerUp = useCallback(() => {
    handlers.onPointerUp();
    if (!disabled) onClick?.();
  }, [handlers, onClick, disabled]);

  useFrame(({ clock }) => {
    const mat = material as ShaderMaterial;
    if (!mat.uniforms) return;

    const v = values.current;
    mat.uniforms.uTime.value = reducedMotion ? 0 : clock.getElapsedTime();
    mat.uniforms.uHover.value = v.hover;
    mat.uniforms.uActive.value = v.active;
    mat.uniforms.uDisabled.value = v.disabled;
    mat.uniforms.uDissolve.value = v.dissolve;
    mat.uniforms.uWobbleIntensity.value = reducedMotion
      ? 0
      : wobbleIntensity * 0.12;
  });

  const segments = config.segments;

  return (
    <mesh
      ref={meshRef}
      material={material}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlePointerUp}
      scale={[1.8, 0.7, 0.7]}
    >
      <capsuleGeometry args={[0.5, 1.0, segments / 4, segments]} />
      <HtmlLabel disabled={disabled}>{children}</HtmlLabel>
    </mesh>
  );
}

export const CapsuleBubbleButton = forwardRef<
  HTMLDivElement,
  CapsuleBubbleButtonProps
>(function CapsuleBubbleButton(
  {
    children = "Button",
    onClick,
    disabled = false,
    width = 220,
    height = 70,
    wobbleIntensity = 0.7,
    dissolveOnClick = false,
    colorScheme = "rainbow",
    qualityTier = "medium",
    className,
    ariaLabel,
  },
  ref
) {
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
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        position: "relative",
      }}
    >
      <WebGLCanvas width={width} height={height}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 3]} intensity={0.8} />
        <pointLight position={[-2, -1, 2]} intensity={0.4} color="#8080ff" />
        <CapsuleMesh
          wobbleIntensity={wobbleIntensity}
          dissolveOnClick={dissolveOnClick}
          colorScheme={colorScheme}
          qualityTier={qualityTier}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </CapsuleMesh>
      </WebGLCanvas>
    </div>
  );
});
