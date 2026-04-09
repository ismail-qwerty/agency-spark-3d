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
    // Target modern browsers for smaller output
    target: "es2015",

    // Minify with esbuild (faster + smaller)
    minify: "esbuild",

    // Raise warning threshold (we're splitting anyway)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split big libraries into separate cached chunks
        manualChunks(id) {
          // React core
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
          // Framer Motion (heaviest library ~150kb)
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
          // Lucide icons
          if (id.includes("node_modules/lucide-react")) {
            return "lucide";
          }
          // Radix UI / shadcn components
          if (id.includes("node_modules/@radix-ui")) {
            return "radix-ui";
          }
          // All other node_modules go into a shared vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },

        // Cleaner asset file naming
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },

    // Generate sourcemaps only for production debugging (remove if not needed)
    sourcemap: false,

    // Inline small assets as base64 to reduce requests
    assetsInlineLimit: 4096, // 4kb
  },

  // Optimize dev server
  server: {
    hmr: true,
  },

  // Pre-bundle dependencies for faster dev startup
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "lucide-react",
    ],
  },
});
