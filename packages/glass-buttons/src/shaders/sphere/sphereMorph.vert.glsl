uniform float uTime;
uniform float uHover;
uniform float uActive;
uniform float uDisabled;
uniform float uNoiseScale;
uniform float uNoiseSpeed;
uniform float uBlobIntensity;
uniform float uMorphProgress;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vDisplacement;
varying float vFresnel;
varying vec3 vOriginalPosition;

#include ../lib/noise.glsl

void main() {
  vec3 pos = position;
  vec3 norm = normal;
  vOriginalPosition = position;

  float intensity = uBlobIntensity * (1.0 - uDisabled * 0.8);
  float speed = uNoiseSpeed * (1.0 - uDisabled * 0.7);

  // Blob morph: amorphous -> sphere on hover
  // In idle: heavy noise displacement for blobby shape
  // On hover: reduce noise, approach perfect sphere
  float blobNoise = fbm(pos * uNoiseScale + uTime * speed * 0.4, 3);
  float blobDisplace = blobNoise * intensity * (1.0 - uHover * 0.6);

  // Sphere normalization: pull toward unit sphere on hover
  vec3 spherePos = normalize(pos) * length(pos);
  pos = mix(pos, spherePos, uHover * 0.3);

  pos += norm * blobDisplace;

  // Active: squash slightly
  float squash = 1.0 - uActive * 0.15;
  pos.y *= squash;
  pos.x *= (2.0 - squash);
  pos.z *= (2.0 - squash);

  vDisplacement = blobDisplace;
  vNormal = normalize(normalMatrix * norm);
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;

  vec3 viewDir = normalize(vViewPosition);
  vFresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

  gl_Position = projectionMatrix * mvPosition;
}
