import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // pokeapi-js-wrapper's `module` entry points at src/ which imports JSON.
    // Vite's dep optimizer (via rolldown-vite) is currently dropping those JSON imports,
    // resulting in `endpoints.forEach` becoming `(void 0)(...)` at runtime.
    // Force the stable bundled entry instead.
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "pokeapi-js-wrapper": "pokeapi-js-wrapper/dist/index.js",
    },
  },
});
