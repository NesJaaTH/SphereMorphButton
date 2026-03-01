import { useRef, useMemo, useCallback, useState, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D } from "three";
import type { Mesh, ShaderMaterial } from "three";
import { useAnimationState } from "../hooks/useAnimationState";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { createSphereMaterial } from "../materials/SphereMaterial";
import { HtmlLabel } from "./shared/HtmlLabel";
import { WebGLCanvas } from "./shared/WebGLCanvas";
import { QUALITY_CONFIGS } from "../constants/performance";
import type { SphereMorphButtonProps, QualityTier } from "../types/button";

interface SphereMeshProps {
  blobIntensity: number;
  shatterOnClick: boolean;
  particleCount: number;
  colorScheme: SphereMorphButtonProps["colorScheme"];
  qualityTier: QualityTier;
  disabled: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  onShatter?: (active: boolean) => void;
}

function SphereMesh({
  blobIntensity,
  shatterOnClick,
  colorScheme,
  qualityTier,
  disabled,
  onClick,
  children,
  onShatter,
}: SphereMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();
  const config = QUALITY_CONFIGS[qualityTier];

  const material = useMemo(
    () => createSphereMaterial(colorScheme ?? "pink"),
    [colorScheme]
  );

  const { values, handlers } = useAnimationState({
    disabled,
    effectOnClick: shatterOnClick,
    effectType: "shatter",
    onEffectComplete: () => onShatter?.(false),
  });

  const handlePointerUp = useCallback(() => {
    handlers.onPointerUp();
    if (!disabled) {
      onClick?.();
      if (shatterOnClick) onShatter?.(true);
    }
  }, [handlers, onClick, disabled, shatterOnClick, onShatter]);

  useFrame(({ clock }) => {
    const mat = material as ShaderMaterial;
    if (!mat.uniforms) return;

    const v = values.current;
    mat.uniforms.uTime.value = reducedMotion ? 0 : clock.getElapsedTime();
    mat.uniforms.uHover.value = v.hover;
    mat.uniforms.uActive.value = v.active;
    mat.uniforms.uDisabled.value = v.disabled;
    mat.uniforms.uShatter.value = v.shatter;
    mat.uniforms.uBlobIntensity.value = reducedMotion
      ? 0
      : blobIntensity * 0.2;
  });

  const detail = Math.max(1, Math.floor(config.segments / 16));

  return (
    <mesh
      ref={meshRef}
      material={material}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlePointerUp}
    >
      <icosahedronGeometry args={[0.8, detail]} />
      <HtmlLabel disabled={disabled}>{children}</HtmlLabel>
    </mesh>
  );
}

export const SphereMorphButton = forwardRef<
  HTMLDivElement,
  SphereMorphButtonProps
>(function SphereMorphButton(
  {
    children = "Button",
    onClick,
    disabled = false,
    width = 140,
    height = 140,
    blobIntensity = 0.8,
    shatterOnClick = false,
    particleCount = 100,
    colorScheme = "pink",
    qualityTier = "medium",
    className,
    ariaLabel,
  },
  ref
) {
  const [showParticles, setShowParticles] = useState(false);

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
        <pointLight position={[2, 2, 3]} intensity={0.8} color="#ff80c0" />
        <pointLight position={[-2, -1, 2]} intensity={0.4} color="#8040ff" />
        <SphereMesh
          blobIntensity={blobIntensity}
          shatterOnClick={shatterOnClick}
          particleCount={particleCount}
          colorScheme={colorScheme}
          qualityTier={qualityTier}
          disabled={disabled}
          onClick={onClick}
          onShatter={setShowParticles}
        >
          {children}
        </SphereMesh>
        {showParticles && QUALITY_CONFIGS[qualityTier].enableParticles && (
          <ParticleEffect count={particleCount} />
        )}
      </WebGLCanvas>
    </div>
  );
});

function ParticleEffect({ count }: { count: number }) {
  const meshRef = useRef<any>(null);
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      velocities.push([
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ]);
    }
    return { positions, velocities };
  }, [count]);

  const dummy = useMemo(() => new Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const { velocities } = particleData;
    for (let i = 0; i < count; i++) {
      velocities[i][1] -= 2 * delta; // gravity
      dummy.position.set(
        particleData.positions[i * 3] += velocities[i][0] * delta,
        particleData.positions[i * 3 + 1] += velocities[i][1] * delta,
        particleData.positions[i * 3 + 2] += velocities[i][2] * delta,
      );
      dummy.scale.setScalar(Math.max(0, 1 - dummy.position.length() * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial color="#ff80c0" transparent opacity={0.8} />
    </instancedMesh>
  );
}
