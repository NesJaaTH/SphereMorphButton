uniform float uTime;
uniform float uHover;
uniform float uActive;
uniform float uDisabled;
uniform float uFresnelPower;
uniform float uShatter;
uniform float uColorShift;
uniform vec3 uColorBase;
uniform vec3 uColorShiftVec;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vDisplacement;
varying float vFresnel;
varying vec3 vOriginalPosition;

#include ../lib/noise.glsl
#include ../lib/colorRamp.glsl
#include ../lib/fresnel.glsl

// Voronoi for crack pattern
vec2 voronoi(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float minDist = 1.0;
  float secondDist = 1.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      for (int z = -1; z <= 1; z++) {
        vec3 neighbor = vec3(float(x), float(y), float(z));
        vec3 point = vec3(
          snoise(i + neighbor) * 0.5 + 0.5,
          snoise(i + neighbor + 31.416) * 0.5 + 0.5,
          snoise(i + neighbor + 63.832) * 0.5 + 0.5
        );
        vec3 diff = neighbor + point - f;
        float dist = dot(diff, diff);
        if (dist < minDist) {
          secondDist = minDist;
          minDist = dist;
        } else if (dist < secondDist) {
          secondDist = dist;
        }
      }
    }
  }
  return vec2(sqrt(minDist), sqrt(secondDist));
}

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  float fresnel = fresnelEffect(viewDir, normal, uFresnelPower);

  // Pink/magenta dominant iridescent color
  float iriT = fresnel * 0.5 + uTime * 0.06 + uColorShift + vDisplacement * 1.5;
  vec3 baseColor = iridescentColor(iriT, uColorShiftVec);

  // Pink bias
  baseColor = mix(baseColor, vec3(0.9, 0.3, 0.6), 0.3);

  // Film interference
  float filmT = vDisplacement * 2.0 + uTime * 0.04;
  vec3 filmColor = thinFilmColor(filmT, dot(viewDir, normal));
  vec3 surfaceColor = mix(baseColor, filmColor, 0.25 + fresnel * 0.2);

  // Glass alpha
  float alpha = 0.2 + fresnel * 0.65;

  // Hover: more vivid
  surfaceColor = mix(surfaceColor, surfaceColor * 1.3 + vec3(0.15, 0.05, 0.1), uHover * 0.5);
  alpha += uHover * 0.1;

  // Active: bright flash
  surfaceColor = mix(surfaceColor, vec3(1.0, 0.8, 0.9), uActive * 0.35);

  // Disabled: desaturate
  float gray = dot(surfaceColor, vec3(0.299, 0.587, 0.114));
  surfaceColor = mix(surfaceColor, vec3(gray), uDisabled * 0.7);
  alpha *= (1.0 - uDisabled * 0.3);

  // Shatter effect
  if (uShatter > 0.01) {
    vec2 vor = voronoi(vOriginalPosition * 4.0);
    float crackEdge = smoothstep(0.02, 0.06, vor.y - vor.x);

    // Cracks glow
    float crackGlow = (1.0 - crackEdge) * uShatter * 3.0;
    surfaceColor += crackGlow * vec3(1.0, 0.4, 0.7);

    // Fragments fly away as shatter progresses
    float fragmentMask = step(uShatter * 1.2, snoise(vOriginalPosition * 3.0) * 0.5 + 0.5);
    alpha *= mix(1.0, fragmentMask, smoothstep(0.3, 0.8, uShatter));

    if (alpha < 0.01) discard;
  }

  // Rim light
  float rim = pow(fresnel, 3.0) * 0.4;
  surfaceColor += rim * vec3(1.0, 0.7, 0.9);

  gl_FragColor = vec4(surfaceColor, alpha);
}
