import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import type { AnimationState } from "../types/button";
import { TRANSITION_DURATIONS } from "../constants/animation";

interface AnimationValues {
  hover: number;
  active: number;
  disabled: number;
  dissolve: number;
  shatter: number;
}

interface UseAnimationStateOptions {
  disabled?: boolean;
  effectOnClick?: boolean;
  effectType?: "dissolve" | "shatter";
  onEffectComplete?: () => void;
}

export function useAnimationState(options: UseAnimationStateOptions = {}) {
  const { disabled = false, effectOnClick = false, effectType = "dissolve", onEffectComplete } = options;

  const state = useRef<AnimationState>(disabled ? "disabled" : "idle");
  const target = useRef<AnimationValues>({ hover: 0, active: 0, disabled: disabled ? 1 : 0, dissolve: 0, shatter: 0 });
  const current = useRef<AnimationValues>({ hover: 0, active: 0, disabled: disabled ? 1 : 0, dissolve: 0, shatter: 0 });
  const effectTimer = useRef(0);
  const isInteracting = useRef(false);
  const needsRender = useRef(true);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(t, 1);

  useFrame((_, delta) => {
    const speed = 1.0 / (
      state.current === "hover" ? TRANSITION_DURATIONS.idleToHover :
      state.current === "active" ? TRANSITION_DURATIONS.hoverToActive :
      TRANSITION_DURATIONS.hoverToIdle
    );

    const lerpFactor = Math.min(delta * speed * 4, 1);

    current.current.hover = lerp(current.current.hover, target.current.hover, lerpFactor);
    current.current.active = lerp(current.current.active, target.current.active, lerpFactor);
    current.current.disabled = lerp(current.current.disabled, target.current.disabled, lerpFactor);

    // Effect animation
    if (state.current === "effect") {
      const duration = effectType === "dissolve"
        ? TRANSITION_DURATIONS.dissolveEffect
        : TRANSITION_DURATIONS.shatterEffect;

      effectTimer.current += delta;
      const progress = Math.min(effectTimer.current / duration, 1);

      if (effectType === "dissolve") {
        current.current.dissolve = progress;
      } else {
        current.current.shatter = progress;
      }

      if (progress >= 1) {
        state.current = "idle";
        target.current.hover = 0;
        target.current.active = 0;
        current.current.dissolve = 0;
        current.current.shatter = 0;
        effectTimer.current = 0;
        onEffectComplete?.();
      }
    }

    // Check if we need to keep rendering
    const diff = Math.abs(current.current.hover - target.current.hover) +
      Math.abs(current.current.active - target.current.active) +
      Math.abs(current.current.disabled - target.current.disabled);
    needsRender.current = diff > 0.001 || state.current === "effect";
  });

  const onPointerEnter = useCallback(() => {
    if (disabled || state.current === "effect") return;
    state.current = "hover";
    target.current.hover = 1;
    isInteracting.current = true;
  }, [disabled]);

  const onPointerLeave = useCallback(() => {
    if (disabled || state.current === "effect") return;
    state.current = "idle";
    target.current.hover = 0;
    target.current.active = 0;
    isInteracting.current = false;
  }, [disabled]);

  const onPointerDown = useCallback(() => {
    if (disabled || state.current === "effect") return;
    state.current = "active";
    target.current.active = 1;
  }, [disabled]);

  const onPointerUp = useCallback(() => {
    if (disabled || state.current === "effect") return;
    target.current.active = 0;

    if (effectOnClick) {
      state.current = "effect";
      effectTimer.current = 0;
    } else {
      state.current = isInteracting.current ? "hover" : "idle";
    }
  }, [disabled, effectOnClick]);

  return {
    values: current,
    needsRender,
    isInteracting,
    handlers: {
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
    },
  };
}
