// Iridescent rainbow color lookup using cosine palette
// Based on Inigo Quilez's cosine color palettes
// https://iquilezles.org/articles/palettes/

vec3 iridescentColor(float t, vec3 shift) {
  return 0.5 + 0.5 * cos(6.28318 * (t + shift));
}

vec3 rainbowColor(float t) {
  return iridescentColor(t, vec3(0.0, 0.33, 0.67));
}

vec3 pinkMagentaColor(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t * 0.5 + vec3(0.0, 0.1, 0.2)));
}

vec3 cyanColor(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t * 0.7 + vec3(0.5, 0.6, 0.7)));
}

// Soap bubble thin-film interference approximation
vec3 thinFilmColor(float thickness, float angle) {
  float t = thickness * 2.0 + angle * 0.5;
  vec3 col = vec3(
    sin(t * 6.28318) * 0.5 + 0.5,
    sin(t * 6.28318 + 2.094) * 0.5 + 0.5,
    sin(t * 6.28318 + 4.189) * 0.5 + 0.5
  );
  return col;
}
