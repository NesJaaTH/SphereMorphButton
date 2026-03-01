import { defineConfig } from "vite";
import react from "@vitejs/plugin-react" with { "resolution-mode": "import" };
import dts from "vite-plugin-dts";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    glsl(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "GlassButtons",
      formats: ["es", "cjs"],
      fileName: "glass-buttons",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
        "@react-three/postprocessing",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          three: "THREE",
          "@react-three/fiber": "ReactThreeFiber",
          "@react-three/drei": "Drei",
        },
      },
    },
    sourcemap: true,
    minify: "esbuild",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
