// Fresnel edge glow calculation
float fresnelEffect(vec3 viewDir, vec3 normal, float power) {
  return pow(1.0 - abs(dot(viewDir, normal)), power);
}

// Schlick's approximation for Fresnel
float fresnelSchlick(float cosTheta, float f0) {
  return f0 + (1.0 - f0) * pow(1.0 - cosTheta, 5.0);
}

// Tinted Fresnel for iridescent edges
vec3 fresnelTinted(vec3 viewDir, vec3 normal, float power, vec3 edgeColor) {
  float f = fresnelEffect(viewDir, normal, power);
  return edgeColor * f;
}
