import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      "glass-buttons": resolve(__dirname, "../../packages/glass-buttons/src/index.ts"),
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});
