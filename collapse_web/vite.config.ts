import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Serve the combined build under the GitHub Pages repo path.
  base: "/fullbuild/",
  build: {
    outDir: "docs",
    emptyOutDir: true
  },
  plugins: [react()]
});
