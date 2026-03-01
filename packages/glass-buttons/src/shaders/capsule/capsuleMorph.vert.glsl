uniform float uTime;
uniform float uHover;
uniform float uActive;
uniform float uDisabled;
uniform float uNoiseScale;
uniform float uNoiseSpeed;
uniform float uWobbleIntensity;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vDisplacement;
varying float vFresnel;

#include ../lib/noise.glsl

void main() {
  vec3 pos = position;
  vec3 norm = normal;

  // Organic wobble displacement along normals
  float wobble = uWobbleIntensity * (1.0 - uDisabled * 0.8);
  float speed = uNoiseSpeed * (1.0 - uDisabled * 0.7);

  // Multi-octave noise for organic morphing
  float n1 = snoise(pos * uNoiseScale + uTime * speed * 0.3) * 0.5;
  float n2 = snoise(pos * uNoiseScale * 2.0 + uTime * speed * 0.5) * 0.25;
  float n3 = snoise(pos * uNoiseScale * 4.0 + uTime * speed * 0.7) * 0.125;
  float noise = (n1 + n2 + n3) * wobble;

  // Increase wobble on hover, compress on active
  float hoverBoost = uHover * 0.15;
  float activeCompress = uActive * -0.1;
  float displacement = noise * (1.0 + hoverBoost + activeCompress);

  pos += norm * displacement;

  // Store for fragment shader
  vDisplacement = displacement;
  vNormal = normalize(normalMatrix * norm);
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;

  // Fresnel pre-calc
  vec3 viewDir = normalize(vViewPosition);
  vFresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

  gl_Position = projectionMatrix * mvPosition;
}
