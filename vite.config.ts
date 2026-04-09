import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "es2015",
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    assetsInlineLimit: 4096,
  },

  server: {
    hmr: true,
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "lucide-react",
    ],
  },
});
