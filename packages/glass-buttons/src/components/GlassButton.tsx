import { forwardRef } from "react";
import { CapsuleBubbleButton } from "./CapsuleBubbleButton";
import { SphereMorphButton } from "./SphereMorphButton";
import { GlassButtonFallback } from "./GlassButtonFallback";
import { useWebGLSupport } from "../hooks/useWebGLSupport";
import type { GlassButtonProps } from "../types/button";

export const GlassButton = forwardRef<HTMLDivElement, GlassButtonProps>(
  function GlassButton(
    {
      variant,
      children,
      onClick,
      disabled,
      width,
      height,
      colorScheme,
      qualityTier: forcedTier,
      effectOnClick = false,
      className,
      ariaLabel,
    },
    ref
  ) {
    const detectedTier = useWebGLSupport();
    const tier = forcedTier ?? detectedTier;

    if (tier === "fallback") {
      return (
        <GlassButtonFallback
          ref={ref}
          variant={variant}
          onClick={onClick}
          disabled={disabled}
          width={width}
          height={height}
          colorScheme={colorScheme}
          className={className}
          ariaLabel={ariaLabel}
        >
          {children}
        </GlassButtonFallback>
      );
    }

    if (variant === "capsule") {
      return (
        <CapsuleBubbleButton
          ref={ref}
          onClick={onClick}
          disabled={disabled}
          width={width ?? 220}
          height={height ?? 70}
          colorScheme={colorScheme}
          qualityTier={tier}
          dissolveOnClick={effectOnClick}
          className={className}
          ariaLabel={ariaLabel}
        >
          {children}
        </CapsuleBubbleButton>
      );
    }

    return (
      <SphereMorphButton
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        width={width ?? 140}
        height={height ?? 140}
        colorScheme={colorScheme}
        qualityTier={tier}
        shatterOnClick={effectOnClick}
        className={className}
        ariaLabel={ariaLabel}
      >
        {children}
      </SphereMorphButton>
    );
  }
);
