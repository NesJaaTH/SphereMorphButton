import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, MathUtils } from "three";

interface ParticleShatterProps {
  count?: number;
  active: boolean;
  color?: string;
  gravity?: number;
  spread?: number;
}

export function ParticleShatter({
  count = 100,
  active,
  color = "#ff80c0",
  gravity = 3,
  spread = 5,
}: ParticleShatterProps) {
  const meshRef = useRef<any>(null);
  const timeRef = useRef(0);
  const dummy = useMemo(() => new Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      velocity: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ] as [number, number, number],
      rotationSpeed: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      size: MathUtils.randFloat(0.5, 1.5),
    }));
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!meshRef.current || !active) {
      timeRef.current = 0;
      return;
    }

    timeRef.current += delta;
    const t = timeRef.current;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const decay = Math.max(0, 1 - t * 0.8);

      dummy.position.set(
        p.velocity[0] * t,
        p.velocity[1] * t - 0.5 * gravity * t * t,
        p.velocity[2] * t
      );
      dummy.rotation.set(
        p.rotation[0] + p.rotationSpeed[0] * t,
        p.rotation[1] + p.rotationSpeed[1] * t,
        p.rotation[2] + p.rotationSpeed[2] * t
      );
      dummy.scale.setScalar(p.size * 0.03 * decay);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </instancedMesh>
  );
}
