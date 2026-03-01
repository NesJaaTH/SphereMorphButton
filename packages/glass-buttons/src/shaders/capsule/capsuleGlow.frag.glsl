uniform float uTime;
uniform float uHover;
uniform float uActive;
uniform float uDisabled;
uniform float uFresnelPower;
uniform float uDissolve;
uniform float uColorShift;
uniform vec3 uColorBase;
uniform vec3 uColorShiftVec;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vDisplacement;
varying float vFresnel;

#include ../lib/noise.glsl
#include ../lib/colorRamp.glsl
#include ../lib/fresnel.glsl

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  // Fresnel for edge glow
  float fresnel = fresnelEffect(viewDir, normal, uFresnelPower);

  // Iridescent color based on view angle + time
  float iriT = fresnel * 0.6 + uTime * 0.08 + uColorShift + vDisplacement * 2.0;
  vec3 iriColor = iridescentColor(iriT, uColorShiftVec);

  // Thin-film interference layer
  float filmThickness = vDisplacement * 3.0 + uTime * 0.05;
  float filmAngle = dot(viewDir, normal);
  vec3 filmColor = thinFilmColor(filmThickness, filmAngle);

  // Blend iridescent + film
  vec3 surfaceColor = mix(iriColor, filmColor, 0.3 + fresnel * 0.3);

  // Glass transparency core (darker center, brighter edges)
  float alpha = 0.15 + fresnel * 0.7;

  // Hover: brighten + saturate
  surfaceColor = mix(surfaceColor, surfaceColor * 1.4 + vec3(0.1), uHover * 0.5);
  alpha += uHover * 0.1;

  // Active: flash white briefly
  surfaceColor = mix(surfaceColor, vec3(1.0), uActive * 0.3);

  // Disabled: desaturate
  float gray = dot(surfaceColor, vec3(0.299, 0.587, 0.114));
  surfaceColor = mix(surfaceColor, vec3(gray), uDisabled * 0.7);
  alpha *= (1.0 - uDisabled * 0.3);

  // Inner glow
  float innerGlow = smoothstep(0.0, 0.5, fresnel) * 0.3;
  surfaceColor += innerGlow * iriColor;

  // Dissolve effect (on click)
  if (uDissolve > 0.01) {
    float dissolveNoise = snoise(vWorldPosition * 5.0 + uTime * 2.0) * 0.5 + 0.5;
    float dissolveMask = smoothstep(uDissolve - 0.05, uDissolve + 0.05, dissolveNoise);

    // Glowing edge at dissolve boundary
    float edgeGlow = 1.0 - smoothstep(0.0, 0.08, abs(dissolveNoise - uDissolve));
    surfaceColor += edgeGlow * vec3(1.0, 0.6, 0.2) * 3.0;

    alpha *= dissolveMask;
    if (alpha < 0.01) discard;
  }

  // Rim light
  float rim = pow(fresnel, 3.0) * 0.5;
  surfaceColor += rim * vec3(0.8, 0.9, 1.0);

  gl_FragColor = vec4(surfaceColor, alpha);
}
